import axios from 'axios'
import VueAxios from 'vue-axios'
import Token from '../token/token'
import Config from '../utils/config'

export default{
	init(Vue){
		axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
		axios.defaults.transformRequest = [data=> {
				let ret = ''
				for (let it in data) {
					ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
				}
			return ret
		}]
		
		Vue.use(VueAxios, axios)
		
		Vue.axios.defaults.baseURL=Config.resourceUrl;
		
		//让ajax携带cookie
	 	Vue.axios.defaults.withCredentials=true;
	 	//跨域
	 	Vue.axios.defaults.crossDomain = true;
	    // 配置认证头
	    Vue.axios.defaults.headers.common['Authorization'] = 'Bearer ' + Vue.prototype.$auth.token();
	    
	    
	    // http 拦截器
	    Vue.axios.interceptors.response.use(function (response) {
	      // Do something with response data
	      return response
	    }, function (error) {
	      if (error && error.response) {
	        switch (error.response.status) {
	          case 403:
	            break
	          case 402:
	          	var targetPage = window.location.href.replace(Config.baseUrl,"").replace("#","");
	            window.localStorage.setItem("targetPage",targetPage);
	            
	            window.location.href = Config.authUrl + '/oauth/authorize?response_type=code&client_id=' + Config.appId + '&redirect_uri=' +
                Config.baseUrl
	            break
	          default:
	            //Vue.prototype.$notify.error('访问服务器错误')
	        }
	      } else {
	       // Vue.prototype.$notify.error('访问服务器错误')
	      }
	      console.error(error)
	      // Do something with response error
	      return Promise.reject(error)
	    })
		
		
	}
}
