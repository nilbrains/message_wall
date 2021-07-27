import './plugins/axios'
import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import Varlet from '@varlet/ui'
import '@varlet/ui/es/style.js'

import '@/styles/main.scss' // global css

import '@/permission' // permission control
import store from './store'

// import vConsole from '@/plugins/vconsole'

const app = createApp(App).use(store)
// app.use(vConsole)
app.use(router)
app.use(Varlet)
app.mount('#app')