<template>
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
</style>