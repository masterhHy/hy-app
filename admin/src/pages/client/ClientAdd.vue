<template lang="html">
  <el-dialog :title="isEdit?$t('constant.client.EDIT_CLIENT'):$t('constant.client.ADD_CLIENT')" :visible.sync="addAppShow" @close="cancle">
    <el-form ref="appAddForm" :model="formData" label-width="200px" :rules="formRules" :inline="true">
      <el-row>
        <el-col :span="12">
          <el-form-item v-if="!isEdit" :label="$t('constant.client.CLIENT_ID')" prop="clientId">
            <el-input v-model="formData.clientId" :placeholder="$t('constant.client.CLIENT_ID_PLACEHOLDER')"></el-input>
          </el-form-item>
           <el-form-item v-if="isEdit" :label="$t('constant.client.CLIENT_ID')" >
            {{formData.clientId}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('constant.client.CLIENT_SECRET')" prop="clientSecret">
            <el-input v-model="formData.clientSecret" :placeholder="$t('constant.client.CLIENT_SECRET_PLACEHOLDER')"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('constant.client.AUTHORIZED_GRANT_TYPE')">
              <el-select v-model="authorizedGrantTypes" multiple :placeholder="$t('constant.client.PLACEHOLDER')">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item :label="$t('constant.client.TOKEN_VALIDITY')">
              <el-input-number v-model="formData.accessTokenValidity" :min="10000" ></el-input-number>
            </el-form-item>
        </el-col>
      </el-row>
      <el-row>
      	<el-col :span="12">
            <el-form-item :label="$t('constant.client.REDIRECT_URI')">
             <el-input v-model="formData.webServerRedirectUri" :placeholder="$t('constant.client.CLIENT_REDIRECT_URI_PLACEHOLDER')"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item :label="$t('constant.client.AUTO_APPROVE')">
              <el-switch
                v-model="formData.autoapprove"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-text="$t('constant.TRUE')"
                :inactive-text="$t('constant.FALSE')"
                active-value="true"
                inactive-value="false">
              </el-switch>
            </el-form-item>
        </el-col>
      </el-row>
   </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle">{{$t('button.CANCEL')}}</el-button>
      <el-button type="primary" @click="saveApp" :loading="addAppLoading">{{$t('button.SURE')}}</el-button>
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
		      	 	clientId: null,
			        clientSecret: null,
			        accessTokenValidity: 43200,
			        autoapprove: 'false',
			        authorizedGrantTypes: 'authorization_code',
			        webServerRedirectUri:''
		      };
		    },
		},
		isEdit:{
			type: Boolean,
		    default: function() {
		      return false;
		    },
		}
	},
  data () {
    var self = this
    var validateAppCode = (rule, value, callback) => {
      self.axios.post('/client/checkClientId',{clientId:value})
        .then(res => {
          if (res.status) {
            callback()
          } else {
            callback(new Error(self.$t('constant.client.CLIENT_ID_EXIST_NOTIFY')))
          }
        })
    }
    return {
      // 表单验证
      formRules: {
        clientId: [
          { required: true, message: self.$t('constant.client.CLIENT_ID_PLACEHOLDER'), trigger: 'blur' },
          { min: 3, max: 16, message: self.$t('constant.client.THREE_TO_16'), trigger: 'blur' },
          { validator: validateAppCode, trigger: 'blur' }
        ],
        clientSecret: [
          { required: true, message: self.$t('constant.client.CLIENT_SECRET_PLACEHOLDER'), trigger: 'blur' },
          { min: 3, max: 16, message: self.$t('constant.client.THREE_TO_16'), trigger: 'blur' }
        ]
      },
      addAppShow: false,
      addAppLoading: false,
      authorizedGrantTypes: ['authorization_code'],
      options: [
        {
          label: self.$t('constant.client.AUTHORIZED_CODE'),
          value: 'authorization_code'
        },
        {
          label: self.$t('constant.client.REFRESH_TOKEN'),
          value: 'refresh_token'
        },
        {
          label: self.$t('constant.client.PASSWORD'),
          value: 'password'
        },
        {
          label: self.$t('constant.client.IMPLICIT'),
          value: 'implicit'
        },
        {
          label: self.$t('constant.client.CLIENT_CREDENTIALS'),
          value: 'client_credentials'
        }
      ]
    }
  },
  created(){
  	this.formData.authorizedGrantTypes = this.authorizedGrantTypes.join(",");
  },
  methods: {
  	cancle(){
  		this.$emit("update:show",false);
  	},
    saveApp () {
      var self = this
      // 校验表单
      self.$refs.appAddForm.validate(result => {
        if (result) {
        	self.addAppLoading = true
          self.axios.post("/client/addOrUpdateClient", self.formData).then(res => {
          		this.$emit("update:show",false);
          		self.addAppLoading = false
              if (res.status) {
                self.$notify.success(self.$t('constant.client.SAVE_CLIENT_SUCCESS_NOTIFY'))
                // 触发事件
                self.$emit('success')
              } else {
                self.$notify.error(self.$t('constant.client.SAVE_CLIENT_FAILED_NOTIFY'))
              }
            })
        } 
      })
    }
  },
  watch:{
  	show(){
  		this.addAppShow=this.show;
      	if (this.$refs.appAddForm) {
	        // 重置表单
	        this.$refs.appAddForm.clearValidate()
	    }
  	},
  	authorizedGrantTypes(){
  		if(this.authorizedGrantTypes.join(",")){
  			this.formData.authorizedGrantTypes = this.authorizedGrantTypes.join(",");
  		}else{
  			this.formData.authorizedGrantTypes =null;
  		}
  	},
  	'formData.authorizedGrantTypes'(){
  		if(this.formData.authorizedGrantTypes){
  			this.authorizedGrantTypes=this.formData.authorizedGrantTypes.split(",");
  		}
  	}
  }
}
</script>
