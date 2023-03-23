import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import print from 'vue3-print-nb'
import { pinia库, 订单类 } from '@仓库/pinia库';
//引入图标
import './assets/icon.js'
import lmButton from './components/新版按钮.vue'
import icon from '@组件/icons/Icon.vue'
import JsBarcode from "@组件/条形码.vue";


createApp(App)
.use(createPinia())
.use(router)
.use(print)
.component('lmb', lmButton)
.component('icon', icon)
.component("Barcode", JsBarcode)

.mount('#app')
//安装pinia之后调用
const 库 = pinia库()