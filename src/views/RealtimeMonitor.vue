<template>
    <div class="monitor-grid-container">
      <GridLayout
        v-model:layout="layout"
        :col-num="24"
        :row-height="30"
        :is-draggable="true"
        :is-resizable="true"
        :margin="[10, 10]"
        :use-css-transforms="true"
      >
        <GridItem
          v-for="item in layout"
          :key="item.i"
          :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i"
          drag-allow-from=".drag-handle"
          class="grid-item-wrapper"
          :class="{ 'earth-grid-item': item.type === 'earth' }"
        >
          <div class="item-content">
            <div class="drag-handle">⠿ {{ item.title }}</div>
            
            <div class="body-content">
              <CesiumViewer v-if="item.type === 'earth'" />
              <DataCard v-else-if="item.type === 'card'" v-bind="item.props" />
              <DynamicList v-else-if="item.type === 'list'" v-bind="item.props" />
              <VideoPlayer v-else-if="item.type === 'video'" v-bind="item.props" />
            </div>
          </div>
        </GridItem>
      </GridLayout>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { GridLayout, GridItem } from 'grid-layout-plus';
  import CesiumViewer from '../components/ui/CesiumViewer.vue';
  import DataCard from '../components/ui/DataCard.vue';
  import DynamicList from '../components/ui/DynamicList.vue';
  import VideoPlayer from '../components/ui/VideoPlayer.vue';
  
  const layout = ref([
    { i: 'earth', x: 6, y: 0, w: 12, h: 20, type: 'earth', title: '数字孪生底座' },
    { i: 'weather-1', x: 0, y: 0, w: 6, h: 6, type: 'card', title: '实时风速', props: { label: '风速', value: '12.4', unit: 'm/s' } },
    { i: 'weather-2', x: 18, y: 0, w: 6, h: 6, type: 'card', title: '实时气温', props: { label: '气温', value: '26.5', unit: '℃' } },
    { i: 'water-1', x: 0, y: 6, w: 6, h: 10, type: 'list', title: '水质监测', props: { title: '溶解氧', listData: [{title: 'A01', descPrefix: 'DO:', descHighlight: '6.8'}] } },
    { i: 'video-1', x: 18, y: 6, w: 6, h: 8, type: 'video', title: '监控', props: { cameraName: '主航道' } },
    { i: 'device-1', x: 6, y: 20, w: 12, h: 6, type: 'list', title: '设备在线', props: { title: '网关状态', listData: [{title: '节点1', statusType: 'success'}] } }
  ]);
  </script>
  
  <style scoped>
  .monitor-grid-container {
    width: 100%;
    height: calc(100vh - 60px); /* 减去顶部 header 高度 */
    overflow: auto;
    background: #050505;
  }
  
  .grid-item-wrapper {
    background: #10151f;
    border: 1px solid #1b263b;
    border-radius: 8px;
    overflow: hidden;
  }
  
  /* 只针对地球项放开交互 */
  .grid-item-wrapper.earth-grid-item {
    touch-action: auto !important;
    pointer-events: auto !important;
    z-index: 5;
  }
  
  .item-content { 
    display: flex; 
    flex-direction: column; 
    height: 100%; 
  }
  
  .drag-handle { 
    padding: 6px; 
    background: #1b263b; 
    color: #fff; 
    font-size: 12px; 
    cursor: grab;
    z-index: 10;
  }
  
  .body-content { 
    flex: 1; 
    min-height: 0; 
    overflow: hidden;
  }
  </style>