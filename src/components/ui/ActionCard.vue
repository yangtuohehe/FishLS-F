<template>
    <div class="action-card-container">
      <div class="card-left">
        <span class="device-icon">{{ icon }}</span>
        <span class="device-name">{{ name }}</span>
      </div>
      <button class="action-btn">{{ btnText }}</button>
    </div>
  </template>
  
  <script setup>
  defineProps({
    icon: { type: String, default: '🎛️' },
    name: { type: String, required: true },
    btnText: { type: String, default: '操作' }
  });
  </script>
  
  <style scoped>
  .action-card-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 16px;
    background-color: #ffffff;
    box-sizing: border-box;
  }
  
  .card-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .device-icon {
    font-size: 24px;
    background: #f5f7fa;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border: 1px solid #ebeef5;
  }
  
  .device-name {
    font-size: 15px;
    font-weight: bold;
    color: #303133;
  }
  
  .action-btn {
    background-color: #ecf5ff;
    color: #409eff;
    border: 1px solid #b3d8ff;
    padding: 6px 16px;
    border-radius: 4px;
    font-size: 13px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .action-btn:hover {
    background-color: #409eff;
    color: #ffffff;
  }
  </style>