<template>
    <a-form
      ref="formRef"
      :model="formState"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
      @finish="onFinish"
    >
      <a-form-item
        v-for="item in formItems"
        :key="item.name"
        :label="item.label"
        :name="item.name"
        :rules="item.rules"
      >
        <!-- 输入框 -->
        <a-input
          v-if="item.type === 'input'"
          v-model:value="formState[item.name]"
          :placeholder="item.placeholder"
        />
        <!-- 密码框 -->
        <a-input-password
          v-else-if="item.type === 'password'"
          v-model:value="formState[item.name]"
          :placeholder="item.placeholder"
        />
        <!-- 选择器 -->
        <a-select
          v-else-if="item.type === 'select'"
          v-model:value="formState[item.name]"
          :placeholder="item.placeholder"
          :options="item.options"
        />
        <!-- 更多类型的表单控件可以继续添加... -->
      </a-form-item>
  
      <a-form-item :wrapper-col="{ offset: 6, span: 18 }">
        <a-space>
          <a-button type="primary" html-type="submit" :loading="loading">
            提交
          </a-button>
          <a-button @click="resetForm">重置</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted } from 'vue'
  
  const props = defineProps({
    // 表单项的JSON配置数组
    formItems: {
      type: Array,
      required: true,
    },
    // 表单提交时调用的API函数
    onSubmit: {
      type: Function,
      required: true,
    },
  })
  const emit = defineEmits(['submit-success'])
  
  const formRef = ref(null)
  const formState = reactive({})
  const loading = ref(false)
  
  // 根据配置初始化formState
  onMounted(() => {
    props.formItems.forEach((item) => {
      formState[item.name] = item.defaultValue || null
    })
  })
  
  const onFinish = async (values) => {
    loading.value = true
    try {
      const result = await props.onSubmit(values)
      emit('submit-success', result)
    } catch (error) {
      console.error('Form submission failed:', error)
    } finally {
      loading.value = false
    }
  }
  
  const resetForm = () => {
    formRef.value.resetFields()
  }
  
  // 暴露方法给父组件
  defineExpose({
    resetForm,
  })
  </script>