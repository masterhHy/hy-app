<template>
<div class="item" :class="starClass"></div>
</template>

<script>
    export default {
        name: 'Stars',
        data () {
          return {
            score:0
          }
        },
        computed:{
          starClass:function () {
            
          }
        }
    }
</script>

<style scoped>

</style>
