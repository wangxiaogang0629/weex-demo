import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    count: 0,
    pickerSelect: {
      // selectIndex: 0,
      selectionColor: 'rgb(73, 144, 225)',
      confirmTitle: '保存',
      cancelTitle: '取消',
      cancelTitleColor: '#e25e49',
      confirmTitleColor: 'rgb(73, 144, 225)',
      height: '500px',
      textColor: '#000000',
      title: '选择当前展示城市'
    },
    cityList: ['beijing', 'shanghai', 'guangzhou'],
  },
  mutations: {
    add (state) {
      state.count++
      console.log(state.count, '去')
    },
    addCity: function (state, city) {
      state.cityList.push(city)
    },
    reduce: state => state.count--
  }
})


export default store
