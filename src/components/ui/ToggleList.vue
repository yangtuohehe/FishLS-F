<template>
    <div class="toggle-list-container">
      <div class="toggle-item" v-for="field in fields" :key="field.id">
        <span class="field-name">{{ field.name }}</span>
        <label class="switch-ui">
          <input type="checkbox" v-model="field.visible">
          <span class="slider round"></span>
        </label>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    fields: { type: Array, default: () => [] }
  });
  </script>
  
  <style scoped>
  .toggle-list-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;
  }
  
  .toggle-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: #f8f9fa;
    border-radius: 6px;
    border: 1px solid #ebeef5;
  }
  
  .field-name {
    font-size: 14px;
    font-weight: bold;
    color: #606266;
  }
  
  /* 现代感 Switch 开关样式 */
  .switch-ui { position: relative; display: inline-block; width: 44px; height: 24px; }
  .switch-ui input { opacity: 0; width: 0; height: 0; }
  .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #dcdfe6; transition: .3s; }
  .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .3s; }
  input:checked + .slider { background-color: #67c23a; }
  input:checked + .slider:before { transform: translateX(20px); }
  .slider.round { border-radius: 24px; }
  .slider.round:before { border-radius: 50%; }
  </style>