<template>
  <div class = "burgerMenu"
  v-if = "(pageName !== '添加城市')"
    @click = "pickCity">
    <div class = "burgerMenuItem"/>
    <div class = "burgerMenuItem"/>
    <div class = "burgerMenuItem"/>
  </div>
</template>

<script>
import '@weex-project/weex-picker/js/build/index.js'
const picker = weex.requireModule('picker')
export default {
  // name: 'PickerSelect',
  props: {
    pageName: {
      type: String,
      default() {
        return '';
      }
    },
    selectIndex: {
      type: Number,
      default() {
        return 0;
      }
    },
    items: {
      type: Array,
      default() {
        return [];
      }
    },
    selectionColor: {
      type: String,
      default() {
        return '#9b9b9b';
      }
    },
    confirmTitle: {
      type: String,
      default() {
        return '确定';
      }
    },
    cancelTitle: {
      type: String,
      default() {
        return '取消';
      }
    },
    cancelTitleColor: {
      type: String,
      default() {
        return '#f25b43';
      }
    },
    confirmTitleColor: {
      type: String,
      default() {
        return 'rgb(73, 144, 225)'
      }
    },
    height: {
      type: String,
      default() {
        return '500px';
      }
    },
    textColor: {
      type: String,
      default() {
        return '';
      }
    },
    title: {
      type: String,
      default() {
        return '选择器';
      }
    },

  },
  methods: {
    pickCity: function () {
      console.log(this.items, this.selectIndex)
      console.log(picker)
      // this.showCityList()
      picker.pick({
        index: this.selectIndex,
        items: this.items,
        selectionColor: this.selectionColor,
        confirmTitle: this.confirmTitle,
        title: this.title,
        cancelTitle: this.cancelTitle,
        cancelTitleColor: this.cancelTitleColor,
        confirmTitleColor: this.confirmTitleColor,
        textColor: this.textColor,
        height: this.height
      }, (ret) => {
        if (ret.result === 'success') {
          console.log(ret.data, 'ret.data')
          this.$emit('sureSelect', ret.data)
        }
      })
    }
  }
}
</script>

<style>
@import "../../src/picker.scss";
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
</style>
