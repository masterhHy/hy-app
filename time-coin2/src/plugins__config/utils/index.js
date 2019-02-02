import moment from 'moment'

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
    	},
    	formatDate(day){//格式化时间
    		if(day instanceof Date){
    			//时间对象格式化
    			return moment(day).format("YYYY-MM-DD")
    		}else if(typeof day === "string"){
    				//只支持 02-28-2010,2019/2/8 格式转化
    				return moment(day,["MM-DD-YYYY","YYYY/M//D"]).format("YYYY-MM-DD")
    		}
    	}
    }
  }
}
