<template>
    <div class="image-comparator" ref="containerRef">
      <img :src="imageRight" class="image-right" alt="Image Right" />
      <div class="image-left-wrapper" :style="{ clip: clipPath }">
        <img :src="imageLeft" alt="Image Left" />
      </div>
      <input
        type="range"
        min="0"
        max="100"
        v-model="sliderPosition"
        class="slider"
        aria-label="Image comparison slider"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const props = defineProps({
    imageLeft: {
      type: String,
      required: true,
    },
    imageRight: {
      type: String,
      required: true,
    },
  });
  
  const sliderPosition = ref(50); // 滑块位置 (0-100)
  
  // 计算CSS clip-path的值
  const clipPath = computed(() => `inset(0 ${100 - sliderPosition.value}% 0 0)`);
  </script>
  
  <style scoped>
  .image-comparator {
    position: relative;
    overflow: hidden;
    width: 100%;
    aspect-ratio: 16 / 9; /* 可以根据需要调整宽高比 */
  }
  
  .image-comparator img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }
  
  .image-left-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .slider {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: ew-resize;
  }
  
  /* Chrome, Safari, Opera, Edge */
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 4px;
    height: 100%;
    background: white;
    border: 1px solid #ccc;
  }
  
  /* Firefox */
  .slider::-moz-range-thumb {
    width: 4px;
    height: 100%;
    background: white;
    border: 1px solid #ccc;
    border-radius: 0;
  }
  </style>