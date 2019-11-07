// 封装一个 插件 注册全局组件
// 引入
/// 注册全局组件
import MyBread from '@/components/my-bread'
import MyChannel from './my-channel.vue'
import MyIMG from '@/components/my-image'

export default {
  install (Vue) {
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannel.name, MyChannel)
    Vue.component(MyIMG.name, MyIMG)
  }
}
