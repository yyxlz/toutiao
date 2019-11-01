import Vue from 'vue'

import VueRouter from 'vue-router'
import Login from '../views/login/login.vue'
import Home from '../views/home/index.vue'
// import local from '../utils'
import Welcome from '../views/Welcome/index.vue'

//   引入   sessionStorage
import local from '../utils/index'
import article from '../views/article/index.vue'
import NotFound from '../views/404/index.vue'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    // 登录
    {
      path: '/login',
      component: Login
    },
    // 首页
    {
      path: '/',
      component: Home,
      children: [
        // 欢迎
        {
          path: '/',
          component: Welcome
        },
        {
          path: 'article',
          component: article
        }
      ]
    },
    // 404处理
    {
      path: '*',
      component: NotFound
    }
  ]
})

//  配置路由守卫
//  函数里面三个参数  to  from  next
//  to  跳转目标路由对象

router.beforeEach(function (to, from, next) {
  const user = local.getuser()
  if (to.path !== '/login' && !user) {
    return next('/login')
  }
  console.log('执行')

  next()
})

export default router
