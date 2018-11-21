<template>
  <div>
    <div @click="click"><text class="title">点击跳转回去</text></div>
  </div>
</template>
<script>
import mixins from '../mixins'

export default {
  mixins: [mixins],
   created() {
    console.log( '二分之一11111')
  },
  methods: {
    click () {
      this.pop()
    }
  }
}
</script>
<style scoped>
.title {
  margin-top: 200px;
}
</style>


