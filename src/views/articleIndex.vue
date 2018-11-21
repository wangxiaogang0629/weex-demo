<template>
  <div style = "margin-top:20px;">
    <scroller class = 'scroller' style = 'padding-bottom: 130px;'>
      <div v-for = "info in infoArr">
        <ImgCard :message = "info" v-on:link = 'jumpLink(info.type)'></ImgCard>
      </div>

      <loading class="loading" @loading="onloading" :display="loadinging ? 'show' : 'hide'">
        <text class="indicator-text">Loading ...</text>
        <loading-indicator class="indicator"></loading-indicator>
      </loading>
    </scroller>

    <Footer v-on:jumpIndex = 'jumpIndex' v-on:jumpWrite = 'jumpWrite' v-on:jumpMe = 'jumpMe'/>
  </div>
</template>
<script type="text/ecmascript-6">
  import mixins from '../mixins'
  // 引用组件
  import ImgCard from '../components/imgCard/imgCard.vue'
  import Footer from './footer.vue'
  const modal = weex.requireModule('modal')
  const storage = weex.requireModule('storage')
  const stream = weex.requireModule('stream');

  export default {
    mixins: [mixins],
    data () {
      return {
        infoArr: [],
        message: {},
        loadinging: false,
        detailType: '',
        newTitle: '',
        newCon: ''
      }
    },

    components: {
      ImgCard,
      Footer
    },

    created() {
      this.readJson()
      storage.getItem('title', event => {
        this.newTitle = event.data
      })
      storage.getItem('content', event => {
        this.newCon = event.data
        console.log(event.data, 'zzhe')
      })
    },

    methods: {
      click () {
        this.pop()
      },

      // 读取json的目录数据
      readJson() {
        var url = 'http://192.168.100.17:8085/src/json/catalog.json';
        var _this = this;
        stream.fetch({
          method: 'GET',
          type: 'json',
          url: url
        },function(res) {
          if (res.ok) {
            _this.infoArr = res.data.info

            if ( _this.newTitle != 'undefind' || _this.newCon != 'undefind') {
              _this.infoArr.push({title: _this.newTitle, content: _this.newCon, author: '小童', type: 'new'})
            }
          }
        })
      },

      // 跳转页面
      jumpLink(type) {
        storage.setItem('text', type, ({ result }) => {
          if (result === 'success') {
            this.push('details')
          }
        })
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

      // 上拉加载数据
      onloading (event) {
        modal.toast({ message: 'Loading', duration: 1 })
        this.loadinging = true
     
        setTimeout(() => {
          this.loadinging = false
        }, 2000)
      }
    },

  }
</script>
<style scoped>
.loading {
    width: 750;
    display: -ms-flex;
    display: -webkit-flex;
    display: flex;
    -ms-flex-align: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    align-items: center;
  }
  .indicator-text {
    color: #888888;
    font-size: 42px;
    text-align: center;
  }
  .indicator {
    margin-top: 16px;
    height: 40px;
    width: 40px;
    color: blue;
  }</style>





