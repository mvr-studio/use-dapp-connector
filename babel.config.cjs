module.exports = (api) => {
  const isTest = api.env('test')
  if (!isTest) return {}
  return {
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
    plugins: []
  }
}
