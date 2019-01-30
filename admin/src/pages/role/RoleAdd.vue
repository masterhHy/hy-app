<template lang="html">
  <el-dialog :title="formData.id?$t('constant.role.EDIT_ROLE'):$t('constant.role.ADD_ROLE')" :visible.sync="addShow" @close="cancle">
    <el-form ref="addForm" :model="formData" label-width="200px" :rules="formRules" :inline="true">
      <el-row>
        <el-col :span="12">
          <el-form-item  :label="$t('constant.role.ROLE_NAME')" prop="name">
            <el-input v-model="formData.name" :placeholder="$t('constant.role.ROLE_NAME_PLACEHOLDER')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
        	<el-form-item :label="$t('constant.role.ROLE_IS_ENABLE')">
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
        <el-col :span="4">
        	{{$t('constant.role.AUTHORITY_SET')}}
        </el-col>
        <el-col :span="20">
        	<el-tree
					  :data="treeData"
					  show-checkbox
					  node-key="id"
					  ref="tree"
					  check-strictly
					  highlight-current
					  :default-checked-keys="treeSelect"
					  :props="defaultProps">
					</el-tree>
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
			        name: "",
			        isEnable: "Y",
			        auth:"",
		      };
		    },
		}
	},
  data () {
  	let self=this; 
    return {
      // 表单验证
      formRules: {
        name: [
          { required: true, message: self.$t('constant.role.ROLE_NAME_PLACEHOLDER'), trigger: 'blur' },
        ]
      },
      addShow: false,
      addLoading: false,
      treeData:[],
      treeLoading:false,
      defaultProps: {
	      label:"name",
    		children:"children"
	    },
	    treeSelect:[],
    }
  },
  created(){
  	this.getTreeData();
  },
  methods: {
  	cancle(){
  		this.$emit("update:show",false);
  	},
    save() {
    	this.formData.auth=this.$refs.tree.getCheckedKeys().join(",");
      var self = this
      // 校验表单
      self.$refs.addForm.validate(result => {
        if (result) {
        	self.addLoading = true
          self.axios.post("/client/addOrUpdateRole", self.formData).then(res => {
          		this.$emit("update:show",false);
          		self.addLoading = false
              if (res.status) {
                self.$notify.success(self.$t('constant.role.SAVE_ROLE_SUCCESS_NOTIFY'))
                // 触发事件
                self.$emit('success')
              } else {
                self.$notify.error(self.$t('constant.role.SAVE_ROLE_FAILED_NOTIFY'))
              }
            })
        } 
      })
    },
    getTreeData(){
  		this.treeLoading=true;
	    this.axios.get("/user/getALLAuth").then(res=>{
	    	this.treeLoading=false;
	    	if(res.status){
	    		this.treeData=res.data;
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
  	},
  	'formData.auth'(){
  		if(this.$refs.tree){
  			this.$refs.tree.setCheckedKeys(this.formData.auth.split(","),true);
  		}else{
  			this.treeSelect=this.formData.auth.split(",");
  		}
  	}
  }
}
</script>
