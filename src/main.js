import Vue from 'vue'
import App from './App.vue'

// 关闭生产环境的提示
Vue.config.productionTip = false
new Vue({
    beforeCreate() {
        Vue.prototype.$bus = this; //注册全局事件总线
    },
    el: "#app",
    // 方式一：构建项目时，vue默认使用的runtime-only编译时版本，这时需要在webpack指定构建vue的版本（runtime-only+compiler）
    components: {
        App,
    },
    template: '<App/>',
    // 方式二：构建项目时，vue渲染引擎会自动渲染构建vue的版本
    // render:h=>h(App)
})
// 使用$mount 挂载
// new Vue({
//     components: {
//         App,
//     },
//     template: '<App/>',
// }).$mount('#app')

