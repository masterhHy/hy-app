import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    pageLoading:false,
    pageTitle:"",
  },
  mutations: {
    pageLoading (state,{ isLoading }) {
      // 变更状态
      state.pageLoading=isLoading;
    },
    pageTitle(state,{ pageTitle }) {
      // 变更状态
      state.pageTitle=pageTitle;
    },
  },
  getters: {
    pageLoading: state => {
      return state.pageLoading;
    },
    pageTitle: state => {
      return state.pageTitle;
    },
  }
})
