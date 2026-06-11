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
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          drag-allow-from=".drag-handle"
          class="grid-item-wrapper"
        >
          <div class="item-content">
            <div class="drag-handle">⠿ {{ item.title }}</div>
            
            <div class="body-content">
              <CesiumViewer v-if="item.type === 'earth'" />
              
              <DataCard v-if="item.type === 'card'" v-bind="item.props" />
              
              <DynamicList v-if="item.type === 'list'" v-bind="item.props" />
              
              <VideoPlayer v-if="item.type === 'video'" v-bind="item.props" />
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
  
  // 定义所有组件的布局和初始配置，页面独立，不依赖 store.js
  const layout = ref([
    // 地球：占据中心大块
    { i: 'earth', x: 6, y: 0, w: 12, h: 20, type: 'earth', title: '数字孪生地球' },
    
    // 气象卡片：顶部排列
    { i: 'weather-1', x: 0, y: 0, w: 6, h: 4, type: 'card', title: '风速监控', props: { label: '实时风速', value: '12.4', unit: 'm/s', statusText: '正常' } },
    { i: 'weather-2', x: 18, y: 0, w: 6, h: 4, type: 'card', title: '气温监控', props: { label: '表层气温', value: '26.5', unit: '℃', statusText: '正常' } },
  
    // 水质列表：左侧
    { i: 'water-1', x: 0, y: 4, w: 6, h: 10, type: 'list', title: '水质传感监测', props: { title: '溶解氧实时列表', listData: [{title: 'A01浮标', descPrefix: 'DO:', descHighlight: '6.8mg/L'}] } },
  
    // 视频：右侧
    { i: 'video-1', x: 18, y: 4, w: 6, h: 8, type: 'video', title: '实时监控', props: { cameraName: '南侧航道球机' } },
    
    // 设备状态：底部
    { i: 'device-1', x: 6, y: 20, w: 12, h: 6, type: 'list', title: '设备在线状态', props: { title: '控制网关状态', listData: [{title: '边缘计算节点', statusType: 'success'}] } }
  ]);
  </script>
  
  <style scoped>
  .monitor-grid-container {
    width: 100vw;
    height: 100vh;
    background-color: #050505;
    padding: 10px;
  }
  .grid-item-wrapper {
    background: #10151f;
    border: 1px solid #1b263b;
    border-radius: 8px;
    overflow: hidden;
  }
  .item-content { display: flex; flex-direction: column; height: 100%; }
  .drag-handle { 
    padding: 6px 10px; background: #1b263b; color: #fff; font-size: 12px; cursor: grab; user-select: none;
  }
  .body-content { flex: 1; min-height: 0; overflow: hidden; position: relative; }
  </style>