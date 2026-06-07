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
        <TreeMenu :menus="menuGroups" />
      </aside>

      <main class="sys-main">
        <router-view :menuGroups="menuGroups"></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TreeMenu from './components/ui/TreeMenu.vue';

const isSidebarVisible = ref(true);

const menuGroups = ref([
  {
    id: 'view',
    label: '监督总览面板控制',
    open: true,
    children: [
      { id: 't1', label: '顶部: 养殖区数量', visible: true, zone: 'top', type: 'card', props: { label: '养殖区数量', value: '12', unit: '个', description: '较昨日', statusText: '↑ 2', statusType: 'up' } },
      { id: 't2', label: '顶部: 网箱数量', visible: true, zone: 'top', type: 'card', props: { label: '网箱数量', value: '186', unit: '口', description: '较昨日', statusText: '↑ 5', statusType: 'up' } },
      { id: 't3', label: '顶部: 监测点数量', visible: true, zone: 'top', type: 'card', props: { label: '监测点数量', value: '98', unit: '个', description: '较昨日', statusText: '↑ 3', statusType: 'up' } },
      { id: 't4', label: '顶部: 在线设备率', visible: true, zone: 'top', type: 'card', props: { label: '在线设备率', value: '90.2', unit: '%', description: '较昨日', statusText: '↑ 1.2%', statusType: 'up' } },
      { id: 'l1', label: '左侧: 设备在线率饼图', visible: true, zone: 'left', type: 'pie', props: { title: '设备在线率', chartData: [{name: '在线', value: 231}, {name: '离线', value: 18}, {name: '故障', value: 7}] } },
      { id: 'r1', label: '右侧: 风险等级分布', visible: true, zone: 'right', type: 'pie', props: { title: '风险等级分布', chartData: [{name: '高风险', value: 2}, {name: '较高风险', value: 3}, {name: '中风险', value: 4}, {name: '低风险', value: 3}] } },
      { id: 'b1', label: '底部: 溶解氧趋势', visible: true, zone: 'bottom', type: 'line', props: { title: '溶解氧变化趋势(mg/L)', xAxisData: ['00:00', '06:00', '12:00', '18:00'], seriesData: [{name: '养殖区A', data: [6.5, 7.2, 6.8, 7.5]}, {name: '养殖区B', data: [5.5, 6.0, 5.8, 6.2]}] } },
      { id: 'b2', label: '底部: 水温变化趋势', visible: true, zone: 'bottom', type: 'line', props: { title: '水温变化趋势(°C)', xAxisData: ['00:00', '06:00', '12:00', '18:00'], seriesData: [{name: '养殖区A', data: [24, 25, 26, 25]}, {name: '养殖区B', data: [23, 24, 25, 24]}] } },
      { id: 'b3', label: '底部: 预警数量统计', visible: true, zone: 'bottom', type: 'bar', props: { title: '预警数量趋势(条)', categories: ['05-26', '05-27', '05-28', '05-29', '05-30'], values: [15, 20, 25, 18, 30] } }
    ]
  }
]);
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
  height: 56px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  z-index: 10;
  flex-shrink: 0;
}

.sys-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  font-size: 24px;
}

.logo-text {
  font-size: 18px;
  font-weight: bold;
  color: #1890ff;
  letter-spacing: 1px;
}

.sys-actions {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 14px;
  color: #606266;
}

.action-item {
  cursor: pointer;
  color: #1890ff;
  font-weight: 500;
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
  flex-shrink: 0;
  transition: width 0.3s;
}

.sys-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
}
</style>