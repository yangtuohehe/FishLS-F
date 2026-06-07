import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js' // 引入路由配置文件

const app = createApp(App)

// 关键步骤：告诉 Vue 实例使用这个路由
app.use(router) 

app.mount('#app')