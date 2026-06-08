<template>
    <div class="monitor-container">
      <div class="main-zone-top" v-if="topZoneComps.length > 0">
        <div class="comp-wrapper" v-for="comp in topZoneComps" :key="comp.id">
          <DataCard v-if="comp.type === 'card'" v-bind="comp.props" />
        </div>
      </div>
  
      <div class="main-zone-middle">
        <div class="main-zone-left" v-if="leftZoneComps.length > 0">
          <div class="comp-wrapper" v-for="comp in leftZoneComps" :key="comp.id">
            <PieChart v-if="comp.type === 'pie'" v-bind="comp.props" />
            <DynamicList v-if="comp.type === 'list'" v-bind="comp.props" />
          </div>
        </div>
  
        <div class="main-zone-center">
          <div class="cesium-earth-container">
            <CesiumViewer />
          </div>
          <div class="center-bottom-area" v-if="centerBottomComps.length > 0">
            <div class="comp-wrapper" v-for="comp in centerBottomComps" :key="comp.id">
              <PieChart v-if="comp.type === 'pie'" v-bind="comp.props" />
            </div>
          </div>
        </div>
  
        <div class="main-zone-right" v-if="rightZoneComps.length > 0">
          <div class="comp-wrapper" v-for="comp in rightZoneComps" :key="comp.id">
            <DynamicList v-if="comp.type === 'list'" v-bind="comp.props" />
            <VideoPlayer v-if="comp.type === 'video'" v-bind="comp.props" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { globalStore } from '../store.js';
  import DataCard from '../components/ui/DataCard.vue';
  import PieChart from '../components/charts/PieChart.vue';
  import DynamicList from '../components/ui/DynamicList.vue';
  import CesiumViewer from '../components/ui/CesiumViewer.vue';
  import VideoPlayer from '../components/ui/VideoPlayer.vue';
  
  const activeComponents = computed(() => {
    const comps = [];
    const currentMenus = globalStore.pageMenus['/monitor'] || [];
    currentMenus.forEach(group => {
      group.children.forEach(child => {
        if (child.visible) comps.push(child);
      });
    });
    return comps;
  });
  
  const topZoneComps = computed(() => activeComponents.value.filter(c => c.zone === 'top'));
  const leftZoneComps = computed(() => activeComponents.value.filter(c => c.zone === 'left'));
  const centerBottomComps = computed(() => activeComponents.value.filter(c => c.zone === 'center-bottom'));
  const rightZoneComps = computed(() => activeComponents.value.filter(c => c.zone === 'right'));
  </script>
  
  <style scoped>
  .monitor-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 12px;
    gap: 12px;
    min-width: 0;
    overflow: hidden;
  }
  
  .main-zone-top {
    display: flex;
    gap: 12px;
    flex-shrink: 0;
    height: 100px;
  }
  
  .main-zone-middle {
    display: flex;
    flex: 1;
    gap: 12px;
    min-height: 0;
    min-width: 0;
  }
  
  .main-zone-left,
  .main-zone-right {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 360px;
    flex-shrink: 0;
  }
  
  .main-zone-center {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-width: 0;
    min-height: 0;
  }
  
  .cesium-earth-container {
    flex: 2;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #1b263b;
  }
  
  .center-bottom-area {
    flex: 1;
    display: flex;
    gap: 12px;
    min-height: 0;
  }
  
  .comp-wrapper {
    flex: 1;
    min-width: 0;
    min-height: 0;
    background-color: #ffffff;
    border-radius: 6px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.04);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  </style>