module.exports = (api, options) => {
  const merge = require('webpack-merge')
  const oldResolveWebpackConfig = api.service.resolveWebpackConfig

  api.service.resolveWebpackConfig = function resolveWebpackConfig () {
    // get raw config
    let config = oldResolveWebpackConfig.call(this)
    const { configureMultiCompilerWebpack } = options.pluginOptions

    // tweak raw config into multi-compiler mode configs
    if (typeof configureMultiCompilerWebpack === 'function') {
      config = configureMultiCompilerWebpack(config)
    } else if (Array.isArray(configureMultiCompilerWebpack)) {
      config = configureMultiCompilerWebpack.map(merge.bind(null, config))
    }
    return config
  }
}
