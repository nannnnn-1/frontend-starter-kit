<template>
  <a-config-provider :theme="phoenixTheme">
    <router-view />
  </a-config-provider>
</template>

<script setup>
import { phoenixTheme } from '@/styles/theme.js';
</script>

<style>
/* 这里可以放一些真正的全局样式，如果需要的话 */
/* 
  例如，为整个应用设置更平滑的字体渲染 
*/
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>