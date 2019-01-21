<template lang="html">
  <el-dialog :title="formData.id?$t('constant.module.EDIT_MODULE'):$t('constant.module.ADD_MODULE')" :visible.sync="showModuel" @close="cancle">
    <el-form ref="moduleAddForm" :model="formData" label-width="100px" :rules="formRules" :inline="true">
      <el-row>
          <el-col :span="12">
          	
            <el-form-item prop="projectName" :label="$t('constant.module.SYSTEM_NAME')" v-if="addRoot">
              <el-input v-model="formData.projectName" placeholder="请输入应用名字(applicationName)"></el-input>
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
            <el-form-item prop="url" :label="$t('constant.module.MODULE_PATH')">
              <el-input v-model="formData.url" placeholder="请输入URL"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="signCode" :label="$t('constant.module.MODULE_I18N')">
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
		addRoot:{
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
   			name:[{ required: true, message: '请输入权限名称', trigger: 'blur' }],
   			projectName:[{ required: true, message: '请输入应用名称', trigger: 'blur' }],
   			url:[{ required: true, message: '请输入唯一的url', trigger: 'blur' }],
   		},
   		addModuleLoading:false,
   		showModuel:false,
   };
  },
  methods: {
  	cancle(){
  		this.$emit("cancle");
  	},
    saveOrUpdate () {
      var self = this
      // 校验表单
      self.$refs.moduleAddForm.validate(result => {
        self.addModuleLoading = true
        if (result) {
          self.axios.post("/user/addOrUpdateAuth", self.formData)
            .then(res => {
              if (res.status) {
                self.$notify.success(self.$t('constant.module.SAVE_MODULE_SUCCESS_NOTIFY'))
                self.$emit('success')
              } else {
                self.$notify.error(self.$t('constant.module.SAVE_MODULE_FAILED_NOTIFY'))
              }
              self.addModuleLoading = false
            })
            .catch(() => {
              self.addModuleLoading = false
            })
        } else {
          self.addModuleLoading = false
        }
      })
    }
  },
  watch:{
  	show(){
  		this.showModuel=this.show;
      	if (this.$refs.moduleAddForm) {
	        // 重置表单
	        this.$refs.moduleAddForm.clearValidate()
	    }
  	}
  }
}
</script>
