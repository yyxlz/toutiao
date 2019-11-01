// 封装一个 插件 注册全局组件
// 引入
import MyBread from '@/components/my-bread'
export default {
  install (Vue) {
    Vue.component(MyBread.name, MyBread)
  }
}
