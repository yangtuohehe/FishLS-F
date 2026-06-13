<template>
    <div class="slider-control-container">
      <div class="slider-header">{{ title }}</div>
      <div class="slider-list">
        <div v-for="(slider, index) in sliders" :key="index" class="slider-item">
          <div class="slider-info">
            <span class="slider-label">{{ slider.label }}</span>
            <span class="slider-value">{{ slider.value }}</span>
          </div>
          <input 
            type="range" 
            :min="slider.min" 
            :max="slider.max" 
            v-model="slider.value" 
            class="custom-slider" 
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: { type: String, default: '参数控制' },
    sliders: { type: Array, default: () => [] }
  });
  </script>
  
  <style scoped>
  .slider-control-container {
    padding: 12px;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .slider-header {
    font-size: 14px;
    font-weight: bold;
    color: #409eff;
    margin-bottom: 12px;
    border-bottom: 1px solid #ebeef5;
    padding-bottom: 8px;
  }
  
  .slider-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow-y: auto;
    padding-right: 4px;
  }
  
  .slider-item {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  
  .slider-info {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #606266;
  }
  
  .slider-value {
    color: #409eff;
    font-weight: bold;
    font-family: monospace;
  }
  
  .custom-slider {
    width: 100%;
    accent-color: #409eff;
    cursor: pointer;
  }
  </style>