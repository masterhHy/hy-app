<template>
  <div class="messages">
    <div class="message-box">
      <div class="message-head">
        <i class="cubeic-close close-icon" @click="popDown"></i>
        <span>一共有xxxx条评论</span>
      </div>
      <ul>
        <li class="message-li">
          <img src="../../assets/img/1.jpg" alt="1" class="head-photo">
          <div class="message-right">
            <div class="message-title">feifeifei</div>
            <p>青年时期是豁达的时期，应该利用这个时期，养成自己豁达的性格。</p>
            <div class="single-message-bottom">
              <span>08-10</span>
              <span @click="addGood">
                <i class="cubeic-good" :class="[isAddGood ? 'good-choose': '', 'cubeic-good']"></i>
                <label v-if="goodNum==0">赞</label>
                <label v-if="goodNum!=0">{{goodNum}}</label>
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'messages',
    data () {
      return {
        isAddGood: false,
        goodNum: 0
      }
    },
    methods: {
      addGood () {
        this.isAddGood = !this.isAddGood
      },
      popDown () {
        this.$emit('popDown')
      }
    }
  }
</script>

<style scoped>
  .message-box {
    height: 600px;
    border-bottom: 1px solid red;
    background-color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    overflow: hidden;
  }

  .head-photo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: 10px;
  }

  .message-right {
    float: right;
    width: 80%;
  }
  .message-right p {
    margin-top: 4px;
    text-align: left;
    line-height: 20px;
  }

  .message-li {
    margin: 0 auto;
    width: 90%;
    height: 120px;
    border-bottom: 1px solid lightgray;
  }
  .message-title {
    text-align: left;
    margin-top: 15px;
    font-weight: bold;
  }
  .single-message-bottom {
    margin-top: 15px;
  }
  .single-message-bottom span:first-of-type {
    float: left;
  }
  .single-message-bottom span:last-of-type {
    float: right;
    margin-right: 40px;
  }
  .close-icon {
    float: left;
    margin-left: 10px;
  }
  .message-head {
    height: 30px;
    margin-top: 8px;
  }
  .message-head i {
    font-size: 18px;
  }
  .message-head span {
    font-size: 20px;
  }
</style>
