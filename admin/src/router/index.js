import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '../vuex/index.js'


import Welcom from '@/pages/Welcom'
import ModuleManaged from '@/pages/auth/ModuleManaged'
import ClientManaged from '@/pages/client/ClientManaged'
import RoleManaged from '@/pages/role/RoleManaged'
import UserManaged from '@/pages/user/UserManaged'
Vue.use(Router)

 let router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Welcom
    },{
      path: '/authIndex',
      name: 'ModuleManaged',
      component: ModuleManaged
    },{
      path: '/clientIndex',
      name: 'ClientManaged',
      component: ClientManaged
    },{
      path: '/roleIndex',
      name: 'RoleManaged',
      component: RoleManaged
    },{
      path: '/userIndex',
      name: 'UserManaged',
      component: UserManaged
    }
  ]
})
// 设置全局钩子
router.beforeEach(function (to, from, next) {
  store.commit("pageLoading", {isLoading: true})
  NProgress.start()
  next()
})

router.afterEach(function (to) {
  setTimeout(function () {
    store.commit("pageLoading", {isLoading: false})
  }, 500)
  NProgress.done()
})
export default router
