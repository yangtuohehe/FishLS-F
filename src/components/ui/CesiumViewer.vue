<!-- <template>
  <div ref="localContainer" class="cesium-wrapper"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { getGlobalCesium } from '../../utils/cesiumManager.js';

const localContainer = ref(null);

onMounted(() => {
  const { viewer, cesiumContainer } = getGlobalCesium();
  if (localContainer.value && cesiumContainer) {
    localContainer.value.appendChild(cesiumContainer);
    viewer.resize();
  }
});

onUnmounted(() => {
  const { cesiumContainer } = getGlobalCesium();
  if (cesiumContainer && cesiumContainer.parentNode === localContainer.value) {
    localContainer.value.removeChild(cesiumContainer);
  }
});
</script>

<style scoped>
.cesium-wrapper {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  border-radius: 8px;
}
</style> -->



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