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
				    <el-form-item :label="$t('constant.client.CLIENT_NAME')">
				      <el-input v-model="tableQuery.clientId" :placeholder="$t('constant.client.CLIENT_NAME')"></el-input>
				    </el-form-item>
				    <!--<el-form-item>
				      <el-button type="primary" @click="query">{{$t('button.SEARCH')}}</el-button>
				    </el-form-item>-->
			    </el-form>
		    </div>
    	</el-col>
    	
	    
	    
    </el-row>

		<hy-table url="/client/getClientData" :query="tableQuery" :pageSize="5" ref="table">
			<el-table-column :label="$t('constant.client.CLIENT_NAME')" prop="clientId"></el-table-column>
			<el-table-column :label="$t('constant.client.TOKEN_VALIDITY')"  prop="accessTokenValidity"></el-table-column>
			<el-table-column :label="$t('constant.client.AUTHORIZED_GRANT_TYPE')" prop="authorizedGrantTypes">
				<template slot-scope="scope">
					<div class="inline-block m-r-xs m-b-xs" v-for="item in scope.row.authorizedGrantTypesArr" >
						<el-tag v-if="item=='authorization_code'" size="small">authorization_code</el-tag>
						<el-tag v-if="item=='password'" size="small">password</el-tag>
						<el-tag v-if="item=='client_credentials'" size="small">client_credentials</el-tag>
						<el-tag v-if="item=='refresh_token'" size="small">refresh_token</el-tag>
						<el-tag v-if="item=='implicit'" size="small">implicit</el-tag>
					</div>
	      </template>
			</el-table-column>
			<el-table-column :label="$t('constant.client.AUTO_APPROVE')" prop="autoapprove" >
				<template slot-scope="scope">
	        <el-tag :type="scope.row.autoapprove ? 'success' : 'danger'">{{scope.row.autoapprove?'是':'否'}}</el-tag>
	      </template>
			</el-table-column>
			<el-table-column :label="$t('constant.client.CLIENT_SECRET')" prop="clientSecret" :formatter="passFormatter"></el-table-column>
			<el-table-column :label="$t('constant.client.REDIRECT_URI')" prop="webServerRedirectUri" ></el-table-column>
				
			<!--<el-table-column label="token刷新时间" prop="refreshTokenValidity"></el-table-column>-->
			
			 <el-table-column
	      fixed="right"
	      :label="$t('constant.OPERATE')"
	      width="100">
	      <template slot-scope="scope">
	        <el-button @click="edit(scope.row)" type="text" size="small">{{$t('button.EDIT')}}</el-button>
	        <el-button @click="remove(scope.row)" type="text" size="small">{{$t('button.DELETE')}}</el-button>
	      </template>
	    </el-table-column>
			
		</hy-table>
	
    
    <!--新增系统表单-->
    <client-add ref="addSystem" @success="loadTable" :formData="formData" :show.sync="showAddDialog" :isEdit="isEdit"></client-add>
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
import ClientAdd from '@/pages/client/ClientAdd'
export default {
  components: {
  	ClientAdd
  },
  data () {
  	let formData = this.getFormData();
    return {
    	tableQuery:{
    		clientId:"",
    	},
    	showAddDialog:false,
    	formData:formData,
    	isEdit:false,
    }
  },
  methods: {
    passFormatter(row, column, cellValue, index){
    	return cellValue.replace("{noop}","");
    },
    remove(row){
    	this.$utils.check({title:this.$t("constant.HINT"),msg:this.$t("constant.client.DELETE_CLIENT_HINT")},done=>{
    		this.axios.post("/client/deleteClientById",{clientId:row.clientId}).then(res=>{
	    		if(res.status){
	    			this.$notify.success(this.$t('constant.system.DELETE_SYSTEM_SUCCESS_NOTIFY'))
	    		}else{
	    			 this.$notify.error(this.$t('constant.system.DELETE_SYSTEM_FAILED_NOTIFY'))
	    		}
	    		done();
	    		this.loadTable();
	    	})
    	})
    	
    },
    edit(row){
    	this.isEdit=true;
    	this.showAddDialog=true;
    	this.formData.clientId=row.clientId;
    	this.formData.clientSecret=row.clientSecret.replace("{noop}","");
    	this.formData.accessTokenValidity=row.accessTokenValidity;
    	this.formData.autoapprove=row.autoapprove;
    	this.formData.authorizedGrantTypes=row.authorizedGrantTypes;
    	this.formData.webServerRedirectUri=row.webServerRedirectUri;
    },
    add(){
    	this.isEdit=false;
    	this.showAddDialog=true;
    	this.formData = this.getFormData();
    },
    loadTable(){
    	this.$refs.table.reload();
    },
    getFormData(){
    	return {
    			clientId: null,
	        clientSecret: null,
	        accessTokenValidity: 43200,
	        autoapprove: 'false',
	        authorizedGrantTypes: 'authorization_code',
	        webServerRedirectUri:'',
    	}
    }
  }
}
</script>
