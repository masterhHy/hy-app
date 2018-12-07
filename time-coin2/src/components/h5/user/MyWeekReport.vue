<template>
  <div>
    <div id="main" class="main"></div>
  </div>
</template>

<script>
  export default {
    name: 'MyWeekReport',
    methods: {
      getEcharts() {
        const echarts = require('echarts');

        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(document.querySelector('#main'));
        // 绘制图表
        myChart.setOption({
          title: {
            text: '一周时间分类'
          },
          tooltip: {},
          xAxis: {
            data: ['学习','工作','娱乐']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [20, 36,98]
          }]
        });
      }
    },
    mounted () {
      this.getEcharts()
    }
  }
</script>

<style scoped>
  .main {
    width: 40%;
    height: 200px;
  }
</style>
