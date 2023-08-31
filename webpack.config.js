const path = require('path')
// 引用自动创建HTML模板插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 自动清除打包目录 插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 路径处理
function reslovePath(dirName = '') {
    if (typeof dirName !== 'string') return Error('Type Error ,Please enter String Type')
    let reslovePath = path.resolve(__dirname, dirName)
    if (dirName === '') return reslovePath
    else return reslovePath
}
module.exports = {
    // mode 模式 development production none默认开发环境
    mode: 'development',
    //入口文件
    entry: {
        mian: reslovePath('./src/main.js')
    },
    // 出口文件
    output: {
        path: reslovePath('dist'),
        filename: 'bundle.[hash:7].js'
    },
    // 插件配置
    plugins: [
        // 创建模板
        new HtmlWebpackPlugin({
            template: reslovePath('./public/index.html'),
            path: reslovePath('dist/index.html'),
            filename: 'index.html'
        }),
        // 自动清除打包目录
        new CleanWebpackPlugin()
    ]
}