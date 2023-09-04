# TODOLIST

## vsersion 1.0 

### 描述

+ **时间**：`2023-09-12` 

+ **概述：**使用`webpack`由零到一构建的项目，使用框架`vue2.0`，涉及功能有添加，删除、编辑、全选、反选，数据采用本地缓存
+ **技术选型：** `vue2.0`、`scss`、`js`、`webpack`
+ **注意：**`version1.0`为简易版，未使用`vue-router`、`vuex`并尚未搭配后台

### 示意图

![version1.0](https://img-blog.csdnimg.cn/d9b301d9ad1341d494433c17c19d24b8.jpeg)

### webpack使用的loader

+ style-loader：将处理的css用style标签添加到HTML的head中
+ css-loader：处理css文件
+ sass-loader：处理s[ac]ss文件
+ postcss-loader:需要配置postcss.config.js引用`autoprefixer`插件的使用，
+ vue-loader:依赖`vue-template-compiler`并且要配合VueLoaderPlugin使用，才能处理vue文件
  + **注意**：这里使用的版本为`vue-loader@15`，15以上的版本有点问题
+ vue-style-loader:与`style-loader`类似，是将vue文件的css以动态的方式加入的style中
+ vue-template-compiler:处理template模板的预处理器
+ asset type moudle：由于使用的是`webpack5.0`，`url-loader`,`file-loader`已被弃用，而是使用内置`asset type moudle`处理，如果仍要使用`url-loader`、`file-loader`就需要配置`type:javascript:viod()`，在配置文件中有使用该方式(注释)
+ babel-loader：对高版本js进行处理与需要配合`@babel/preset-env`、`@babel/core`，还需要配置babel.config.json文件对`perset-env`使用，`preset-env`才会生效 

### 插件

+ html-webpack-plugin：打包时自动生成HTML文件
+ clean-webpack-plugin：打包时自动清除dist目录文件
+ VueLoaderPlugin:该插件是引用`vue-loader`中的并不需要安装，处理vue文件
+ autoprefixer:自动为css添加前缀，需要配合`postcss-loader`使用，配置postcss.config.js引用`autoprefixer`插件才能生效
  + **注意**：使用的版本为`autoprefixer@7`，7以上的版本不知道为什么添加不了前缀，还没有到原因，就使用7版本了
+ uuid:自动生成唯一的id用来标识每一个条待办事项