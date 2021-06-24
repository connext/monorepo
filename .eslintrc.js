module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["import"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "@typescript-eslint/no-var-requires": ["off"],
    "@typescript-eslint/no-empty-interface": ["off"],
    "@typescript-eslint/ban-ts-ignore": ["off"],
    "@typescript-eslint/explicit-function-return-type": ["off"],
    "@typescript-eslint/no-empty-function": ["off"],
    "@typescript-eslint/no-unused-expressions": ["off"],
    "@typescript-eslint/no-non-null-assertion": ["off"],
    "comma-dangle": ["warn", "always-multiline"],
    quotes: ["warn", "double", { allowTemplateLiterals: true, avoidEscape: true }],
    semi: ["error", "always"],
    "@typescript-eslint/no-explicit-any": ["off"],
    "import/order": [
      1,
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always",
      },
    ],
  },
};
