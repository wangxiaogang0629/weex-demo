<template>
  <div class="wrapper">
    <link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">
    <image :src="background" class="background" />
    <MyHeader
      :pageName = 'pageName' v-on:gotoUrl="jump"
      :goIndexBtn = "goIndexBtn"
      :pickerSelect = 'pickerSelect'
      v-on:sureSelect = 'sureSelect'
      :cityList = 'cityList' />
    <div class = 'weatherInfo'>
      <div class = 'tmpBox'>
        <text class = 'tmp'>{{tmp}}</text>
        <text class = 'tmpUnit'>℃</text>
      </div>
      <text class = 'condTxt'>{{condTxt}}</text>
    </div>

    <div class="delAddCityListBtnBox">
      <text @click = 'delAddCityList'
        class = 'delAddCityListBtn'>清空添加城市</text>
    </div>

  </div>
</template>

<script>
import mixins from '../mixins'
import $ from 'jquery'
const stream = weex.requireModule('stream');
import store from '../store/store'
import PickerSelect from '../components/pickSelect/pickSelect.vue'
import MyHeader from '../components/header/header.vue'
const animation = weex.requireModule('animation')
const picker = weex.requireModule('picker')
const storage = weex.requireModule('storage')

export default {
  mixins: [mixins],
  name: 'App',
  store,
  components: {
    MyHeader,
    PickerSelect
  },
  data () {
    return {
      // background: "http://192.168.100.17:8085/src/assets/image/9.png",
      background: 'local:///Users/wangxiaogang/lianxi/weex-demo/src/assets/image/background.jpeg',
      goIndexBtn: '<',
      inputValue: '',
      pageName: '北京' ,
      // cityList: store.state.cityList,
      cityList: [],
      selectCityName: '选择城市',
      selectListIsShow: false,
      cityListShow: false,
      defaultSelectCity: '北京',
      value: '',
      pickerSelect: store.state.pickerSelect,
      tmp: '',
      condTxt: ''
    }
  },
  methods: {
    jump: function (path) {
      console.log(path)
      // console.log(path,this.$router)

      let selectCityName = this.selectCityName
      switch (path) {
        case 'indexPage':
          this.pageName = '今日天气'
          this.$router.push({name: path})
          break
        case 'addCity':
          // this.pageName = '添加城市'
          // store.commit('saveCity', '添加城市')
          this.push('addCity')
          break
        default:
      }
    },

    sureSelect: function (data) {
      let that = this
      this.selectCityName = this.cityList[data]

      console.log(data, this.cityList[data], 'wowowowowowoowowo')

      let _url = `https://free-api.heweather.com/s6/weather/now?key=7fa515daad2842d9bcc001031f109fce&location=${this.cityList[data]}`
      console.log(_url)

      stream.fetch({
        method: 'GET',
        type: 'json',
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded'
        },
        url: _url,
        // body: 'key=7fa515daad2842d9bcc001031f109fce&location=' + 'beijing'
      },function(res) {
        console.log(res)
        if (res.ok) {
          console.log(res,'res')
          let _res = res.data
          console.log(_res)
          let _info = _res['HeWeather6'][0]
          console.log(_info,'info')
          that.tmp = _info.now.tmp
          that.condTxt = _info.now.cond_txt
          that.pageName = _info.basic.location
        }
      })
    },

    delAddCityList: function () {
      storage.removeItem('addCity', event => {
        this.cityList = ['beijing', 'shanghai', 'guangzhou']
        console.log(event.data, 'delete value:')
      })
    }

  },
  created: function () {
    let that = this

    stream.fetch({
      method: 'GET',
      type: 'json',
      url: 'https://free-api.heweather.com/s6/weather/now?key=7fa515daad2842d9bcc001031f109fce&location=' + 'beijing',
    },function(res) {
      if (res.ok) {
        let _res = res.data
        let _info = _res['HeWeather6'][0]
        that.tmp = _info.now.tmp
        that.condTxt = _info.now.cond_txt
      }
    })

    let init = ['beijing', 'shanghai', 'guangzhou']

    storage.setItem('initData', init)

    storage.getItem('addCity', event => {

      if (event.data == 'undefined') {
        that.cityList = store.state.cityList
        return
      } else {
        console.log(event.data,'indexdata')
        let newCityList = event.data.split(',')

        newCityList.forEach((v) => {
          init.push(v)
        })
        this.cityList = init
        console.log(init,'initdata------------------')
      }
    })

    console.log('完成数据绑定之后，模板编译之前被触发');
  }
}
</script>

<style scoped>
  .weatherInfo {
    padding-top: 200px;
    flex-direction: row;
  }
  .tmp {
    margin-right: 10px;
    color: #ffffff;
    font-size: 96px;
  }
  .tmpUnit {
    color: #ffffff;
    font-size: 40px;
  }
  .tmpBox {
    flex-direction: row;
    margin-bottom: 50px;
  }
  .condTxt {
    color: #000000;
    font-size: 28px;
    padding-top: 60px;
  }
  .wrapper {
    align-items: center;
  }
  .background {
    width: 750px;
    position: absolute;
    height: 1230px;
  }
  /*.greeting {
    text-align: center;
    margin-top: 70px;
    font-size: 50px;
    color: #41B883;
  }
  .message {
    margin: 30px;
    font-size: 32px;
    color: #727272;
  }*/
  /*.addCityButton {
    font-size: 40px;
    color: #ffffff;
    width: 80px;
    height: 80px;
    text-align: center;
    line-height: 80px;
  }*/
  /*.pageName{
    font-size: 40px;
    color: #ffffff;
    height: 80px;
    text-align: center;
    line-height: 80px;
  }*/
  /*.nav{
    width: 750px;
    height: 80px;
    flex-direction:row;
    justify-content: space-between;
    align-items: center;
  }
  .addCityInput{
    width: 420px;
    height: 60px;
    font-size: 32px;
  }
  .burgerMenu {
    width: 80px;
    height: 38px;
    justify-content: space-between;
    padding-left: 20px;
    opacity: 0.5;
  }
  .burgerMenuItem {
    width: 36px;
    height: 4px;
    background-color: #ffffff;
  }
  .cityList {
    position: absolute;
    top: 0px;
    width: 750px;
    height: 600px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.4);
    align-items: center;
    padding-top: 100px;
  }
  .cityList-enter-active, .cityList-leave-active {
    transition: opacity .5s;
  }
  .cityList-enter, .cityList-leave-to {
    opacity: 0;
  }
  .saveSelected {
    position: absolute;
    bottom: 50px;
    left: 275px;
    width: 200px;
    font-size: 28px;
    color: #ffffff;
    height: 60px;
    text-align: center;
    line-height: 60px;
    text-align: center;
    background-color: #4990e2;
    border-width: 1px;
    border-style: solid;
    border-color: #2f80de;
    cursor: pointer;
    border-radius: 6px;
  }
  .closeCityList{
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background-color: rgba(255, 255, 255, 0.9);
    position: absolute;
    font-size: 24px;
    color: #000000;
    text-align: center;
    line-height: 50px;
    right: 20px;
    top: 20px;
    font-weight: bold;
  }
  .select {
    width: 400px;
    height: 50px;
    border-radius: 6px;
    border-width: 2px;
    border-color: #dddddd;
    border-style: solid;
    background-color: #ffffff;
    position: relative;
  }
  .selectInner {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  }
  .selectedText {
    font-size: 24px;
    line-height: 50px;
  }*/
  /*.selectList {
    background-color: #ffffff;
    width: 400px;
    height: 0;
    max-height: 400px;
    overflow: hidden;
    position: absolute;
    top: 64px;
    left: 0;
  }
  .selectListItem {
    background-color: #fff;
    border-bottom-color: #dddddd;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    font-size: 24px;
  }
  .selectIcon {
    font-size: 24px;
    line-height: 50px;
  }
  .select-enter-active, .select-leave-active {
    height: 150px;
    transition: all .5s;
  }
  .select-enter, .select-leave-to {
    height: 0px;
  }*/
  .delAddCityListBtnBox {
    position: absolute;
    right: 30px;
    bottom: 130px;
    align-items: center;
  }
  .delAddCityListBtn {
    width: 220px;
    height: 70px;
    font-size: 28px;
    color: #ffffff;
    text-align: center;
    line-height: 70px;
    background-color: #e0523c;
    border-width: 1px;
    border-style: solid;
    border-color: #d63b22;
    cursor: pointer;
    border-radius: 6px;
  }
</style>
