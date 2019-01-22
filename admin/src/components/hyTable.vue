<template lang="html">
	<div>
		<el-table
        :data="tableData"
        v-loading="tableLoading"
        :element-loading-text="$t('message.LOADING')"
        border
        class="m-t" >
        <slot></slot>
  	</el-table>
  	<el-row class="text-center m-t">
  	 	<el-col :span="24">
	        <el-pagination
	          @size-change="handleSizeChange"
	          @current-change="handleCurrentChange"
	          :current-page="queryForm.pageNumber"
	          :page-sizes="[5, 10, 20, 50]"
	          :page-size="queryForm.pageSize"
	          layout="total, sizes, prev, pager, next, jumper"
	          :total="tableTotal">
	        </el-pagination>
	      </el-col>
  	</el-row>
	</div>
  
</template>

<script>
export default {
	created(){
		this.loadTableData();
	},
  data () {
    return {
      tableLoading:false,
      tableData:[],
      tableTotal:0,
      queryForm:{
      	pageNumber:1,
      	pageSize:this.pageSize,
      },
      clientTableDataIsLoad:false,
      clientTableData:[],
    }
  },
  props:{
  	pagination: {
        type: String,//server 服务端分页 client 客户端分页
        default: function() {
          return "server";
        },
        
    },
    url: {
        type: String,
        default: function() {
          return "";
        },
        required: true
    },
    query:{
    	 type: Object,
        default: function() {
          return {};
        }
    },
    pageSize:{
    	 type: Number,
        default: function() {
          return 10;
        }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.queryForm.pageSize = parseInt(val);
    },
    handleCurrentChange (val) {
      this.queryForm.pageNumber = parseInt(val);
    },
    loadTableData(){
    	//服务端分页
    	if(this.pagination==="server"){
    		this.tableLoading=true;
    		let query = JSON.parse(JSON.stringify(this.queryForm));
	    	this.axios.post(this.url,query).then(res=>{
	    		this.tableLoading=false;
	    		if(Array.isArray(res.data.rows)){
	    			this.tableData=res.data.rows
	    		}else{
	    			this.$notify({
		          title: '提示',
		          message: "table数据格式有误！"
		        });
	    		}
	    		if(typeof res.data.total === 'number'){
	    			this.tableTotal=res.data.total;
	    		}
	    		
	    	})
    	}else{
    		//客户端分页
    		if(!this.clientTableDataIsLoad){
    			//只加载一次
    			this.tableLoading=true;
    			this.axios.post(this.url).then(res=>{
		    		this.tableLoading=false;
		    		if(Array.isArray(res.data)){
		    			this.clientTableData = res.data;
		    			this.clientTableDataIsLoad = true;
		    			this.dealClientData();
		    		}else{
		    			this.$notify({
			          title: '提示',
			          message: "table数据格式有误！"
			        });
		    		}
		    	})
    		}else{
    			this.dealClientData();
    		}
    		
    	}
    },
    dealClientData(){
    	//根据 pageNumber 和pageSize 获取当前数据
    	let staxtIndex = (this.queryForm.pageNumber-1)*this.queryForm.pageSize;
    	let endIndex = this.queryForm.pageNumber*this.queryForm.pageSize;
    	//先过滤查找条件 获取新的tableData
    	let query = JSON.parse(JSON.stringify(this.queryForm));
    	delete query.pageNumber;
    	delete query.pageSize;
    	let tableData = this.clientTableData.filter(item=>{
    		let isContain =true;
    		for(let key in query){
    			let queryVal=query[key]||"";
   				if(item[key]&&item[key].toString().indexOf(queryVal)==-1){
   					isContain=false;
   				}
   			}
    		return isContain;
    	});
    	this.tableTotal=tableData.length;
    	this.tableData = tableData.slice(staxtIndex,endIndex);
    },
    reload(){
    	this.loadTableData();
    }
  },
  watch:{
  	queryForm :{
  		handler: function (val, oldVal) {
  			this.loadTableData();
  		},
      deep: true
   },
   query:{
   		handler: function (val, oldVal) {
   			this.queryForm.pageNumber=1;
   			for(let key in this.query){
   				this.$set(this.queryForm,key,this.query[key]);
   			}
  		},
      deep: true
   }
  }
}
</script>
