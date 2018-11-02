# vue-cli-plugin-multi-compiler

Vue CLI 3 plugin to add support for webpack [multi-compiler mode](https://github.com/webpack/webpack/tree/master/examples/multi-compiler)

## Getting Started

```sh
vue add multi-compiler
```

## Configure

This plugin provides an option (`configureMultiCompilerWebpack`) in `vue.config.js` to tweak original vue cli webpack config into multiple configs.

You can use either a `function` or an `array`:

### function usage

```js
module.exports = {
  pluginOptions: {
    configureMultiCompilerWebpack: webpackConfig => {
      // `webpackConfig` here is the one resolved by vue cli.
      // (**after** executing `configureWebpack` and `chainWebpack`)
      const cloneDeep = require('lodash.clonedeep')
      const mainConfig = cloneDeep(webpackConfig)
      const appConfig = cloneDeep(webpackConfig)

      mainConfig.entry = {
        main: './src/main.js'
      }
      appConfig.entry = {
        app: './src/app.js'
      }

      // return an array to invoke webpack multi-compiler mode
      return [mainConfig, appConfig]
    }
  }
}
```

### array usage

```js
module.exports = {
  pluginOptions: {
    configureMultiCompilerWebpack: [
      // configurations here will be merged with original webpack config
      // by `webpack-merge`
      {
        entry: {
          main: './src/main.js'
        }
      },
      {
        entry: {
          app: './src/app.js'
        }
      }
    ]
  }
}
```
