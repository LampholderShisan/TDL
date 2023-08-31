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
        filename: 'bundle.[hash:7].js',
        // assetModuleFilename: 'images/[hash][ext]'
    },
    // 打包规则处理
    module: {
        rules: [
            // css文件处理
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            //#region
            /**  
             * @description {file-loader,url-loader}
             * 在webpack5的官网中url-loader，file-loader已经是弃用了的，通过资源模块类型(asset module type)替换掉了webpack5之前的loader
             * 如果还要使用这两个废弃了的文件的话，必须加上最后那一句type: ‘javascript/auto’,
             * 否则会出现一张图片打包两次，而且会出现背景图片不会显示到页面上的问题
             */
            // webpack5之前的文件处理
            // {
            //     test: /\.(png|jpe?g|gif|svg|webp)$/i,
            //     loader: 'file-loader',
            //     options: {
            //         outputPath: 'images',
            //         name: '[name].[hash:7].[ext]',
            //         esModule: false,
            //         type: 'javascript/auto'
            //     },
            // },
            // {
            //     test: /\.(png|jpe?g|gif|svg|webp)$/i,
            //     loader: 'url-loader',
            //     options: {
            //         publicPath: './images', //相对打包后的index.html的图片位置
            //         outputPath: 'images', //打包成功后图片的文件夹名字
            //         // 解决：关闭url-loader的es6模块化，使用commonjs解析
            //         esModule: false,
            //         // 图片大小超出10kb 会被转化为base64
            //         limit: 120 * 1024,
            //         // 图片重命名[name]:站位 [hash:6]代指哈希值站6位,[ext]:匹配图片的后缀名 列如.(png|jpe?g|gif|svg|webp或其他文件后缀名等
            //         name: '[hash:7].[name].[ext]',
            //     },
            //     type: 'javascript/auto'
            // },
            // #endregion
            //使用webpack5 内置资源类型处理器进行处理(asset module type)
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                type: 'asset', // 当不符合条件时会自动走asset/resource模块规则处理，符合则会遵循asset/inline规则处理相当于
                generator: {
                    filename: 'images/[name].[hash:7][ext]',
                },
                // 对于base64的处理
                parser: {
                    dataUrlCondition: {
                        maxSize: 1024 * 120 //小于120kb 转化为base64
                    }
                }
            },
            //对sass文件进行处理
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            // 多个文件时用数组的形式传入，单个文件时可以直接使用 path.resolve(__dirname, '../style/common.scss'
                            resources: ['./src/styles/common/reset.scss', './src/styles/common/theme.scss']
                        }
                    }
                ]
            }

        ],
    },

    // 插件配置
    plugins: [
        // 创建模板
        new HtmlWebpackPlugin({
            title: 'TODO',
            template: reslovePath('./public/index.html'),
            path: reslovePath('dist/index.html'),
            filename: 'index.html'
        }),
        // 自动清除打包目录
        new CleanWebpackPlugin()
    ]
}
