// src/stores/userStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login as loginApi } from '@/api/auth'
import router from '@/router'

export const useUserStore = defineStore('user', () => {
  // state
  const token = ref(null)
  const userInfo = ref({}) // 可以用来存储/users/me返回的用户信息

  // actions
  async function login(loginData) {
    try {
      const response = await loginApi(loginData)
      token.value = response.access_token
      // 登录成功后跳转到首页
      router.push('/')
      return true
    } catch (error) {
      console.error('Login failed in store:', error)
      return false
    }
  }

  function logout() {
    token.value = null
    userInfo.value = {}
    // 退出登录后跳转到登录页
    router.push('/login')
  }

  // getters (隐式存在,可以直接访问 .value)

  return { token, userInfo, login, logout }
})