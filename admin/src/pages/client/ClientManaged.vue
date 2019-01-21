<template lang="html">
  <div>
  <!--查尋條件-->
    <el-row>
    	<el-col :span="6">
    		<el-button class="inline-block" type="primary" icon="el-icon-add" @click="showAddDialog">{{$t('button.ADD')}}</el-button>
    	</el-col>
    	<el-col :span="18">
    		<div class="header">
		    	<el-form :inline="true" :model="tableQuery" class="demo-form-inline">
				    <el-form-item :label="$t('constant.client.CLIENT_NAME')">
				      <el-input v-model="tableQuery.clientId" :placeholder="$t('constant.client.CLIENT_NAME')"></el-input>
				    </el-form-item>
				    <el-form-item>
				      <el-button type="primary" @click="query">{{$t('button.SEARCH')}}</el-button>
				    </el-form-item>
			    </el-form>
		    </div>
    	</el-col>
    	
	    
	    
    </el-row>

		<hy-table url="/client/getClientData" :query="tableQuery" :pageSize="5">
			<el-table-column label="应用名称" prop="clientId"></el-table-column>
			<el-table-column label="token有效时间(s)" prop="accessTokenValidity"></el-table-column>
			<el-table-column label="授权类型" prop="authorizedGrantTypes">
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
			<el-table-column label="自动授权" prop="autoapprove" >
				<template slot-scope="scope">
	        <el-tag :type="scope.row.autoapprove ? 'success' : 'danger'">{{scope.row.autoapprove?'是':'否'}}</el-tag>
	      </template>
			</el-table-column>
			<el-table-column label="客户端密码" prop="clientSecret" :formatter="passFormatter"></el-table-column>
			<el-table-column label="token刷新时间" prop="refreshTokenValidity"></el-table-column>
			
			 <el-table-column
	      fixed="right"
	      label="操作"
	      width="100">
	      <template slot-scope="scope">
	        <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
	        <el-button @click="remove(scope.row)" type="text" size="small">删除</el-button>
	      </template>
	    </el-table-column>
			
		</hy-table>

    <!--删除系统-->
     <hy-confirm :title="$t('constant.HINT')" 
    	:msg="$t('constant.module.DELETE_MODULE_HINT')"
    	:show.sync="deleteDialogShow"
    	:loading="deleteDialogLoading"
    	@success="deleteDialogClick"
    	>
    </hy-confirm>
    
    <!--新增系统表单-->
    <!--<add-system ref="addSystem" @success="loadTable"></add-system>-->
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
export default {
  components: {
  	
  },
  created () {
  	
  },
  data () {
    return {
    	tableQuery:{
    		clientId:"",
    	}
    }
  },
  methods: {
    passFormatter(row, column, cellValue, index){
    	return cellValue.replace("{noop}","");
    },
    remove(row){
    	
    	this.axios.post("/client/deleteClientById",{clientId:row.clientId}).then(res=>{
    		if(res.status){
    			this.$notify.success(this.$t('constant.system.DELETE_SYSTEM_SUCCESS_NOTIFY'))
    		}else{
    			 this.$notify.error(this.$t('constant.system.DELETE_SYSTEM_FAILED_NOTIFY'))
    		}
    	})
    },
    edit(row){
    	
    },
  }
}
</script>
