<template>
  <div @click="clickHandler">
    12345678
    {{content}}
    <slot name="other"></slot>
  </div>
</template>

<script>
  export default {
    name: 'Hello.vue',
    props: {
      content: {
        type: String,
        default: 'Hello'
      }
    },
    methods: {
      clickHander (e) {
        this.$emit('click', e)
      }
    }
  }
</script>

<style scoped>

</style>
