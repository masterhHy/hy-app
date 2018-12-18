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
