const OFF = 0
const WARN = 1
const ERROR = 2

module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    "airbnb-typescript",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:testing-library/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "@typescript-eslint"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "src/"],
      },
    },
  },
  rules: {
    "react/jsx-curly-newline": OFF,
    "react/jsx-one-expression-per-line": OFF,
    "@typescript-eslint/explicit-function-return-type": OFF,
    "@typescript-eslint/interface-name-prefix": OFF,
    "react/jsx-props-no-spreading": OFF,
    "react/display-name": OFF,
    "react/require-default-props": OFF,
    "react/prop-types": OFF,
    "import/prefer-default-export": OFF,
    "@typescript-eslint/semi": OFF,
    "@typescript-eslint/no-unused-vars": ERROR,
    "space-infix-ops": OFF,
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "react/jsx-filename-extension": [
      1,
      { extensions: [".jsx", ".tsx"] },
    ],
  },
}
