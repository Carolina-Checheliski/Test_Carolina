#include "ManageLicense.h"
#include <iostream>

ManageLicense::ManageLicense (){
    current_key="";
}

LicenseStatus ManageLicense:: checkStatus(){
    if(current_key.empty()) {
        return INACTIVE;
    }
    return ACTIVE;
}

bool ManageLicense::activate(const std::string& key) {
    if (key.length () < 16){
        return false;
    }

    if (key.find('G')== std::string::npos && key.find('g')==std::string::npos){
        return false;
    }
    current_key =key;
    std::cout << "License activated with key:" << current_key << std::endl;
    return true;
}


bool ManageLicense::deactivate () {
    current_key = "";
    std::cout <<"License deactivated"<< std::endl;
    return true;
}