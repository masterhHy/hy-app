<template>
  <div class="tab-bar">
    <tabbar>
      <tabbar-item selected link="/HomePage">
        <i slot="icon" class="fa fa-camera-retro  fa-2x" ></i>
        <i slot="icon-active" class="fa fa-camera-retro fa-2x"></i>
        <span slot="label">时间金币</span>
      </tabbar-item>
      <tabbar-item link="/WishList">
        <img slot="icon" src="../../../assets/images/week.png">
        <img slot="icon-active" src="../../../assets/logo.png">
        <span slot="label">愿望清单</span>
      </tabbar-item>
      <tabbar-item  link="/User">
        <i  slot="icon" class="fa fa-user" aria-hidden="true"></i>
        <i slot="icon-active" class="fa fa-user"></i>

      <!--  <i  slot="icon" class="fa fa-id-card-o" aria-hidden="true"></i>
        <i slot="icon-active" class="fa fa-id-card-o"></i>-->
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import {Tabbar, TabbarItem} from 'vux'

  export default {
    name: "TabBar",
    components: {
      Tabbar,
      TabbarItem
    }
  }
</script>
<style scoped>
.tab-bar {
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 500;
}
</style>
