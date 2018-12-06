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
		      	var tarUrl=window.localStorage.getItem("targetPage");
		        if(tarUrl){
		        	window.localStorage.removeItem("targetPage");
		        	next(tarUrl);
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
		        	next()
		        }
		      }
    })
  }
}
