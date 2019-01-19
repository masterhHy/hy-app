<template lang="html">
  <el-dialog :title="formData.id?$t('constant.module.EDIT_MODULE'):$t('constant.module.ADD_MODULE')" :visible.sync="show">
    <el-form ref="moduleAddForm" :model="formData" label-width="160px" :rules="formRules" :inline="true">
      <el-row>
          <el-col :span="12">
          	
            <el-form-item :label="$t('constant.module.SYSTEM_NAME')" v-if="projectName==''">
              <el-input v-model="formData.user" placeholder="请输入应用名字(applicationName)"></el-input>
            </el-form-item>
            <el-form-item :label="$t('constant.module.SYSTEM_NAME')" v-if="projectName!=''">
              {{ projectName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('constant.module.PARENT_MODULE')">
              {{ parentName }}
            </el-form-item>
          </el-col>
        </el-row>
        <!--<el-row>
          <el-col :span="12">
            <el-form-item prop="moduleCode" :label="$t('constant.module.MODULE_CODE')">
              <el-input v-model="form.moduleCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="moduleName" :label="$t('constant.module.MODULE_NAME')">
              <el-input v-model="form.moduleName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="modulePath" :label="$t('constant.module.MODULE_PATH')">
              <el-input v-model="form.modulePath"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('constant.module.ICON')">
              <el-input v-model="form.moduleIcon"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
           <el-col :span="12">
            <el-form-item :label="$t('constant.module.ACTIVE')">
              <el-switch
                v-model="form.active"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-text="$t('constant.TRUE')"
                :inactive-text="$t('constant.FALSE')"
                :active-value="1"
                :inactive-value="0">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('constant.module.SORT')">
              <el-input-number v-model="form.sort" :min="0" :max="200"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('constant.module.IS_MENU')">
              <el-switch
                v-model="form.isOperating"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-text="$t('constant.TRUE')"
                :inactive-text="$t('constant.FALSE')"
                :active-value="0"
                :inactive-value="1">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="form.isOperating">
            <el-form-item :label="$t('constant.module.HTTP_METHOD')">
              <el-select v-model="form.httpMethod" :placeholder="$t('constant.module.SELECT')">
                <el-option
                  v-for="item in options"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>-->
   </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addModuleShow = false">{{$t('button.CANCEL')}}</el-button>
      <el-button type="primary" @click="saveModule" :loading="addModuleLoading">{{$t('button.SURE')}}</el-button>
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
	      };
	    },
		}
	},
  data () {
   return {
   	
   };
  },
  methods: {
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
    saveModule () {
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
  }
}
</script>
