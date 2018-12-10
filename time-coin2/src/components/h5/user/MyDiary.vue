<template>
  <div class="mydiary">
    <span class="mydiary-title">My Diary</span>
    <Calendar
      v-on:choseDay="clickDay"
      v-on:changeMonth="changeDate"
      :sundayStart="true"></Calendar>
  </div>
</template>

<script>
  import Calendar from 'vue-calendar-component';

  export default {
    name: 'MyDiary',
    components: {
      Calendar
    },
    methods: {
      clickDay(data) {
        let today = new Date().getTime()
        let date = new Date(data).getTime()
        if (today > date) {
          //查询当日的日记记录
          //TODO 测试数据
          let content = [{id:1,type:'2',content:'我在学习呢我在学习呢我在学习呢我在学习呢我在学习呢我在学习呢我在学习呢我在学习呢我在学习呢我在学习呢我在学习呢我在学习呢我在学习呢我在学习呢我在学习呢我在学习呢我在学习呢我在学习呢我在学习呢我在学习呢我在学习呢'}
            ,{id:2,type:'1',content:'我再工作呢我再工作呢我再工作呢我再工作呢我再工作呢我再工作呢我再工作呢我再工作呢'}
            ,{id:3,type:'3',content:'我在玩呢我在玩呢我在玩呢我在玩呢我在玩呢我在玩呢我在玩呢我在玩呢我在玩呢'}]
          //跳转到时间金币页面
          this.$router.push({name:'dayDiary',params:{content:content,day:date}})
        }
      },
      changeDate(data) {
        console.log(data); //左右点击切换月份
      }
    }
  }
</script>

<style>
  .mydiary {
    height: 100%;
  }

  .mydiary-title {
    font-family: "Carattere ROB";
    text-align: center;
    display: block;
    width: 100px;
    margin: 0 auto;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    letter-spacing: 2px;
    font-weight: bold;
    color: orange;
    border-bottom: 1px solid lightgray;
    margin-bottom: 10px;
  }

  .mydiary .wh_container {
    height: 100%;
  }

  .mydiary .wh_container .wh_content_all {
    background-color: white !important;
    height: 100%;
  }

  .mydiary .wh_content_all .wh_jiantou1 {
    border-top: 2px solid #535353;
    border-left: 2px solid #535353;
  }

  .mydiary .wh_content_all .wh_jiantou2 {
    border-top: 2px solid #535353;
    border-right: 2px solid #535353;
  }

  .mydiary .wh_content_all .wh_top_changge li {
    color: #3C3C3C;
  }

  .mydiary .wh_content .wh_content_item {
    color: #3C3C3C;
    height: 60px;
  }

  .mydiary .wh_content .wh_content_item .wh_chose_day {
    background: white;
    border: 1px solid orange;
    border-radius: 100px;
  }

  .mydiary .wh_content .wh_content_item .wh_isToday {
    background: orange;
  }
</style>
