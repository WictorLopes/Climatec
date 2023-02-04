import { createRouter, createWebHistory } from 'vue-router'
import homeView from '../views/homeView.vue'
import configView from '../views/configView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: homeView
  },
  {
    path: '/config',
    name: 'config',
    component: configView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router