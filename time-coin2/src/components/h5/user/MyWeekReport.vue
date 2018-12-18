<template>
  <div class="week-report">
    <div class="head-img">
      <img src="@/assets/images/time1.jpg" style=" width: 100%;"/>
    </div>
    <div class="head-title">
      <span class="head-title-week">我的周报告</span>
      <div><img class="head-split-week" src="@/assets/images/split1.png"/></div>
    </div>
    <p>
      您{{month}}月第{{week}}周({{formatUtil.dateFormatUtil(startDay)}}-{{formatUtil.dateFormatUtil(endDay)}})的学习时间为{{time.study}}h，工作时间为{{time.work}}h，娱乐时间为{{time.play}}h。</p>
    <div id="main2" class="main"></div>
    <p>不同类型时间占比如下。</p>
    <div id="main" class="main"></div>
    <p v-if="maxType == 1" >
      您本周工作的时间最长，工作了{{this.time.work}}h，还是要注意劳逸结合哦~同时不要忘了给自己充电哦！
    </p>
    <p v-if="maxType == 2" >
      您本周学习的时间最长，学习了{{this.time.study}}h，这一周又学到了不少东西吧，下一周也要继续努力哦！
    </p>
    <p v-if="maxType == 3" >
      您本周娱乐的时间最长，娱乐了{{this.time.play}}h，这一周是不是又懈怠了呢？加油一把，未来的你会感谢现在的你哦！
    </p>
  </div>
</template>

<script type="text/javascript" src="@/components/h5/user/assets/js/myWeekReport.js"></script>

<style scoped>
  .week-report {
    padding-bottom: 53px;
  }

  .main {
    width: 80%;
    height: 300px;
    border: 1px solid lightgray;
    margin: 0 auto;
    margin-top: 20px;
  }

  .head-img {
    width: 100%;
  }

  .head-title {
    margin: 0 auto;
  }

  .head-title-week {
    font-family: 华文行楷;
    font-size: 20px;
    margin: 0 auto;
    display: block;
    text-align: center;
    margin-top: 20px;
  }

  .head-split-week {
    display: block;
    width: 100px;
    text-align: center;
    margin: 0 auto;

  }

  .week-report p {
    margin: 25px 40px;
  }
</style>
