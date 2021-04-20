const path = require('path')
function resolve (dir) {
  return path.join(__dirname, './', dir)
}
module.exports = {
  publicPath: './', // vueConf.baseUrl, // 根域上下文目录
  outputDir: 'dist', // 构建输出目录
  // assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
  lintOnSave: true, // 是否开启eslint保存检测，有效值：ture | false | 'error'
  // runtimeCompiler: true, // 运行时版本是否需要编译
  transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
  productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  lintOnSave: false,
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        modifyVars: {
          // 直接覆盖变量
          'text-color': '#111',
          'border-color': '#eee',
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "~@/assets/theme.less";`,
        },
      },
    },
  },
  parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
};
