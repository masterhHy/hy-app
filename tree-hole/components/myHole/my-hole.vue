<template>
<div class="my-hole">
  <header>
    <div>
      <img src="../../assets/img/1.jpg" alt="" class="head-photo">
    </div>
  </header>
  <content>
    <ul>
      <li @click="write">
        <i class="cubeic-edit"></i>
        <span>写心事</span>
        <i class="cubeic-arrow"></i>
      </li>
      <li @click="queryMyHole">
        <i class="cubeic-person"></i>
        <span>我的树洞</span>
        <i class="cubeic-arrow"></i>
      </li>
    </ul>
  </content>
</div>
</template>

<script>
  export default {
    name: 'my-hole',
    methods: {
      write () {
        this.$router.push('/HoleEdit')
      },
      queryMyHole () {
        this.$router.push('/MyselfHole')
      }
    }
  }
</script>

<style scoped>
.my-hole {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #FBF5F1;
  height: 100vh;
}
header {
  padding-top: 30px;
  height: 20%;
}
.head-photo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-top: 10px;
}
ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding-bottom: 10px;
}
ul li {
  width: 95%;
  height: 55px;
  border-bottom:1px solid lightgray;
  line-height: 55px;
}
ul li i:first-of-type{
  float: left;
  margin-left: 20px;
}
ul li span {
  float: left;
  margin-left: 20px;
  letter-spacing: 5px;
}
ul li i:last-of-type{
  float: right;
  margin-right: 15px;
}
</style>
