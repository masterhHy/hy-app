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
	    <el-table-column :label="$t('constant.role.ROLE_IS_ENABLE')" prop="isEnable"></el-table-column>
	    <el-table-column :label="$t('constant.module.CREATE_TIME')" prop="createTime"></el-table-column>
	    
	    
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
    

    <!--新增角色表单-->
   <!-- <add-role ref="addRole" @success="loadTable"></add-role>-->
    <!--设置角色权限-->
    <!--<role-module-setting ref="roleSetting"></role-module-setting>-->
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
    		name:"",
    	},
    }
  },
  methods: {
  	add(){
  		
  	},
    // 删除角色
    deleteDialogClick () {
    	
    },
    refreshTable(){
    	this.$refs.table.reload();
    },
  }
}
</script>
