<template>
<div>
  <div class="wish-head">
    <div class="operation">
      <span @click="_goback"><img src="@/assets/images/wish1.png" alt="愿望logo" style="height: 40px;"></span>
      <span class="icon" @click="del"><i class="fas fa-trash-alt"></i></span>
      <span class="icon" @click="edit"><i class="fas fa-pencil-alt"></i></span>
    </div>
    <div class="wish-brief">
      <span class="title">{{wish.title}}</span>
      <span class="price">￥{{wish.price}}</span>
    </div>
  </div>
  <div class="nice-border"></div>
</div>
</template>

<script>
	
    export default {
        name: 'SingleWish',
        data () {
          return {
            wish:{
            	id:"",
              title:'',
              price:0,
              priority:0,
              decription:''
            },
            show:false,
          }
        },
        mounted(){
        	this.$vux.loading.show({
	          text: 'Loading'
	        })
        	let id = this.$route.params.id
        	this.axios({
	          url:'/dream/getDreamDataById',
	          method:'post',
	          params:{id:id}
	        }).then((res)=>{
	        	this.$vux.loading.hide()
	        	if(res.status){
	        		this.wish=res.data
	        	}
	        }).catch(()=>{})
        },
        methods: {
          _goback () {
            this.$router.go(-1)
          },
          del(){
          	if(!this.wish.id){
          		return
          	}
          	let _this =this
          	this.$utils.confirm({msg:"是否删除这个愿望?",title:"温馨提示"},function(){
          		_this.$vux.loading.show({text: 'Loading'})
	          	_this.axios({
			          url:'/dream/deleteById',
			          method:'post',
			          params:{id:_this.wish.id}
			        }).then((res)=>{
			        	_this.$vux.loading.hide()
			        	_this.$router.push({name:'wishList'})
			        }).catch(()=>{})
          	})
          	
          },
          edit(){
          	this.$router.push({name:'addWish',params:this.wish});
          }
        }
    }
</script>

<style scoped>
  .wish-head {
    height: 150px;
    width: 100%;
    background-color: #363636;
    overflow: hidden;
  }
  .operation {
    height: 40px;
    border-bottom:1px solid gray;
    margin: 0 10px;
  }
  .icon {
    height: 40px;
    display: inline-block;
    line-height: 40px;
    color: lightgray;
    font-size: 16px;
    float: right;
    margin-right: 5%;
  }
  .wish-brief {
    margin: 10px;
  }
  .title {
    display: block;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 4px;
    color:#FFF8EA;
    margin-bottom: 10px;
  }
  .price {
    color:#FFF8EA;
    font-size: 14px;
    margin-top: 10px;
    letter-spacing: 3px;
  }
  .nice-border {
    background-image: url("../../../assets/images/border.png");
    background-size: 100%;
    height: 228px;
    margin: 10px;
  }
</style>
