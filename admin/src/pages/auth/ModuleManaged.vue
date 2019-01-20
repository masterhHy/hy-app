<template lang="html">
  <el-row style="margin: 20px;">
  	<!-- 左侧树-->
  	
    <el-col :span="6" v-loading="treeLoading" :element-loading-text="$t('message.LOADING')">
    	<el-row>
    		 <el-col :span="10" :offset="14">
    		 		<el-button class="m-b-sm root-btn" type="primary" round size="mini" @click="addRoot">添加根路径</el-button>
    		 </el-col>
    	</el-row>
      
      <el-tree  :data="authData" node-key="id"  @node-click="selectNode" :props="treeProps">
      	 <span class="custom-tree-node" slot-scope="{ node, data }">
	        <span class="inline-block text-overflow" style="width: 100px;">{{ node.label }}</span>
	        <span>
	          <el-button type="text" size="mini" @click.stop="addTreeNode(node.data)">
	            		新增
	          </el-button>
	          <el-button type="text" size="mini" @click.stop="removeTreeNode(node.key)">
	            		删除
	          </el-button>
	          <el-button type="text" size="mini" @click.stop="modifyTreeNode(node.data)">
	            		修改
	          </el-button>
	        </span>
      </span>
      	
      </el-tree>
    </el-col>
    
    <!--右侧表-->
    <el-col :span="17" :offset="1">
    	<hy-table url="/user/getSubAuth" :query="tableQuery">
    		<el-table-column label="权限名称" prop="name"></el-table-column>
    		<el-table-column label="项目名称" prop="projectName"></el-table-column>
    		<el-table-column label="图标" prop="icon"></el-table-column>
    		<el-table-column label="权限类型" prop="type" :formatter="(row, column, cellValue, index)=>{return cellValue==1?'菜单':'按钮'}"></el-table-column>
    		<el-table-column label="资源定位符" prop="url"></el-table-column>
    		<el-table-column label="i18n标识符" prop="signCode"></el-table-column>
    		<el-table-column label="创建时间" prop="createdDate"></el-table-column>
    	</hy-table>
    	
    </el-col>
    <!--删除模块-->
    <!--<el-dialog
      :title="$t('constant.HINT')"
      :visible.sync="deleteDialogShow"
      width="30%">
      <span>{{$t('constant.module.DELETE_MODULE_HINT')}}</span>
      <span slot="footer" class="dialog-footer">
                <el-button @click="deleteDialogShow = false">{{$t('button.CANCEL')}}</el-button>
                <el-button type="danger" :loading="deleteDialogLoading" @click="deleteDialogClick">{{$t('button.SURE')}}</el-button>
              </span>
    </el-dialog>-->
    <!--新增模块表单-->
    <module-add :show="addOrUpdateAuthShow" :formData="addOrUpdateForm" @cancle="addOrUpdateAuthShow=false" @success="getFormData"></module-add>
    <!--编辑模块表单-->
    <!--<module-edit ref="editModule" @success="reLoadTreeAndTable">-->
    </module-edit>
  </el-row>
</template>

<script>
import ModuleAdd from './ModuleAdd.vue'
export default {
  components: {
  	ModuleAdd
  },
  data () {
    return {
    	treeLoading:false,
    	addOrUpdateAuthShow:false,
    	treeProps:{
    		label:"name",
    		children:"children"
    	},
    	authData:[],
    	tableQuery:{
    		parentId:null,
    	},
    	addOrUpdateForm:{
    		id:"",
      	icon:"",
      	name:"",
      	projectName:"",
      	type:2,
      	url:"",
      	signCode:"",
      	parentName:"",
      	parentId:"",
    	}
    }
  },
  created () {
  	this.treeLoading=true;
    this.axios.get("/user/getALLAuth").then(res=>{
    	this.treeLoading=false;
    	if(res.status){
    		this.authData=res.data;
    	}
    })
  },
  methods: {
  	addTreeNode(data){
  		
  		this.addOrUpdateAuthShow=true;
  		this.addOrUpdateForm.parentName=data.name||"";
  		this.addOrUpdateForm.parentId=data.id||"";
  		this.addOrUpdateForm.projectName=data.projectName||"";
  		console.log(data);
  	},
  	removeTreeNode(id){
  		
  	},
  	modifyTreeNode(node){
  		
  	},
  	addRoot(){
  		this.addTreeNode({});
  	},
  	selectNode(nodeData){
  		this.tableQuery.parentId=nodeData.id;
  	},
  	getFormData(data){
  		console.log(data);
  	}
  }
}
</script>
<style>
	 .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    width: 100%;
  }
	
	.root-btn{
		position: relative;
		left: 20px;
	}
</style>