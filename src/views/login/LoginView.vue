<template>
    <div class="login-container">
      <a-card class="login-card" title="登录 Phoenix 平台">
        <a-form :model="formState" @finish="onFinish">
          <a-form-item
            name="username"
            :rules="[{ required: true, message: '请输入邮箱!' }]"
          >
            <a-input v-model:value="formState.username" placeholder="邮箱">
              <template #prefix><UserOutlined /></template>
            </a-input>
          </a-form-item>
  
          <a-form-item
            name="password"
            :rules="[{ required: true, message: '请输入密码!' }]"
          >
            <a-input-password
              v-model:value="formState.password"
              placeholder="密码"
            >
              <template #prefix><LockOutlined /></template>
            </a-input-password>
          </a-form-item>
  
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              :loading="loading"
              style="width: 100%"
            >
              登 录
            </a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useUserStore } from '@/stores/userStore'
  import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
  import { message } from 'ant-design-vue'
  
  const formState = reactive({
    username: '',
    password: '',
  })
  const loading = ref(false)
  
  const userStore = useUserStore()
  const route = useRoute()
  const router = useRouter()
  
  const onFinish = async (values) => {
    loading.value = true
    const success = await userStore.login(values)
    loading.value = false
  
    if (success) {
      message.success('登录成功！')
      // --- 核心修改：处理redirect ---
      const redirect = route.query.redirect
      if (redirect) {
        router.push(redirect)
      } else {
        router.push('/')
      }
    }
    // 失败的提示已经在request.js的响应拦截器中处理了
  }
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f2f5;
  }
  .login-card {
    width: 400px;
  }
  </style>