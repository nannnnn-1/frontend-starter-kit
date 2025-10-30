// src/router/guards.js

import { useUserStore } from '@/stores/userStore'

// 定义一个不需要登录就能访问的页面的白名单
const whiteList = ['/login', '/dev/map-view', '/visualization/task']

export function createRouterGuards(router) {
  router.beforeEach(async (to, from, next) => {
    // NProgress.start() // (可选) 在页面顶部显示加载进度条

    const userStore = useUserStore()
    const token = userStore.token

    if (token) {
      // --- 用户已登录 ---
      if (to.path === '/login') {
        // 如果已登录，还想去登录页，则重定向到首页
        next({ path: '/' })
      } else {
        // (可选的高级逻辑) 如果还没有用户信息，可以在这里触发一个action去获取
        // if (!userStore.userInfo.id) {
        //   try {
        //     await userStore.getUserInfo()
        //     next()
        //   } catch (error) {
        //     // 获取用户信息失败，可能token已过期，登出
        //     await userStore.logout()
        //     next(`/login?redirect=${to.path}`)
        //   }
        // } else {
        //   next()
        // }
        // MVP阶段简化：只要有token就放行
        next()
      }
    } else {
      // --- 用户未登录 ---
      if (whiteList.includes(to.path)) {
        // 如果要去的是白名单页面（如登录页），则直接放行
        next()
      } else {
        // 如果要去的是其他需要认证的页面，则重定向到登录页
        // 将目标路径作为查询参数，方便登录后跳回
        console.log('User not logged in, redirecting to login page.')
        next(`/login?redirect=${to.path}`)
      }
    }
  })

  router.afterEach((to) => {
    // 更新页面标题
    if (to.meta.title) {
      document.title = `${to.meta.title} - Phoenix Platform`
    } else {
      document.title = 'Phoenix Platform'
    }
    // NProgress.done() // (可选) 结束进度条
  })
}
