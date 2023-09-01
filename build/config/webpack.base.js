const { resolvePath, generatorSassPath } = require('../utils/utils')
// 引用vueLoaderPluin 
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    //入口文件
    entry: {
        // mian: resolvePath('../../src/main.js') //等同于下面写法
        mian: resolvePath('src/main.js', true, 'TDL')
    },
    // 出口文件
    output: {
        // path: resolvePath('../../dist'),// 等同于下面写法
        path: resolvePath('dist', true, 'TDL'),
        filename: 'bundle.js',
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
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            // 多个文件时用数组的形式传入，单个文件时可以直接使用 path.resolve(__dirname, '../style/common.scss'
                            // resources: ['./../../src/assets/styles/global/reset.scss', './../../src/assets/styles/global/theme.scss']
                            resources: generatorSassPath(['global/reset.scss', 'global/theme.scss']),
                        }
                    }
                ]
            },
            // 对高版本js进行处理
            {
                test: /.m?js$/i,
                //排除
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            // 对vue文件进行处理
            {
                test: /\.vue$/i,
                loader: 'vue-loader'
            }
        ],
    },
    // 插件配置
    plugins: [
        // 使用VueLoaderPlugin
        new VueLoaderPlugin()
    ],
    // resolve 决定的意思
    resolve: {
        // 别名
        alias: {
            '@': resolvePath('src', true, 'TDL'),
            'vue': 'vue/dist/vue.js',
            'images': resolvePath('src/assets/images', true, 'TDL'),
            'styles': resolvePath('src/assets/styles', true, 'TDL')
        }
    },

}

