<template>
  <div class="add-wish">
    <div class="add-head">
      <span class="logo"><img class="coins-img" src="@/assets/images/wish1.png" style="height: 40px;"></span>
      <span class="icon mg-r8" @click="save"><i class="fas fa-check"></i></span>
      <span class="icon mg-r6" @click="showDialog"><i class="fas fa-times"></i></span>
      <div v-transfer-dom>
        <confirm  v-model="show" title="温馨提示" @on-cancel="onCancel"  @on-confirm="onConfirm">
          <p style="text-align:center;">确定要退出么，退出将无法保存哟？</p>
        </confirm>
      </div>
    </div>
    <div class="add-content">
      <h4>标题</h4>
      <input type="text" v-model="content.title" placeholder="<未命名>">
      <h4>价格</h4>
      <input type="number" v-model="content.price" placeholder="0.00">
      <h4>优先级</h4>
      <input type="number" v-model="content.priority">
      <h4>具体描述</h4>
      <div class="details">
        <p>{{content.description}}</p>
        <textarea v-model="content.description" placeholder="请描述一下您的具体愿望"
                  style="min-height: 80px;width: 95%;border: none; "></textarea>
      </div>
      <h4 class="last-text"></h4>
    </div>
  </div>
</template>

<script>
  import {Confirm, TransferDomDirective as TransferDom} from 'vux'

  export default {
    name: 'AddWish',
    directives: {
      TransferDom
    },
    components:{Confirm},
    data() {
      return {
        content: {
          title: '',
          price: 0,
          priority: 0,
          description: ''
        },
        show:false
      }
    },
    methods: {
      onCancel () {
      },
      onConfirm () {
       this.$router.push({name:'wishList'})
      },
      showDialog () {
        this.show = true
      },
      //保存新建愿望
      save () {

      }
    }
  }
</script>

<style scoped>
  .add-content {
    width: 100%;
  }

  .details {
    position: relative;
  }

  .add-content h4, .add-content textarea, .details p {
    font-size: 14px;
    border-bottom: 1px solid lightgray;
    margin: 10px;
    letter-spacing: 1px;
  }

  .details textarea {
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .details p {
    display: block;
    visibility: hidden;
    min-height: 80px;
    width: 100%;
  }

  .add-content input {
    border: none;
    margin: 10px;
  }

  .add-head {
    width: 100%;
    height: 40px;
    background-color: #363636;
  }

  .icon {
    font-size: 20px;
    color: lightgray;
    float: right;
    display: inline-block;
    height: 40px;
    line-height: 40px;
  }

  .mg-r8 {
    margin-right: 8%;
  }

  .mg-r6 {
    margin-right: 6%;
  }

  .logo {
    margin-left: 5%;
  }

  .add-content .last-text {
    border: 1px solid lightgray;
    margin-top: 20px;
    height: 8px;
    border-top: none;

  }
</style>
