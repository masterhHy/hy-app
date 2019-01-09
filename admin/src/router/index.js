import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import HelloWorld from '@/components/HelloWorld'
import store from '../vuex/index.js'

Vue.use(Router)

 let router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/test1',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/test2',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/test3',
      name: 'HelloWorld',
      component: HelloWorld
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
