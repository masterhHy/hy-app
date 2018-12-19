<template>
  <div class="wish-list">
    <div class="wish-head">
      <div class="total-account">梦想总基金：￥{{totalAccount}}</div>
      <ul>
        <li class="wish-num">{{wishList.length}} items</li>
        <li class="plus" @click="addWish"><span class="plus-child">+</span></li>
        <li>
          <select v-model="sortType" class="sort">
            <option name="sortType" value="1">优先级</option>
            <option name="sortType" value="2">价格</option>
          </select>
        </li>
      </ul>
    </div>
    <div class="wish-content">
      <div v-if="wishList.length==0" class="nowish">您暂时还没有新的愿望哦~~ 点击上方加号添加愿望^-^</div>
      <div v-if="wishList.length!=0">
        <ul>
          <li v-for="wish in wishList" @click="showSingleWish(wish.id)">
            <span :class="'priority'+wish.priority"></span>
            <div class="wish-brief">
              <span class="title">{{wish.title}}</span>
              <span>￥{{wish.price}}</span>
            </div>
            <span class="angle"><i class="fas fa-chevron-right"></i></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'WishList',
    data() {
      return {
        totalAccount: 0, // 梦想总基金
        sortType:1, //排序类型：1.优先级 2.价格
        wishList:[
          {id:1,title:'买礼物',price:100,priority:3,description:'给菲菲买礼物啦'},
          {id:2,title:'去日本玩',price:10000,priority:3,description:'去日本玩去日本玩去日本玩去日本玩去日本玩去日本玩去日本玩去日本玩去日本玩去日本玩'}
        ]
      }
    },
    methods:{
      addWish () {
        this.$router.push({name:'addWish'})
      },
      showSingleWish (id) {
        this.$router.push({name:'singleWish',params:{id:id}})
      }
    }
  }
</script>

<style scoped>
  .wish-head {
    height: 100px;
    width: 100%;
    background-color: #363636;
    overflow: hidden;
  }
  .wish-head ul {
    height: 40px;
    line-height: 40px;
  }
  .wish-head li {
    font-size: 14px;
    color: #EBEBEB;
    float: left;
    letter-spacing: 1px;
  }

  .total-account {
    color: orange;
    font-size: 18px;
    font-weight: bold;
    margin: 15px;
    letter-spacing: 1px;
  }

  .wish-num {
    margin-right: 4%;
    margin-left: 5%;
  }
  .wish-head .plus {
    width: 40px;
    margin-right: 40%;
  }
  .wish-head .plus .plus-child {
    display: inline-block;
    height: 20px;
    width: 20px;
    border: 1px solid gray;
    border-radius: 50%;
    text-align: center;
    font-size: 18px;
    line-height: 16px;
  }
  select {
    outline: none;
    border:none;

  }
  .sort {
    background: none;
    border:1px solid lightgray;
    border-radius: 5px;
    color: white;
    letter-spacing: 1px;
  }

  select option {
    -webkit-appearance: none;   /* google */
    -moz-appearance: none;  /* firefox */
    appearance: none;       /* IE */
    background-color: #F4F5F5;
    color: #404040;
    border: none;
    margin:5px 0;
  }
  .nowish{
    margin: 30px auto;
    width: 88%;
    letter-spacing: 1px;
    font-size: 14px;
    color: #9A9A9A ;
  }
  .title {
    display: block;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 2px;
  }
  .wish-content li {
    margin: 5px 10px;
    margin-left: 0;
    border-bottom: 1px solid lightgray;
  }
  .wish-content li:after {
    display: block;
    content: ".";
    clear: both;
    visibility: hidden;
    width: 0;
    height: 0;
  }
  .wish-brief {
    float: left;
    margin-left: 5px;
  }
  .priority3{
    display: inline-block;
    width: 8px;
    height: 44px;
    background-color: red;
    float: left;
  }
  .angle {
    float: right;
    display: inline-block;
    height: 44px;
    line-height: 39px;
    color: gray;
  }
</style>
