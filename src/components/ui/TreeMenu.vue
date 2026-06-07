<template>
  <div class="responsive-tree-menu">
    <div v-for="menu in menus" :key="menu.id" class="menu-group">
      <div class="parent-node" @click="menu.open = !menu.open" :title="menu.label">
        <span class="label">{{ menu.label }}</span>
        <span class="icon">{{ menu.open ? '▼' : '▶' }}</span>
      </div>
      <div v-show="menu.open" class="child-nodes">
        <div v-for="child in menu.children" :key="child.id" class="child-node" :title="child.label">
          <input type="checkbox" v-model="child.visible" @change="$emit('window-toggle', child)">
          <span class="child-label">{{ child.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['menus']);
defineEmits(['window-toggle']);
</script>

<style scoped>
.responsive-tree-menu { width: 100%; height: 100%; padding: clamp(8px, 4cqw, 16px); background: #ffffff; overflow-y: auto; overflow-x: hidden; color: #303133; box-sizing: border-box; }
.menu-group { margin-bottom: 12px; min-width: 0; }
.parent-node { cursor: pointer; padding: clamp(8px, 3cqh, 12px) clamp(10px, 4cqw, 16px); background: #f4f4f5; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; transition: background 0.2s; border: 1px solid #e4e7ed; min-width: 0; }
.parent-node:hover { background: #ecf5ff; border-color: #b3d8ff; }
.label { font-weight: bold; font-size: clamp(12px, 4cqw, 14px); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-right: 8px; }
.icon { font-size: 12px; color: #909399; flex-shrink: 0; }
.child-nodes { padding-left: clamp(6px, 3cqw, 12px); margin-top: 8px; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.child-node { padding: clamp(4px, 2cqh, 8px) clamp(6px, 3cqw, 12px); display: flex; align-items: center; font-size: clamp(12px, 3.5cqw, 14px); color: #606266; transition: background 0.2s; border-radius: 4px; cursor: pointer; min-width: 0; }
.child-node:hover { background: #f5f7fa; color: #409eff; }
.child-node input[type="checkbox"] { margin-right: 8px; cursor: pointer; width: 14px; height: 14px; flex-shrink: 0; accent-color: #409eff; }
.child-label { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
</style>