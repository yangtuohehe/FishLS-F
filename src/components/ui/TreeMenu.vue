<template>
  <div class="responsive-tree-menu">
    <div v-for="sysMenu in globalStore.systemMenus" :key="sysMenu.id" class="sys-menu-group">
      <div 
        class="level-1-node" 
        :class="{ 'is-active': route.path === sysMenu.path }"
        @click="goToPage(sysMenu.path)"
      >
        <div class="node-left">
          <span class="icon">{{ sysMenu.icon }}</span>
          <span class="label">{{ sysMenu.label }}</span>
        </div>

      </div>

      <div class="level-1-children" v-if="route.path === sysMenu.path">
        <div v-for="zoneMenu in getPageMenus(sysMenu.path)" :key="zoneMenu.id" class="zone-menu-group">
          <div class="level-2-node">
            <div class="node-left" @click="zoneMenu.open = !zoneMenu.open">
              <span class="toggle-icon">{{ zoneMenu.open ? '▼' : '▶' }}</span>
              <span class="label">{{ zoneMenu.label }}</span>
            </div>
            <button 
              class="visibility-toggle-btn" 
              :class="{ 'is-active': zoneMenu.visible !== false }"
              @click.stop="toggleGroupVisibility(zoneMenu)"
              title="显示/隐藏全组"
            >✓</button>
          </div>

          <div class="level-3-children" v-show="zoneMenu.open">
            <div v-for="comp in zoneMenu.children" :key="comp.id" class="level-3-node">
              <span class="child-label">{{ comp.label }}</span>
              <button 
                class="visibility-toggle-btn" 
                :class="{ 'is-active': comp.visible }"
                @click="toggleChildVisibility(zoneMenu, comp)"
                title="显示/隐藏组件"
              >✓</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { globalStore } from '../../store.js';

const route = useRoute();
const router = useRouter();

const goToPage = (path) => {
  if (route.path !== path) {
    router.push(path);
  }
};

const getPageMenus = (path) => {
  return globalStore.pageMenus[path] || [];
};

const toggleGroupVisibility = (group) => {
  const nextState = group.visible === false;
  group.visible = nextState;
  if (group.children) {
    group.children.forEach(child => {
      child.visible = nextState;
    });
  }
};

const toggleChildVisibility = (group, child) => {
  child.visible = !child.visible;
  if (group.children) {
    const hasAnyVisible = group.children.some(c => c.visible);
    group.visible = hasAnyVisible;
  }
};

</script>

<style scoped>
.responsive-tree-menu {
  width: 100%;
  height: 100%;
  padding: 12px;
  background-color: #ffffff;
  overflow-y: auto;
  overflow-x: hidden;
  color: #303133;
  box-sizing: border-box;
}

.sys-menu-group {
  margin-bottom: 8px;
}

.level-1-node {
  cursor: pointer;
  padding: 12px;
  background-color: #ffffff;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;
  border: 1px solid #ebeef5;
}

.level-1-node:hover {
  background-color: #f5f7fa;
  border-color: #dcdfe6;
}

.level-1-node.is-active {
  background-color: #ecf5ff;
  border-color: #c6e2ff;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.15);
}

.node-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
}

.icon {
  font-size: 14px;
  flex-shrink: 0;
}

.label {
  font-weight: bold;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.expand-icon {
  font-size: 10px;
  color: #409eff;
}

.level-1-children {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 8px;
}

.zone-menu-group {
  border: 1px solid #ebeef5;
  border-radius: 6px;
  background-color: #ffffff;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.level-2-node {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  background-color: #f5f7fa;
  border-bottom: 1px solid #ebeef5;
}

.toggle-icon {
  font-size: 10px;
  color: #909399;
  width: 12px;
}

.level-3-children {
  display: flex;
  flex-direction: column;
  padding: 4px 0;
  background-color: #ffffff;
}

.level-3-node {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px 8px 28px;
  transition: background-color 0.2s;
}

.level-3-node:hover {
  background-color: #f0f2f5;
}

.child-label {
  font-size: 13px;
  color: #606266;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.visibility-toggle-btn {
  width: 18px;
  height: 18px;
  border: 1px solid #dcdfe6;
  background-color: transparent;
  color: transparent;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: all 0.2s;
  flex-shrink: 0;
}

.visibility-toggle-btn:hover {
  border-color: #409eff;
  color: rgba(64, 158, 255, 0.5);
}

.visibility-toggle-btn.is-active {
  background-color: #409eff;
  border-color: #409eff;
  color: #ffffff;
}
</style>