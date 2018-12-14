<template>
  <div class="coin-all">
    <flexbox v-for="row in 8" :key="row">
      <flexbox-item v-for="col in 4" :key="col">
        <div v-if="contents[(row-1)*4+(col-1)]" @click="toTimeCoinEdit(row,col,true)"
             :class="[contents[(row-1)*4+(col-1)].type=='2'?'bg-green':'',contents[(row-1)*4+(col-1)].type=='1'?'bg-blue':'',contents[(row-1)*4+(col-1)].type=='3'?'bg-red':'','content-coin']">
          <span class="text">{{(row-1)*4+(col-1)}}--{{contents[(row-1)*4+(col-1)].content.length>24?(contents[(row-1)*4+(col-1)].content.substring(0,23)+"..."):contents[(row-1)*4+(col-1)].content}}</span>
        </div>
        <div class="flex-coin" @click="toTimeCoinEdit(row,col,false)" v-if="!contents[(row-1)*4+(col-1)]">
          <img class="coins-img" src="@/components/h5/coin/assets/images/gold-coin.png">
        </div>
      </flexbox-item>
    </flexbox>

    <div v-transfer-dom>
      <confirm v-model="show" title="请选择金币类型" @on-cancel="onCancel" @on-confirm="onConfirm">
        <div class="line"><input type="radio" name="type" value="1" id="work" checked v-model="coinType"/><label for="work" class="blue coin-type">工作</label></div>
        <div class="line"><input type="radio" name="type" value="2" id="study" v-model="coinType"/><label for="study" class="green coin-type">学习</label></div>
        <div class="line"><input type="radio" name="type" value="3" id="play" v-model="coinType"/><label for="play" class="red coin-type">娱乐</label></div>
      </confirm>
    </div>


  </div>
</template>

<script>
  import {
    Grid,
    GridItem,
    GroupTitle,
    Flexbox,
    FlexboxItem,
    XDialog,
    Confirm,
    TransferDomDirective as TransferDom
  } from 'vux'

  export default {
    directives: {
      TransferDom
    },
    name: "TimeCoin",
    data() {
      return {
        show: false,
        coinType: "1",
        col: 1,
        row: 1,
        contents: []
      }
    },
    components: {
      Grid,
      GridItem,
      GroupTitle,
      Flexbox,
      FlexboxItem,
      XDialog,
      Confirm
    },
    methods: {
      toTimeCoinEdit(row, col, isWrite) {
        if (isWrite) {
          let coinContent = this.contents[(row-1)*4+(col-1)].content
          this.coinType = this.contents[(row-1)*4+(col-1)].type
          this.$router.push({name: 'timeCoinEdit',params:{coinType:this.coinType,coinContent:coinContent}})
          return
        }
        this.show = true;
         
      },
      onCancel() {
        console.log('on cancel')
      },
      onConfirm(msg) {
        console.log(this.coinType)
        this.$router.push({name: 'timeCoinEdit',params:{coinType:this.coinType}})

      }
    },
    mounted () {

      //查询某一日的
      if(this.$route.params.content) {
        this.contents = this.$route.params.content
      }
     /* this.contents = [{type:'2',content:'我在学习呢我在学习呢我在学习呢我在学习呢我在学习呢我在学习呢我在学习呢'}
                      ,{type:'1',content:'我再工作呢我再工作呢我再工作呢我再工作呢我再工作呢我再工作呢我再工作呢我再工作呢'}
                      ,{type:'3',content:'我在玩呢我在玩呢我在玩呢我在玩呢我在玩呢我在玩呢我在玩呢我在玩呢我在玩呢'}
        ]*/
    }
  }
</script>

<style scoped>
  @import "../../../assets/css/timecoin.css";
</style>
