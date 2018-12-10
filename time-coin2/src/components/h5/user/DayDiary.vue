<template>
  <div class="day-diary">
    <div class="message" v-for="item in timeCoinList">
      <img class="msg-img msg-opacity" src="@/assets/logo.png" style="width: 40px;"/>
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
          time += ':30'
        } else {
          time += ':00'
        }
        return formatUtil.dateFormatUtil(this.day) + ' ' + time
      },
      toAnimation() {
        debugger;
        let borderStyles = document.querySelectorAll('.border-style')
        borderStyles.forEach((borderStyle)=>{
          let height = borderStyle.firstElementChild.offsetHeight
          let end = `100% {height:${height}px}`
          let key = document.styleSheets[8].cssRules[5]
          key.deleteRule("100%")
          key.insertRule(end)
        })

      }
    },
    beforeMount () {
      this.timeCoinList = this.$route.params.content
      this.day = this.$route.params.day
    },
    mounted () {
      this.toAnimation()
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
    left: 20px;
    top: -20px;
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
    height: 0;
    border-left: 3px solid green;
   /* -webkit-animation: myHeight 0.5s ease-in-out 0.5s forwards;
    -o-animation: myHeight 0.5s ease-in-out 0.5s forwards;
    animation: myHeight 0.5s ease-in-out 0.5s forwards;*/
  }

  .msg-p {
    opacity: 0;
    -webkit-animation: myOpacity 0.5s linear 1s forwards;
    -o-animation: myOpacity 0.5s linear 1s forwards;
    animation: myOpacity 0.5s linear 1s forwards;
  }

  @-webkit-keyframes myHeight {

  }

  @keyframes myHeight {
    from {
      height: 0;
    }
    to {
      height: auto;
     /* height: 100px;*/
    }
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
