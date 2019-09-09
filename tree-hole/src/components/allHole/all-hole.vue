<template>
  <div class="all-hole">
    <div class="z-index1" slot="content">
      <cube-tab-bar v-model="selectedLabel"
                    show-slider class="cube-tab-bar"
                    :use-transition="disabled"
                    ref="tabNav"
                    :data="tabLabels">
      </cube-tab-bar>
      <div class="tab-slide-container">
        <cube-slide
          ref="slide"
          :loop="loop"
          :auto-play="autoPlay"
          :show-dots="showDots"
          :options="slideOptions"
          :initial-index="initialIndex"
          @scroll="scroll"
          @change="changePage">
          <!-- 关注 -->
          <cube-slide-item>
            <div class="slide-item" ref="element">
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
          </cube-slide-item>

          <cube-slide-item>
            <div class="slide-item" ref="element">
              <cube-scroll :data="followersData" :options="scrollOptions">
                <ul class="list-wrapper">
                  <li v-for="(item, index) in followersData" :key="index">
                    {{item.label}}{{item.label}}{{item.label}}
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
          </cube-slide-item>

          <cube-slide-item>
            <div class="slide-item" ref="element">
              <cube-scroll :data="followersData" :options="scrollOptions">
                <ul class="list-wrapper">
                  <li v-for="(item, index) in followersData" :key="index">
                    {{item.label}}{{item.label}}{{item.label}}
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
          </cube-slide-item>

        </cube-slide>
      </div>
    </div>
    <div :class="[isPopUp? 'pop-up': '',isPopDown?'pop-down':'','z-index2']"
    >
      <messages @popDown="popDownChanged"></messages>
    </div>
  </div>
</template>

<script>
  import { findIndex } from '../../../node_modules/cube-ui/src/common/helpers/util.js'
import Messages from '@/components/allHole/messages'

export default {
    name: 'all-hole',
    components: { Messages },
    data () {
      return {
        selectedLabel: '快乐',
        disabled: false,
        tabLabels: [{
          label: '快乐'
        }, {
          label: '忧伤'
        }, {
          label: '焦虑'
        }],
        isAddGood: false,
        isPopUp: false,
        isPopDown: false,
        messages: 30,
        goodNum: 10,
        loop: false,
        autoPlay: false,
        showDots: false,
        slideOptions: {
          listenScroll: true,
          probeType: 3,
          /* lock y-direction when scrolling horizontally and  vertically at the same time */
          directionLockThreshold: 0
        },
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
      changePage (current) {
        this.selectedLabel = this.tabLabels[current].label
        console.log(current)
      },
      scroll (pos) {
        const x = Math.abs(pos.x)
        const tabItemWidth = this.$refs.tabNav.$el.clientWidth
        const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
        const deltaX = x / slideScrollerWidth * tabItemWidth
        this.$refs.tabNav.setSliderTransform(deltaX)
      },
      addGood () {
        this.isAddGood = !this.isAddGood
      },
      addMessage () {
        this.isPopUp = true
        this.isPopDown = false
      },
      popDownChanged () {
        this.isPopUp = false
        this.isPopDown = true
      }
    },
    computed: {
      initialIndex () {
        let index = 0
        index = findIndex(this.tabLabels, item => item.label === this.selectedLabel)
        return index
      }
    }
  }
</script>

<style scoped>
  .all-hole {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 500;
    background-color: #F4F4F4;
    border-bottom: 1px solid #E4E2E2;
  }

  .all-hole .cube-tab-bar {
    height: 40px;
  }

  .all-hole .tab-slide-container {
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

  .float-left {
    float: left;
  }

  .float-right {
    float: right;
  }

  .good-message > div span {
    width: 46px;
    display: inline-block;
  }

  .good-choose {
    color: orange;
  }
  .z-index1 {
    z-index: 1;
  }
  .z-index2 {
    z-index: 4;
    position: absolute;
    bottom: -120vh;
    width: 100%;
  }
  .pop-up {
    -webkit-animation: popUp 1s forwards; /* Chrome, Safari, Opera */
    animation: popUp 1s forwards;
  }
  @keyframes popUp {
    from {bottom: -120vh;}
    to {bottom: 0px;}
  }
  .pop-down {
    -webkit-animation: popDown 1s forwards; /* Chrome, Safari, Opera */
    animation: popDown 1s forwards;
  }
  @keyframes popDown {
    from {bottom: 0px;}
    to {bottom: -100vh;}
  }


</style>
