// 参考: https://qiita.com/yamatai12/items/ebde3b4e92c870227712
// @ts-check

import eslint from "@eslint/js";
import globals from "globals"
import tseslint from "typescript-eslint"
import importPlugin from "eslint-plugin-import"
import importAccessPlugin from "eslint-plugin-import-access/flat-config"
import unusedImportsPlugin from "eslint-plugin-unused-imports"
import reactPlugin from "eslint-plugin-react"

export default tseslint.config({
  files: ["**/*.{ts,tsx}"],
  ignores : [
    ".next/**/*",
    "node_modules/**/*",
  ],
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    importPlugin.flatConfigs.recommended,
    reactPlugin.configs.flat.recommended,
  ],
  languageOptions: {
    ...reactPlugin.configs.flat.recommended.languageOptions,
    "globals": {
      ...globals.serviceworker,
      ...globals.browser
    },
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
      ecmaFeatures: {
        jsx: true,
      },
    }
  },
  plugins: {
    "unused-imports": unusedImportsPlugin,
    "import-access": importAccessPlugin,
    "react": reactPlugin,
  },
  settings: {
    "import/resolver": {
      "typescript": true,
      "node": true,
    }
  },
  rules: {
    // TODO: https://github.com/import-js/eslint-plugin-import/issues/2948 解決したら消す(3行)
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "import/namespace": "off",
    "import/order": [
      "warn",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type"
        ],
        "pathGroups": [
          {
            "pattern": "react",
            "group": "builtin",
            "position": "before"
          },
          {
            "pattern": "~/**",
            "group": "internal",
          }
        ],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc"
        },
        "distinctGroup": false,
        "pathGroupsExcludedImportTypes": ["react"]
      }
    ],
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        "vars": "all",
        "varsIgnorePattern": "^_",
        "args": "after-used",
        "argsIgnorePattern": "^_"
      }
    ],
    "import-access/jsdoc": "error",
  }
});
