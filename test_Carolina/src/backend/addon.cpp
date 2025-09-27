#include <napi.h>
#include "ManageLicense.h"


ManageLicense licenseManager;


Napi::Value CheckStatusWrapper(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    LicenseStatus status = licenseManager.checkStatus();
    std::string statusStr;


    switch (status) {
        case ACTIVE:
            statusStr = "Active";
            break;
        case INACTIVE:
            statusStr = "Not Activated";
            break;
        case EXPIRED:
            statusStr = "Expired";
            break;
        case ERROR_CHECKING:
        default:
            statusStr = "Error";
            break;
    }


    Napi::Object result = Napi::Object::New(env);
    result.Set("status", Napi::String::New(env, statusStr));
    result.Set("key", Napi::String::New(env, licenseManager.getKey()));
   
    return result;
}


Napi::Value ActivateWrapper(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    if (info.Length() < 1 || !info[0].IsString()) {
        Napi::TypeError::New(env, "License key (string) expected").ThrowAsJavaScriptException();
        return env.Undefined();
    }


    std::string key = info[0].As<Napi::String>().Utf8Value();
    bool success = licenseManager.activate(key);


    return Napi::Boolean::New(env, success);
}


Napi::Value DeactivateWrapper(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    bool success = licenseManager.deactivate();
    return Napi::Boolean::New(env, success);
}


Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "checkStatus"), Napi::Function::New(env, CheckStatusWrapper));
    exports.Set(Napi::String::New(env, "activate"), Napi::Function::New(env, ActivateWrapper));
    exports.Set(Napi::String::New(env, "deactivate"), Napi::Function::New(env, DeactivateWrapper));
    return exports;
}


NODE_API_MODULE(ManageLicenseAddon, Init)
