// const path = require('path')

// function addStyleResource (rule) {
//   rule.use('style-resource')
//     .loader('style-resources-loader')
//     .options({
//       // patterns: [
//       //   path.resolve(__dirname, './src/styles/imports.styl')
//       // ]
//     })
// }

module.exports = {
  baseUrl: '/museum-indonesia',

  pwa: {
    name: 'Museum Indonesia'
  },

  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined
  // chainWebpack: config => {
  //   const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
  //   types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
  // }
}
