import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TambahDompet from '../views/TambahDompet.vue'
import ListDompet from '../views/ListDompet.vue'
import DetailDompet from '../views/DetailDompet.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dompet',
    name: 'dompet',
    component: ListDompet
  },
  {
    path: '/dompet/detail',
    name: 'detailDompet',
    component: DetailDompet
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
