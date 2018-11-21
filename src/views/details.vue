<template>
  <div>
    <div @click="click"><text class="title">{{ detailsInfo.title }}</text></div>
    <div class = 'detail-author-style'>
      <text style = 'color:#4a90e2'>{{ detailsInfo.author }}</text>
      <text style = "color:#bbb;margin-left: 30px;">2017-12-19 21:26</text>
    </div>
    <scroller class = 'scroller'>
    <div><text class = 'detail-con-style'>{{ detailsInfo.content }}</text></div>
    </scroller>

    <div style = 'align-items: center;color:#fff;margin-top: 100px;margin-bottom: 100px;'>
      <div class = 'detail-btn-style' @click = 'shapeBtn' :style = "{'background-color': isShape?'#bbb':'#4a90e2'}">
        <image src = 'http://192.168.100.17:8085/src/assets/image/Shape@2x.png' class = 'shape-img-style'></image>
        <text style = 'color:#fff;'>赞</text>
        <text style = 'font-size: 24px;color:#fff;'>（ {{shapeNub}} ）</text>
      </div>
    </div>
  </div>
</template>
<script>
import mixins from '../mixins'
const storage = weex.requireModule('storage')
const stream = weex.requireModule('stream');

export default {
  mixins: [mixins],
  data() {
    return {
      isShape: false,
      detailsInfo: {},
      shapeNub: 1,
      newTitle: '',
      newCon: '',
    }
  },
  created() {
    storage.getItem('title', event => {
      this.newTitle = event.data
    })
    storage.getItem('content', event => {
      this.newCon = event.data
    })
    storage.getItem('text', ({ result, data}) => {
      this.readInfo(data)
    })

  },
  methods: {
    click () {
      this.pop()
    },

    // 点赞
    shapeBtn() {
      if (this.isShape == false) {
        this.shapeNub = this.shapeNub + 1
        this.isShape = true
      }
    },

    // 读取数据详情信息
    readInfo(type) {
      if (type == 'new') {
        this.detailsInfo = {title: this.newTitle, content: this.newCon, author: '小童', type: 'new'}
      } else {
        var url = '/src/json/'+ type +'.json';

        var url = 'http://192.168.100.17:8085/src/json/'+ type +'.json';
        var _this = this;
        stream.fetch({
          method: 'GET',
          type: 'json',
          url: url
        },function(res) {
          if (res.ok) {
            console.log(res.data, '打印的数据')
            _this.detailsInfo = res.data
          }
        })
      }
    }
  }
}
</script>
<style scoped>
.title {
 font-size:52px;
 color: #3b464d;
 margin-left: 40px;
 margin-top: 80px;
 margin-bottom: 40px;
}

.detail-author-style {
  font-size: 24px;
  color: #4a90e2;
  margin-left: 40px;

  display: flex;
  flex-direction: row;
}

.detail-con-style {
  color: #3d464d;
  font-size: 32px;
  margin-left: 40px;
  margin-top: 40px;
  margin-right: 40px;
  line-height: 60px;
  word-break: break-word;
  text-overflow: scroll;
}

.detail-btn-style {
  width: 270px;
  height: 80px;
  border-radius: 4px;
  background-color: #4a90e2;
  color: #fff;
  font-size: 32px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.shape-img-style {
  width: 34px;
  height: 36px;
  margin-right: 20px;
}

</style>