module.exports = {
  chainWebpack: config => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
        .oneOf('inline')
        .resourceQuery(/inline/)
        .use('vue-svg-loader')
        .loader('vue-svg-loader')
        .options({
          svgo: {
            plugins: [{ removeViewBox: false }]
          }
        })
        .end()
        .end()
        .oneOf('external')
        .use('file-loader')
        .loader('file-loader')
        .options({
          name: 'assets/svg/[name].[hash:8].[ext]'
        })
  },
  transpileDependencies: ['vuex-persist']
}