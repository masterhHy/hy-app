<template lang="html">
  <el-dialog :title="formData.id?$t('constant.user.EDIT_USER'):$t('constant.user.ADD_USER')" :visible.sync="addShow" @close="cancle">
    <el-form ref="addForm" :model="formData" label-width="200px" :rules="formRules" :inline="true">
      <el-row>
        <el-col :span="12">
          <el-form-item v-if="!formData.id" :label="$t('constant.user.USERNAME')" prop="username">
            <el-input v-model="formData.username" :placeholder="$t('constant.user.USERNAME_PLACEHOLDER')"></el-input>
          </el-form-item>
          <el-form-item v-if="formData.id" :label="$t('constant.user.USERNAME')" >
          	{{formData.username}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
        	<el-form-item :label="$t('constant.user.ACTIVE')">
	          <el-switch
	            v-model="formData.isEnable"
	            active-color="#13ce66"
	            inactive-color="#ff4949"
	            :active-text="$t('constant.TRUE')"
	            :inactive-text="$t('constant.FALSE')"
	            active-value="Y"
	            inactive-value="N">
	          </el-switch>
	        </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item  :label="$t('constant.user.NICKNAME')" prop="firstName">
            <el-input v-model="formData.firstName" :placeholder="$t('constant.user.NICKNAME')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
        	<el-form-item :label="$t('constant.user.GENDER')">
        		<el-radio-group v-model="formData.sex">
				      <el-radio :label="0" >{{$t('constant.user.MALE')}}</el-radio>
				      <el-radio :label="1">{{$t('constant.user.FEMALE')}}</el-radio>
				    </el-radio-group>
	        </el-form-item>
        </el-col>
      </el-row>
      
      <el-row v-if="!formData.id">
        <el-col :span="12">
          <el-form-item  :label="$t('constant.user.PASSWORD')" prop="password">
            <el-input type="password" v-model="formData.password" :placeholder="$t('constant.user.PASSWORD_PLACEHOLDER')"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="!formData.id">
      	<el-col :span="12">
          <el-form-item  :label="$t('constant.user.CHECK_PASSWORD')" prop="repassword">
            <el-input type="password" v-model="formData.repassword" :placeholder="$t('constant.user.PASSWORD_NEW_PLACEHOLDER')"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      
   </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle">{{$t('button.CANCEL')}}</el-button>
      <el-button type="primary" @click="save" :loading="addLoading">{{$t('button.SURE')}}</el-button>
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
		      	 	id: "",
			        username: "",
			        firstName:"",
			        isEnable: "Y",
			        sex:0,
			        password:"",
			        repassword:""
		      };
		    },
		}
	},
  data () {
  	let self=this;
  	let usernameValidate = (rule, value, callback) => {
      self.axios.post('/user/checkUsername',{username:value}).then(res => {
          if (res.status) {
            callback()
          } else {
            callback(new Error(self.$t('constant.user.USERNAME_EXIST_NOTIFY')))
          }
       })
    }
  	let repassValidate =(rule, value, callback) => {
      if(self.formData.password!=value){
      	callback(new Error(self.$t('constant.user.PASSWORD_NO_EQUALS_PLACEHOLDER')))
      }else{
      	 callback()
      }
    }
    return {
      // 表单验证
      formRules: {
        username: [
          { required: true, message: self.$t('constant.user.USERNAME_PLACEHOLDER'), trigger: 'blur' },
        	{ validator: usernameValidate, trigger: 'blur' }
        ],
        password:[
        	{required: true, message: self.$t('constant.user.PASSWORD_PLACEHOLDER'), trigger: 'blur'}
        ],
        repassword:[
        	{ validator: repassValidate, trigger: 'blur' }
        ]
      },
      addShow: false,
      addLoading: false,
    }
  },
  created(){
  	
  },
  methods: {
  	cancle(){
  		this.$emit("update:show",false);
  	},
    save() {
      var self = this
      // 校验表单
      self.$refs.addForm.validate(result => {
        if (result) {
        	self.addLoading = true
          self.axios.post("/user/addOrUpdateUser", self.formData).then(res => {
          		this.$emit("update:show",false);
          		self.addLoading = false
              if (res.status) {
                self.$notify.success(self.$t('constant.user.SAVE_USER_SUCCESS_NOTIFY'))
                // 触发事件
                self.$emit('success')
              } else {
                self.$notify.error(self.$t('constant.user.SAVE_USER_FAILED_NOTIFY'))
              }
            })
        } 
      })
    },
  },
  watch:{
  	show(){
  		this.addShow=this.show;
      if (this.$refs.addForm) {
	        // 重置表单
	        this.$refs.addForm.clearValidate()
	    }
  	}
  }
}
</script>
