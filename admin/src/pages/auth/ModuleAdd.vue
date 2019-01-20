<template lang="html">
  <el-dialog :title="formData.id?$t('constant.module.EDIT_MODULE'):$t('constant.module.ADD_MODULE')" :visible.sync="showModuel" @close="cancle">
    <el-form ref="moduleAddForm" :model="formData" label-width="100px" :rules="formRules" :inline="true">
      <el-row>
          <el-col :span="12">
          	
            <el-form-item :label="$t('constant.module.SYSTEM_NAME')" v-if="!formData.projectName">
              <el-input v-model="formData.user" placeholder="请输入应用名字(applicationName)"></el-input>
            </el-form-item>
            <el-form-item :label="$t('constant.module.SYSTEM_NAME')" v-if="formData.projectName">
              {{ formData.projectName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('constant.module.PARENT_MODULE')">
              {{ formData.parentName }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="name" :label="$t('constant.module.MODULE_NAME')">
              <el-input v-model="formData.name" placeholder="请输入权限名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="icon" :label="$t('constant.module.ICON')">
              <el-input v-model="formData.icon" placeholder="请输入图标样式"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="name" :label="$t('constant.module.MODULE_PATH')">
              <el-input v-model="formData.url" placeholder="请输入URL"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="icon" :label="$t('constant.module.MODULE_I18N')">
              <el-input v-model="formData.signCode" placeholder="请输入i18n标识符"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('constant.module.AUTH_TYPE')">
					    <el-radio-group v-model="formData.type">
					      <el-radio :label="1">菜单权限</el-radio>
					      <el-radio :label="2">按钮权限</el-radio>
					    </el-radio-group>
					  </el-form-item>
          </el-col>
        </el-row>
        
   </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="showModuel=false">{{$t('button.CANCEL')}}</el-button>
      <el-button type="primary" @click="saveOrUpdate" :loading="addModuleLoading">{{$t('button.SURE')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
	props:{
		show:{
			type: Boolean,
	    default: function() {
	      return false;
	    },
		},
		formData:{
			type: Object,
	    default: function() {
	      return {
	      	id:"",
	      	icon:"",
	      	name:"",
	      	projectName:"",
	      	type:2,
	      	url:"",
	      	signCode:"",
	      	parentName:"",
	      	parentId:"",
	      };
	    },
		}
	},
  data () {
   return {
   		formRules:{
   			
   		},
   		addModuleLoading:false,
   		showModuel:false,
   };
  },
  methods: {
  	cancle(){
  		this.$emit("cancle");
  	},
    show2 (data) {
      var self = this
      if (this.$refs.moduleAddForm) {
        // 重置表单
        self.$refs.moduleAddForm.resetFields()
      }
      this.form.moduleCode = null
      this.form.moduleName = null
      this.form.modulePath = null
      this.form.parentId = data.moduleId
      this.form.moduleIcon = null
      this.form.httpMethod = null
      this.form.isOperating = 0
      this.form.sort = 0
      this.form.systemId = data.systemId
      this.form.active = 1
      this.addModuleShow = true

      this.systemId = data.systemId
      this.systemName = data.systemName
      this.moduleId = data.moduleId
      this.moduleName = data.moduleName
    },
    saveOrUpdate () {
      var self = this
      // 校验表单
      self.$refs.moduleAddForm.validate(result => {
        self.addModuleLoading = true
        if (result) {
          /*self.$http.post(`${DataMainApi}/module`, self.form)
            .then(res => {
              if (res.data.code === Status.success) {
                self.$notify.success(self.$t('constant.module.SAVE_MODULE_SUCCESS_NOTIFY'))
                self.addModuleShow = false
                // 触发事件
                self.$emit('success')
              } else {
                self.$notify.error(self.$t('constant.module.SAVE_MODULE_FAILED_NOTIFY'))
              }
              self.addModuleLoading = false
            })
            .catch(() => {
              self.addModuleLoading = false
            })*/
        } else {
          self.addModuleLoading = false
        }
      })
    }
  },
  watch:{
  	show(){
  		this.showModuel=this.show;
  	}
  }
}
</script>
