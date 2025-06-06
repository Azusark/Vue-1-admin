
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//引入全局样式
import '@/styles/index.scss'
//引入自定义插件对象：注册整个项目全局组件
import globalComponent from '@/components'
//svg插件需要配置代码
import 'virtual:svg-icons-register'
//配置element-plus国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn.mjs'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus,{
    locale: zhCn
})

//安装自定义插件
app.use(globalComponent);





app.mount('#app')
