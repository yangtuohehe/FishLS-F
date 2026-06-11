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
  <div ref="localContainer" class="cesium-wrapper"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, nextTick } from 'vue'; // 1. 引入 nextTick
import { getGlobalCesium } from '../../utils/cesiumManager.js';

const localContainer = ref(null);

onMounted(() => {
  const { viewer, cesiumContainer } = getGlobalCesium();
  
  if (localContainer.value && cesiumContainer) {
    // 确保旧父节点已清理（防止意外嵌套）
    if (cesiumContainer.parentNode) {
      cesiumContainer.parentNode.removeChild(cesiumContainer);
    }
    
    localContainer.value.appendChild(cesiumContainer);
    
    // 2. 关键点：DOM 插入后，必须等待下一帧渲染，否则 resize() 会计算错误
    nextTick(() => {
      if (viewer) {
        viewer.resize();
        viewer.scene.requestRender(); // 强制刷新渲染
      }
    });
  }
});

onUnmounted(() => {
  const { cesiumContainer } = getGlobalCesium();
  // 注意：不要直接彻底销毁 viewer，因为你用了单例模式
  // 只是把容器从 DOM 树中移除即可
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
  /* 确保这个容器不会拦截鼠标事件，除非它是 Cesium 的宿主 */
  pointer-events: auto; 
}
</style>