import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-plus/dist/index.css'
import ElementPlus, { ElMessage } from 'element-plus'
// 不用api文件封装方法的方式，组件this.$xxx方式
import Axios from 'axios'

const app = createApp(App)
Axios.defaults.baseURL = '/api'; // 作为标识，让webpack代理这个请求

app.config.globalProperties.$ajax = Axios


app.use(ElementPlus).use(store).use(router).mount('#app')