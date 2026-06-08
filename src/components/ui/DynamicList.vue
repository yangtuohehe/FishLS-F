<template>
    <div class="dynamic-list-container">
      <div class="list-header">
        <div class="header-title">{{ title }}</div>
        <div class="header-action" v-if="actionText">{{ actionText }} &gt;</div>
      </div>
      
      <div class="list-content">
        <div class="list-item" v-for="(item, index) in listData" :key="index">
          <div class="item-top-row" v-if="item.tagText || item.time">
            <span class="item-tag" :class="item.statusType" v-if="item.tagText">{{ item.tagText }}</span>
            <span class="item-time" v-if="item.time">{{ item.time }}</span>
          </div>
          
          <div class="item-main-row">
            <div class="item-icon" :class="item.statusType" v-if="item.showIcon"></div>
            <div class="item-title" :class="{ 'fixed-width': item.tagText }">{{ item.title }}</div>
            <div class="item-desc">
              {{ item.descPrefix }}
              <span class="desc-highlight" :class="item.statusType" v-if="item.descHighlight">{{ item.descHighlight }}</span>
            </div>
            <div class="item-badge" :class="item.statusType" v-if="item.badgeText">{{ item.badgeText }}</div>
          </div>
        </div>
      </div>
  
      <div class="list-footer" v-if="footerText">
        {{ footerText }} &gt;
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: String,
    actionText: { type: String, default: '更多' },
    footerText: String,
    listData: { type: Array, default: () => [] }
  });
  </script>
  
  <style scoped>
  .dynamic-list-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: #ffffff;
    border-radius: 8px;
    box-sizing: border-box;
  }
  
  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 16px 12px 16px;
    flex-shrink: 0;
  }
  
  .header-title {
    font-size: 15px;
    font-weight: bold;
    color: #303133;
  }
  
  .header-action {
    font-size: 13px;
    color: #409eff;
    cursor: pointer;
  }
  
  .list-content {
    flex: 1;
    overflow-y: auto;
    padding: 0 16px;
    display: flex;
    flex-direction: column;
  }
  
  .list-item {
    display: flex;
    flex-direction: column;
    padding: 12px 0;
    border-bottom: 1px solid #f2f6fc;
    gap: 8px;
  }
  
  .list-item:last-child {
    border-bottom: none;
  }
  
  .item-top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .item-tag {
    font-size: 12px;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 500;
  }
  
  .item-time {
    font-size: 12px;
    color: #909399;
  }
  
  .item-main-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .item-icon {
    width: 12px;
    height: 12px;
    border-radius: 2px;
    flex-shrink: 0;
  }
  
  .item-title {
    font-size: 14px;
    color: #303133;
    font-weight: 500;
    white-space: nowrap;
  }
  
  .item-title.fixed-width {
    width: 80px;
    flex-shrink: 0;
  }
  
  .item-desc {
    flex: 1;
    font-size: 13px;
    color: #606266;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .desc-highlight {
    font-weight: bold;
    margin-left: 4px;
  }
  
  .item-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    font-size: 12px;
    font-weight: bold;
    background-color: #ffffff;
    flex-shrink: 0;
  }
  
  .list-footer {
    text-align: center;
    padding: 12px;
    font-size: 13px;
    color: #409eff;
    border-top: 1px solid #f2f6fc;
    cursor: pointer;
    flex-shrink: 0;
  }
  
  .danger.item-tag { background-color: #fef0f0; color: #f56c6c; }
  .warning.item-tag { background-color: #fdf6ec; color: #e6a23c; }
  .info.item-tag { background-color: #f4f4f5; color: #909399; }
  .primary.item-tag { background-color: #ecf5ff; color: #409eff; }
  
  .danger.item-icon { background-color: #f56c6c; }
  .warning.item-icon { background-color: #e6a23c; }
  .primary.item-icon { background-color: #409eff; }
  
  .danger.desc-highlight { color: #f56c6c; }
  .warning.desc-highlight { color: #e6a23c; }
  
  .danger.item-badge { border: 1px solid #f56c6c; color: #f56c6c; }
  .warning.item-badge { border: 1px solid #e6a23c; color: #e6a23c; }
  .primary.item-badge { border: 1px solid #409eff; color: #409eff; }
  </style>