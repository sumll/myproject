/*
 * @author: SumO
 * @create: 2022-04-07 19:28 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2022-04-09 16:24 PM
 * @desc:
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// 加载全局样式
import './styles/index.scss'

Vue.use(ElementUI)

Vue.config.productionTip = false // 关闭生产环境提示
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
