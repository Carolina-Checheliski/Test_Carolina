{
  "targets": [
    {
      "target_name": "ManageLicenseAddon",
      "sources": [
        "src/backend/addon.cpp",
        "src/backend/ManageLicense.cpp"
      ],
      "include_dirs": [
        "src/backend",
        "C:\\Users\\Carol\\Desktop\\Test_Carolina\\test_Carolina\\node_modules\\node-addon-api"
      ],
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "defines": [ "NAPI_DISABLE_CPP_EXCEPTIONS" ]
    }
  ]
}