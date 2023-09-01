const { resolvePath } = require('../utils/utils')
const baseConfig = require('./webpack.base');
const { merge } = require('webpack-merge')
// 引用自动创建HTML模板插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 自动清除打包目录 插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const prodConfig = {
    // mode 模式 development production none默认开发环境
    mode: 'development',
    // 插件配置
    plugins: [
        // 创建模板
        new HtmlWebpackPlugin({
            title: 'TODO',
            // template: resolvePath('../../public/index.html'),
            template: resolvePath('public/index.html', true, 'TDL'),
            // path: resolvePath('../../dist/index.html'),
            path: resolvePath('dist/index.html', true, 'TDL'),
            filename: 'index.html'
        }),
        // 自动清除打包目录
        new CleanWebpackPlugin(),
    ],
}
module.exports = merge(baseConfig, prodConfig)

