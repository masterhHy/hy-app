<template>
  <div class="day-diary">
    <div class="message" v-for="item in timeCoinList">
      <img class="msg-img msg-opacity" src="@/assets/images/jinbi-icon.png"/>
      <span class="msg-time msg-opacity">{{toTime(item.id)}}</span>
      <div class="border-style">
        <p class="msg-p">{{item.content}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import formatUtil from '@/assets/js/formatUtil'

  export default {
    name: 'DayDiary',
    data() {
      return {
        timeCoinList: [],
        day: 0
      }
    },
    methods: {
      toTime(num) {
        let time = 8 + parseInt((num - 1) / 2)
        if ((num - 1) % 2 !== 0) {
          time += ':30' + '~' + (time + 1) + ':00'
        } else {
          time += ':00' + '~' + time + ':30'
        }
        return formatUtil.dateFormatUtil(this.day) + ' ' + time
      },
    },
    mounted() {
      this.timeCoinList = this.$route.params.content
      this.day = this.$route.params.day
    }
  }
</script>

<style scoped>
  .day-diary {
    width: 100%;
  }

  .message {
    position: relative;
  }

  .msg-img {
    position: absolute;
    left: 25px;
    top: -16px;
    width: 30px;
  }

  .msg-time {
    position: absolute;
    left: 68px;
    top: -14px;
    font-weight: bold;
    color: orange;
  }

  .msg-opacity {
    opacity: 0;
    -webkit-animation: myOpacity 0.5s linear 0s forwards;
    -o-animation: myOpacity 0.5s linear 0s forwards;
    animation: myOpacity 0.5s linear 0s forwards;
  }

  .border-style {
    margin: 39px;
    border-left: 2px solid lightgray;
  }

  .msg-p {
    opacity: 0;
    -webkit-animation: myOpacity 0.5s linear 0.5s forwards;
    -o-animation: myOpacity 0.5s linear 0.5s forwards;
    animation: myOpacity 0.5s linear 0.5s forwards;
  }

  @keyframes myOpacity {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .border-style p {
    padding: 15px;
    padding-top: 20px;
  }
</style>
