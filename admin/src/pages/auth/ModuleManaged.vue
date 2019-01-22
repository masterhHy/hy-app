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
	          <el-button type="text" size="mini" @click.stop="addTreeNode(node,data)">
	            		{{$t('button.ADD')}}
	          </el-button>
	          <el-button type="text" size="mini" @click.stop="removeTreeNode(node.key)">
	            		{{$t('button.DELETE')}}
	          </el-button>
	          <el-button type="text" size="mini" @click.stop="modifyTreeNode(node,data)">
	            		{{$t('button.EDIT')}}
	          </el-button>
	        </span>
      </span>
      	
      </el-tree>
    </el-col>
    
    <!--右侧表-->
    <el-col :span="17" :offset="1">
    	<hy-table url="/user/getSubAuth" :query="tableQuery" >
    		<el-table-column label="权限名称" prop="name"></el-table-column>
    		<el-table-column label="项目名称" prop="projectName"></el-table-column>
    		<el-table-column label="图标" prop="icon"></el-table-column>
    		<el-table-column label="权限类型" prop="type" :formatter="(row, column, cellValue, index)=>{return cellValue==1?'菜单':'按钮'}"></el-table-column>
    		<el-table-column label="资源定位符" prop="url"></el-table-column>
    		<el-table-column label="i18n标识符" prop="signCode"></el-table-column>
    		<el-table-column label="创建时间" prop="createdDate"></el-table-column>
    	</hy-table>
    	
    </el-col>
    
    <!--新增或修改表单-->
    <module-add :show="addOrUpdateAuthShow" :formData="addOrUpdateForm" :addRoot="addRootView" @cancle="()=>{addOrUpdateAuthShow=false;addRootView=false;}" @success="addSuccess"></module-add>
    </module-edit>
  </el-row>
</template>

<script>
import moduleAdd from '@/pages/auth/ModuleAdd'
export default {
  components: {
  	moduleAdd
  },
  data () {
  	var formData =this.getFormData();
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
    	addOrUpdateForm:formData,
    	addRootView:false,
    }
  },
  created () {
  	this.getTreeData();
  },
  methods: {
  	addTreeNode(node,data){
  		this.addOrUpdateForm=this.getFormData();
  		this.addOrUpdateAuthShow=true;
  		this.addOrUpdateForm.parentName=data.name||"";
  		this.addOrUpdateForm.parentId=data.id||"";
  		this.addOrUpdateForm.projectName=data.projectName||"";
  	},
  	removeTreeNode(id){
  		this.$utils.check({title:this.$t('constant.HINT'),msg:this.$t('constant.module.DELETE_MODULE_HINT')},(done)=>{
  			this.axios.post("/user/deleteAuthById",{id:id}).then(res=>{
  				if (res.status) {
            this.$notify.success(this.$t('constant.module.DELETE_MODULE_SUCCESS_NOTIFY'))
          } else {
            this.$notify.error(this.$t('constant.module.DELETE_MODULE_FAILED_NOTIFY'))
          }
          done();
	    		this.getTreeData();
	  		})
  		})
  		
  	},
  	modifyTreeNode(node,data){
  		this.addOrUpdateAuthShow=true;
  		this.addOrUpdateForm.id=data.id;
  		this.addOrUpdateForm.icon=data.icon;
  		this.addOrUpdateForm.name=data.name;
  		this.addOrUpdateForm.type=data.type;
  		this.addOrUpdateForm.url=data.url;
  		this.addOrUpdateForm.signCode=data.signCode;
  		this.addOrUpdateForm.parentId=data.parentId;
  		this.addOrUpdateForm.projectName=data.projectName;
  		
  		if(data.parentId){
  			this.addOrUpdateForm.parentName=node.parent.data.name;
  		}else{
  			this.addOrUpdateForm.parentName="";
  		}
  	},
  	addRoot(){
  		this.addRootView=true;
  		this.addTreeNode({},{});
  	},
  	selectNode(nodeData){
  		this.tableQuery.parentId=nodeData.id;
  	},
  	addSuccess(data){
  		this.addOrUpdateAuthShow=false;
  		this.addRoot=false;
  		this.getTreeData();
  		
  	},
  	getTreeData(){
  		this.treeLoading=true;
	    this.axios.get("/user/getALLAuth").then(res=>{
	    	this.treeLoading=false;
	    	if(res.status){
	    		this.authData=res.data;
	    	}
	    })
  	},
  	getFormData(){
  		return {
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