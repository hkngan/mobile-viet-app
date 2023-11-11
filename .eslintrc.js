module.exports = {
  root: true,
  extends: '@react-native',
  parser: '@babel/eslint-parser',
  requireConfigFile: false,
  parserOptions: {
    babelOptions: {
      configFile: './babel.config.js',
    }
  }
}
