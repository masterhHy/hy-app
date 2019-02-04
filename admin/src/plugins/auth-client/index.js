import AuthRouter from './router/router'
import Config from './utils/config'
import Token from './token/token'
import axios from './axios/axios_config.js'

export default {
  install: function (Vue, Router) {
    // 初始化router
    AuthRouter.init(Router);
    // 设置vue原型链
    Vue.prototype.$auth = {
      config: Config,
      token () {
        return Token.token();
      },
      logout () {
        Token.deleteToken();
      },
      indentify(){
      	let id = localStorage.getItem("client-identify");
      	if(!id){
      		id=Vue.prototype.$auth.guid();
      		localStorage.setItem("client-identify",id);
      	}
      	return id;
      },
      guid() {
    		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	        return v.toString(16);
	    	})
			}
    }
    axios.init(Vue);
  }
}
