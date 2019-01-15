import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    pageLoading:false,
    userInfo:{},
    menuInfo:[],
  },
  mutations: {
    pageLoading (state,{ isLoading }) {
      state.pageLoading=isLoading;
    },
    userInfo (state,{ userInfo }) {
      state.userInfo=userInfo;
    },
    menuInfo (state,{ menuInfo }) {
    	/*menuInfo=[{ 
								id:"3",
								moduleName:"test模块",
								modulePath:"",
								parentId:"",
								active:1, 
								moduleCode:"SYSTEM_MANAGED",
								moduleIcon:"",
								subModules:[{ 
										id:"4",
										moduleName:"test2模块",
										modulePath:"/authIndex",
										parentId:"3",
										active:1, 
										moduleCode:"MODULE_MANAGED",
										moduleIcon:"",
										subModules:[]
									},{ 
									id:"1",
									moduleName:"用户模块",
									modulePath:"/test1",
									parentId:"3",
									active:1,  
									moduleCode:"USER_MANAGED",
									moduleIcon:"",
									subModules:[]
								},{ 
									id:"2",
									moduleName:"角色模块",
									modulePath:"/test2",
									parentId:"3",
									active:1, 
									moduleCode:"ROLE_MANAGED",
									moduleIcon:"",
									subModules:[]
								},{ 
									id:"5",
									moduleName:"应用模块",
									modulePath:"/test3",
									parentId:"3",
									active:1, 
									moduleCode:"APP_MANAGED",
									moduleIcon:"",
									subModules:[]
								}]
							}]*/
    	
      state.menuInfo=menuInfo;
    },
  },
  getters: {
  	pageLoading: state => {
      return state.pageLoading;
    },
    userInfo: state => {
      return state.userInfo;
    },
    menuInfo: state => {
      return state.menuInfo;
    },
  },
})
