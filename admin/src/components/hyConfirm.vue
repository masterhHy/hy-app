<template lang="html">
	<div>
		<el-dialog
	      :title="title"
	      :visible.sync="dialogShow"
	      @close="hide"
	      width="30%">
	      <span>{{msg}}</span>
	      <span slot="footer" class="dialog-footer">
	                <el-button @click="hide">{{$t('button.CANCEL')}}</el-button>
	                <el-button type="danger" :loading="loading" @click="click">{{$t('button.SURE')}}</el-button>
	              </span>
	    </el-dialog>
	</div>
  
</template>

<script>
export default {
	created(){
		
	},
  data () {
    return {
    	dialogShow:false,
    }
  },
  props:{
  	title: {
        type: String,
        default: function() {
          return "提示";
        },
    },
    msg:{
    	type: String,
        default: function() {
          return "";
        },
    },
    show:{
		type: Boolean,
	    default: function() {
	      return false;
	    },
	},
	loading:{
		type: Boolean,
	    default: function() {
	      return false;
	    },
	}
  },
  methods: {
  	hide(){
  		this.$emit("update:show",false);
  	},
  	click(){
  		this.$emit("success");
  	}
  },
  watch:{
  	show(){
  		this.dialogShow=this.show;
  	}
  }
}
</script>
