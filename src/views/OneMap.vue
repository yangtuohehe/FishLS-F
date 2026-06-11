<template>
    <div class="onemap-container">
      <div class="main-zone-top" v-if="top1ZoneComps.length > 0">
        <div class="comp-wrapper" v-for="comp in top1ZoneComps" :key="comp.id">
          <DataCard v-if="comp.type === 'card'" v-bind="comp.props" />
        </div>
      </div>
  
      <div class="main-zone-top" v-if="top2ZoneComps.length > 0">
        <div class="comp-wrapper" v-for="comp in top2ZoneComps" :key="comp.id">
          <DataCard v-if="comp.type === 'card'" v-bind="comp.props" />
        </div>
      </div>
  
      <div class="main-zone-middle">
        <div class="main-zone-left" v-if="leftZoneComps.length > 0">
          <div class="comp-wrapper" v-for="comp in leftZoneComps" :key="comp.id">
            <PieChart v-if="comp.type === 'pie'" v-bind="comp.props" />
            <BarChart v-if="comp.type === 'bar'" v-bind="comp.props" />
            <DynamicList v-if="comp.type === 'list'" v-bind="comp.props" />
            
            <div v-if="comp.type === 'query'" class="query-panel">
              <div class="panel-title">{{ comp.props.title }}</div>
              <div class="search-box">
                <input type="text" :placeholder="comp.props.placeholders" class="query-input" />
                <button class="query-btn">搜索</button>
              </div>
              <div class="quick-tags">
                <span v-for="tag in comp.props.tags" :key="tag" class="tag-item">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
  
        <div class="main-zone-center">
          <div class="cesium-earth-container">
            <CesiumViewer />
          </div>
  
          <div class="map-floating-toolbar">
            <button class="map-tool-btn" title="指北针">🧭</button>
            <button class="map-tool-btn" title="视角复位">🏠</button>
            <button class="map-tool-btn" title="距离测量">📏</button>
            <button class="map-tool-btn" title="面积测量">📐</button>
            <button class="map-tool-btn" title="清除标绘">🗑️</button>
          </div>
  
          <div class="map-layer-controller">
            <div class="layer-header">
              <span>图层显隐控制</span>
              <span class="layer-toggle-icon">▼</span>
            </div>
            <div class="layer-list">
              <label class="layer-item" v-for="layer in globalStore.mapLayers" :key="layer.id">
                <input type="checkbox" v-model="layer.visible" />
                <span class="layer-name">{{ layer.name }}</span>
              </label>
            </div>
          </div>
        </div>
  
        <div class="main-zone-right" v-if="rightZoneComps.length > 0">
          <div class="comp-wrapper" v-for="comp in rightZoneComps" :key="comp.id">
            <PieChart v-if="comp.type === 'pie'" v-bind="comp.props" />
            <BarChart v-if="comp.type === 'bar'" v-bind="comp.props" />
            <DynamicList v-if="comp.type === 'list'" v-bind="comp.props" />
          </div>
        </div>
      </div>
  
      <div class="main-zone-bottom" v-if="bottom1ZoneComps.length > 0">
        <div class="comp-wrapper" v-for="comp in bottom1ZoneComps" :key="comp.id">
          <LineChart v-if="comp.type === 'line'" v-bind="comp.props" />
          <BarChart v-if="comp.type === 'bar'" v-bind="comp.props" />
          <StackedBarChart v-if="comp.type === 'stacked-bar'" v-bind="comp.props" />
        </div>
      </div>
  
      <div class="main-zone-bottom" v-if="bottom2ZoneComps.length > 0">
        <div class="comp-wrapper" v-for="comp in bottom2ZoneComps" :key="comp.id">
          <LineChart v-if="comp.type === 'line'" v-bind="comp.props" />
          <BarChart v-if="comp.type === 'bar'" v-bind="comp.props" />
          <StackedBarChart v-if="comp.type === 'stacked-bar'" v-bind="comp.props" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { globalStore } from '../store.js';
  import DataCard from '../components/ui/DataCard.vue';
  import BarChart from '../components/charts/BarChart.vue';
  import LineChart from '../components/charts/LineChart.vue';
  import PieChart from '../components/charts/PieChart.vue';
  import StackedBarChart from '../components/charts/StackedBarChart.vue';
  import DynamicList from '../components/ui/DynamicList.vue';
  import CesiumViewer from '../components/ui/CesiumViewer.vue';
  
  const route = useRoute();
  
  const activeComponents = computed(() => {
    const comps = [];
    const currentMenus = globalStore.pageMenus[route.path] || [];
    currentMenus.forEach(group => {
      group.children.forEach(child => {
        if (child.visible) comps.push(child);
      });
    });
    return comps;
  });
  
  const top1ZoneComps = computed(() => activeComponents.value.filter(c => c.zone === 'top1'));
  const top2ZoneComps = computed(() => activeComponents.value.filter(c => c.zone === 'top2'));
  const leftZoneComps = computed(() => activeComponents.value.filter(c => c.zone === 'left'));
  const rightZoneComps = computed(() => activeComponents.value.filter(c => c.zone === 'right'));
  const bottom1ZoneComps = computed(() => activeComponents.value.filter(c => c.zone === 'bottom1'));
  const bottom2ZoneComps = computed(() => activeComponents.value.filter(c => c.zone === 'bottom2'));
  </script>
  
  <style scoped>
  .onemap-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 12px;
    gap: 12px;
    min-width: 0;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .main-zone-top {
    display: flex;
    gap: 12px;
    flex-shrink: 0;
    height: 70px;
  }
  .main-zone-middle {
    display: flex;
    flex: 1;
    gap: 12px;
    min-height: 550px;
    min-width: 0;
  }
  .main-zone-left,
  .main-zone-right {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 260px;
    flex-shrink: 0;
  }
  .main-zone-center {
    flex: 1;
    display: flex;
    min-width: 0;
    min-height: 0;
    background-color: #0d1b2a;
    border-radius: 8px;
    border: 1px solid #1b263b;
    overflow: hidden;
    position: relative;
  }
  .cesium-earth-container {
    width: 100%;
    height: 100%;
  }
  .main-zone-bottom {
    display: flex;
    gap: 12px;
    flex-shrink: 0;
    height: 210px;
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
  
  .query-panel {
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .panel-title {
    font-size: 14px;
    font-weight: bold;
    color: #303133;
  }
  .search-box {
    display: flex;
    gap: 8px;
  }
  .query-input {
    flex: 1;
    padding: 6px 10px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    font-size: 13px;
    outline: none;
  }
  .query-btn {
    padding: 6px 12px;
    background-color: #1890ff;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
  }
  .quick-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .tag-item {
    padding: 3px 8px;
    background-color: #f4f4f5;
    color: #606266;
    font-size: 12px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .tag-item:hover {
    background-color: #e6f7ff;
    color: #1890ff;
  }
  
  .map-floating-toolbar {
    position: absolute;
    top: 16px;
    right: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    background-color: rgba(13, 27, 42, 0.85);
    border: 1px solid #1b263b;
    padding: 8px;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  .map-tool-btn {
    width: 32px;
    height: 32px;
    background-color: #1b263b;
    border: 1px solid #415a77;
    color: #ffffff;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }
  .map-tool-btn:hover {
    background-color: #1890ff;
    border-color: #1890ff;
  }
  
  .map-layer-controller {
    position: absolute;
    bottom: 16px;
    left: 16px;
    width: 200px;
    background-color: rgba(13, 27, 42, 0.85);
    border: 1px solid #1b263b;
    border-radius: 6px;
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    overflow: hidden;
  }
  .layer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 12px;
    background-color: rgba(27, 38, 59, 0.9);
    font-size: 13px;
    font-weight: bold;
    border-bottom: 1px solid #415a77;
    cursor: pointer;
  }
  .layer-toggle-icon {
    font-size: 10px;
    color: #90cdf4;
  }
  .layer-list {
    display: flex;
    flex-direction: column;
    padding: 8px 12px;
    gap: 10px;
  }
  .layer-item {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }
  .layer-item input[type="checkbox"] {
    cursor: pointer;
    accent-color: #1890ff;
  }
  .layer-name {
    font-size: 13px;
    color: #e0e1dd;
  }
  .layer-item:hover .layer-name {
    color: #ffffff;
  }
  </style>