import Vue from 'vue'
import App from './App.vue'

// 引入 饿了吗 ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
//  引入 axios
import axios from '@/api'

// 面包屑 组件
// import MyBread from '@/components/my-bread'
// Vue.component('my-bread', MyBread)
import MyBread from '@/components/my-bread'
//  封装组件
import MyChannel from './components/my-channel'
import '@/styles/index.less'

Vue.component('my-bread', MyBread)
Vue.component('my-channel', MyChannel)
Vue.prototype.$http = axios

// 使用 axios  在任何一个vue实例中 都可以引用 axios
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
