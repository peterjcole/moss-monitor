import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

import Home from '../views/Home.vue'
import {store, mutations} from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/login',
    beforeEnter: () => {
      const awairUrl = new URL('https://oauth-login.awair.is')
      awairUrl.searchParams.append('client_id', process.env.VUE_APP_AWAIR_CLIENT_ID)
      awairUrl.searchParams.append('redirect_uri', `${window.location.origin}/redirect`)
      awairUrl.searchParams.append('response_type', 'code')
      awairUrl.searchParams.append('scope', '')
      awairUrl.searchParams.append('state', '')
      window.location.replace(awairUrl)
    },
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/redirect',
    beforeEnter: (to, from, next) => {
      const { code } = to.query
      axios
        .post('/api/token', {
          code,
        })
        .then((res) => {
          console.log(res)
          mutations.setToken(res.data.access_token)
          window.localStorage.setItem('knownUser', true)
          next('/')
        })
        .catch((err) => {
          console.log(err)
          // next('/login')
        })
    },
    meta: {
      requiresAuth: false,
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth === true)) {
    mutations.retrieveTokenFromLocalStorage()
    const isAuthenticated = !!store.token
    const knownUser = window.localStorage.getItem('knownUser')
    isAuthenticated ? next() : knownUser ? next('/login') : next('/about')
  } else {
    next()
  }
})


export default router
