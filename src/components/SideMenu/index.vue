<template>
    <div class="side-menu-container">
      <div class="logo">
        <img src="@/assets/logo.svg" alt="logo" />
        <h1 v-if="!collapsed">Phoenix Kit</h1>
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="inline"
        :collapsed="collapsed"
        @click="handleMenuClick"
      >
        <a-menu-item key="/dashboard">
          <template #icon><PieChartOutlined /></template>
          <span>工作台</span>
        </a-menu-item>
        <a-sub-menu key="data">
          <template #icon><DatabaseOutlined /></template>
          <template #title>数据管理</template>
          <a-menu-item key="/data/management">数据列表</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="task">
          <template #icon><ApartmentOutlined /></template>
          <template #title>任务中心</template>
          <a-menu-item key="/task/creation">创建任务</a-menu-item>
          <a-menu-item key="/task/list">任务列表</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="dev">
          <template #icon><SettingOutlined /></template>
          <template #title>开发</template>
          <a-menu-item key="/dev/pro-table">ProTable</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import {
    PieChartOutlined,
    DatabaseOutlined,
    ApartmentOutlined,
    SettingOutlined,
  } from '@ant-design/icons-vue'
  
  // 接收父组件传递过来的折叠状态
  defineProps({
    collapsed: {
      type: Boolean,
      required: true,
    },
  })
  
  const router = useRouter()
  const route = useRoute()
  
  // 菜单选中状态与路由同步
  const selectedKeys = ref([route.path])
  
  watch(
    () => route.path,
    (newPath) => {
      selectedKeys.value = [newPath]
    }
  )
  
  const handleMenuClick = ({ key }) => {
    router.push(key)
  }
  </script>
  
  <style scoped>
  .side-menu-container {
    height: 100%;
    background: #001529;
  }
  .logo {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    overflow: hidden;
  }
  .logo img {
    height: 32px;
    width: 32px;
  }
  .logo h1 {
    color: white;
    font-size: 20px;
    margin: 0;
    white-space: nowrap;
  }
  </style>