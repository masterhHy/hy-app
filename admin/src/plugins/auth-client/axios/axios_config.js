import axios from 'axios'
import VueAxios from 'vue-axios'
import Token from '../token/token'
import Config from '../utils/config'
import _this from '@/main.js'

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
	    // 配置客户端用户唯一标识
	    Vue.axios.defaults.headers.common['Client-Identify'] = Vue.prototype.$auth.indentify();
	    
	    // http 拦截器
	    Vue.axios.interceptors.response.use(function (response) {
	      // Do something with response data
	      if(!response.code==500){
	      	Vue.prototype.$notify.error("后台出错了");
	      }
	      return response.data
	    }, function (error) {
	      if (error && error.response) {
	        switch (error.response.status) {
	          case 403:
	          	Vue.prototype.$notify.error("没有访问权限");
	            break
	          case 402:
	          	let item={};
	          	
	            if(_this){
	            	let params = _this.$route.params;
	            	if(JSON.stringify(params)!="{}"){
	            		//通过params传参
	            		item.type=1;
	            		item.params=params;
	            		item.tar=_this.$route.name;
	            	}else{
	            		item.tar=_this.$route.path;
	            		item.params=_this.$route.query;
	            		item.type=0;
	            	}
	            	if(Token.token()){
	            		Token.deleteToken();
	            	}
	            	/*if(!window.localStorage.getItem("targetPage")){
	            		window.localStorage.setItem("targetPage",JSON.stringify(item));
	            		window.location.href = Config.authUrl + '/oauth/authorize?response_type=code&client_id=' + Config.appId + '&redirect_uri=' +Config.baseUrl
	            	}*/
	            	
	            }else{
	            	console.error("请在main.js 把vue实例输出，以免后续跳转登录参后回不到原来页面")
	            }
	            
	            break
	          case 401:
	          	Vue.prototype.$notify.error("登陆过期");//修改密码
	          	setTimeout(function(){
	          		Token.deleteToken();
	          	},500)
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
