var addon = require('./build/Release/addon');

// Outputs exported function Hello from C++
console.log(addon.hello());
