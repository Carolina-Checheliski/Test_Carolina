
#ifndef MANAGE_LICENSE_H
#define MANAGE_LICENSE_H

#include <string>

enum LicenseStatus {
    ACTIVE,
    INACTIVE,
    EXPIRED,
    ERROR_CHECKING
};

class ManageLicense {
private:
    std::string current_key;

public:
    ManageLicense();

    LicenseStatus checkStatus();

    bool activate(const std::string& key);

    bool deactivate();

    std::string getKey() const { return current_key; }
};

#endif 
