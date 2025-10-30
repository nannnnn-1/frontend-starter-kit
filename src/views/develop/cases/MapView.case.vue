<template>
  <div class="visualization-page-wrapper">
    <div class="layer-controller-wrapper">
      <!-- 图层控制组件 -->
      <LayerController v-model:layers="projectLayers" />
    </div>
    <!-- 地图组件 -->
    <MapView class="map-container" :layers="projectLayers" @ready="onMapReady" />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import MapView from '@/components/Business/MapView/index.vue';
import LayerController from '@/components/Business/LayerController/index.vue';
import { useVisualizationStore } from '@/stores/visualization';
import * as Cesium from 'cesium';

// 获取数据
const visualizationStore = useVisualizationStore();
const { projectLayers } = storeToRefs(visualizationStore);

// 地图回调函数
const onMapReady = (viewerInstance) => {
  console.log("Page: MapView is ready. Viewer instance received.");
  if (projectLayers.value && projectLayers.value.length > 0 && projectLayers.value[0].bounds) {
    const firstLayer = projectLayers.value[0];
    const destination = Cesium.Rectangle.fromDegrees(
      firstLayer.bounds[0][1], firstLayer.bounds[0][0],
      firstLayer.bounds[1][1], firstLayer.bounds[1][0]
    );
    viewerInstance.camera.flyTo({ destination });
  }
};
</script>

<style scoped>
.visualization-page-wrapper {
  width: 100%;
  position: relative;
}

.layer-controller-wrapper {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
</style>
