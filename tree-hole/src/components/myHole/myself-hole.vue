<template>
  <div class="slide-item myself-hole" ref="element">
    <cube-scroll :data="followersData" :options="scrollOptions">
      <ul class="list-wrapper">
        <li v-for="(item, index) in followersData" :key="index">
          111111111111111111111122222222222222222222222222222233333333333333
          <div class="good-message">
            <div class="float-left">
                          <span @click="addGood">
                            <i class="cubeic-good" :class="[isAddGood ? 'good-choose': '', 'cubeic-good']"></i>
                            <label v-if="goodNum==0">赞</label>
                            <label v-if="goodNum!=0">{{goodNum}}</label>
                          </span>
              <span @click="addMessage">
                            <i class="cubeic-message"></i>
                            <label v-if="messages==0">评论</label>
                            <label v-if="messages!=0">{{messages}}</label>
                          </span>
            </div>
            <div class="float-right">
              <i class="cubeic-share"></i> 分享
            </div>
          </div>
        </li>
      </ul>
    </cube-scroll>
  </div>

</template>

<script>
  export default {
    name: 'myself-hole',
    data () {
      return {
        selectedLabel: '快乐',
        disabled: false,
        isAddGood: false,
        messages: 30,
        goodNum: 10,
        scrollOptions: {
          /* lock x-direction when scrolling horizontally and  vertically at the same time */
          directionLockThreshold: 0,
          click: false
        },
        followersData: [{
          label: 'fsdfffffffffdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfd'
        }, {
          label: '123'
        }, {
          label: '123'
        }, {
          label: '123'
        }, {
          label: '123'
        }, {
          label: '123'
        }, {
          label: '123'
        }, {
          label: '123'
        }, {
          label: '123'
        }, {
          label: '123'
        }]
      }
    },
    methods: {
      addGood () {
        this.isAddGood = !this.isAddGood
      },
      addMessage () {
      }
    }
  }
</script>

<style scoped>
  .myself-hole {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 500;
    background-color: #F4F4F4;
    border-bottom: 1px solid #E4E2E2;
  }

  .myself-hole .tab-slide-container {
    background-color: #ECE3D8;
  }

  .list-wrapper li {
    padding: 15px 10px;
    width: 86%;
    margin: 0 auto;
    margin-top: 12px;
    text-align: left;
    background-color: #fff;
    font-size: 14px;
    color: #999;
    white-space: normal;
    word-break: break-word;
  }

  .slide-item {
    height: calc(100vh - 87px);
  }

  .good-message {
    margin-top: 14px;
    height: 16px;
  }
</style>
