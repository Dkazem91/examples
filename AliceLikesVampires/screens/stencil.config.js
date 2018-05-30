const { plugins } = require('@apizi/core/dist/plugins')

exports.config = {
  namespace: 'alice-likes-vampires',
  outputTargets: [
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: false
    }
  ],
  plugins: [...plugins()]
}

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
