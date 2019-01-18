<template lang="html">
  <el-row style="margin: 20px;">
  	<!-- 左侧树-->
  	
    <el-col :span="6" v-loading="treeLoading" :element-loading-text="$t('message.LOADING')">
    	<el-row>
    		 <el-col :span="10" :offset="14">
    		 		<el-button class="m-b-sm root-btn" type="primary" round size="mini" @click="addRoot">添加根路径</el-button>
    		 </el-col>
    	</el-row>
      
      <el-tree  :data="authData" node-key="id"  @node-click="selectNode">
      	 <span class="custom-tree-node" slot-scope="{ node, data }">
	        <span class="inline-block text-overflow" style="width: 100px;">{{ node.label }}</span>
	        <span>
	          <el-button type="text" size="mini" @click.stop="addTreeNode(node.id)">
	            		新增
	          </el-button>
	          <el-button type="text" size="mini" @click.stop="removeTreeNode(node.id)">
	            		删除
	          </el-button>
	          <el-button type="text" size="mini" @click.stop="modifyTreeNode(node.id)">
	            		修改
	          </el-button>
	        </span>
      </span>
      	
      </el-tree>
    </el-col>
    
    <!--右侧表-->
    <el-col :span="17" :offset="1">
    	
    	
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
    <module-add :show="addOrUpdateAuthShow" @success="reLoadTreeAndTable"></module-add>
    <!--编辑模块表单-->
    <!--<module-edit ref="editModule" @success="reLoadTreeAndTable">-->
    </module-edit>
  </el-row>
</template>

<script>
import ModuleAdd from './ModuleAdd.vue'
export default {
  components: {
  	
  },
  data () {
    return {
    	treeLoading:false,
    	addOrUpdateAuthShow:false,
    	authData:[{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '时间管理金币'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2',
            children: [{
              id: 11,
              label: '三级 3-2-1'
            }, {
              id: 12,
              label: '三级 3-2-2'
            }, {
              id: 13,
              label: '三级 3-2-3'
            }]
          }]
        }],
    }
  },
  created () {
    
  },
  methods: {
  	addTreeNode(id){
  		this.addOrUpdateAuthShow=true;
  		console.log(id);
  	},
  	removeTreeNode(id){
  		
  	},
  	modifyTreeNode(id){
  		
  	},
  	addRoot(){
  		this.addTreeNode();
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