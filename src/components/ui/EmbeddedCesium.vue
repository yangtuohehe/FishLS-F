<template>
    <div ref="cesiumContainer" class="embedded-cesium-container"></div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount, onDeactivated } from 'vue';
  import * as Cesium from 'cesium';
  
  const cesiumContainer = ref(null);
  let viewer = null;
  let resizeObserver = null;
  
  // 初始化地球
  const initEarth = () => {
    if (viewer) return; // 防止因路由缓存导致的重复初始化
  
    viewer = new Cesium.Viewer(cesiumContainer.value, {
      animation: false,
      timeline: false,
      infoBox: false,
      selectionIndicator: false,
      navigationHelpButton: false,
      homeButton: false,
      geocoder: false,
      sceneModePicker: false,
      baseLayerPicker: false,
      fullscreenButton: false,
      
      // 🚀 核心抗卡顿 1：开启按需渲染模式！
      // Cesium 默认一秒跑 60 帧。开启此项后，只有当你拖拽鼠标时显卡才会工作，静止时 CPU/GPU 占用直接降为 0！
      requestRenderMode: true,
      maximumRenderTimeChange: Infinity
    });
  
    // 🚀 核心抗卡顿 2：降低分辨率缩放
    // 对于这么小的预览窗口，跑全屏原画质毫无意义，把分辨率降到 0.8 甚至 0.7，肉眼看不出糊，但能省下海量显存。
    viewer.resolutionScale = 0.8;
  
    if (viewer.cesiumWidget.creditContainer) {
      viewer.cesiumWidget.creditContainer.style.display = "none";
    }
  
    // 监听容器大小变化
    resizeObserver = new ResizeObserver(() => {
      if (viewer) {
        viewer.resize();
        viewer.scene.requestRender(); // 按需渲染模式下，尺寸变化必须手动通知重绘
      }
    });
    resizeObserver.observe(cesiumContainer.value);
  };
  
  // 暴力销毁地球（释放内存的核心）
  const destroyEarth = () => {
    if (resizeObserver && cesiumContainer.value) {
      resizeObserver.unobserve(cesiumContainer.value);
      resizeObserver.disconnect();
      resizeObserver = null;
    }
    
    if (viewer) {
      // 🧹 核心防侧漏 1：先清空里面所有的业务实体和图层
      viewer.entities.removeAll();
      viewer.imageryLayers.removeAll();
      viewer.dataSources.removeAll();
  
      // 🧹 核心防侧漏 2：彻底销毁 WebGL 上下文
      viewer.destroy();
      viewer = null;
    }
    
    if (cesiumContainer.value) {
      // 🧹 核心防侧漏 3：暴力掏空残留的 DOM 节点，防止游离节点造成的内存泄漏
      cesiumContainer.value.innerHTML = '';
    }
  };
  
  // 生命周期绑定
  onMounted(() => {
    initEarth();
  });
  
  // 🛡️ 核心防卡死：拦截所有的组件卸载可能！
  onBeforeUnmount(() => {
    destroyEarth(); // 针对普通路由切换
  });
  
  onDeactivated(() => {
    destroyEarth(); // 针对被 <keep-alive> 缓存的路由切换
  });
  </script>
  
  <style>
  /* 保持原有的绝对定位和穿透样式不变 */
  .embedded-cesium-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: block;
  }
  
  .embedded-cesium-container .cesium-viewer,
  .embedded-cesium-container .cesium-viewer-cesiumWidgetContainer,
  .embedded-cesium-container .cesium-widget,
  .embedded-cesium-container .cesium-widget canvas {
    width: 100% !important;
    height: 100% !important;
    display: block !important; 
    margin: 0;
    padding: 0;
  }
  </style>