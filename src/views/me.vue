<template>
  <div>
    <div class = 'wrapper-style'>
      <image src = 'http://192.168.100.17:8085/src/assets/image/9.png' class = 'head-img-style'></image>
      <text class = 'name-style'>流浪诗人</text>
    </div>
    <Footer v-on:jumpIndex = 'jumpIndex' v-on:jumpWrite = 'jumpWrite' v-on:jumpMe = 'jumpMe'/>
  </div>

</template>
<script>
import mixins from '../mixins'
import Footer from './footer.vue'

export default {
  mixins: [mixins],
   created() {
    console.log( '二分之一11111')
  },

  components: {
    Footer
  },

  methods: {
    click () {
      this.pop()
    },

    jumpIndex() {
      this.push('articleIndex')
    },

    jumpWrite() {
      this.push('write')
    },

    jumpMe() {
      this.push('me')
    },
  }
}
</script>
<style scoped>
  .wrapper-style {
    display: flex;
    align-items: center;
    padding-top: 200px;
  }

  .head-img-style {
    width: 160px;
    height: 160px;
    border-radius: 50%;
  }

  .name-style {
    margin-top: 40px;
  }
</style>