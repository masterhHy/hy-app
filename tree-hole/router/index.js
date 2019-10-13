import Vue from 'vue'
import Router from 'vue-router'
import AllHole from '@/components/allHole/all-hole'
import MyHole from '@/components/myHole/my-hole'
import HoleEdit from '@/components/myHole/hole-edit'
import Messages from '@/components/allHole/messages'
import MyselfHole from '@/components/myHole/myself-hole'
// import TestCreateApi from '@/components/allHole/testCreateApi'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AllHole',
      component: AllHole
    }, {
      path: '/MyHole',
      name: 'MyHole',
      component: MyHole
    }, {
      path: '/Messages',
      name: 'Messages',
      component: Messages
    }, {
      path: '/HoleEdit',
      name: 'HoleEdit',
      component: HoleEdit
    }, {
      path: '/MyselfHole',
      name: 'MyselfHole',
      component: MyselfHole
    }
    // , {
    //   path: '/TestCreateApi',
    //   name: 'TestCreateApi',
    //   component: TestCreateApi
    // }
  ]
})
