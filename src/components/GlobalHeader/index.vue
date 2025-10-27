<template>
    <div class="global-header">
      <div class="left-content">
        <component
          :is="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined"
          class="trigger"
          @click="toggleCollapse"
        />
      </div>
      <div class="right-content">
        <a-dropdown>
          <a class="ant-dropdown-link" @click.prevent>
            <a-avatar
              src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
            />
            <span class="username">Admin</span>
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:;">个人中心</a>
              </a-menu-item>
              <a-menu-item @click="handleLogout">
                <a href="javascript:;">退出登录</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </template>
  
  <script setup>
  import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DownOutlined,
  } from '@ant-design/icons-vue'
  import { useUserStore } from '@/stores/userStore'
  
  // 定义props和emits
  const props = defineProps({
    collapsed: {
      type: Boolean,
      required: true,
    },
  })
  const emit = defineEmits(['toggle-collapse'])
  
  const userStore = useUserStore()
  
  const toggleCollapse = () => {
    emit('toggle-collapse')
  }
  
  const handleLogout = () => {
    userStore.logout()
  }
  </script>
  
  <style scoped>
  .global-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
  .left-content .trigger {
    font-size: 18px;
    cursor: pointer;
    transition: color 0.3s;
  }
  .left-content .trigger:hover {
    color: #1890ff;
  }
  .right-content .ant-dropdown-link {
    display: flex;
    align-items: center;
    gap: 8px;
    color: inherit;
  }
  .right-content .username {
    font-weight: 500;
  }
  </style>