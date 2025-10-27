<template>
    <div class="result-viewer">
      <a-spin :spinning="loading" tip="加载结果中...">
        <div v-if="error" class="error-state">
          <a-alert :message="error" type="error" show-icon />
        </div>
        
        <div v-else-if="taskData">
          <!-- 根据任务类型动态渲染不同的结果展示组件 -->
          
          <!-- 语义分割结果 -->
          <div v-if="taskData.task_type === 'SEGMENTATION'" class="result-section">
            <h3>语义分割结果</h3>
            <p>左侧为原始影像，右侧为分割结果</p>
            <ImageComparator
              :image-left="originalImageUrl" 
              :image-right="taskData.result_url" 
            />
          </div>
  
          <!-- 目标检测结果 -->
          <div v-else-if="taskData.task_type === 'DETECTION'" class="result-section">
            <h3>目标检测结果</h3>
            <p>检测到 {{ detectionCount }} 个目标</p>
            <div style="position: relative;">
              <img :src="originalImageUrl" style="width: 100%;" />
              <!-- 在图片上绘制检测框 -->
              <div
                v-for="(det, index) in detectionResults"
                :key="index"
                class="detection-box"
                :style="getBoxStyle(det.box)"
              >
                <span class="box-label">{{ det.label }} ({{ det.score.toFixed(2) }})</span>
              </div>
            </div>
          </div>
  
          <!-- 未知类型 -->
          <div v-else class="result-section">
            <a-alert message="不支持的结果类型" :description="`无法预览任务类型: ${taskData.task_type}`" type="warning" />
          </div>
        </div>
      </a-spin>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue';
  import axios from 'axios';
  import ImageComparator from '@/components/Business/ImageComparator/index.vue';
  // MapView可以按需引入，如果分割结果需要地理信息
  // import MapView from '@/components/Business/MapView/index.vue';
  
  const props = defineProps({
    task: {
      type: Object,
      required: true,
    },
  });
  
  const loading = ref(true);
  const error = ref(null);
  const taskData = ref(null);
  
  const originalImageUrl = ref(''); // 原始图片的URL
  const detectionResults = ref([]); // 目标检测的结果
  const detectionCount = ref(0);
  
  // 获取原始图片的URL (这是一个挑战，需要调用data-service)
  // 假设我们有一个API可以根据data_id获取URL
  async function fetchOriginalImageUrl(dataId) {
    // 伪代码，需要替换为真实的API调用
    try {
      // 假设 /api/data/{id}/url 可以返回一个预签名URL
      const response = await axios.get(`/api/data/api/v1/${dataId}/url`);
      return response.data.url;
    } catch {
      return 'path/to/placeholder-image.jpg'; // 返回一个占位图
    }
  }
  
  // 获取目标检测的JSON结果
  async function fetchDetectionJson(resultUrl) {
    try {
      const response = await axios.get(resultUrl);
      return response.data.detections;
    } catch {
      return [];
    }
  }
  
  const getBoxStyle = (box) => {
    return {
      position: 'absolute',
      left: `${box.x_min}px`,
      top: `${box.y_min}px`,
      width: `${box.x_max - box.x_min}px`,
      height: `${box.y_max - box.y_min}px`,
      border: '2px solid #ff0000',
    };
  };
  
  const processTask = async (newTask) => {
    if (!newTask || !newTask.id) return;
  
    loading.value = true;
    error.value = null;
    taskData.value = newTask;
  
    try {
      // 1. 获取原始图片URL
      originalImageUrl.value = await fetchOriginalImageUrl(newTask.data_id);
  
      // 2. 根据任务类型处理结果
      if (newTask.task_type === 'DETECTION') {
        if(newTask.result_url) {
          detectionResults.value = await fetchDetectionJson(newTask.result_url);
          detectionCount.value = detectionResults.value.length;
        } else {
          // 如果后台还没返回result_url (例如，结果是直接内嵌在task对象里)
          // detectionResults.value = newTask.result.detections;
        }
      }
      // 其他类型...
  
    } catch (e) {
      error.value = '加载结果数据时出错';
    } finally {
      loading.value = false;
    }
  };
  
  // 监听传入的task对象变化
  watch(() => props.task, (newTask) => {
    processTask(newTask);
  }, { immediate: true, deep: true });
  
  </script>
  
  <style scoped>
  .detection-box {
    box-sizing: border-box;
  }
  .box-label {
    position: absolute;
    top: -20px;
    left: 0;
    background-color: #ff0000;
    color: white;
    padding: 2px 4px;
    font-size: 12px;
    white-space: nowrap;
  }
  </style>