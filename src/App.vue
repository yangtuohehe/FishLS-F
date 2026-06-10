<template>
  <div class="smart-platform-layout">
    <header class="sys-header">
      <div class="sys-logo">
        <span class="logo-icon">🌊</span>
        <span class="logo-text">海洋牧场智慧监管平台</span>
      </div>

      <div class="sys-actions">
        <span class="action-item" @click="isSidebarVisible = !isSidebarVisible">
          {{ isSidebarVisible ? '隐藏侧边栏' : '显示侧边栏' }}
        </span>
        <span class="user-info">admin ▼</span>
      </div>
    </header>

    <div class="sys-body">
      <aside class="sys-sidebar" v-show="isSidebarVisible">
        <div class="sidebar-accordion-container">
          
          <div v-for="menu in globalStore.systemMenus" :key="menu.id" class="accordion-group">
            
            <router-link 
              :to="menu.path" 
              class="accordion-header"
              active-class="accordion-header-active"
            >
              <span class="nav-icon">{{ menu.icon }}</span>
              <span class="nav-label">{{ menu.label }}</span>
            </router-link>

            <div v-show="currentActivePath === menu.path" class="accordion-body">
              <TreeMenu :menus="globalStore.pageMenus[menu.path] || []" />
            </div>

          </div>
          
        </div>
      </aside>

      <main class="sys-main">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { globalStore } from './store.js';
import TreeMenu from './components/ui/TreeMenu.vue';

const isSidebarVisible = ref(true);
const route = useRoute();

const currentActivePath = computed(() => {
  return route.path === '/' ? '/overview' : route.path;
});
</script>

<style scoped>
.smart-platform-layout {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #f0f2f5;
  font-family: system-ui, sans-serif;
}

.sys-header {
  height: 60px;
  background-color: #0d1b2a;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
  flex-shrink: 0;
}

.sys-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 260px;
}

.logo-icon {
  font-size: 24px;
}

.logo-text {
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 1px;
}

.sys-actions {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 14px;
}

.action-item {
  cursor: pointer;
  color: #90cdf4;
}

.action-item:hover {
  color: #ffffff;
}

.user-info {
  cursor: pointer;
}

.sys-body {
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.sys-sidebar {
  width: 260px;
  background-color: #ffffff;
  border-right: 1px solid #e4e7ed;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition: width 0.3s;
}

.sidebar-accordion-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.accordion-group {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #f0f2f5;
}

.accordion-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  text-decoration: none;
  color: #303133;
  font-size: 16px;
  transition: all 0.2s ease;
  background-color: #fafafa;
}

.accordion-header:hover {
  background-color: #f0f7ff;
  color: #1890ff;
}

.accordion-header-active {
  background-color: #e6f7ff;
  color: #1890ff;
  font-weight: bold;
  border-left: 4px solid #1890ff;
}

.accordion-body {
  background-color: #ffffff;
}

.sys-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
}
</style>