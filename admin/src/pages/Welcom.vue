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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
