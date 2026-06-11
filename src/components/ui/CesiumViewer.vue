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
</style>
 -->


 <!-- <template>
  <div ref="localContainer" class="cesium-wrapper"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { getGlobalCesium } from '../../utils/cesiumManager.js';

const localContainer = ref(null);
let observer = null;

onMounted(() => {
  const { viewer, cesiumContainer } = getGlobalCesium();
  
  if (localContainer.value && cesiumContainer) {
    if (cesiumContainer.parentNode) {
      cesiumContainer.parentNode.removeChild(cesiumContainer);
    }
    localContainer.value.appendChild(cesiumContainer);
    
    // 自动监听器：无论谁改变了容器大小，Cesium 都会自动刷新
    observer = new ResizeObserver(() => {
      if (viewer) {
        viewer.resize();
        viewer.scene.requestRender();
      }
    });
    observer.observe(localContainer.value);
  }
});

onUnmounted(() => {
  if (observer) observer.disconnect();
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
  position: relative;
  overflow: hidden;
  /* 确保此容器不会阻止鼠标事件穿透给 Cesium */
  pointer-events: auto; 
}
</style> -->
<template>
  <div ref="hostRef" class="cesium-host"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { borrowCesium, returnCesium } from '../../utils/cesiumManager.js';

const hostRef = ref(null);

onMounted(() => {
  // 页面加载时借用
  if (hostRef.value) {
    borrowCesium(hostRef.value);
  }
});

onUnmounted(() => {
  // 页面卸载时归还
  returnCesium();
});
</script>

<style scoped>
.cesium-host {
  width: 100%;
  height: 100%;
  pointer-events: auto; /* 关键：确保鼠标能点到地球 */
}
</style>