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

<script>
  import formatUtil from '@/assets/js/formatUtil'

  export default {
    name: 'MyWeekReport',
    data() {
      return {
        month: 12,
        week: 1,
        startDay: 1543593600000,
        endDay: 1544112000000,
        time: {
          study: 20,
          work: 36,
          play: 98
        },
        maxType: 0,
        formatUtil: formatUtil
      }
    },
    methods: {
      _getEcharts() {
        // 引入 ECharts 主模块
        const echarts = require('echarts/lib/echarts');
        // 引入柱状图
        require('echarts/lib/chart/bar');
        // 引入饼状图
        require("echarts/lib/chart/pie");
        // 引入提示框和标题组件
        require('echarts/lib/component/tooltip');
        require('echarts/lib/component/title');
        //引入legend模块
        require("echarts/lib/component/legend");

        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(document.querySelector('#main'));
        const myChart2 = echarts.init(document.querySelector('#main2'));
        // 绘制图表
        myChart.setOption({
          /*title: {
            text: '一周时间分类'
          },*/
          tooltip: {
            trigger: 'item',
            formatter: "{a}<br/>{b}:{c}({d}%)"
          },
          /* xAxis: {
             data: ['学习','工作','娱乐']
           },
           yAxis: {},*/
          legend: {
            orient: 'horizontal',
            x: 'left',
            data: ['学习', '工作', '娱乐']
          },
          series: [{
            name: '一周时间分类',
            type: 'pie',
            avoidLabelOverlap: false,
            /* data: [20, 36,98]*/
            label: {
              normal: {
                show: true,
                position: 'inside',
                formatter: '{d}%',
                textStyle: {
                  align: 'center',
                  baseline: 'middle',
                  fontFamily: '微软雅黑',
                  fontSize: 10,
                  fontWeight: 'bold'
                }
              },
              emphasis: {
                show: true,
                position: 'inside',
                textStyle: {
                  align: 'center',
                  fontSize: 12,
                  fontWeight: 'bolder'
                }
              }
            },
            data: [
              {
                value: 20,
                name: '学习'
              },
              {
                value: 36,
                name: '工作'
              },
              {
                value: 98,
                name: '娱乐'
              }
            ]
          }],
          color:['#3FAA3F','#4545BB','#BF4B4B']
        });
         myChart2.setOption({
           title: {
             text: '一周时间分类',
             left: 'center'
           },
           tooltip: {},
           xAxis: {
             data: ['学习', '工作', '娱乐']
           },
           yAxis: {
             interval: 10
           },
           series: [{
             type: 'bar',
             itemStyle: {
               normal: {
                 color: function(params) {
                   let colorList = ['#3FAA3F','#4545BB','#BF4B4B']
                   return colorList[params.dataIndex]
                 },
                 lable: {
                   show: true,
                   position:'top',
                   formatter:'{b}\n{c}',

                 }
               }
             },
             barWidth: 45,
             data: [20, 36, 98]
           }]
         });
      },
      _getMaxType () {
        let maxTime = Math.max(this.time.study,this.time.work,this.time.play)
        if(maxTime === this.time.work) this.maxType = 1
        else if(maxTime === this.time.study) this.maxType = 2
        else this.maxType = 3
      }
    },
    mounted() {
      this._getEcharts()
      this._getMaxType ()
    }
  }
</script>

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
