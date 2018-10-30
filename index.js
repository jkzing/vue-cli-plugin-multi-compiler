module.exports = (api, options) => {
  if (process.env.NODE_ENV !== 'production') return
  // multi-compiler mode only can be used in production build
  const merge = require('webpack-merge')
  const oldResolveWebpackConfig = api.service.resolveWebpackConfig

  api.service.resolveWebpackConfig = function resolveWebpackConfig () {
    // get raw config
    let config = oldResolveWebpackConfig.call(this)
    const { configureMultiCompilerWebpack } = options.pluginOptions || {}

    // tweak raw config into multi-compiler mode configs
    if (typeof configureMultiCompilerWebpack === 'function') {
      config = configureMultiCompilerWebpack(config)
    } else if (Array.isArray(configureMultiCompilerWebpack)) {
      config = configureMultiCompilerWebpack.map(curr => merge(config, curr))
    }
    return config
  }
}
