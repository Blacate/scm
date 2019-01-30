module.exports = {
  parser: 'typescript-eslint-parser',
  plugins: [
    'typescript',
  ],
  extends: [
    'eslint-config-alloy/typescript',
  ],
  rules: {
    indent: ["error", 2]
  }
}
