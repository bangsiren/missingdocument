import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/upload-document',
    name: 'UploadDocument',
    component: () => import("../views/UploadDocument/Index.vue")
  },
  {
    path: "/security",
    name: 'security',
    component: () => import("../views/Security/Index.vue")
  }
  ,
  {
    path: "/donations",
    name: 'donations',
    component: () => import("../views/Donations/Index.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),

  routes
})

export default router
