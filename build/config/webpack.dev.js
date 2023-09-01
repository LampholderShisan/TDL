const { resolvePath } = require('../utils/utils')
const baseConfig = require('./webpack.base')
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const devConfig = {
    // mode 模式 development production none默认开发环境
    mode: 'development',
    // 映射源码所在的对应行
    devtool: 'eval-cheap-module-source-map',
    // 服务配置
    devServer: {
        port: 3000, //端口
        open: true, //是否自动打开浏览器
        // 访问静态的资源目录
        static: {
            // 告诉服务器从哪里访问静态资源目录 path.join(__dirname, 'public')
            // directory: resolvePath('../../public' ),
            directory: resolvePath('public', true, 'TDL'),
        },
        proxy: { //代理配置 一般解决跨域问题
        },
        // 是否启用热模板替换
        // hot: true,
        client: {
            logging: 'error',
            // overlay: {
            //     errors: false,
            //     warnings: false,
            // },
            // progress: false, //是否在控制台显示加载进度
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}
module.exports = merge(baseConfig, devConfig)

