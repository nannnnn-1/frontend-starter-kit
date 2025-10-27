// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import 'leaflet/dist/leaflet.css';
import { piniaPersistPlugin } from './stores/plugins/persist'
import { createRouterGuards } from './router/guards'
const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPersistPlugin)
app.use(pinia)

app.use(router)
app.use(Antd)
createRouterGuards(router)
app.mount('#app')
