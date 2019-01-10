import Url from '../utils/url'
import Token from '../token/token'
import Config from '../utils/config'

export default {
  init: function (Router) {
    Router.beforeEach((to, from, next) => {
      	// 授权获取token
		      if (Url.getParam('unique_code')) {
		        Token.accessoken(Url.getParam('code'), Url.getParam('unique_code'))
		      } else if (Url.getParam('logout') === 'yes') {
		        // 登出
		        Token.deleteToken();
		      } else {
		      	let item=window.localStorage.getItem("targetPage");
		        if(item){
		        	item = JSON.parse(item);
		        	window.localStorage.removeItem("targetPage");
		        	let tarUrl = item.tar;
		        	let params = item.params;
		        	let type = item.type;
		        	if(type==0){//显示传参
		        		next({path:tarUrl,query:params});
		        	}else if(type==1){
		        		next({name:tarUrl,params:params});
		        	}
		        	
		        }
		        // 判断是否登陆
		        if (Token.isLogin()) {
		          // 是否过期
		          if (Token.isExpires()) {
		            Token.refreshoken();
		          } else {
		            next()
		          }
		        } else {
		        	//next();
		        	//进入界面要直接登录
		        	window.location.href = Config.authUrl + '/oauth/authorize?response_type=code&client_id=' + Config.appId + '&redirect_uri=' +Config.baseUrl;
		        }
		      }
    })
  }
}
