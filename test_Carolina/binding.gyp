{
  "targets": [
    {
      "target_name": "ManageLicenseAddon",
      "sources": [
        "test_Carolina\src\backend\addon.cpp",
        "test_Carolina\src\backend\ManageLicense.h"
      ],

"include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
        "src"
      ],
      "dependencies": [
        "<!@(node -p \"require('node-addon-api').gyp\")"
      ],
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "defines": [ "NAPI_DISABLE_CPP_EXCEPTIONS" ]
    }
  ]
}