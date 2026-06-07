<template>
  <div class="responsive-card">
    <div class="icon-section">
      <slot name="icon"><div class="default-icon"></div></slot>
    </div>
    <div class="text-section">
      <div class="label">{{ label }}</div>
      <div class="value-container">
        <span class="value">{{ value }}</span>
        <span class="unit">{{ unit }}</span>
      </div>
      <div class="desc-container">
        <span class="desc">{{ description }}</span>
        <span class="status" :class="statusType">{{ statusText }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['label', 'value', 'unit', 'description', 'statusText', 'statusType']);
</script>

<style scoped>
.responsive-card { container-type: inline-size; display: flex; width: 100%; height: 100%; padding: clamp(8px, 4cqw, 16px) clamp(10px, 5cqw, 20px); background: #ffffff; border: 1px solid #e4e7ed; border-radius: 8px; box-sizing: border-box; align-items: center; overflow: hidden; }
.icon-section { margin-right: clamp(8px, 4cqw, 16px); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.default-icon { width: clamp(28px, 10cqw, 40px); height: clamp(28px, 10cqw, 40px); background: #ecf5ff; border: 1px solid #b3d8ff; border-radius: 50%; }
.text-section { display: flex; flex-direction: column; justify-content: center; gap: 4px; min-width: 0; }
.label { font-size: clamp(11px, 4cqw, 13px); color: #909399; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.value-container { display: flex; align-items: baseline; flex-wrap: wrap; }
.value { font-size: clamp(16px, 8cqw, 24px); font-weight: bold; color: #303133; line-height: 1; }
.unit { font-size: 12px; margin-left: 4px; color: #606266; }
.desc-container { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.desc { font-size: 12px; color: #909399; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.status { font-size: 12px; font-weight: bold; flex-shrink: 0; }
.status.up { color: #67c23a; }
.status.down { color: #f56c6c; }

@container (max-width: 160px) {
  .responsive-card { flex-direction: column; justify-content: center; text-align: center; }
  .icon-section { margin-right: 0; margin-bottom: 8px; }
  .text-section { align-items: center; }
  .value-container { justify-content: center; }
  .desc-container { justify-content: center; }
}
</style>