/*
*  imgCard: 图片+文字
*  xiaotong
*/

<template>
  <div class = 'img-card-wrapper-style' v-on:click = "link(message.id)">
    <div class = 'img-card-title-wrapper-style'>
      <image src = 'http://192.168.100.17:8085/src/assets/image/9.png' class = 'head-img-style' ></image>
      <text style = 'margin-left:20px;'>{{message.author}}</text>
      <text style = 'margin-left:20px;color:#bbb;'>2小时前</text>
    </div>
    <div class = 'con-wrapper-style'>
      <div class = 'title-style'>{{message.title}}</div>
      <div class = 'content-style'>{{message.content}}</div>
    </div>

    <div class = 'shape-wrapper-style'>
      <image src = 'http://192.168.100.17:8085/src/assets/image/Shape_black@2x.png' class = 'shape-img-style'></image>
      <text class = 'shape-nub-style' style = 'margin-left:20px;'>23</text>
    </div>
  </div>
</template>

<style>
@import "../../assets/sass/func.scss";
.head-img-style {
  width: 60px;
  height: 60px;
  border-radius: 2px;
  border: 1px solid #d5d5d5;
  font-size: 24px;
  color: #555;
}

.img-card-title-wrapper-style {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  margin-left: 30px;
  margin-bottom: 15px;

}

.shape-img-style {
  width: 28px;
  height: 30px;
}

.shape-wrapper-style {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 20px;
  margin-bottom: 20px;
}

.shape-nub-style {
  font-size: 24px;
  color: #bbb;
}

.img-card-wrapper-style {
  
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
  margin-top: 42px;
  margin-left: 40px;
  margin-right: 40px;
} 

.con-wrapper-style {
  margin-top: 16px;
  margin-left: 40px;
  margin-right: 40px;
  margin-bottom: 20px;
}

.title-style {
  font-size: 36px;
  color: #212121;
  letter-spacing: 1.2px;
  margin-bottom: 8px;
}

.content-style {
  font-size: 28px;
  color: #6d6d6d;
  letter-spacing: 0.94px;
  font-family: PingFangSC-Light;


  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 44px;
}


</style>

<script>
  export default {
    data () {
      return {
        info: {}
      }
    },
    props: {
      'message': {
        type: Object
      },
    },

    methods: {
      link: function() {
        this.info = this.message;
        this.$emit('link', this.info);
      }
    }
  }

</script>
