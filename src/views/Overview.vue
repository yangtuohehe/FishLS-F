<!-- <template>
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
        <PieChart v-if="comp.type === 'pie'" v-bind="comp.props" />
        <BarChart v-if="comp.type === 'bar'" v-bind="comp.props" />
      </div>
    </Teleport>

    <Teleport to="#teleport-right" v-if="isMounted">
      <div class="comp-box" v-for="comp in rightZoneComps" :key="comp.id">
        <DynamicList v-if="comp.type === 'list'" v-bind="comp.props" />
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

    <div class="map-floating-toolbar">
      <button class="map-tool-btn" title="视角复位">🏠</button>
      <button class="map-tool-btn" title="放大">➕</button>
      <button class="map-tool-btn" title="缩小">➖</button>
    </div>

  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { globalStore } from '../store.js';
import DataCard from '../components/ui/DataCard.vue';
import BarChart from '../components/charts/BarChart.vue';
import LineChart from '../components/charts/LineChart.vue';
import PieChart from '../components/charts/PieChart.vue';
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
/* 这个空Div不需要尺寸，因为核心组件被传走了 */
.overview-overlays {}

/* 行结构：让两行平分父级高度 */
.comp-row {
  display: flex;
  gap: 8px;
  flex: 1; /* 每行平分高度 */
  min-height: 0; /* 关键：允许内容在容器被挤压时出现滚动条而不是溢出 */
}

/* 组件盒子 */
.comp-box {
  flex: 1;
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  overflow: hidden; /* 内容过多时隐藏或改成 auto */
  display: flex;
  flex-direction: column;
}

/* 悬浮工具栏 */
.map-floating-toolbar {
  position: absolute;
  top: 16px; right: 16px;
  display: flex; flex-direction: column; gap: 8px;
  background-color: rgba(13, 27, 42, 0.85);
  border: 1px solid #1b263b; padding: 8px; border-radius: 6px;
}
.map-tool-btn {
  width: 32px; height: 32px; background-color: #1b263b; color: white;
  border: 1px solid #415a77; border-radius: 4px; cursor: pointer;
}
</style> -->

<template>
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
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { globalStore } from '../store.js';
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
</style>