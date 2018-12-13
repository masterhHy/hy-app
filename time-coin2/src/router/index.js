import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/h5/coin/HomePage'
import TimeCoin from '@/components/h5/coin/TimeCoin'
import TimeCoinEdit from '@/components/h5/coin/TimeCoinEdit'
import User from '@/components/h5/user/User'
import MyDiary from '@/components/h5/user/MyDiary'
import MyWeekReport from '@/components/h5/user/MyWeekReport'
import DayDiary from '@/components/h5/user/DayDiary'
import WishList from '@/components/h5/wishlist/WishList'

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
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/myDiary',
      name: 'myDiary',
      component: MyDiary
    },
    {
      path: '/myWeekReport',
      name: 'myWeekReport',
      component: MyWeekReport
    },
    {
      path: '/dayDiary',
      name: 'dayDiary',
      component: DayDiary,
      meta: {
        tabModule: 'my'
      }
    },
    {
      path: '/wishList',
      name: 'wishList',
      component: WishList
    }
  ]
})
