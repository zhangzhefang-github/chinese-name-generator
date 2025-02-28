// 从CDN导入Vue相关库
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import { createRouter, createWebHistory } from 'https://unpkg.com/vue-router@4/dist/vue-router.esm-browser.js'
import { createPinia } from 'https://unpkg.com/pinia@2/dist/pinia.esm-browser.js'
import App from './App.js'
import Home from './views/Home.js'
import NameGenerator from './views/NameGenerator.js'
import History from './views/History.js'
import Feedback from './views/Feedback.js'

// 创建路由
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/generate', component: NameGenerator },
    { path: '/history', component: History },
    { path: '/feedback', component: Feedback }
  ]
})

// 创建Pinia状态管理
const pinia = createPinia()

// 创建Vue应用
const app = createApp(App)

// 使用插件
app.use(router)
app.use(pinia)

// 挂载应用
app.mount('#app') 