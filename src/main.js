import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'

import '@/styles/index.scss' // global css

Vue.config.productionTip = false

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

import '@/permission' // permission control

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
