<template lang="html">
  <div>
  <!--查尋條件-->
    
    <el-row>
    	<el-col :span="6">
    		<el-button class="inline-block" type="primary" icon="el-icon-add" @click="add">{{$t('button.ADD')}}</el-button>
    	</el-col>
    	<el-col :span="18">
    		<div class="header">
		    	<el-form :inline="true" :model="tableQuery" class="demo-form-inline">
				    <el-form-item :label="$t('constant.role.ROLE_NAME')">
				      <el-input v-model="tableQuery.name" :placeholder="$t('constant.role.ROLE_NAME')"></el-input>
				    </el-form-item>
			    </el-form>
		    </div>
    	</el-col>
    </el-row>
    
    <hy-table url="/role/getRoleData" :query="tableQuery" ref="table">
			<el-table-column :label="$t('constant.role.ROLE_NAME')" prop="name"></el-table-column>
	    <el-table-column :label="$t('constant.role.ROLE_IS_ENABLE')" prop="isEnable">
	    	<template slot-scope="scope">
	        <el-tag :type="scope.row.isEnable=='Y' ? 'success' : 'danger'">{{scope.row.isEnable=='Y'?'是':'否'}}</el-tag>
	      </template>
	    </el-table-column>
	    <el-table-column :label="$t('constant.module.CREATE_TIME')" prop="createTime"></el-table-column>
	    
	    
			<el-table-column
	      fixed="right"
	      :label="$t('constant.OPERATE')"
	      width="200">
	      <template slot-scope="scope">
	        <el-button @click="edit(scope.row)" type="text" size="small">{{$t('button.EDIT')}}</el-button>
	        <el-button @click="addUser(scope.row)" type="text" size="small">{{$t('constant.role.ADD_USER')}}</el-button>
	        <el-button @click="remove(scope.row)" type="text" size="small">{{$t('button.DELETE')}}</el-button>
	      </template>
	    </el-table-column>
			
		</hy-table>
    
    <el-dialog title="添加用户到角色" :visible.sync="addUserDialog" >
    	<el-row>
    		<el-col :span="24">
    			<el-form :inline="true" class="demo-form-inline">
				    <el-form-item :label="$t('constant.user.USERNAME')">
				      <el-input v-model="userTableQuery.username" :placeholder="$t('constant.user.USERNAME_PLACEHOLDER')"></el-input>
				    </el-form-item>
			    </el-form>
    		</el-col>
    	</el-row>
    	
	  	<hy-table url="/user/getUserData" :query="userTableQuery" @selection-change="handleSelectionChange" :checkBox="true" :pageSize="5" >
				<el-table-column
		      type="selection"
		      width="55">
		    </el-table-column>
		    <el-table-column :label="$t('constant.user.USERNAME')" prop="username"></el-table-column>
		    <el-table-column :label="$t('constant.user.ACTIVE')" prop="isEnable">
		    	<template slot-scope="scope">
		        <el-tag :type="scope.row.isEnable=='Y' ? 'success' : 'danger'">{{scope.row.isEnable=='Y'?'是':'否'}}</el-tag>
		      </template>
		    </el-table-column>
			</hy-table>
		</el-dialog>

    <!--新增角色表单-->
    <role-add ref="addRole" @success="refreshTable" :formData="formData" :show.sync="showAddDialog" ></role-add>
  </div>
</template>
<style scoped="scoped">
	.header .el-form-item{
		margin-bottom: 0px;
	}
	.header{
		text-align: right;
	}
</style>
<script>
import RoleAdd from '@/pages/role/RoleAdd'
export default {
  components: {
  	RoleAdd
  },
  created () {
  	
  },
  data () {
  	let formData =this.getFormData();
    return {
    	tableQuery:{
    		name:"",
    	},
    	showAddDialog:false,
    	formData:formData,
    	addUserDialog:false,
    	userTableQuery:{
    		username:""
    	},
    	selectUser:[],
    }
  },
  methods: {
  	add(){
  		this.showAddDialog=true;
  		this.formData=this.getFormData();
  	},
  	addUser(row){
  		this.addUserDialog=true;
  	},
  	handleSelectionChange(val){
  		this.selectUser=val;
  	},
  	edit(row){
  		let auth ="";
  		for(let ix in row.auth){
  			auth +=(row.auth[ix].id+",");
  		}
  		if(auth){
  			auth= auth.substring(0,auth.length-1);
  		}
  		this.formData.auth=auth;
  		this.formData.id=row.id;
  		this.formData.name=row.name;
  		this.formData.isEnable=row.isEnable;
  		this.showAddDialog=true;
  	},
    // 删除角色
    remove (row) {
    	this.$utils.check({title:this.$t("constant.HINT"),msg:this.$t("constant.role.DELETE_ROLE_HINT")},done=>{
    		this.axios.post("/role/deleteRoleById",{id:row.id}).then(res=>{
	    		if(res.status){
	    			this.$notify.success(this.$t('constant.role.DELETE_ROLE_SUCCESS_NOTIFY'))
	    		}else{
	    			 this.$notify.error(this.$t('constant.role.DELETE_ROLE_FAILED_NOTIFY'))
	    		}
	    		done();
	    		this.refreshTable();
	    	})
    	})
    },
    refreshTable(){
    	this.$refs.table.reload();
    },
    getFormData(){
    	return {
    			id: "",
	        name: "",
	        isEnable: "Y",
	        auth:"",
    	}
    },
    
  }
}
</script>
