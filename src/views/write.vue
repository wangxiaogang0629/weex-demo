<template>
  <div style = "padding-top: 50px;padding-left: 20px;padding-right:20px;">
    <div class = 'write-input-wrapper-style'>
      <input placeholder = '请输入标题' type = "text" class = 'write-input-wrapper-style' @change = 'titleChange'/>
    </div>

    <textarea placeholder = '请开始你的表演' type = "text"  class = 'write-con-style' rows = '15' @input = 'conChange'></textarea>

    <div class = 'creat-btn-style' @click = "creat">
      <text>发布</text>
    </div>
  </div>

</template>
<script>
import mixins from '../mixins'
const storage = weex.requireModule('storage')

export default {
  mixins: [mixins],
  data() {
    return {
      title: '',
      con: '',
    }
  },

 

  methods: {
    // 获取标题
    titleChange(event) {
      this.title = event.value
    },

    // 获取内容信息
    conChange(event) {
      this.con = event.value
    },

    creat () {
      storage.setItem('title', this.title)
      storage.setItem('content', this.con)
      console.log(this.con, '怎么会没有呢输入的内容')

      if (this.title != '' && this.con != '') {
        this.push('articleIndex')
      } 
    }
  }
}
</script>
<style scoped>
  .write-input-wrapper-style {
    height: 80px;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: #c5c5c5;
    padding-left: 20px;
  }

  .write-input-wrapper-style:focus {
    outline: none;
  }

  .write-con-style {
    min-height: 80px;
    margin-top: 40px;
    padding-left: 20px;
    line-height: 40px;
  }

  .creat-btn-style {
    width: 160px;
    height: 80px;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    color: #ccc;
    font-size: 36px;
    background-color: #e8e8e8;
    box-shadow: 2px 6px 14px 0 rgba(0,0,0,0.06);

  }
</style>

