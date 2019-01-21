// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Auth from './plugins/auth-client'
import i18n from './plugins/i18n'
import mydeafult from './plugins/default-plugins'
import store from './vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/fonts/iconfont.css'

//自定义组件 全局注册
import hyTable from './components/hyTable'
Vue.component('hy-table', hyTable);
import hyConfirm from './components/hyConfirm'
Vue.component('hy-confirm', hyConfirm);



require("./common/common.css")
Vue.use(ElementUI,{
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(Auth, router)
Vue.config.productionTip = false


Vue.use(mydeafult)

/* eslint-disable no-new */
let that = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
export default that