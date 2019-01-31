// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import Auth from './plugins__config/auth-client'
import {AlertPlugin, ToastPlugin,LoadingPlugin,ConfirmPlugin } from 'vux'
import utils from './plugins__config/utils'
import './styles/index.less'

Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)



Vue.use(VueRouter)
Vue.use(Auth, router)
Vue.use(utils)


require("./common/common.css")
require("./assets/css/fa5013/web-fonts-with-css/css/fontawesome-all.css")
FastClick.attach(document.body)


Vue.config.productionTip = false

/* eslint-disable no-new */
let that = new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
//把vue实例输出，方便其他模块应用
export default that
