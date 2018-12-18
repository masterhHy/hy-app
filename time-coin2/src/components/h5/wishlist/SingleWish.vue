<template>
<div>
  <div class="wish-head">
    <div class="operation">
      <span><img src="@/assets/images/wish1.png" alt="愿望logo" style="height: 40px;"></span>
      <span class="icon"><i class="fas fa-trash-alt"></i></span>
      <span class="icon"><i class="fas fa-pencil-alt"></i></span>
    </div>
    <div class="wish-brief">
      <span class="title">{{wish.title}}</span>
      <span class="price">￥{{wish.price}}</span>
    </div>
  </div>
</div>
</template>

<script>
    export default {
        name: 'SingleWish',
        data () {
          return {
            wish:{
              title:'买礼物',
              price:100,
              priority:3,
              decription:'给菲菲买礼物啦'
            }
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
    border:1px solid red;
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
    border:1px solid red;
    letter-spacing: 3px;
  }
</style>
