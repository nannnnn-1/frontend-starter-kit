<template>
    <a-layout style="min-height: 100vh; background: #fff">
      <a-layout-sider width="250" style="background: #fff; border-right: 1px solid #f0f0f0;">
        <div class="header">
          <h2>组件游乐场</h2>
          <p>在此隔离测试和展示组件。</p>
        </div>
        <a-menu
          v-model:selectedKeys="selectedKeys"
          mode="inline"
          @click="handleMenuClick"
        >
          <a-menu-item-group key="pro" title="增强组件 (Pro)">
            <a-menu-item key="/dev/pro-table">ProTable</a-menu-item>
            <a-menu-item key="/dev/pro-form">ProForm</a-menu-item>
          </a-menu-item-group>
          <a-menu-item-group key="business" title="业务组件 (Business)">
            <a-menu-item key="/dev/image-comparator">ImageComparator</a-menu-item>
            <a-menu-item key="/dev/map-view">MapView</a-menu-item>
            <a-menu-item key="/dev/result-viewer">ResultViewer</a-menu-item>
          </a-menu-item-group>
        </a-menu>
      </a-layout-sider>
      <a-layout-content style="padding: 24px;">
        <router-view />
      </a-layout-content>
    </a-layout>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  
  const router = useRouter();
  const route = useRoute();
  const selectedKeys = ref([route.path]);
  
  watch(() => route.path, (newPath) => {
    selectedKeys.value = [newPath];
  });
  
  const handleMenuClick = ({ key }) => {
    router.push(key);
  };
  </script>
  
  <style scoped>
  .header {
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
  }
  .header h2 {
    margin-bottom: 8px;
  }
  </style>