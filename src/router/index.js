import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: 'home' */ '@/views/HomeView')
  },
  {
    path: '/movies',
    name: 'movie-board',
    component: () =>
      import(/* webpackChunkName: 'movie-board' */ '@/views/MovieBoard')
  },
  {
    path: '/movies/:id',
    name: 'movie-info',
    component: () =>
      import(/* webpackChunkName: 'movie-board' */ '@/views/MovieInfo')
  },
  {
    path: '*',
    name: 'not-found',
    component: () =>
      import(/* webpackChunkName: 'not-found' */ '@/views/NotFound')
  }
]

const router = new VueRouter({
  routes
})

export default router
