<template>
  <div class="overview-container">
    <div class="main-zone-top" v-if="topZoneComps.length > 0">
      <div class="comp-wrapper" v-for="comp in topZoneComps" :key="comp.id">
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

    <div class="main-zone-bottom" v-if="bottomZoneComps.length > 0">
      <div class="comp-wrapper" v-for="comp in bottomZoneComps" :key="comp.id">
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

const topZoneComps = computed(() => activeComponents.value.filter(c => c.zone === 'top'));
const leftZoneComps = computed(() => activeComponents.value.filter(c => c.zone === 'left'));
const rightZoneComps = computed(() => activeComponents.value.filter(c => c.zone === 'right'));
const bottomZoneComps = computed(() => activeComponents.value.filter(c => c.zone === 'bottom'));
</script>

<style scoped>
.overview-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 12px;
  min-width: 0;
  overflow: hidden;
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
  min-height: 0;
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
</style>