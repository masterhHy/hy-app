// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Auth from './plugins/auth-client'
import axios from './plugins/axios/axios_config.js'
import store from './vuex'
import ElementUI from 'element-ui'


require("./common/common.css")
Vue.use(ElementUI)
Vue.use(Auth, router)
axios.init(Vue);//注册ajax 放在auth后面
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
