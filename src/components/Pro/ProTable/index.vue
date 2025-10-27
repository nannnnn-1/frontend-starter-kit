<template>
    <div class="pro-table-container">
      <!-- 未来可以添加查询表单插槽 -->
      <!-- <div class="query-form"> ... </div> -->
  
      <div class="toolbar">
        <!-- 工具栏插槽，用于放置“新建”等按钮 -->
        <slot name="toolbar"></slot>
      </div>
  
      <a-table
        :columns="columns"
        :data-source="dataSource"
        :loading="loading"
        :pagination="pagination"
        @change="handleTableChange"
        row-key="id"
      >
        <!-- 允许父组件自定义列的渲染 -->
        <template v-for="slotName in Object.keys($slots)" #[slotName]="slotProps">
          <slot :name="slotName" v-bind="slotProps"></slot>
        </template>
      </a-table>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted, watch } from 'vue'
  
  const props = defineProps({
    // 表格列的定义
    columns: {
      type: Array,
      required: true,
    },
    // 获取数据的API函数
    request: {
      type: Function,
      required: true,
    },
    // 初始查询参数
    initialParams: {
      type: Object,
      default: () => ({}),
    },
  })
  
  const dataSource = ref([])
  const loading = ref(false)
  
  // 分页状态
  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showTotal: (total) => `共 ${total} 条`,
  })
  
  // 获取表格数据
  const fetchData = async () => {
    loading.value = true
    try {
      const params = {
        page: pagination.current,
        pageSize: pagination.pageSize,
        ...props.initialParams, // 合并初始查询参数
      }
      // 调用父组件传入的API函数
      // 假设API返回的数据结构是 { data: [], total: 100 }
      const response = await props.request(params)
      console.log(response)
      dataSource.value = response.data
      pagination.total = response.total
    } catch (error) {
      console.error('Failed to fetch table data:', error)
    } finally {
      loading.value = false
    }
  }
  
  // 当分页、排序、筛选变化时触发
  const handleTableChange = (pager) => {
    pagination.current = pager.current
    pagination.pageSize = pager.pageSize
    fetchData()
  }
  
  // 组件挂载时，加载第一页数据
  onMounted(() => {
    fetchData()
  })
  
  // 提供一个供父组件调用的刷新方法
  const reload = () => {
    pagination.current = 1
    fetchData()
  }
  
  // 暴露方法给父组件
  defineExpose({
    reload,
  })
  </script>
  
  <style scoped>
  .toolbar {
    margin-bottom: 16px;
    display: flex;
    justify-content: flex-end;
  }
  </style>