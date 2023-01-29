import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
//引入图标
import './assets/icon.js'
import lmButton from './components/新版按钮.vue'
import icon from '@组件/icons/Icon.vue'

createApp(App)
.use(createPinia())
.use(router)
.component('lmb', lmButton)
.component('icon', icon)
.mount('#app')
