import js from "@eslint/js";
import globals from "globals";

export default [
  {
    "ignores": ["**/public/", "**/dist/", "**/coverage/"],
  },
  {
    "languageOptions": {
      "globals": {
        ...globals.jest,
        ...globals.node,
      },
    },
  },
  js.configs.recommended,
  {
    "rules": {
      "no-duplicate-imports": ["error", {"includeExports": true}],
      "no-template-curly-in-string": "error",
      "no-unmodified-loop-condition": "error",
      "no-unreachable-loop": "error",
      "no-unused-private-class-members": "error",
      "consistent-return": "error",
      "eqeqeq": ["warn", "always", {"null": "ignore"}],
      "new-cap": "error",
      "no-lonely-if": "error",
      // "no-magic-numbers": "warn",
      "no-mixed-operators": "error",
      "no-return-assign": "error",
      "no-shadow": "error",
      "no-throw-literal": "error",
      "no-useless-concat": "error",
      "no-useless-return": "error",
      "no-var": "error",
      "no-warning-comments": "warn",
      // TODO: In https://eslint.org/docs/latest/rules/ eddig jutottam: "no-with"

      "quotes": ["warn", "double"],
      "quote-props": ["error", "always"],
      "max-len": ["warn", {"code": 160, "ignoreComments": true}],
      "prefer-template": "error",
      "brace-style": "error",
      "object-curly-spacing": "error",
    },
  },
];
