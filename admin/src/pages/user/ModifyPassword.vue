<template lang="html">
  <el-dialog :title="$t('constant.user.MODIFY_PASSWORD')" :visible.sync="modifyPasswordShow" width="700px">
    <el-form ref="modifyPasswordForm" :model="form" label-width="120px" :rules="formRules" >
      <el-row>
        <el-col :span="24">
          <el-form-item :label="$t('constant.user.PASSWORD')" prop="oldPassword">
            <el-input type="password" v-model="form.oldPassword" :placeholder="$t('constant.user.PASSWORD_PLACEHOLDER')"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item :label="$t('constant.user.NEW_PASSWORD')" prop="newPassword">
            <el-input type="password" v-model="form.newPassword" :placeholder="$t('constant.user.PASSWORD_NEW_PLACEHOLDER')"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item :label="$t('constant.user.CHECK_PASSWORD')" prop="checkPassword">
            <el-input type="password" v-model="form.checkPassword" :placeholder="$t('constant.user.PASSWORD_AGAIN_PLACEHOLDER')"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="modifyPasswordShow = false">{{$t('button.CANCEL')}}</el-button>
      <el-button type="primary" @click="modifyPassword" :loading="modifyPasswordLoading">{{$t('button.SURE')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data () {
    var self = this
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(self.$t('constant.user.PASSWORD_NEW_PLACEHOLDER')))
      } else {
        if (self.form.checkPassword !== '') {
          self.$refs.modifyPasswordForm.validateField('checkPassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(self.$t('constant.user.PASSWORD_AGAIN_PLACEHOLDER')))
      } else if (value !== self.form.newPassword) {
        callback(new Error(self.$t('constant.user.PASSWORD_NO_EQUALS_PLACEHOLDER')))
      } else {
        callback()
      }
    }
    return {
      form: {
        newPassword: null,
        checkPassword: null,
        oldPassword:null,
      },
      // 表单验证
      formRules: {
        newPassword: [
          { required: true, message: self.$t('constant.user.PASSWORD_NEW_PLACEHOLDER'), trigger: 'blur' },
          { min: 6, max: 16, message: self.$t('constant.user.SEX_TO_16'), trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, message: self.$t('constant.user.PASSWORD_AGAIN_PLACEHOLDER'), trigger: 'blur' },
          { min: 6, max: 16, message: self.$t('constant.user.SEX_TO_16'), trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        oldPassword:[
        	{required: true, message: self.$t('constant.user.PASSWORD_PLACEHOLDER'), trigger: 'blur' }
        ]
      },
      modifyPasswordShow: false,
      modifyPasswordLoading: false,
      user: null
    }
  },
  methods: {
    show (data, locale) {
      var self = this
      if (this.$refs.modifyPasswordForm) {
        // 重置表单
        self.$refs.modifyPasswordForm.resetFields()
      }
      this.user = data
      this.modifyPasswordShow = true
    },
    modifyPassword () {
      var self = this
      self.modifyPasswordLoading = true
      // 校验表单
      self.$refs.modifyPasswordForm.validate(result => {
        
        if (result) {
          this.axios.post("/user/modifyPassword",{newPassword:this.form.newPassword,oldPassword:this.form.oldPassword}).then(res=>{
          	if(res.status){
          		self.$notify.success(self.$t('constant.user.MODIFY_PASSWORD_SUCCESS_NOTIFY'))
          		this.modifyPasswordShow=false;
          	}else{
          		self.$notify.success(res.message);
          	}
          	self.modifyPasswordLoading = false;
          })
          
          
        } else {
          self.modifyPasswordLoading = false
        }
      })
    }
  }
}
</script>
