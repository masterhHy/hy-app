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
				    <el-form-item :label="$t('constant.user.USERNAME')">
				      <el-input v-model="tableQuery.username" :placeholder="$t('constant.user.USERNAME_PLACEHOLDER')"></el-input>
				    </el-form-item>
			    </el-form>
		    </div>
    	</el-col>
    </el-row>
    
    <hy-table url="/user/getUserData" :query="tableQuery" ref="table">
    	
			<el-table-column :label="$t('constant.user.USERNAME')" prop="username"></el-table-column>
			<el-table-column :label="$t('constant.user.NICKNAME')" prop="firstName"></el-table-column>
	    <el-table-column :label="$t('constant.user.GENDER')" prop="sex">
	    	<template slot-scope="scope">
	        <el-tag :type="scope.row.sex==0 ? 'success' : 'danger'">{{scope.row.sex==0?'男':'女'}}</el-tag>
	      </template>
	    </el-table-column>
	    <el-table-column :label="$t('constant.user.ACTIVE')" prop="isEnable">
	    	<template slot-scope="scope">
	        <el-tag :type="scope.row.isEnable=='Y' ? 'success' : 'danger'">{{scope.row.isEnable=='Y'?'是':'否'}}</el-tag>
	      </template>
	    </el-table-column>
	    <el-table-column :label="$t('constant.user.REGISTER_SOURCE')" prop="registerSource">
	    	<template slot-scope="scope">
	    		<el-tag v-if="scope.row.registerSource==0" type="danger">系统注册</el-tag>
	        <el-tag v-if="scope.row.registerSource==1" type="success">手机注册</el-tag>
	        <el-tag v-if="scope.row.registerSource==2" type="info">微信注册</el-tag>
	      </template>
	    </el-table-column>
	    
			<el-table-column
	      fixed="right"
	      :label="$t('constant.OPERATE')"
	      width="270">
	      <template slot-scope="scope">
	        <el-button @click="edit(scope.row)" type="text" size="small">{{$t('button.EDIT')}}</el-button>
	        <el-button @click="addRole(scope.row)" type="text" size="small">{{$t('constant.user.ADD_ROLE')}}</el-button>
	        <el-button @click="delRole(scope.row)" type="text" size="small">{{$t('constant.user.DEL_ROLE')}}</el-button>
	        <el-button @click="remove(scope.row)" type="text" size="small">{{$t('button.DELETE')}}</el-button>
	      </template>
	    </el-table-column>
		</hy-table>
    
    <el-dialog :title="addRoleForm?'添加角色到用户':'从用户中移除角色'" :visible.sync="addRoleDialog" >
    	<el-row>
    		<el-col :span="24">
    			<el-form :inline="true" class="demo-form-inline">
				    <el-form-item :label="$t('constant.role.ROLE_NAME')">
				      <el-input v-model="roleTableQuery.name" :placeholder="$t('constant.role.ROLE_NAME_PLACEHOLDER')"></el-input>
				    </el-form-item>
			    </el-form>
    		</el-col>
    	</el-row>
    	
	  	<hy-table url="/user/getUserRoleData" :query="roleTableQuery" @selection-change="handleSelectionChange" :checkBox="true" :pageSize="5" ref="roleTable" >
				<el-table-column
		      type="selection"
		      width="55">
		    </el-table-column>
		    <el-table-column :label="$t('constant.role.ROLE_NAME')" prop="name"></el-table-column>
			</hy-table>
			 <div slot="footer" class="dialog-footer">
		      <el-button @click="addRoleDialog=false">{{$t('button.CANCEL')}}</el-button>
		      <el-button type="primary" @click="submitUser" :loading="selectRoleLoading">{{$t('button.SURE')}}</el-button>
		    </div>
		</el-dialog>

    <!--新增角色表单-->
    <user-add  @success="refreshTable" :formData="formData" :show.sync="showAddDialog" ></user-add>
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
import UserAdd from '@/pages/user/UserAdd'
export default {
  components: {
  	UserAdd
  },
  created () {
  	
  },
  data () {
  	let formData =this.getFormData();
    return {
    	tableQuery:{
    		username:"",
    	},
    	showAddDialog:false,
    	formData:formData,
    	
    	addRoleDialog:false,
    	roleTableQuery:{
    		name:"",
    		id:"",
    		hisRole:true
    	},
    	selectRole:[],
    	selectRoleLoading:false,
    	addRoleForm:true,//判断进行那个操作 添加或则删除
    }
  },
  methods: {
  	add(){
  		this.showAddDialog=true;
  		this.formData=this.getFormData();
  	},
  	addRole(row){
  		this.roleTableQuery.id=row.id;
  		this.roleTableQuery.hisRole=false;
  		this.addRoleForm=true;
  		this.addRoleDialog=true;
  	},
  	delRole(row){
  		this.roleTableQuery.id=row.id;
  		this.roleTableQuery.hisRole=true;
  		this.addRoleForm=false;
  		this.addRoleDialog=true;
  	},
  	submitUser(){
  		
  		let roleIds="";
  		for(let ix in this.selectRole){
  			roleIds +=(this.selectRole[ix].id+",");
  		}
  		if(roleIds){
  			this.selectRoleLoading=true;
  			roleIds= roleIds.substring(0,roleIds.length-1);
  			if(this.addRoleForm){
  				this.axios.post("/user/addRoleoUser",{roleIds:roleIds,id:this.roleTableQuery.id}).then(res=>{
		  			this.selectRoleLoading=false;
		  			if(res.status){
		  				this.$notify.success("添加成功");
		  				this.$refs.roleTable.reload();
		  				this.addRoleDialog=false;
		  			}
		  			
		  		})
	  		}else{
	  			this.axios.post("/user/deleteRoleFromUser",{roleIds:roleIds,id:this.roleTableQuery.id}).then(res=>{
		  			this.selectRoleLoading=false;
		  			if(res.status){
		  				this.$notify.success("成功移除");
		  				this.$refs.roleTable.reload();
		  				this.addRoleDialog=false;
		  			}
		  			
		  		})
	  		}
  			
  		}else{
  			this.$notify.error("请选择用户");
  		}
  		
  		
  	},
  	handleSelectionChange(val){
  		this.selectRole=val;
  	},
  	edit(row){
  		this.formData.id=row.id;
  		this.formData.username=row.username;
  		this.formData.isEnable=row.isEnable;
  		this.formData.firstName=row.firstName;
  		this.formData.sex=row.sex||0;
  		this.formData.password="";
  		this.showAddDialog=true;
  	},
    // 删除角色
    remove (row) {
    	this.$utils.check({title:this.$t("constant.HINT"),msg:this.$t("constant.user.DELETE_USER_HINT")},done=>{
    		this.axios.post("/user/deleteUserById",{id:row.id}).then(res=>{
	    		if(res.status){
	    			this.$notify.success(this.$t('constant.user.DELETE_USER_SUCCESS_NOTIFY'))
	    		}else{
	    			 this.$notify.error(this.$t('constant.user.DELETE_USER_FAILED_NOTIFY'))
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
	        username: "",
	        firstName:"",
	        isEnable: "Y",
	        sex:0,
	        password:""
    	}
    },
    
  }
}
</script>
