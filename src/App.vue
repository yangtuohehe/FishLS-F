<!-- 

<template>
  <div class="app-root">
    <header class="app-header">
      <div class="header-left-space"></div>
      <div class="logo-area">海洋牧场数字孪生系统</div>
      <div class="header-right-actions">
        <span class="current-user-info">当前用户：系统管理员</span>
        <button class="user-mgmt-btn" title="进入用户权限管理">用户管理</button>
      </div>
    </header>
    
    <div class="app-body">
      <aside class="app-sidebar" v-show="globalStore.sidebarVisible">
        <TreeMenu />
      </aside>
      
      <div class="sidebar-toggle-btn" @click="globalStore.sidebarVisible = !globalStore.sidebarVisible" title="收起/展开侧边栏">
        {{ globalStore.sidebarVisible ? '◀' : '▶' }}
      </div>
      
      <main class="app-workspace">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { globalStore } from './store.js';
import TreeMenu from './components/ui/TreeMenu.vue';
</script>

<style>
body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; }

.app-root {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #f0f2f5;
  color: #303133;
}

.app-header {
  height: 55px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #dcdfe6;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.header-left-space {
  flex: 1;
}

.logo-area {
  font-size: 22px;
  font-weight: bold;
  color: #409eff;
  text-align: center;
  flex: 2;
  letter-spacing: 2px;
}

.header-right-actions {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
}

.current-user-info {
  font-size: 14px;
  color: #606266;
  letter-spacing: 1px;
}

.user-mgmt-btn {
  background-color: #ffffff;
  color: #606266;
  border: 1px solid #dcdfe6;
  padding: 6px 14px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.user-mgmt-btn:hover {
  background-color: #ecf5ff;
  border-color: #c6e2ff;
  color: #409eff;
}

.app-body {
  flex: 1;
  display: flex;
  min-height: 0;
}

.app-sidebar {
  width: 240px;
  flex-shrink: 0;
  background-color: #ffffff;
  border-right: 1px solid #dcdfe6;
  overflow-y: auto;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.02);
}

.sidebar-toggle-btn {
  width: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f4f5;
  cursor: pointer;
  font-size: 10px;
  color: #909399;
  border-right: 1px solid #dcdfe6;
}

.sidebar-toggle-btn:hover { background-color: #e9e9eb; color: #606266; }

.app-workspace {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background-color: #f0f2f5;
  overflow: hidden;
}
</style> -->

<template>
  <div class="app-root">
    <header class="app-header">
      <div class="header-left-space"></div>
      <div class="logo-area">海洋牧场数字孪生系统</div>
      <div class="header-right-actions">
        <span class="current-user-info">当前用户：系统管理员</span>
        <button class="user-mgmt-btn" title="进入用户权限管理" @click="goToSystemManagement">用户管理</button>
      </div>
    </header>
    
    <div class="app-body">
      <aside class="app-sidebar" v-show="globalStore.sidebarVisible">
        <TreeMenu />
      </aside>
      
      <div class="sidebar-toggle-btn" @click="globalStore.sidebarVisible = !globalStore.sidebarVisible" title="收起/展开侧边栏">
        {{ globalStore.sidebarVisible ? '◀' : '▶' }}
      </div>
      
      <main class="app-workspace">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { globalStore } from './store.js';
import TreeMenu from './components/ui/TreeMenu.vue';

const router = useRouter();

const goToSystemManagement = () => {
  router.push('/system');
};
</script>

<style>
body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; }

.app-root {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #f0f2f5;
  color: #303133;
}

.app-header {
  height: 55px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #dcdfe6;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.header-left-space {
  flex: 1;
}

.logo-area {
  font-size: 22px;
  font-weight: bold;
  color: #409eff;
  text-align: center;
  flex: 2;
  letter-spacing: 2px;
}

.header-right-actions {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
}

.current-user-info {
  font-size: 14px;
  color: #606266;
  letter-spacing: 1px;
}

.user-mgmt-btn {
  background-color: #ffffff;
  color: #606266;
  border: 1px solid #dcdfe6;
  padding: 6px 14px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.user-mgmt-btn:hover {
  background-color: #ecf5ff;
  border-color: #c6e2ff;
  color: #409eff;
}

.app-body {
  flex: 1;
  display: flex;
  min-height: 0;
}

.app-sidebar {
  width: 240px;
  flex-shrink: 0;
  background-color: #ffffff;
  border-right: 1px solid #dcdfe6;
  overflow-y: auto;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.02);
}

.sidebar-toggle-btn {
  width: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f4f5;
  cursor: pointer;
  font-size: 10px;
  color: #909399;
  border-right: 1px solid #dcdfe6;
}

.sidebar-toggle-btn:hover { background-color: #e9e9eb; color: #606266; }

.app-workspace {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background-color: #f0f2f5;
  overflow: hidden;
}
</style>