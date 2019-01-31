

export default {
  install: function (Vue, Router) {
    // 设置vue原型链
    Vue.prototype.$utils = {
    	confirm(param,callback){
    		var msg='<p style="text-align:center;">'+param.msg||""+'</p>';
    		Vue.$vux.confirm.show({
	  			title:param.title||"温馨提示",
	  			content:msg,
					onCancel () {
					},
					onConfirm () {
						callback();
					}
				})
    	}
    }
  }
}
