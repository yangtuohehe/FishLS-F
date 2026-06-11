
<template>
  <div ref="hostRef" class="cesium-host"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { borrowCesium, returnCesium } from '../../utils/cesiumManager.js';

const hostRef = ref(null);

onMounted(() => {
  // 页面加载时：把自己的身份(hostRef.value)登记上去借用地球
  if (hostRef.value) {
    borrowCesium(hostRef.value);
  }
});

onBeforeUnmount(() => {
  // 页面卸载时：把自己从名单里除名，触发归还逻辑
  if (hostRef.value) {
    returnCesium(hostRef.value);
  }
});
</script>

<style scoped>
.cesium-host {
  width: 100%;
  height: 100%;
  position: relative; /* 核心：让内部的 absolute 容器基于此处铺满 */
  pointer-events: auto; 
  overflow: hidden;
}
</style>