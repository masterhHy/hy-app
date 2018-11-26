import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/h5/coin/HomePage'
import TimeCoin from '@/components/h5/coin/TimeCoin'
import TimeCoinEdit from '@/components/h5/coin/TimeCoinEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: HomePage
    },
    {
      path: '/homePage',
      name: 'homePage',
      component: HomePage
    },
    {
      path: '/timeCoin',
      name: 'timeCoin',
      component: TimeCoin
    },
    {
      path: '/timeCoin/timeCoinEdit',
      name: 'timeCoinEdit',
      component: TimeCoinEdit
    }
  ]
})
