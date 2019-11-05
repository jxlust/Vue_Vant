import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import PrintTxt from './components/PrintTxt.vue'
Vue.use(Router)

function dynamicPropsFn(route) {
  const now = new Date()
  return {
    name: (now.getFullYear() + '' + (route.params.name)) + '!'
  }
}
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '*',
      name: "404",
      component: () => import('./views/404.vue')
    },
    {
      path: '/',
      name: 'home',
      //命名视图
      components: {
        default: Home,
        a: PrintTxt
      }
      // redirect: '/login'
    },
    {
      path: '/one',
      name: 'home',
      //命名视图
      components: {
        default: Home
      }
      // redirect: '/login'

    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/login.vue'),
      // beforeEnter(to, from, next) {
      //   console.log('from', from);
      //   console.log('to', to);
      //   next();
      // },
    },
    {
      path: '/card',
      name: 'card',
      children: [{
          path: 'print',
          name: 'cardPrint',
          alias: ['lg', '/cardin'], //别名： print <==> lg , /card/print <==> /in 
          component: () => import('@/components/PrintTxt.vue')
          // component: PrintTxt
        },
        /*{
               path: '',
               component: PrintTxt
             }*/
      ],
      component: () => import('@/views/CardGoods.vue')
    },
    {
      path: '/goods-*',
      name: 'goods',
      component: () => import('@/views/Goods.vue')
    },
    {
      path: '/user/:id/:name',
      name: 'user',
      props: dynamicPropsFn,
      component: () => import('@/views/User.vue')
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    console.log('滚动行为to', to);
    console.log('滚动行为from', from);
    console.log('save', savedPosition);
    // return { x: 100, y: 100 }
    /**浏览器在按下 后退/前进 按钮时，才会有值，记录位置 */
    // if (savedPosition) {
    //   return savedPosition
    // } else {
    //   return {
    //     x: 0,
    //     y: 0
    //   }
    // }
    /** hash值 滚动到锚点 */
    // if (to.hash) {
    //   return {
    //     selector: to.hash
    //   }
    // }

    /**异步滚动 返回promise */
    return new Promise((resolve) => {
      setTimeout(() => {
        if (to.hash) {
          resolve({
            selector: to.hash
          })
        } else {
          //falsy
          resolve(false);
        }

      }, 2000);
    })
  }

})