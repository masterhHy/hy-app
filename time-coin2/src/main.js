// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import Auth from './plugins__config/auth-client'

import {AlertPlugin, ToastPlugin} from 'vux'
import './styles/index.less'

Vue.use(AlertPlugin)
Vue.use(ToastPlugin)

Vue.use(VueRouter)
Vue.use(Auth, router)

require("./common/common.css")
FastClick.attach(document.body)


Vue.config.productionTip = false

/* eslint-disable no-new */
let that = new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
//把vue实例输出，方便其他模块应用
export default that