<template>
  <!--
    地图可视化组件（Cesium）
    职责：
    - 初始化 Cesium.Viewer（带 ArcGIS 影像底图）
    - 将外部传入的图层（当前支持 imageOverlay）渲染为 ImageryLayer
    - 在初始化完成后通过 ready 事件暴露 viewer 实例
  -->
  <div ref="cesiumContainer" class="cesium-container"></div>
</template>

<script setup>
defineOptions({ name: 'MapViewComponent' });
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import * as Cesium from 'cesium';

// Props / Emits ----------------------------------------------------------------
// layers: 图层数组。仅支持 type==='imageOverlay' 的单幅影像叠加（SingleTileImageryProvider）
const props = defineProps({
  layers: { type: Array, default: () => [], },
});
// ready: 初始化完成后向父组件抛出 viewer 实例
const emit = defineEmits(['ready']);

// State -------------------------------------------------------------------------
const cesiumContainer = ref(null);
let viewer = null; // Cesium.Viewer 实例
// 记录已添加到场景中的图层（以 id 作为索引）
let managedLayers = {};

// Lifecycle ---------------------------------------------------------------------
onMounted(() => { initCesium(); });
onBeforeUnmount(() => {
  if (viewer) { viewer.destroy(); viewer = null; }
});
// 深度监听图层属性变化（visible / opacity 等）
watch(
  () => props.layers,
  (newLayers) => { if (viewer) { updateMapLayers(newLayers); } },
  { deep: true }
);

// 初始化 Cesium.Viewer（默认 ArcGIS 影像底图）
const initCesium = () => {
  if (!cesiumContainer.value) return;

  viewer = new Cesium.Viewer(cesiumContainer.value, {
    imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
      url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
    }),
    animation: false,
    timeline: false,
    homeButton: false,

  });
  // 隐藏版权信息容器（如需显示可移除此行）
  if (viewer.cesiumWidget && viewer.cesiumWidget.creditContainer) {
    viewer.cesiumWidget.creditContainer.style.display = 'none';
  }

  updateMapLayers(props.layers);
  emit('ready', viewer);
};

// 将图层描述转换为 Cesium ImageryProvider
const createImageryProvider = (layerInfo) => {
  switch (layerInfo.type) {
    case 'imageOverlay': {
      if (!layerInfo.url || !layerInfo.bounds) { return null; }
      // bounds: [[南, 西], [北, 东]]，单位：经纬度（WGS84）
      const rect = Cesium.Rectangle.fromDegrees(
        layerInfo.bounds[0][1], layerInfo.bounds[0][0],
        layerInfo.bounds[1][1], layerInfo.bounds[1][0]
      );
      // 单幅影像叠加到指定矩形范围
      return new Cesium.SingleTileImageryProvider({
        url: layerInfo.url,
        rectangle: rect,
        tileWidth: 256,
        tileHeight: 256,
      });
    }
    default:
      return null;
  }
};

// 同步外部图层数组到场景：新增/显隐/透明度/移除
const updateMapLayers = (layersData) => {
  if (!viewer || !Array.isArray(layersData)) return;
  layersData.forEach(layerInfo => {
    const existingLayer = managedLayers[layerInfo.id];
    if (layerInfo.visible) {
      if (!existingLayer) {
        const newImageryProvider = createImageryProvider(layerInfo);
        if (newImageryProvider) {
          const newImageryLayer = viewer.imageryLayers.addImageryProvider(newImageryProvider);
          newImageryLayer.alpha = layerInfo.opacity ?? 1.0;
          managedLayers[layerInfo.id] = newImageryLayer;
        }
      } else {
        existingLayer.show = true;
        existingLayer.alpha = layerInfo.opacity ?? 1.0;
      }
    } else if (existingLayer) {
      existingLayer.show = false;
    }
  });
  const newLayerIds = new Set(layersData.map(l => l.id));
  for (const managedId in managedLayers) {
    if (!newLayerIds.has(managedId)) {
      viewer.imageryLayers.remove(managedLayers[managedId]);
      delete managedLayers[managedId];
    }
  }
};
</script>

<style scoped>
.cesium-container { width: 100%; height: 100%; background-color: #000; }
</style>
