<template>
  <div class = "nav">
    <PickerSelect v-bind='pickerSelect'
      :items='cityList'
      :pageName = 'pageName'
      v-on:sureSelect = 'sureSelect' >
    </PickerSelect>
    <text class = "addCityButton"
      v-if = "pageName == '添加城市'"
      @click = "gotoUrl('indexPage')">{{goIndexBtn}}</text>
    <text class = "pageName" >{{pageName}}</text>
    <text class = "addCityButton" v-on:click = "gotoUrl">+</text>
  </div>
</template>

<script>
import PickerSelect from '../pickSelect/pickSelect.vue'

export default {
  props: {
    pageName: '',
    goIndexBtn: '',
    cityList: null,
    pickerSelect: null
  },
  methods: {
    gotoUrl: function () {
      console.log(this.cityList)
      this.$emit('gotoUrl', 'addCity')
    },
    sureSelect: function (info) {
      this.$emit('sureSelect', info)
    }
  },
  components: {
    PickerSelect
  },
  created: function () {
    console.log(this.$router, 'header组件专家')
    // console.log('完成数据绑定之后，模板编译之前被触发');
  }
}
</script>

<style>
.nav{
  width: 750px;
  height: 80px;
  flex-direction:row;
  justify-content: space-between;
  align-items: center;
}
.addCityButton {
  font-size: 40px;
  color: #ffffff;
  width: 80px;
  height: 80px;
  text-align: center;
  line-height: 80px;
}
.pageName{
  font-size: 40px;
  color: #ffffff;
  /*width: 80px;*/
  height: 80px;
  text-align: center;
  line-height: 80px;
}
</style>
