<template>
  <div class="user">
    <div class="user-head">
      <span class="user-name">{{userName}}</span>
      <div class="head-img"><img :src="headImg" class="circle"></div>
    </div>
    <div>
      <group>
        <cell title="我的日记" is-link class="cell" link="/myDiary">
          <i slot="icon" class="fas fa-book-open icon-position pink" aria-hidden="true"></i>
        </cell>
        <cell title="我的周报告" is-link class="cell"  link="/myWeekReport">
          <i slot="icon" class="fas fa-retweet icon-position light-blue" aria-hidden="true"></i>
        </cell>
        <cell title="我的月报告" is-link class="cell mg-bottom10">
          <i slot="icon" class="far fa-calendar-alt icon-position light-green" aria-hidden="true"></i>
        </cell>
      </group>
      
    </div>
    <div style="position: absolute; bottom: 100px;width: 100%;padding: 0px 40px;">
      	<x-button type="primary" @click.native="logout">退出</x-button>
      </div>
  </div>
</template>

<script>
  import {Cell, Group,XButton} from 'vux'
  import Constant from '@/plugins__config/auth-client/utils/constant'
  export default {
    name: 'User',
    components: {
      Group,
      Cell,
      XButton
    },
    data() {
      return {
        userName: '',
        headImg:""
      }
    },
    mounted(){
    	let userInfo=localStorage.getItem(Constant.user_info)||'{}';
    	userInfo = JSON.parse(userInfo);
    	this.userName=userInfo.firstName||"";
    	this.headImg=userInfo.headImg||"http://images.f321.com/7S/Wd/cfAW6K5cd5jFXQQEsJtjYJ2EynMn.png";
    },
    methods:{
    	logout(){
    		this.$auth.logout();
    	}
    }
  }
</script>

<style scoped>
  .user {
    background-color: #F3F3F3;
    height: 100%;
  }

  .user .weui-cell:after {
    border-bottom: 0;
  }

  .user .weui-cell:before {
    border-top: 0;
  }

  .user-head {
    height: 100px;
    background: -webkit-linear-gradient(left, red, orange); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, red, orange); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, red, orange); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, red, orange); /* 标准的语法 */
  }

  .user-name {
    display: inline-block;
    height: 100px;
    line-height: 100px;
    width: 40%;
    color: white;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 3px;

  }

  .icon-position {
    margin-right: 15px;
  }

  .pink {
    color: orange;
  }

  .light-blue {
    color: #0068CE;
  }

  .light-green {
    color: deeppink;
  }

  .cell {
    border-bottom: 1px solid lightgray;
    height: 60px;
    margin: 0 10px;
  }

  .mg-bottom10 {
    margin-bottom: 20px;
  }

  .circle {
    overflow: hidden;
    width: 65px;
    height: 65px;
    border-radius: 50%;
    margin-top: 16.5px;
  }

  .head-img {
    width: 30%;
    height: 100px;
    text-align: center;
    float: right;
  }
</style>
