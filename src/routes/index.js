import index from '../views/index.vue'
import next from '../views/next.vue'
import articleIndex from '../views/articleIndex.vue'
import write from '../views/write.vue'
import details from '../views/details.vue'
import me from '../views/me.vue'
import addCity from '../views/addCity.vue'

const routes = [
  { path: '/', redirect: '/index' },
  {
    name: 'index',
    path: '/index',
    component: index
  },
  {
    name: 'next',
    path: '/next',
    component: next
  },
  {
    name: 'articleIndex',
    path: '/articleIndex',
    component: articleIndex
  },
  {
    name: 'write',
    path: '/write',
    component: write
  },
  {
    name: 'details',
    path: '/details',
    component: details
  },
  {
    name: 'me',
    path: '/me',
    component: me
  },
  {
    name: 'addCity',
    path: '/addCity',
    component: addCity
  }

]

export default routes
