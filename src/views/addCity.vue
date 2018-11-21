<template>
  <div>
    <image :src="background" class="background" />
    <div class = 'addCity'>
      <input class = "addCityInput" placeholder = "请输入要添加的城市"
        autofocus = 'true'
        @input = 'addCityInputChange'/>
      <div class = 'searchList'>
        <text>搜索记录:  {{inputValue}}</text>
      </div>
      <div class = "btnBox">
        <text class = "btn" v-on:click = 'sureSubmit'>添加</text>
      </div>
    </div>

  </div>
</template>

<script>
import mixins from '../mixins'
import store from '../store/store'
const storage = weex.requireModule('storage')

export default {
  mixins: [mixins],
  store,
  data () {
    return {
      background: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524032806073&di=e069259f71926799c7db3a8eb2627881&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01476f579842940000018c1b6681b3.png%401280w_1l_2o_100sh.png',
      inputValue: '',
      // cityList: store.state.cityList
      // pickerSelect: store.state.pickerSelect,
    }
  },
  methods: {
    addCityInputChange: function (event) {
      storage.getItem('initData', event => {
        console.log(typeof event.data)
        console.log(event.data, '类型')
      })

      this.inputValue = event.value
    },
    sureSubmit: function () {


      let dataHas = false
      let inputValue = this.inputValue

      storage.getItem('addCity', event => {

        if (event.data !== 'undefined') {
          inputValue = event.data + ',' + inputValue
        }

        storage.setItem('addCity', inputValue)
      })

      this.push('index')
    }
  }
}
</script>

<style>
  .addCity {
    align-items: center;
  }
  .background {
    width: 750px;
    position: absolute;
    height: 1230px;
  }
  .addCityInput{
    width: 420px;
    height: 70px;
    padding: 10px;
    font-size: 28px;
    margin-top: 200px;
    margin-bottom: 100px;
    border-style: solid;
    border-width: 1px;
    border-color: #ffffff;
    background-color: rgba(255, 255, 255, 0.1);
    outline-color: #ffffff;
  }
  .btnBox {
    align-items: center;
  }
  .btn {
    width: 300px;
    height: 70px;
    font-size: 28px;
    color: #ffffff;
    text-align: center;
    line-height: 70px;
    background-color: #4990e2;
    border-width: 1px;
    border-style: solid;
    border-color: #2f80de;
    cursor: pointer;
    border-radius: 6px;
  }
  .btn:hover {
    background-color: #3c88e0;
    border-color: #2276d6;
  }
  .searchList {
    margin-bottom: 40px;
  }
</style>
