import axios from 'axios'
import VueAxios from 'vue-axios'
 

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
		
		Vue.axios.defaults.baseURL="http://localhost:9080/finance/";
		
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
	            Vue.prototype.$notify.error('无访问权限')
	            break
	          case 402:
	            Vue.prototype.$notify.error('没登录')
	            break
	          default:
	            Vue.prototype.$notify.error('访问服务器错误')
	        }
	      } else {
	        Vue.prototype.$notify.error('访问服务器错误')
	      }
	      console.error(error)
	      // Do something with response error
	      return Promise.reject(error)
	    })
		
		
	}
}
