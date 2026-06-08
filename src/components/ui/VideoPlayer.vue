<template>
    <div class="video-player-container">
      <div class="video-wrapper">
        <div class="video-placeholder">视频流加载区</div>
        <div class="video-title">{{ cameraName }}</div>
      </div>
      <div class="control-bar">
        <div class="progress-area">
          <span class="time-label">-02:00:00</span>
          <input type="range" min="0" max="7200" v-model="progress" class="progress-slider" @input="handleSeek" />
          <span class="time-label">LIVE</span>
        </div>
        <div class="action-area">
          <div class="live-btn" :class="{ active: isLive }" @click="jumpToLive">
            <span class="live-dot"></span>实时
          </div>
          <select v-model="playbackRate" class="speed-select" @change="handleSpeedChange">
            <option value="0.5">0.5x</option>
            <option value="1.0">1.0x</option>
            <option value="1.5">1.5x</option>
            <option value="2.0">2.0x</option>
          </select>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  defineProps({
    cameraName: {
      type: String,
      default: '监控画面'
    }
  });
  
  const progress = ref(7200);
  const isLive = ref(true);
  const playbackRate = ref('1.0');
  
  const handleSeek = () => {
    isLive.value = progress.value == 7200;
  };
  
  const jumpToLive = () => {
    progress.value = 7200;
    isLive.value = true;
    playbackRate.value = '1.0';
  };
  
  const handleSpeedChange = () => {
    if (isLive.value && playbackRate.value !== '1.0') {
      isLive.value = false;
      progress.value = 7199;
    }
  };
  </script>
  
  <style scoped>
  .video-player-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: #1b263b;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .video-wrapper {
    position: relative;
    flex: 1;
    min-height: 0;
    background: #0d1b2a;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .video-placeholder {
    color: #415a77;
    font-size: 14px;
    letter-spacing: 2px;
  }
  
  .video-title {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(0, 0, 0, 0.6);
    color: #ffffff;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 12px;
    z-index: 10;
  }
  
  .control-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48px;
    background: #ffffff;
    padding: 0 16px;
    border-top: 1px solid #e4e7ed;
    flex-shrink: 0;
  }
  
  .progress-area {
    display: flex;
    align-items: center;
    flex: 1;
    margin-right: 24px;
  }
  
  .time-label {
    font-size: 12px;
    color: #909399;
    width: 60px;
    text-align: center;
    font-family: monospace;
  }
  
  .progress-slider {
    flex: 1;
    margin: 0 12px;
    accent-color: #409eff;
    cursor: pointer;
  }
  
  .action-area {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  
  .live-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: #606266;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.2s;
  }
  
  .live-btn:hover {
    background: #f5f7fa;
  }
  
  .live-btn.active {
    color: #f56c6c;
    font-weight: bold;
  }
  
  .live-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #c0c4cc;
  }
  
  .live-btn.active .live-dot {
    background-color: #f56c6c;
    box-shadow: 0 0 4px #f56c6c;
  }
  
  .speed-select {
    padding: 4px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    font-size: 12px;
    color: #606266;
    outline: none;
    cursor: pointer;
  }
  </style>