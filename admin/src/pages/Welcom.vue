<template>
	<div>
		<div >{{msg}}</div>
  		<input v-model="param.content" />
  		<input v-model="param.type" />
	  <hy-table url="/user/getAllAuthByUserId" pagination="client" :query="param">
	  	<el-table-column prop="content" label="类容" ></el-table-column>
	  	<el-table-column prop="id" label="id" ></el-table-column>
	  	<el-table-column prop="type" label="type" ></el-table-column>
	  </hy-table>
		<button type="button" @click="click"> click</button>
	</div>
  
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to ADMIN',
      param:{
      	content:"",
      	type:"",
      	userId:"1"
      }
    }
  },
  created(){
  },
  methods:{
  	click(){
  		this.$utils.error({title:"提示",msg:"是否要删除"})
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
