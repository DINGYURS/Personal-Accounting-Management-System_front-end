import { createApp } from 'vue'
import '@fortawesome/fontawesome-free/css/all.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/index.js'
import '@/assets/main.scss'
import pinia from '@/stores/index.js'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)

//全局注册命令
// app.directive('focus', {
//   mounted: (el) => {
//     el.focus()
//     console.log(el)
//   }
// })

app.use(pinia)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn
})

app.mount('#app')
