import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useVisualizationStore = defineStore('visualization', () => {
  // 任务id
  const currentTaskId = ref({
    id: 'task-001',
    name: '无人机地物识别任务',
  });

  // --- 地图图层数据 ---

  const baseUrl = import.meta.env.BASE_URL || '/';
  const projectLayers = ref([
    {
      id: 'layer-1',
      name: '原始无人机影像',
      type: 'imageOverlay', // 图层类型：影像叠加
      url: `${baseUrl}visualization/original-img.png`, // 影像 URL（相对 BASE_URL）
      bounds: [ // 影像在地图上覆盖的经纬度范围 [[南, 西], [北, 东]]
        [31.1222056, 108.6526806],
        [31.1224361, 108.6529500]
      ],
      visible: true, // 默认可见
      opacity: 1, // 透明度
    },
    {
      id: 'layer-2',
      name: '语义分割结果',
      type: 'imageOverlay',
      url: `${baseUrl}visualization/result-img.png`,
      bounds: [
        [31.1222056, 108.6526806],
        [31.1224361, 108.6529500]
      ],
      visible: false, // 默认不可见
      opacity: 0.7, // 设置一些透明度以便叠加观察
    },
  ]);

  // --- 统计分析数据 ---

  // 1. 地物分类表格数据
  const categoryStats = ref([
    { key: '1', category: '植被', area: 42500, percentage: '85.0%', color: '#2ecc71' },
    { key: '2', category: '裸露地', area: 1200, percentage: '2.4%', color: '#e67e22' },
    { key: '3', category: '水体', area: 3000, percentage: '6.0%', color: '#3498db' },
    { key: '4', category: '建筑', area: 3300, percentage: '6.6%', color: '#95a5a6' },
  ]);

  // 2. 饼图数据 (可以直接从表格数据转换得到)
  const pieChartData = computed(() => ({
    title: '各地物面积占比',
    data: categoryStats.value.map(item => ({
      value: item.area,
      name: item.category,
      itemStyle: {
        color: item.color,
      },
    })),
  }));


  return {
    currentTaskId,
    projectLayers,
    categoryStats,
    pieChartData,
  };
});
