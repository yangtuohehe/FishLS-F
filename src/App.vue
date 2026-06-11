
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
        
        <div class="workspace-top" v-show="hasTop" :style="{ height: topHeight + 'px' }">
          <div id="teleport-top" class="teleport-container-col"></div>
        </div>
        <div class="resizer-h" @mousedown="startDragTop" v-show="hasTop"></div>

        <div class="workspace-middle">
          
          <div class="workspace-left" v-show="hasLeft" :style="{ width: leftWidth + 'px' }">
            <div id="teleport-left" class="teleport-container-col"></div>
          </div>
          <div class="resizer-v" @mousedown="startDragLeft" v-show="hasLeft"></div>

          <div class="workspace-center">
            <CesiumViewer />
            <div class="center-overlay-layer">
              <router-view></router-view>
            </div>
          </div>

          <div class="resizer-v" @mousedown="startDragRight" v-show="hasRight"></div>
          <div class="workspace-right" v-show="hasRight" :style="{ width: rightWidth + 'px' }">
            <div id="teleport-right" class="teleport-container-col"></div>
          </div>

        </div>

        <div class="resizer-h" @mousedown="startDragBottom" v-show="hasBottom"></div>
        <div class="workspace-bottom" v-show="hasBottom" :style="{ height: bottomHeight + 'px' }">
          <div id="teleport-bottom" class="teleport-container-col"></div>
        </div>

      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { globalStore } from './store.js';
import TreeMenu from './components/ui/TreeMenu.vue';
import CesiumViewer from './components/ui/CesiumViewer.vue';

const route = useRoute();

// 监听当前页面需要显示哪些板块，决定四大边框是否渲染
const activeComponents = computed(() => {
  const comps = [];
  const menus = globalStore.pageMenus[route.path] || [];
  menus.forEach(group => {
    if (group.visible !== false) {
      group.children.forEach(child => { if (child.visible) comps.push(child); });
    }
  });
  return comps;
});


const hasTop = computed(() => activeComponents.value.some(c => c.zone && c.zone.startsWith('top')));
const hasBottom = computed(() => activeComponents.value.some(c => c.zone && c.zone.startsWith('bottom')));
const hasLeft = computed(() => activeComponents.value.some(c => c.zone === 'left'));
const hasRight = computed(() => activeComponents.value.some(c => c.zone === 'right'));

// 宽高响应式数据
const topHeight = ref(160);
const bottomHeight = ref(220);
const leftWidth = ref(300);
const rightWidth = ref(300);

let startX = 0, startY = 0;
let startWidthLeft = 0, startWidthRight = 0;
let startHeightTop = 0, startHeightBottom = 0;

// 拖拽逻辑 (限制最大最小值，防止撑爆)
const onDragLeft = (e) => { leftWidth.value = Math.max(150, Math.min(startWidthLeft + (e.clientX - startX), 600)); };
const stopDragLeft = () => { document.removeEventListener('mousemove', onDragLeft); document.removeEventListener('mouseup', stopDragLeft); document.body.style.userSelect = ''; };
const startDragLeft = (e) => { startX = e.clientX; startWidthLeft = leftWidth.value; document.addEventListener('mousemove', onDragLeft); document.addEventListener('mouseup', stopDragLeft); document.body.style.userSelect = 'none'; };

const onDragRight = (e) => { rightWidth.value = Math.max(150, Math.min(startWidthRight - (e.clientX - startX), 600)); };
const stopDragRight = () => { document.removeEventListener('mousemove', onDragRight); document.removeEventListener('mouseup', stopDragRight); document.body.style.userSelect = ''; };
const startDragRight = (e) => { startX = e.clientX; startWidthRight = rightWidth.value; document.addEventListener('mousemove', onDragRight); document.addEventListener('mouseup', stopDragRight); document.body.style.userSelect = 'none'; };

const onDragTop = (e) => { topHeight.value = Math.max(80, Math.min(startHeightTop + (e.clientY - startY), 400)); };
const stopDragTop = () => { document.removeEventListener('mousemove', onDragTop); document.removeEventListener('mouseup', stopDragTop); document.body.style.userSelect = ''; };
const startDragTop = (e) => { startY = e.clientY; startHeightTop = topHeight.value; document.addEventListener('mousemove', onDragTop); document.addEventListener('mouseup', stopDragTop); document.body.style.userSelect = 'none'; };

const onDragBottom = (e) => { bottomHeight.value = Math.max(80, Math.min(startHeightBottom - (e.clientY - startY), 500)); };
const stopDragBottom = () => { document.removeEventListener('mousemove', onDragBottom); document.removeEventListener('mouseup', stopDragBottom); document.body.style.userSelect = ''; };
const startDragBottom = (e) => { startY = e.clientY; startHeightBottom = bottomHeight.value; document.addEventListener('mousemove', onDragBottom); document.addEventListener('mouseup', stopDragBottom); document.body.style.userSelect = 'none'; };

onBeforeUnmount(() => {
  stopDragLeft(); stopDragRight(); stopDragTop(); stopDragBottom();
});
</script>

<style>
body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; }

.app-root {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #0d1b2a;
  color: #ffffff;
}

/* 顶部标题栏（修改为三列式对称伸缩布局） */
.app-header {
  height: 55px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #0a141f;
  border-bottom: 1px solid #1b263b;
  z-index: 100;
}

.header-left-space {
  flex: 1;
}

.logo-area {
  font-size: 22px; /* 适当增大了系统名称字号 */
  font-weight: bold;
  color: #00b4d8;
  text-align: center;
  flex: 2; /* 确保占据核心中央区域 */
  letter-spacing: 2px; /* 增加了字间距使其更具科技感 */
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
  color: #e0e1dd;
  letter-spacing: 1px;
}

.user-mgmt-btn {
  background-color: #1b263b;
  color: #ffffff;
  border: 1px solid #415a77;
  padding: 6px 14px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.user-mgmt-btn:hover {
  background-color: #00b4d8;
  border-color: #00b4d8;
  color: #ffffff;
}

/* 下方主体区域 */
.app-body {
  flex: 1;
  display: flex;
  min-height: 0;
}

/* 侧边栏 */
.app-sidebar {
  width: 240px;
  flex-shrink: 0;
  background-color: #0a141f;
  border-right: 1px solid #1b263b;
  overflow-y: auto;
}

.sidebar-toggle-btn {
  width: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1b263b;
  cursor: pointer;
  font-size: 10px;
  color: #00b4d8;
}

.sidebar-toggle-btn:hover { background-color: #415a77; color: #fff; }

/* 核心主工作区 */
.app-workspace {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 8px;
  gap: 0;
}

/* 上栏与下栏 */
.workspace-top, .workspace-bottom {
  flex-shrink: 0;
  overflow: hidden; 
  display: flex;
  flex-direction: column;
}

/* 中间栏（横向排布 左、中、右） */
.workspace-middle {
  flex: 1;
  display: flex;
  min-height: 0;
}

.workspace-left, .workspace-right {
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* 中心地球 */
.workspace-center {
  flex: 1;
  position: relative;
  min-width: 0; min-height: 0;
  background: #000;
  border-radius: 6px;
  border: 1px solid #1b263b;
  overflow: hidden;
}

/* 拖拽控制柄 */
.resizer-h { height: 8px; cursor: row-resize; background: transparent; transition: background 0.2s; flex-shrink: 0; }
.resizer-h:hover, .resizer-h:active { background: rgba(0, 180, 216, 0.5); }
.resizer-v { width: 8px; cursor: col-resize; background: transparent; transition: background 0.2s; flex-shrink: 0; }
.resizer-v:hover, .resizer-v:active { background: rgba(0, 180, 216, 0.5); }

/* 为Teleport目标设立占满容器的基础结构 */
.teleport-container-col {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 8px;
}

/* 页面自身绝对定位悬浮层 */
.center-overlay-layer {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;
}
.center-overlay-layer > * { pointer-events: auto; }
</style>

<!-- <template>
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
        
        <div class="workspace-top" v-show="hasTop" :style="{ height: topHeight + 'px' }">
          <div id="teleport-top" class="teleport-container-col"></div>
        </div>
        <div class="resizer-h" @mousedown="startDragTop" v-show="hasTop"></div>

        <div class="workspace-middle">
          
          <div class="workspace-left" v-show="hasLeft" :style="{ width: leftWidth + 'px' }">
            <div id="teleport-left" class="teleport-container-col"></div>
          </div>
          <div class="resizer-v" @mousedown="startDragLeft" v-show="hasLeft"></div>

          <div class="workspace-center">
            <div ref="appEarthHost" style="width: 100%; height: 100%; pointer-events: auto;"></div>
            <div class="center-overlay-layer">
              <router-view></router-view>
            </div>
          </div>

          <div class="resizer-v" @mousedown="startDragRight" v-show="hasRight"></div>
          <div class="workspace-right" v-show="hasRight" :style="{ width: rightWidth + 'px' }">
            <div id="teleport-right" class="teleport-container-col"></div>
          </div>

        </div>

        <div class="resizer-h" @mousedown="startDragBottom" v-show="hasBottom"></div>
        <div class="workspace-bottom" v-show="hasBottom" :style="{ height: bottomHeight + 'px' }">
          <div id="teleport-bottom" class="teleport-container-col"></div>
        </div>

      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onBeforeUnmount, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { globalStore } from './store.js';
import TreeMenu from './components/ui/TreeMenu.vue';
import { getGlobalCesium } from './utils/cesiumManager.js';

const route = useRoute();
const appEarthHost = ref(null);

const activeComponents = computed(() => {
  const comps = [];
  const menus = globalStore.pageMenus[route.path] || [];
  menus.forEach(group => {
    if (group.visible !== false) {
      group.children.forEach(child => { if (child.visible) comps.push(child); });
    }
  });
  return comps;
});

const hasTop = computed(() => activeComponents.value.some(c => c.zone && c.zone.startsWith('top')));
const hasBottom = computed(() => activeComponents.value.some(c => c.zone && c.zone.startsWith('bottom')));
const hasLeft = computed(() => activeComponents.value.some(c => c.zone === 'left'));
const hasRight = computed(() => activeComponents.value.some(c => c.zone === 'right'));

const topHeight = ref(160);
const bottomHeight = ref(220);
const leftWidth = ref(300);
const rightWidth = ref(300);

let startX = 0, startY = 0;
let startWidthLeft = 0, startWidthRight = 0;
let startHeightTop = 0, startHeightBottom = 0;

const onDragLeft = (e) => { leftWidth.value = Math.max(150, Math.min(startWidthLeft + (e.clientX - startX), 600)); };
const stopDragLeft = () => { document.removeEventListener('mousemove', onDragLeft); document.removeEventListener('mouseup', stopDragLeft); document.body.style.userSelect = ''; };
const startDragLeft = (e) => { startX = e.clientX; startWidthLeft = leftWidth.value; document.addEventListener('mousemove', onDragLeft); document.addEventListener('mouseup', stopDragLeft); document.body.style.userSelect = 'none'; };

const onDragRight = (e) => { rightWidth.value = Math.max(150, Math.min(startWidthRight - (e.clientX - startX), 600)); };
const stopDragRight = () => { document.removeEventListener('mousemove', onDragRight); document.removeEventListener('mouseup', stopDragRight); document.body.style.userSelect = ''; };
const startDragRight = (e) => { startX = e.clientX; startWidthRight = rightWidth.value; document.addEventListener('mousemove', onDragRight); document.addEventListener('mouseup', stopDragRight); document.body.style.userSelect = 'none'; };

const onDragTop = (e) => { topHeight.value = Math.max(80, Math.min(startHeightTop + (e.clientY - startY), 400)); };
const stopDragTop = () => { document.removeEventListener('mousemove', onDragTop); document.removeEventListener('mouseup', stopDragTop); document.body.style.userSelect = ''; };
const startDragTop = (e) => { startY = e.clientY; startHeightTop = topHeight.value; document.addEventListener('mousemove', onDragTop); document.addEventListener('mouseup', stopDragTop); document.body.style.userSelect = 'none'; };

const onDragBottom = (e) => { bottomHeight.value = Math.max(80, Math.min(startHeightBottom - (e.clientY - startY), 500)); };
const stopDragBottom = () => { document.removeEventListener('mousemove', onDragBottom); document.removeEventListener('mouseup', stopDragBottom); document.body.style.userSelect = ''; };
const startDragBottom = (e) => { startY = e.clientY; startHeightBottom = bottomHeight.value; document.addEventListener('mousemove', onDragBottom); document.addEventListener('mouseup', stopDragBottom); document.body.style.userSelect = 'none'; };

watch(() => route.path, (newPath) => {
  const isMonitorPage = newPath.toLowerCase().includes('monitor');
  
  if (!isMonitorPage) {
    nextTick(() => {
      if (appEarthHost.value) {
        const { viewer, cesiumContainer } = getGlobalCesium();
        
        if (cesiumContainer.parentNode) {
          cesiumContainer.parentNode.removeChild(cesiumContainer);
        }
        
        appEarthHost.value.appendChild(cesiumContainer);
        cesiumContainer.style.display = 'block';
        
        requestAnimationFrame(() => {
          if (viewer) {
            viewer.resize();
            viewer.scene.requestRender();
          }
        });
      }
    });
  }
}, { immediate: true });

onBeforeUnmount(() => {
  stopDragLeft(); stopDragRight(); stopDragTop(); stopDragBottom();
});
</script>

<style>
body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; }

.app-root {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #0d1b2a;
  color: #ffffff;
}

.app-header {
  height: 55px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #0a141f;
  border-bottom: 1px solid #1b263b;
  z-index: 100;
}

.header-left-space {
  flex: 1;
}

.logo-area {
  font-size: 22px;
  font-weight: bold;
  color: #00b4d8;
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
  color: #e0e1dd;
  letter-spacing: 1px;
}

.user-mgmt-btn {
  background-color: #1b263b;
  color: #ffffff;
  border: 1px solid #415a77;
  padding: 6px 14px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.user-mgmt-btn:hover {
  background-color: #00b4d8;
  border-color: #00b4d8;
  color: #ffffff;
}

.app-body {
  flex: 1;
  display: flex;
  min-height: 0;
}

.app-sidebar {
  width: 240px;
  flex-shrink: 0;
  background-color: #0a141f;
  border-right: 1px solid #1b263b;
  overflow-y: auto;
}

.sidebar-toggle-btn {
  width: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1b263b;
  cursor: pointer;
  font-size: 10px;
  color: #00b4d8;
}

.sidebar-toggle-btn:hover { background-color: #415a77; color: #fff; }

.app-workspace {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 8px;
  gap: 0;
}

.workspace-top, .workspace-bottom {
  flex-shrink: 0;
  overflow: hidden; 
  display: flex;
  flex-direction: column;
}

.workspace-middle {
  flex: 1;
  display: flex;
  min-height: 0;
}

.workspace-left, .workspace-right {
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.workspace-center {
  flex: 1;
  position: relative;
  min-width: 0; min-height: 0;
  background: #000;
  border-radius: 6px;
  border: 1px solid #1b263b;
  overflow: hidden;
}

.resizer-h { height: 8px; cursor: row-resize; background: transparent; transition: background 0.2s; flex-shrink: 0; }
.resizer-h:hover, .resizer-h:active { background: rgba(0, 180, 216, 0.5); }
.resizer-v { width: 8px; cursor: col-resize; background: transparent; transition: background 0.2s; flex-shrink: 0; }
.resizer-v:hover, .resizer-v:active { background: rgba(0, 180, 216, 0.5); }

.teleport-container-col {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 8px;
}

.center-overlay-layer {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;
}
.center-overlay-layer > * { pointer-events: auto; }
</style> -->