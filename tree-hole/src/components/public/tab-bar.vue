<template>
  <div class="tab-bar">
    <cube-tab-bar
      v-model="selectedLabelDefault"
      :data="tabs"
      @click="clickHandler">
    </cube-tab-bar>
  </div>
</template>

<script>
  export default {
    name: 'tab-bar',
    data () {
      return {
        selectedLabelDefault: 'Home',
        tabs: [{
          label: 'Home',
          icon: 'cubeic-home',
          routerName: 'AllHole'
        }, {
          label: 'Me',
          icon: 'cubeic-person',
          routerName: 'MyHole'
        }]
      }
    },
    methods: {
      clickHandler (label) {
        const routerName = this.tabs.find(item => item.label === label).routerName
        this.$router.push({name: routerName})
      }
    }
  }
</script>

<style scoped>
  .tab-bar {
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 500;
    background-color: #F4F4F4;
    border-top: 1px solid #E4E2E2;
  }
</style>
