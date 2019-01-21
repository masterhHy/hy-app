

export default {
  install: function (Vue, Router) {
    // 设置vue原型链
    Vue.prototype.$utils = {
    	//确认方法
      check (param,callback) {
      	var msg='<div style="font-size:16px;">'+param.msg||""+'<div>';
        Vue.prototype.$msgbox({
          title: param.title||'提示',
          message: msg,
          dangerouslyUseHTMLString:true,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                callback(done);
              }, 3000);
            } else {
              done();
            }
          },
          callback:(action, instance)=>{
          	setTimeout(() => {
                instance.confirmButtonLoading = false;
            }, 300);
          }
        })
      },
      success(param){
      	if(!param){
      		param={};
      	}
      	 Vue.prototype.$notify({
          title: param.title||"提示",
          message: param.msg||"操作成功!",
          type: 'success'
        });
      },
      error(param){
      	if(!param){
      		param={};
      	}
      	 Vue.prototype.$alert(param.msg||"操作失败!", param.title||"提示", {
          confirmButtonText: '确定',
        });
      }
    }
  }
}
