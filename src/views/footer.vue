/*
*  footer: 底导
*  xiaotong
*/

<template>
  <div class = 'footer-wrapper-style'>
    <div @click = 'jumpIndex' class = 'font-style'><text>首页</text></div>
    <div @click = 'jumpWrite' class="add-style"><text style = 'color:#fff;'>＋</text></div>
    <div @click = 'jumpMe' class = 'font-style'><text>我</text></div>
  </div>
</template>

<style>
  .footer-wrapper-style {
    height: 80px;
    width: 750px;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 30px;
    padding-right: 30px;
    border-top-style: solid;
    border-top-width: 1px;
    border-top-color: #5c5c5c;

    position: fixed;
    bottom: 0px;
  }

  .add-style {
    width: 78px;
    height: 78px;
    border-radius: 50%;
    background-color: #4a90e2;

    justify-content: center;
    align-items: center;
    display: flex;
  }

  .font-style {
    color: #bbb;
    font-size: 32px;
  }
</style>

<script>
  import mixins from '../mixins'

  export default {
    data () {
      return {
        info: {},
        phoneWidth: 100
      }
    },
    props: {
      'message': {
        type: Object
      },
    },

    created() {
   
    },

    methods: {
      link: function() {
        this.info = this.message;
        this.$emit('link', this.info);
      },

      jumpIndex: function(e) {
        this.$emit('jumpIndex');
      },

      jumpWrite: function(e) {
        this.$emit('jumpWrite');
      },

      jumpMe: function(e) {
        this.$emit('jumpMe');
      }
    },
  }

</script>
