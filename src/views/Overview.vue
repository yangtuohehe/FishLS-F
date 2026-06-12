<!-- 
<template>
  <div class="page-component-container">
    <CesiumViewer />

    <div class="overview-overlays">
      <Teleport to="#teleport-top" v-if="isMounted">
        <div class="comp-row" v-if="top1ZoneComps.length > 0">
          <div class="comp-box" v-for="comp in top1ZoneComps" :key="comp.id">
            <DataCard v-if="comp.type === 'card'" v-bind="comp.props" />
          </div>
        </div>
        <div class="comp-row" v-if="top2ZoneComps.length > 0">
          <div class="comp-box" v-for="comp in top2ZoneComps" :key="comp.id">
            <DataCard v-if="comp.type === 'card'" v-bind="comp.props" />
          </div>
        </div>
      </Teleport>

      <Teleport to="#teleport-left" v-if="isMounted">
        <div class="comp-box" v-for="comp in leftZoneComps" :key="comp.id">
          <DataCard v-if="comp.type === 'card'" v-bind="comp.props" />
          <PieChart v-if="comp.type === 'pie'" v-bind="comp.props" />
          <LineChart v-if="comp.type === 'line'" v-bind="comp.props" />
        </div>
      </Teleport>

      <Teleport to="#teleport-right" v-if="isMounted">
        <div class="export-action-bar" v-if="rightZoneComps.length > 0">
          <button class="export-report-btn" title="导出当前预警统计报表">导出报表</button>
        </div>
        <div class="comp-box" v-for="comp in rightZoneComps" :key="comp.id">
          <DynamicList v-if="comp.type === 'list'" v-bind="comp.props" />
          <PieChart v-if="comp.type === 'pie'" v-bind="comp.props" />
        </div>
      </Teleport>

      <Teleport to="#teleport-bottom" v-if="isMounted">
        <div class="comp-row" v-if="bottom1ZoneComps.length > 0">
          <div class="comp-box" v-for="comp in bottom1ZoneComps" :key="comp.id">
            <LineChart v-if="comp.type === 'line'" v-bind="comp.props" />
          </div>
        </div>
        <div class="comp-row" v-if="bottom2ZoneComps.length > 0">
          <div class="comp-box" v-for="comp in bottom2ZoneComps" :key="comp.id">
            <LineChart v-if="comp.type === 'line'" v-bind="comp.props" />
          </div>
        </div>
      </Teleport>

      <div class="map-floating-toolbar pointer-auto">
        <button class="map-tool-btn" title="视角复位">🏠</button>
        <button class="map-tool-btn" title="放大">➕</button>
        <button class="map-tool-btn" title="缩小">➖</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { globalStore } from '../store.js';
import CesiumViewer from '../components/ui/CesiumViewer.vue'; // 引入局部地图组件
import DataCard from '../components/ui/DataCard.vue';
import BarChart from '../components/charts/BarChart.vue';
import LineChart from '../components/charts/LineChart.vue';
import PieChart from '../components/charts/PieChart.vue';
import StackedBarChart from '../components/charts/StackedBarChart.vue';
import DynamicList from '../components/ui/DynamicList.vue';

const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
});

const activeComponents = computed(() => {
  const comps = [];
  const currentMenus = globalStore.pageMenus['/overview'] || [];
  currentMenus.forEach(group => {
    if (group.visible !== false) {
      group.children.forEach(child => { if (child.visible) comps.push(child); });
    }
  });
  return comps;
});

const top1ZoneComps = computed(() => activeComponents.value.filter(c => c.zone === 'top1'));
const top2ZoneComps = computed(() => activeComponents.value.filter(c => c.zone === 'top2'));
const leftZoneComps = computed(() => activeComponents.value.filter(c => c.zone === 'left'));
const rightZoneComps = computed(() => activeComponents.value.filter(c => c.zone === 'right'));
const bottom1ZoneComps = computed(() => activeComponents.value.filter(c => c.zone === 'bottom1'));
const bottom2ZoneComps = computed(() => activeComponents.value.filter(c => c.zone === 'bottom2'));
</script>

<style scoped>
.page-component-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.overview-overlays {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}

.pointer-auto {
  pointer-events: auto;
}

.comp-row {
  display: flex;
  gap: 8px;
  flex: 1;
  min-height: 0;
}

.comp-box {
  flex: 1;
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.export-action-bar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 4px;
}

.export-report-btn {
  background-color: #1890ff;
  color: #ffffff;
  border: none;
  padding: 6px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  transition: background-color 0.2s;
  box-shadow: 0 2px 4px rgba(24, 144, 255, 0.3);
}

.export-report-btn:hover {
  background-color: #40a9ff;
}

.map-floating-toolbar {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: rgba(13, 27, 42, 0.85);
  border: 1px solid #1b263b;
  padding: 8px;
  border-radius: 6px;
}

.map-tool-btn {
  width: 32px;
  height: 32px;
  background-color: #1b263b;
  color: white;
  border: 1px solid #415a77;
  border-radius: 4px;
  cursor: pointer;
}

.map-tool-btn:hover {
  background-color: #00b4d8;
  border-color: #00b4d8;
}
</style> -->

<template>
  <div class="overview-grid-container">


    <GridLayout
      v-model:layout="layout"
      :col-num="24"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
    >
      <GridItem
        v-for="item in layout"
        :key="item.i"
        :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i"
        drag-allow-from=".drag-handle"
        class="grid-item-wrapper"
        :class="{ 'earth-grid-item': item.type === 'earth' }"
      >
        <div class="item-content">
          <div class="drag-handle">⠿ {{ item.label }}</div>
          <div class="body-content">
            <CesiumViewer v-if="item.type === 'earth'" />
            <DataCard v-else-if="item.type === 'card'" v-bind="item.props" />
            <PieChart v-else-if="item.type === 'pie'" v-bind="item.props" />
            <LineChart v-else-if="item.type === 'line'" v-bind="item.props" />
            <DynamicList v-else-if="item.type === 'list'" v-bind="item.props" />
            <BarChart v-else-if="item.type === 'bar'" v-bind="item.props" />
            <StackedBarChart v-else-if="item.type === 'stacked'" v-bind="item.props" />
          </div>
        </div>
      </GridItem>
    </GridLayout>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { GridLayout, GridItem } from 'grid-layout-plus';
import { globalStore } from '../store.js';
import CesiumViewer from '../components/ui/CesiumViewer.vue';
import DataCard from '../components/ui/DataCard.vue';
import BarChart from '../components/charts/BarChart.vue';
import LineChart from '../components/charts/LineChart.vue';
import PieChart from '../components/charts/PieChart.vue';
import StackedBarChart from '../components/charts/StackedBarChart.vue';
import DynamicList from '../components/ui/DynamicList.vue';

const layout = ref([]);

watch(
  () => {
    const menus = globalStore.pageMenus['/overview'];
    if (!menus) return '';
    return menus.map(group => {
      const groupVisible = group.visible ? 'T' : 'F';
      const childrenVisible = group.children ? group.children.map(child => child.visible ? 'T' : 'F').join('') : '';
      return groupVisible + childrenVisible;
    }).join('-');
  },
  () => {
    const flatLayout = [];
    
    flatLayout.push({
      id: 'earth',
      i: 'earth',
      label: '数字孪生底座',
      visible: true,
      type: 'earth',
      x: 6,
      y: 0,
      w: 12,
      h: 14
    });

    const menus = globalStore.pageMenus['/overview'];
    let currentX = 0;
    let currentY = 0;
    
    if (menus) {
      menus.forEach(group => {
        if (group.visible && group.children) {
          group.children.forEach(child => {
            if (child.visible) {
              let defaultW = 6;
              let defaultH = 8;
              
              if (child.type === 'card') {
                defaultW = 6;
                defaultH = 4;
              } else if (child.type === 'line' || child.type === 'list' || child.type === 'pie') {
                defaultW = 6;
                defaultH = 8;
              }

              if (currentX + defaultW > 24) {
                currentX = 0;
                currentY += 4;
              }
              
              if (currentY < 14 && currentX >= 6 && currentX < 18) {
                currentX = 18;
              }

              flatLayout.push({
                ...child,
                i: child.id,
                x: child.x !== undefined ? child.x : currentX,
                y: child.y !== undefined ? child.y : currentY,
                w: child.w !== undefined ? child.w : defaultW,
                h: child.h !== undefined ? child.h : defaultH
              });
              
              currentX += defaultW;
            }
          });
        }
      });
    }
    layout.value = flatLayout;
  },
  { immediate: true }
);
</script>

<style scoped>
.overview-grid-container {
  width: 100%;
  height: calc(100vh - 55px);
  overflow: auto;
  background: #f0f2f5;
  position: relative;
}

.grid-item-wrapper {
  background: #ffffff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  color: #303133;
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.grid-item-wrapper:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.grid-item-wrapper.earth-grid-item {
  touch-action: auto !important;
  pointer-events: auto !important;
  z-index: 5;
}

.item-content { 
  display: flex; 
  flex-direction: column; 
  height: 100%; 
}

.drag-handle { 
  padding: 8px 12px; 
  background: #f5f7fa; 
  color: #606266; 
  font-size: 13px; 
  font-weight: 500;
  cursor: grab;
  z-index: 10;
  border-bottom: 1px solid #ebeef5;
}

.drag-handle:active {
  cursor: grabbing;
}

.body-content { 
  flex: 1; 
  min-height: 0; 
  overflow: auto;
  padding: 4px;
}


.map-tool-btn:hover {
  background-color: #ecf5ff;
  border-color: #c6e2ff;
  color: #409eff;
}
</style>