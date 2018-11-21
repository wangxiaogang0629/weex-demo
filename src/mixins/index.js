
function isWeex () {
  console.log('23232', process.env.COMPILE_ENV);
  return process.env.COMPILE_ENV === 'weex' // 需要在webpack中自定义
}

export default {

  methods: {

    push (path, query) {
    console.log(isWeex())
      if (isWeex()) {
        const toUrl = weex.config.bundleUrl.split('/').slice(0, -1).join('/') + '/' + path + '.js' // 将a.js的绝对地址转为b.js的绝对地址
        weex.requireModule('navigator').push({
          url: toUrl + '?data=' + query,
          animated: 'true'
        })
      } else {
        console.log('vue-route');
        this.$router.push({path: path, query: {data: query}}) // 使用vue-router
      }
    },

    pop () {
      if (isWeex()) {
        weex.requireModule('navigator').pop({
          animated: 'true'
        })
      } else {
        window.history.back()
      }
    }

  }

}
