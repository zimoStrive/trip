import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'

import App from './App.vue'

//引入样式
import 'normalize.css'
import '@/assets/css/index.css'

const app = createApp(App)

app.use(createPinia()).use(router)


app.mount('#app')
