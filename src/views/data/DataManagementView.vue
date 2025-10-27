<!-- DataManagementView.vue -->
<template>
    <div>
      <ProTable :columns="columns" :request="getDataList">
        <template #toolbar>
          <a-button type="primary">新建</a-button>
        </template>
        <!-- 自定义操作列 -->
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-space>
              <a>编辑</a>
              <a>删除</a>
            </a-space>
          </template>
        </template>
      </ProTable>
    </div>
  </template>
  
  <script setup>
  import ProTable from '@/components/Pro/ProTable/index.vue'
  import { getDataList } from '@/api/data' // 导入API函数
  
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: '文件名', dataIndex: 'original_filename', key: 'filename' },
    { title: '创建时间', dataIndex: 'uploaded_at', key: 'createdAt' },
    { title: '操作', key: 'action' },
  ]
  </script>