<!-- <template>
  <div class="overview-container">
    <div class="main-zone-top" v-if="top1ZoneComps.length > 0">
      <div class="comp-wrapper" v-for="comp in top1ZoneComps" :key="comp.id">
        <DataCard v-if="comp.type === 'card'" v-bind="comp.props" />
      </div>
    </div>

    <div class="main-zone-top" v-if="top2ZoneComps.length > 0">
      <div class="comp-wrapper" v-for="comp in top2ZoneComps" :key="comp.id">
        <DataCard v-if="comp.type === 'card'" v-bind="comp.props" />
      </div>
    </div>

    <div class="main-zone-middle">
      <div class="main-zone-left" v-if="leftZoneComps.length > 0">
        <div class="comp-wrapper" v-for="comp in leftZoneComps" :key="comp.id">
          <PieChart v-if="comp.type === 'pie'" v-bind="comp.props" />
        </div>
      </div>

      <div class="main-zone-center">
        <div class="cesium-earth-container">
          <CesiumViewer />
        </div>
      </div>

      <div class="main-zone-right" v-if="rightZoneComps.length > 0">
        <div class="comp-wrapper" v-for="comp in rightZoneComps" :key="comp.id">
          <DynamicList v-if="comp.type === 'list'" v-bind="comp.props" />
        </div>
      </div>
    </div>

    <div class="main-zone-bottom" v-if="bottom1ZoneComps.length > 0">
      <div class="comp-wrapper" v-for="comp in bottom1ZoneComps" :key="comp.id">
        <LineChart v-if="comp.type === 'line'" v-bind="comp.props" />
        <BarChart v-if="comp.type === 'bar'" v-bind="comp.props" />
        <StackedBarChart v-if="comp.type === 'stacked-bar'" v-bind="comp.props" />
      </div>
    </div>

    <div class="main-zone-bottom" v-if="bottom2ZoneComps.length > 0">
      <div class="comp-wrapper" v-for="comp in bottom2ZoneComps" :key="comp.id">
        <LineChart v-if="comp.type === 'line'" v-bind="comp.props" />
        <BarChart v-if="comp.type === 'bar'" v-bind="comp.props" />
        <StackedBarChart v-if="comp.type === 'stacked-bar'" v-bind="comp.props" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { globalStore } from '../store.js';
import DataCard from '../components/ui/DataCard.vue';
import BarChart from '../components/charts/BarChart.vue';
import LineChart from '../components/charts/LineChart.vue';
import PieChart from '../components/charts/PieChart.vue';
import StackedBarChart from '../components/charts/StackedBarChart.vue';
import DynamicList from '../components/ui/DynamicList.vue';
import CesiumViewer from '../components/ui/CesiumViewer.vue';

const activeComponents = computed(() => {
  const comps = [];
  const currentMenus = globalStore.pageMenus['/overview'] || [];
  currentMenus.forEach(group => {
    group.children.forEach(child => {
      if (child.visible) comps.push(child);
    });
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
.overview-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 12px;
  min-width: 0;
  overflow-y: auto;
  overflow-x: hidden;
}
.main-zone-top {
  display: flex;
  gap: 12px;
  flex-shrink: 0;
  height: 100px;
}
.main-zone-middle {
  display: flex;
  flex: 1;
  gap: 12px;
  min-height: 400px;
  min-width: 0;
}
.main-zone-left,
.main-zone-right {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 340px;
  flex-shrink: 0;
}
.main-zone-center {
  flex: 1;
  display: flex;
  min-width: 0;
  min-height: 0;
  background-color: #0d1b2a;
  border-radius: 8px;
  border: 1px solid #1b263b;
  overflow: hidden;
}
.cesium-earth-container {
  width: 100%;
  height: 100%;
}
.main-zone-bottom {
  display: flex;
  gap: 12px;
  flex-shrink: 0;
  height: 280px;
}
.comp-wrapper {
  flex: 1;
  min-width: 0;
  min-height: 0;
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style> -->
<template>
  <div class="overview-container">
    <div class="main-zone-top" v-if="top1ZoneComps.length > 0">
      <div class="comp-wrapper" v-for="comp in top1ZoneComps" :key="comp.id">
        <DataCard v-if="comp.type === 'card'" v-bind="comp.props" />
      </div>
    </div>

    <div class="main-zone-top" v-if="top2ZoneComps.length > 0">
      <div class="comp-wrapper" v-for="comp in top2ZoneComps" :key="comp.id">
        <DataCard v-if="comp.type === 'card'" v-bind="comp.props" />
      </div>
    </div>

    <div class="main-zone-middle">
      <div class="main-zone-left" v-if="leftZoneComps.length > 0">
        <div class="comp-wrapper" v-for="comp in leftZoneComps" :key="comp.id">
          <PieChart v-if="comp.type === 'pie'" v-bind="comp.props" />
          <BarChart v-if="comp.type === 'bar'" v-bind="comp.props" />
        </div>
      </div>

      <div class="main-zone-center">
        <div class="cesium-earth-container">
          <CesiumViewer />
        </div>

        <div class="map-floating-toolbar">
          <button class="map-tool-btn" title="视角复位">🏠</button>
          <button class="map-tool-btn" title="放大镜头">➕</button>
          <button class="map-tool-btn" title="缩小镜头">➖</button>
          <button class="map-tool-btn" title="空间测距">📏</button>
          <button class="map-tool-btn" title="切换底图">🗺️</button>
        </div>

        <div class="map-floating-legend">
          <div class="legend-header">物联网图例说明</div>
          <div class="legend-content">
            <div class="legend-row">
              <span class="legend-dot status-blue"></span>
              <span class="legend-text">水质监测站点</span>
            </div>
            <div class="legend-row">
              <span class="legend-dot status-green"></span>
              <span class="legend-text">智能控制水阀</span>
            </div>
            <div class="legend-row">
              <span class="legend-dot status-orange"></span>
              <span class="legend-text">深水养殖网箱</span>
            </div>
            <div class="legend-row">
              <span class="legend-dot status-red"></span>
              <span class="legend-text">异常告警区域</span>
            </div>
          </div>
        </div>

        <div class="map-timeline-controller">
          <button class="play-btn">▶</button>
          <div class="timeline-track">
            <div class="timeline-progress"></div>
            <div class="timeline-handle"></div>
          </div>
          <span class="time-display">实时监测中</span>
        </div>
      </div>

      <div class="main-zone-right" v-if="rightZoneComps.length > 0">
        <div class="comp-wrapper" v-for="comp in rightZoneComps" :key="comp.id">
          <DynamicList v-if="comp.type === 'list'" v-bind="comp.props" />
        </div>
      </div>
    </div>

    <div class="main-zone-bottom" v-if="bottom1ZoneComps.length > 0">
      <div class="comp-wrapper" v-for="comp in bottom1ZoneComps" :key="comp.id">
        <LineChart v-if="comp.type === 'line'" v-bind="comp.props" />
        <BarChart v-if="comp.type === 'bar'" v-bind="comp.props" />
        <StackedBarChart v-if="comp.type === 'stacked-bar'" v-bind="comp.props" />
      </div>
    </div>

    <div class="main-zone-bottom" v-if="bottom2ZoneComps.length > 0">
      <div class="comp-wrapper" v-for="comp in bottom2ZoneComps" :key="comp.id">
        <LineChart v-if="comp.type === 'line'" v-bind="comp.props" />
        <BarChart v-if="comp.type === 'bar'" v-bind="comp.props" />
        <StackedBarChart v-if="comp.type === 'stacked-bar'" v-bind="comp.props" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { globalStore } from '../store.js';
import DataCard from '../components/ui/DataCard.vue';
import BarChart from '../components/charts/BarChart.vue';
import LineChart from '../components/charts/LineChart.vue';
import PieChart from '../components/charts/PieChart.vue';
import StackedBarChart from '../components/charts/StackedBarChart.vue';
import DynamicList from '../components/ui/DynamicList.vue';
import CesiumViewer from '../components/ui/CesiumViewer.vue';

const activeComponents = computed(() => {
  const comps = [];
  const currentMenus = globalStore.pageMenus['/overview'] || [];
  currentMenus.forEach(group => {
    group.children.forEach(child => {
      if (child.visible) comps.push(child);
    });
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
.overview-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 12px;
  min-width: 0;
  overflow-y: auto;
  overflow-x: hidden;
}

.main-zone-top {
  display: flex;
  gap: 12px;
  flex-shrink: 0;
  height: 100px;
}

.main-zone-middle {
  display: flex;
  flex: 1;
  gap: 12px;
  min-height: 400px;
  min-width: 0;
}

.main-zone-left,
.main-zone-right {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 340px;
  flex-shrink: 0;
}

.main-zone-center {
  flex: 1;
  display: flex;
  min-width: 0;
  min-height: 0;
  background-color: #0d1b2a;
  border-radius: 8px;
  border: 1px solid #1b263b;
  overflow: hidden;
  position: relative; /* 必须声明相对定位以支撑内部浮层 */
}

.cesium-earth-container {
  width: 100%;
  height: 100%;
}

/* 浮动工具栏样式定义 */
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.map-tool-btn {
  width: 32px;
  height: 32px;
  background-color: #1b263b;
  border: 1px solid #415a77;
  color: #ffffff;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.map-tool-btn:hover {
  background-color: #00b4d8;
  border-color: #00b4d8;
}

/* 浮动图表图例样式定义 */
.map-floating-legend {
  position: absolute;
  bottom: 76px;
  left: 16px;
  background-color: rgba(13, 27, 42, 0.85);
  border: 1px solid #1b263b;
  padding: 12px;
  border-radius: 6px;
  color: #ffffff;
  width: 160px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.legend-header {
  font-size: 13px;
  font-weight: bold;
  border-bottom: 1px solid #415a77;
  padding-bottom: 6px;
  margin-bottom: 8px;
  color: #00b4d8;
}

.legend-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.legend-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.status-blue { background-color: #0077b6; }
.status-green { background-color: #2a9d8f; }
.status-orange { background-color: #e76f51; }
.status-red { background-color: #e63946; }

.legend-text {
  font-size: 12px;
  color: #e0e1dd;
}

/* 底部轨迹控制时间轴样式定义 */
.map-timeline-controller {
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
  height: 44px;
  background-color: rgba(13, 27, 42, 0.85);
  border: 1px solid #1b263b;
  border-radius: 6px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.play-btn {
  background: none;
  border: none;
  color: #00b4d8;
  font-size: 18px;
  cursor: pointer;
  outline: none;
}

.timeline-track {
  flex: 1;
  height: 4px;
  background-color: #415a77;
  border-radius: 2px;
  position: relative;
  cursor: pointer;
}

.timeline-progress {
  width: 100%;
  height: 100%;
  background-color: #00b4d8;
  border-radius: 2px;
}

.timeline-handle {
  width: 12px;
  height: 12px;
  background-color: #ffffff;
  border: 2px solid #00b4d8;
  border-radius: 50%;
  position: absolute;
  top: -4px;
  right: 0;
  box-shadow: 0 0 4px rgba(0,0,0,0.5);
}

.time-display {
  font-size: 12px;
  color: #ffffff;
  white-space: nowrap;
}

.main-zone-bottom {
  display: flex;
  gap: 12px;
  flex-shrink: 0;
  height: 280px;
}

.comp-wrapper {
  flex: 1;
  min-width: 0;
  min-height: 0;
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>