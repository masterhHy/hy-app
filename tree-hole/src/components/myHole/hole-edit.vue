<template>
  <div class="edit-all">
    <div class="edit-head">
      <cube-button @click="showPicker" :outline="true" class="mood">{{title}}</cube-button>
    </div>
    <div class="edit-content">
      <cube-textarea v-model="value" indicator="indicator"
                     :autofocus="autofocus" :maxlength="maxlength"
      :autoExpand="autoExpand"><p><span></span><br></p></cube-textarea>
      <cube-button @click="showBtn" :primary="true" class="edit-save">保存</cube-button>
    </div>
  </div>
</template>

<script>
  const column1 = [{text: '快乐', value: 1}, { text: '忧伤', value: 2 }, { text: '焦虑', value: 3 }]
  export default {
    name: 'hole-edit',
    data () {
      return {
        id: '',
        coinType: {},
        value: '',
        indicator: {
          negative: true,
          remain: true
        },
        autofocus: true,
        maxlength: 10000,
        autoExpand: false,
        title: '心情'
      }
    },
    methods: {
      _toTimeCoin () {
        this.$vux.loading.show({
          text: 'Loading'
        })
        let param = {remark: this.coinContent, type: this.coinType.value, id: this.id}
        this.axios({
          url: '/coin/addOrUpdate',
          method: 'get',
          params: param
        }).then((res) => {
          this.$vux.loading.hide()
          this.$router.push({name: 'timeCoin'})
        }).catch(() => {})
      },
      _goback () {
        this.$router.go(-1)
      },
      showPicker () {
        if (!this.picker) {
          this.picker = this.$createPicker({
            title: '请选择心情',
            data: [column1],
            onSelect: this.selectHandle,
            onCancel: this.cancelHandle
          })
        }
        this.picker.show()
      },
      selectHandle (selectedVal, selectedIndex, selectedText) {
        this.title = selectedText.join(' ')
        // this.$createDialog({
        //   type: 'warn',
        //   content: `Selected Item: <br/> - value: ${selectedVal.join(', ')} <br/> - index: ${selectedIndex.join(', ')} <br/> - text: ${selectedText.join(' ')}`,
        //   icon: 'cubeic-alert'
        // }).show()
      },
      cancelHandle () {
        this.$createToast({
          type: 'correct',
          txt: 'Picker canceled',
          time: 1000
        }).show()
      },
      showBtn () {
        this.$createDialog({
          type: 'confirm',
          title: '确定要保存吗？',
          confirmBtn: {
            text: '确定',
            active: true,
            disabled: false,
            href: 'javascript:;'
          },
          cancelBtn: {
            text: '取消',
            active: false,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: () => {
            this.$createToast({
              type: 'warn',
              time: 1000,
              txt: '点击确认按钮'
            }).show()
          },
          onCancel: () => {
            this.$createToast({
              type: 'warn',
              time: 1000,
              txt: '点击取消按钮'
            }).show()
          }
        }).show()
      }
    },
    mounted () {
      const coinType = Number(this.$route.params.coinType)
      this.coinContent = this.$route.params.coinContent
      this.id = this.$route.params.id
      switch (coinType) {
        case 1:
          this.coinType = {label: '工作', value: 1}
          this.work = true
          break
        case 2:
          this.coinType = {label: '学习', value: 2}
          this.study = true
          break
        case 3:
          this.coinType = {label: '娱乐', value: 3}
          this.play = true
          break
      }
    }
  }
</script>

<style scoped lang='scss'>
  .edit-all {
    background-color: #FBF5F1;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  .edit-head {
    margin:0 auto;
    width: 95%;
    height: 40px;
    padding: 10px;
    border-bottom:1px solid lightgray;
  }
  .type {
    width: 60px;
    height: 30px;
    color: white;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    line-height: 30px;
    font-size: 14px;
    letter-spacing: 4px;
    border-radius: 10px;
  }
  .text {
    width: 100%;
    height: 100%;
    background-color: transparent;
    font-size: 14px;
    padding:20px;
    color: white;
    border: 0;
  }
  .edit-content {
    height: 100%;
  }
  .cube-textarea_expanded {
    min-height: 300px;
    position: relative;
  }
  p{
    display:block;
    visibility:hidden;
  }
  .cube-textarea_expanded .cube-textarea {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: left;
    padding: 10px;
    box-sizing: border-box;
    font-size: 100%;
    line-height: inherit;
    color: #666;
    background-color: #fff;
    border-radius: 2px;
    resize: none;
    border: none;
    outline: none;
  }
  .mood {
    width: 60px;
    float: right;
    height: 30px;
    padding: 5px 15px;
    margin-top: 5px;
    margin-right: 5px;
    &:after {
      border-radius: 15px;
    }
  }
  .edit-save {
    width: 300px;
    height: 40px;
    padding: 5px 15px;
    margin: 10px auto;
    letter-spacing: 10px;
    border-radius: 15px;
  }
</style>
