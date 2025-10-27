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
        <a-sub-menu key="project">
          <template #icon><DatabaseOutlined /></template>
          <template #title>项目管理</template>
          <a-menu-item key="/project/list">项目列表</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="data">
          <template #icon><FileOutlined /></template>
          <template #title>数据管理</template>
          <a-menu-item key="/data/management">数据列表</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="task">
          <template #icon><ClockCircleOutlined /></template>
          <template #title>任务管理</template>
          <a-menu-item key="/task/creation">创建任务</a-menu-item>
          <a-menu-item key="/task/list">任务列表</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="visualization">
          <template #icon><BarChartOutlined /></template>
          <template #title>可视化展示</template>
          <a-menu-item key="/visualization/data">数据可视化</a-menu-item>
          <a-menu-item key="/visualization/task">任务结果可视化</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="user">
          <template #icon><UserOutlined /></template>
          <template #title>用户管理</template>
          <a-menu-item key="/user/list">用户列表</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="api">
          <template #icon><ApiOutlined /></template>
          <template #title>接口管理</template>
          <a-menu-item key="/api/list">接口列表</a-menu-item>
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
    FileOutlined,
    BarChartOutlined,
    UserOutlined,
    SettingOutlined,
    ClockCircleOutlined,
    ApiOutlined,
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