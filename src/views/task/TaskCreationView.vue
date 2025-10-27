<!-- TaskCreationView.vue -->
<template>
    <div style="width: 500px; margin: 0 auto;">
      <ProForm :form-items="taskFormItems" :on-submit="handleCreateTask" @submit-success="onSuccess" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import ProForm from '@/components/Pro/ProForm/index.vue'
  import { createTask } from '@/api/task'
  import { message } from 'ant-design-vue'
  
  // 用JSON定义表单
  const taskFormItems = ref([
    {
      name: 'data_id',
      label: '数据ID',
      type: 'input',
      rules: [{ required: true, message: '请输入数据ID' }],
      placeholder: '请输入要分析的数据ID'
    },
    {
      name: 'task_type',
      label: '任务类型',
      type: 'select',
      rules: [{ required: true, message: '请选择任务类型' }],
      options: [
        { value: 'SEGMENTATION', label: '语义分割' },
        { value: 'DETECTION', label: '目标检测' },
      ],
      defaultValue: 'SEGMENTATION'
    },
  ])
  
  const handleCreateTask = async (values) => {
    // ProForm会把表单数据作为values传入
    return await createTask(values)
  }
  
  const onSuccess = (result) => {
    message.success(`任务创建成功，任务ID: ${result.id}`)
    // 跳转到任务列表页...
  }
  </script>