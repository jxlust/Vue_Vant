import Vue from 'vue'
import Router from 'vue-router'
import Footer from '../../components/FooterBar.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/footer',
      name: 'home',
      component: Footer
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../../views/login.vue')
    }
  ]
})
