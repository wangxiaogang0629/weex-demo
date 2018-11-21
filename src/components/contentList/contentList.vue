/*
*  ContentList.vue  文章部分渲染组件
*  shimuhui
*/
<template>
  <div class = 'contentList'>
    <div v-for = '(item, index) in items' :key="index" :id = index>
      <div v-if = 'item.type === 0' :class = 'item.class' class = 'imageDivStyle'>
        <img :src = 'item.content' alt="" class = 'imageStyle'>
      </div>
      <div v-if = 'item.type === 1'>
        <p class = 'contentStyle' :class = 'item.class'>{{ item.content }}</p>
      </div>
      <div v-if = 'item.type === 2'>
        <p class = 'contentStyle' :class = 'item.class'><br /></p> 
      </div>
      <div v-if = 'item.type === 3'>
        <p class = 'contentStyle contentRight' :class = 'item.class'>{{ item.content }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ContentList',
  props: {
    items: {
      type: Array,
      default: []
    }
  }
};
</script>
<style lang = "scss" scoped>
@import "./contentList.scss";
</style>
