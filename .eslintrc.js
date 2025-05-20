module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-hooks"
    ],
    "rules": {
        "indent": [
            "error", 4, { SwitchCase: 1 }
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "double",
            { avoidEscape: true }
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-unused-vars": ["error", { "args": "none", "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }], // allow unused vars in the functions
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "react/prop-types": "off",
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};
