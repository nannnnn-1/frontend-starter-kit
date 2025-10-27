<template>
    <div>
      <h1>ProTable 组件测试</h1>
      <a-divider />
  
      <h2>基础用法</h2>
      <p>
        只需提供 `columns` 定义和 `request` API函数，即可自动处理分页和加载。
      </p>
  
      <ProTable
        ref="proTableRef"
        :columns="columns"
        :request="mockApiRequest"
      >
        <template #toolbar>
          <a-button type="primary" @click="proTableRef?.reload()">
            <ReloadOutlined /> 刷新
          </a-button>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <a-tag :color="record.status === 'active' ? 'green' : 'red'">
              {{ record.status.toUpperCase() }}
            </a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a>编辑</a>
          </template>
        </template>
      </ProTable>
  
      <a-divider />
      <h2>代码示例</h2>
      <pre><code>{{ usageCode }}</code></pre>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import ProTable from '@/components/Pro/ProTable/index.vue';
  import { ReloadOutlined } from '@ant-design/icons-vue';
  
  const proTableRef = ref(null);
  
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: '名称', dataIndex: 'name', key: 'name' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
    { title: '操作', key: 'action' },
  ];
  
  // 模拟API请求
  const mockApiRequest = (params) => {
    console.log('ProTable requested data with params:', params);
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = [];
        for (let i = 0; i < params.pageSize; i++) {
          const index = (params.page - 1) * params.pageSize + i + 1;
          data.push({
            id: index,
            name: `项目 ${index}`,
            status: Math.random() > 0.5 ? 'active' : 'inactive',
            createdAt: new Date().toISOString(),
          });
        }
        resolve({
          data,
          total: 100, // 模拟总共有100条数据
        });
      }, 1000); // 模拟1秒的网络延迟
    });
  };
  
  const usageCode = `
  <template>
    <ProTable :columns="columns" :request="apiFunction">
      <template #toolbar>
        <a-button>操作</a-button>
      </template>
    </ProTable>
  </template>
  <script setup>
    import ProTable from '@/components/Pro/ProTable/index.vue'
    
    const columns = [...]
    const apiFunction = (params) => { /* ... return Promise<{ data: [], total: number }> */ }
  <\/script>
  `;
  </script>
  
  <style scoped>
  pre {
    background: #f5f5f5;
    padding: 16px;
    border-radius: 4px;
  }
  </style>