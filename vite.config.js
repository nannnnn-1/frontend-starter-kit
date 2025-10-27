import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: 5173, // 可以指定开发服务器端口
    proxy: {
      // 代理 user-service
      '/api/user': {
        target: 'http://localhost:8000', // 目标后端服务地址
        changeOrigin: true, // 必须设置为 true
        rewrite: (path) => path.replace(/^\/api\/user/, ''), // 重写路径，去掉/api/user前缀
      },
      // 代理 data-service
      '/api/data': {
        target: 'http://localhost:8002',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/data/, ''),
      },
      // 代理 task-service
      '/api/task': {
        target: 'http://localhost:8004',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/task/, ''),
      },
      // ... 为其他服务添加类似配置
    }
  }
})
