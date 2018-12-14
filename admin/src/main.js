// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Auth from './plugins/auth-client'
import store from './vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';


require("./common/common.css")
Vue.use(ElementUI)
Vue.use(Auth, router)
Vue.config.productionTip = false

/* eslint-disable no-new */
let that = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
export default that