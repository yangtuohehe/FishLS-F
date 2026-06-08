<template>
    <div id="cesiumContainer" class="cesium-wrapper"></div>
  </template>
  
  <script setup>
  import { onMounted, onUnmounted } from 'vue';
  import * as Cesium from 'cesium';
  
  let viewer = null;
  
  onMounted(() => {
    viewer = new Cesium.Viewer('cesiumContainer', {
      animation: false,
      timeline: false,
      infoBox: false,
      selectionIndicator: false,
      baseLayerPicker: false,
      navigationHelpButton: false,
      homeButton: false,
      fullscreenButton: false,
      geocoder: false,
      sceneModePicker: false
    });
    
    viewer.cesiumWidget.creditContainer.style.display = 'none';
  });
  
  onUnmounted(() => {
    if (viewer) {
      viewer.destroy();
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