import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import firebase from 'firebase/app'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { layout: 'main', auth: true },
  },
  {
    path: '/stream/:user/:id',
    name: 'Stream',
    meta: { layout: 'auth' },
    component: () => import('../views/Stream.vue')
  },
  {
    path: '/my-rooms',
    name: 'MyRooms',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/MyRooms.vue')
  },
  {
    path: '/my-rooms/edit/:id',
    name: 'RoomEdit',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/RoomEdit.vue')
  },
  {
    path: '/stream/:user/:id/products',
    name: 'Products',
    meta: { layout: 'auth' },
    component: () => import('../views/Products.vue')
  },
  {
    path: '/stream/:user/:id/users',
    name: 'Users',
    meta: { layout: 'auth' },
    component: () => import('../views/Users.vue')
  },
  {
    path: '/docs',
    name: 'Documentation',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Documentation.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: { layout: 'auth' },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/registration',
    name: 'Registration',
    meta: { layout: 'auth' },
    component: () => import('../views/Registration.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if(requireAuth && !currentUser) {
    next('/login')
  } else {
    next()
  }
})
export default router
