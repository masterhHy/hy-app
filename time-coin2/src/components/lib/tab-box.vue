<!--tab选择-->
<template>
  <div class="tab-box" >
    <div v-for="(item, index) in tabList" :key="index" class="tab" >
      <input type="radio" :id="index" :value="item.value"  name="group" v-model="bindData" />
      <label :for="index" class="radio-btn" >{{item.label}}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tab-box',
  props: {
    tabList: {
      type: Array,
      default: function () {
        return [
          {label: '全部', value: '1'},
          {label: 'LDPE', value: '2'},
          {label: 'LLDPE', value: '3'},
          {label: 'PPHM', value: '4'},
          {label: 'LLDEP', value: '5'}
        ]
      }
    },
    value:String
  },
  data(){
  	return {
  		bindData:""
  	}
  },
  methods: {
  },
  watch:{
  	bindData(old,val){
  		this.$emit("input",this.bindData);
  	}
  },
  created(){
  	this.bindData=this.value;
  }
}
</script>

<style scoped>
  .tab-box{
    width: 100%;
    height: 1.75rem;
    border-bottom: 1px solid #e5e5e5;
    color: #666;
    display: flex;
    justify-content: space-around;
    flex-flow: row nowrap;
    line-height: 1.75rem;
  }
  .tab {
    height: 100%;
    position: relative;
  }
  .tab label{
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    box-flex: 1;
    text-align: center;
    cursor: pointer;
    font-size: 15px;
    display: inline-block;
    height: 100%;
  }
  input[type="radio"] {
    position: absolute;
    clip: rect(0, 0, 0, 0);
  }
  input[type="radio"]:checked+label {
    border-bottom: 3px solid #0096eb;
    color: #0096eb;
  }
</style>
