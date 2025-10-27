<template>
    <div class="map-container">
      <l-map ref="mapRef" :zoom="zoom" :center="center" style="height: 100%; width: 100%">
        <!-- 底图图层 -->
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer>
  
        <!-- 动态叠加图层 (例如，我们的结果掩码) -->
        <l-image-overlay
          v-if="overlayImage"
          :url="overlayImage.url"
          :bounds="overlayImage.bounds"
          :opacity="overlayImage.opacity || 0.7"
        ></l-image-overlay>
        
        <!-- 这里可以继续添加更多类型的图层，如GeoJSON, WMS等 -->
      </l-map>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import "leaflet/dist/leaflet.css";
  import { LMap, LTileLayer, LImageOverlay } from "@vue-leaflet/vue-leaflet";
  
  const props = defineProps({
    // 初始中心点
    center: {
      type: Array,
      default: () => [39.9042, 116.4074], // 默认北京
    },
    // 初始缩放级别
    zoom: {
      type: Number,
      default: 10,
    },
    // 要叠加的图片图层
    overlayImage: {
      type: Object, // 期望的格式: { url: '...', bounds: [[lat1, lng1], [lat2, lng2]], opacity: 0.7 }
      default: null,
    },
  });
  
  const mapRef = ref(null);
  
  // 未来可以暴露一些方法给父组件调用，如 fitBounds, flyTo 等
  // const fitToBounds = (bounds) => {
  //   if (mapRef.value && mapRef.value.leafletObject) {
  //     mapRef.value.leafletObject.fitBounds(bounds);
  //   }
  // }
  // defineExpose({ fitToBounds });
  </script>
  
  <style scoped>
  .map-container {
    width: 100%;
    height: 100%;
    min-height: 500px; /* 给一个最小高度，防止塌陷 */
  }
  </style>