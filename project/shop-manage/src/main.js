import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-plus/dist/index.css'
import '@/assets/style/index.scss'
import ElementPlus, { ElMessage } from 'element-plus'
// 不用api文件封装方法的方式，组件this.$xxx方式
import Axios from 'axios'

const app = createApp(App)
Axios.defaults.baseURL = '/api'; // 作为标识，让webpack代理这个请求

// 请求拦截器
Axios.interceptors.request.use(function (config) {
    const token = window.sessionStorage.getItem('token', token) || ''
    if (token) {
        config.headers.token = token // 添加token请求头
    }
    return config
})

// 响应拦截器
Axios.interceptors.response.use(function (res) {
    const { token, code } = res.data
    if (code === 200) {
        if (token) {
            window.sessionStorage.setItem('token', token)
        }
    } else if (code === 401) {
        ElMessage.error('您暂无权限访问')
        router.replace('/401')
    }
    return res
})

app.config.globalProperties.$ajax = Axios


app.use(ElementPlus).use(store).use(router).mount('#app')