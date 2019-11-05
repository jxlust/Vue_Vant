import Vue from 'vue'
import Page1 from './Page1.vue';
import router from './router'
import store from '../../store/index'
// import './mock/index'
Vue.config.productionTip = false

Vue.use(require('vue-wechat-title'))

new Vue({
  router,
  store,
  render: h => h(Page1)
}).$mount('#app')