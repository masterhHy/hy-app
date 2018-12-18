<template>
  <div class="wish-list">
    <div class="wish-head">
      <div class="total-account">梦想总基金：￥{{totalAccount}}</div>
      <ul>
        <li class="wish-num">{{wishNum}} items</li>
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
      <div v-for=""></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'WishList',
    data() {
      return {
        totalAccount: 0, // 梦想总基金
        wishNum: 0, // 梦想数量
        sortType:1, //排序类型：1.优先级 2.价格
      }
    },
    methods:{
      addWish () {
        this.$router.push({name:'addWish'})
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
</style>
