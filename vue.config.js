const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, './', dir)
}

// cdn预加载使用
const externals = {
  // 'vue': 'Vue',
  // 'vue-router': 'VueRouter',
  // 'vuex': 'Vuex',
  // 'axios': 'axios',
  // 'element-ui': 'ELEMENT',
  // 'js-cookie': 'Cookies',
  // 'nprogress': 'NProgress'
}

const cdn = {
  // 开发环境
  dev: {
    css: [
      // 'https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.10.0/theme-chalk/index.css',
      // 'https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css'
    ],
    js: []
  },
  // 生产环境
  build: {
    css: [
      // 'https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.10.0/theme-chalk/index.css',
      // 'https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css'
    ],
    js: [
      // 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.21/vue.min.js',
      // 'https://cdnjs.cloudflare.com/ajax/libs/vue-router/3.0.2/vue-router.min.js',
      // 'https://cdnjs.cloudflare.com/ajax/libs/vuex/3.0.1/vuex.min.js',
      // 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js',
      // 'https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.10.0/index.js',
      // 'https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.10.0/index.js',
      // 'https://cdnjs.cloudflare.com/ajax/libs/js-cookie/2.2.0/js.cookie.min.js',
      // 'https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.js'
    ]
  }
}

// 是否使用gzip
const productionGzip = true
// 需要gzip压缩的文件后缀
const productionGzipExtensions = ['js', 'css']

module.exports = {
  publicPath: './',
  assetsDir: './',
  lintOnSave: false,
  productionSourceMap: false,
  chainWebpack: config => {
    // 这里是对环境的配置，不同环境对应不同的BASE_API，以便axios的请求地址不同
    config.plugin('define').tap(args => {
      const argv = process.argv
      const mode = argv[argv.indexOf('--project-mode') + 1]
      args[0]['process.env'].MODE = `"${mode}"`
      if (process.env.NODE_ENV === 'production') {
        // args[0]['process.env'].BASE_API = '"https://api.cgvcap.com"' //开发环境
        args[0]['process.env'].BASE_API = '"https://dev-api.cgvcap.com"' //开发环境
      }else {
        // args[0]['process.env'].BASE_API = '"https://api.cgvcap.com"' //开发环境
        args[0]['process.env'].BASE_API = '"https://dev-api.cgvcap.com"' //开发环境
      }
      return args
    })

    /**
     * 添加CDN参数到htmlWebpackPlugin配置中， 详见public/index.html 修改
     */
    config.plugin('html').tap(args => {
      if (process.env.NODE_ENV === 'production') {
        args[0].cdn = cdn.build
      }
      if (process.env.NODE_ENV === 'development') {
        args[0].cdn = cdn.dev
      }
      return args
    })

    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  },

  // 修改webpack config, 使其不打包externals下的资源
  configureWebpack: config => {
    const myConfig = {}
    if (process.env.NODE_ENV === 'production') {
      // 1. 生产环境npm包转CDN
      myConfig.externals = externals

      myConfig.plugins = []
      // 2. 构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
      productionGzip && myConfig.plugins.push(
        new CompressionWebpackPlugin({
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 8192,
          minRatio: 0.8
        })
      )
    }
    if (process.env.NODE_ENV === 'development') {
      /**
       * 关闭host check，方便使用ngrok之类的内网转发工具
       */
      myConfig.devServer = {
        disableHostCheck: true,
      }
    }
    myConfig.plugins = [
      new webpack.ProvidePlugin({
        $:"jquery",
        jQuery:"jquery",
        "windows.jQuery":"jquery"
      })
    ]
    //   open: true,
    //   hot: true
    //   // https: true,
    //   // proxy: {
    //   //   '/proxy': {
    //   //     target: 'http://47.94.138.75',
    //   //     // changeOrigin: true,
    //   //     pathRewrite: {
    //   //       '^/proxy': ''
    //   //     }
    //   //   }
    //   // },
    // }
    return myConfig
  }
}
