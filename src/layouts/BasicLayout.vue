<template>
    <a-layout style="min-height: 100vh">
      <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
        <SideMenu :collapsed="collapsed" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0 16px;">
          <GlobalHeader :collapsed="collapsed" @toggle-collapse="toggleCollapse" />
        </a-layout-header>
        <a-layout-content style="margin: 16px;">
          <div style="padding: 24px; background: #fff; min-height: 360px;">
            <!-- 路由内容将在这里渲染 -->
            <router-view />
          </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          Phoenix AI Platform Kit ©2024 Created by YourTeam
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import SideMenu from '@/components/SideMenu/index.vue'
  import GlobalHeader from '@/components/GlobalHeader/index.vue'
  import { useAppStore } from '@/stores/appStore' // 我们需要创建这个store
  
  const appStore = useAppStore()
  
  // 使用Pinia来管理全局的折叠状态
  const collapsed = ref(appStore.sidebarCollapsed)
  
  const toggleCollapse = () => {
    collapsed.value = !collapsed.value
    appStore.toggleSidebar()
  }
  </script>