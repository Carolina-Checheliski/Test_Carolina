const express = require('express');
const path = require('path');


try {
    const licenseAddon = require('./build/Release/ManageLicenseAddon.node');
    process.licenseAddon = licenseAddon;
    console.log('Successfully loaded C++ Native Addon.');
} catch (error) {
    console.error('Failed to load C++ Native Addon. The application will use mock data.');
    console.error('Error details:', error.message);
}

const app = express();
const port = 3000;


app.get('/', (req, res) => {
    let htmlContent = fs.readFileSync(path.join(__dirname, 'frontend.html'), 'utf8');

    if (process.licenseAddon) {
        const addonScript = `
        <script>
            window.licenseAddon = {
                checkStatus: (callback) => {
                    const status = process.licenseAddon.checkStatus();
                    // Wrap in setTimeout to simulate the asynchronous nature of a real service/API call
                    // This keeps the frontend promise chain working correctly.
                    setTimeout(() => callback(null, status), 500); 
                },
                activate: (key, callback) => {
                    const success = process.licenseAddon.activate(key);
                    setTimeout(() => {
                        if (success) {
                            callback(null, true);
                        } else {
                            callback(new Error('Invalid or revoked key. (C++ Check Failed)'));
                        }
                    }, 500); 
                },
                deactivate: (callback) => {
                    const success = process.licenseAddon.deactivate();
                    setTimeout(() => callback(null, success), 500); 
                }
            };
        </script>`;
        htmlContent = htmlContent.replace('</head>', addonScript + '</head>');
    }

    res.send(htmlContent);
});
const fs = require('fs');

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('-------------------------------------------');
    if (!process.licenseAddon) {
        console.log('WARNING: C++ addon failed to load. Using Mock Service.');
    } else {
        console.log('SUCCESS: C++ Native Addon is loaded and ready.');
    }
    console.log('-------------------------------------------');
});


if (typeof __is_live_preview !== 'undefined' && __is_live_preview) {
    app.get('/', (req, res) => {
        let htmlContent = fs.readFileSync(path.join(__dirname, 'frontend.html'), 'utf8');
        
        let addonScript = '';
        if (typeof process.licenseAddon !== 'undefined') {
            addonScript = `
            <script>
                window.licenseAddon = {
                    checkStatus: () => new Promise((resolve, reject) => {
                        try {
                            const status = process.licenseAddon.checkStatus();
                            // Delay to simulate network latency, keeping the frontend UI responsive
                            setTimeout(() => resolve(status), 500); 
                        } catch (e) {
                            reject(e);
                        }
                    }),
                    activate: (key) => new Promise((resolve, reject) => {
                        try {
                            const success = process.licenseAddon.activate(key);
                            setTimeout(() => {
                                if (success) {
                                    resolve(true);
                                } else {
                                    // Match the mock service's error structure for consistency
                                    reject(new Error('Invalid or revoked key. (C++ Check Failed)')); 
                                }
                            }, 500);
                        } catch (e) {
                            reject(e);
                        }
                    }),
                    deactivate: () => new Promise((resolve, reject) => {
                        try {
                            const success = process.licenseAddon.deactivate();
                            setTimeout(() => resolve(true), 500);
                        } catch (e) {
                            reject(e);
                        }
                    })
                };
            </script>`;
        }
        
        htmlContent = htmlContent.replace('</head>', addonScript + '</head>');
        res.send(htmlContent);
    });
}