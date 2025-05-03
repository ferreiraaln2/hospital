import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/sectors',
    name: 'sectors',
    component: () => import(/* webpackChunkName: "sectors" */ '../views/SectorList.vue')
  },
  {
    path: '/sectors/new',
    name: 'sector-new',
    component: () => import(/* webpackChunkName: "sector-form" */ '../views/SectorForm.vue')
  },
  {
    path: '/sectors/edit/:id',
    name: 'sector-edit',
    component: () => import(/* webpackChunkName: "sector-form" */ '../views/SectorForm.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router 