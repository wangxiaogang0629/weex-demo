import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from './store/store'
import VueResource from 'vue-resource'
Vue.use(VueRouter)
Vue.use(VueResource)

var router = new VueRouter({
  mode: 'history',
  routes,
})

new Vue({
  el: '#root',
  router,

  template: '<App/>',
  store,
  components: {App}
})
