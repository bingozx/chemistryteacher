import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/index.vue')
  },
  {
    path: '/courseware',
    name: 'Courseware',
    component: () => import('@/views/Courses/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 