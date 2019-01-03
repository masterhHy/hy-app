<template>
  <div class="edit-all">
    <div class="edit-head">
      <span :class="[work?'bg-blue':'',study?'bg-green':'',play?'bg-red':'','type','left']">{{coinType.label}}</span>
      <span class="type right bg-gray" @click="_toTimeCoin">保存</span>
    </div>
    <div class="edit-content">
      <textarea class="text" placeholder="快来填写你的时间金币吧~" v-model="coinContent"></textarea>
    </div>
  </div>
</template>

<script>
    export default {
      name: "TimeCoinEdit",
      data () {
        return {
          id:'',
          coinType: {},
          coinContent: '',
          study: false,
          work: false,
          play: false,
        }
      },
      methods: {
        _toTimeCoin () {
          let param = {remark:this.coinContent,type:this.coinType.value,id:this.id}
          this.axios({
            url:'/coin/addOrUpdate',
            method:'get',
            params:param
          }).then((res)=>{
            this.$router.push({name:'timeCoin'})
          }).catch(()=>{})
        }
      },
      mounted () {
        const coinType = this.$route.params.coinType
        this.coinContent = this.$route.params.coinContent
        this.id = this.$route.params.id
        switch(coinType) {
          case "1":
            this.coinType = {label:'工作', value:1}
            this.work = true
            break
          case "2":
            this.coinType = {label:'学习', value:2}
            this.study = true
            break
          case "3":
            this.coinType = {label:'娱乐', value:3}
            this.play = true
            break
        }
      }
    }
</script>

<style scoped>
  .edit-all {
    background-color: #363636;
    height: 100%;
  }
  .edit-head {
    margin:0 auto;
    width: 95%;
    height: 50px;
    padding: 10px;
    border-bottom:1px solid lightgray;
  }
  .type {
    width: 60px;
    height: 30px;
    color: white;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    line-height: 30px;
    font-size: 14px;
    letter-spacing: 4px;
    border-radius: 10px;
  }
  .bg-blue {
    background-color: blue;
  }
  .bg-green {
    background-color: green;
  }
  .bg-red {
    background-color: red;
  }
  .bg-gray {
    background-color: gray;
  }
  .right {
    float: right;
  }
  .left {
    float: left;
  }
  .text {
    width: 100%;
    height: 100%;
    background-color: transparent;
    font-size: 14px;
    padding:20px;
    color: white;
    border: 0;
  }
  .edit-content {
    height: 100%;
  }
</style>
