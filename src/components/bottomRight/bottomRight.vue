/*
*  BottomRight.vue  底部文章阅读完成组件
*  shimuhui
*/
<template>
  <div ref = 'tickWrapper' v-show = 'isShow'>
    <div class = 'tickBg'>
      <div class = 'tick'>
        <div class = 'tickCover' :class="{ run: isRun}"></div>
      </div>
    </div>
    <p class = 'tickTitle'>您已阅读完这篇文章~</p>
  </div>
</template>
<script>
export default {
  name: 'BottomRight',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isRun: false
    };
  },
  methods: {
    // 监听页面滚动到底部函数
    tickScrollTop () {
      this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
      let h = document.body.clientHeight - this.scroll;

      if (h < document.documentElement.clientHeight + 114/750*2*document.documentElement.clientWidth) {
        console.log(h);
        this.isRun = true;
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.tickScrollTop);
  },
};
</script>
<style lang = "scss" scoped>
  @import "./bottomRight.scss";
</style>
