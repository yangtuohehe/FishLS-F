<template>
  <div class="onemap-view-containers">
    
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
      <div class="onemap-side-card" v-if="leftZoneComps.length > 0">
        <div class="panel-inner-section" v-for="comp in leftZoneComps" :key="comp.id">
          <div class="section-title">{{ comp.label }}</div>
          
          <div v-if="comp.type === 'layer-control'" class="checkbox-list-layout">
            <label class="custom-checkbox-item" v-for="layer in globalStore.mapLayers.filter(l => !l.isBusiness)" :key="layer.id">
              <input type="checkbox" v-model="layer.visible" />
              <span class="checkbox-text">{{ layer.name }}</span>
            </label>
          </div>

          <div v-if="comp.type === 'business-layer'" class="checkbox-list-layout">
            <label class="custom-checkbox-item" v-for="layer in globalStore.mapLayers.filter(l => l.isBusiness)" :key="layer.id">
              <input type="checkbox" v-model="layer.visible" />
              <span class="checkbox-text highlight-cyan">{{ layer.name }}</span>
            </label>
          </div>
        </div>
      </div>
    </Teleport>

    <Teleport to="#teleport-bottom" v-if="isMounted">
      <div class="comp-row" v-if="bottom1ZoneComps.length > 0">
        <div class="comp-box" v-for="comp in bottom1ZoneComps" :key="comp.id">
          <DataCard v-if="comp.type === 'card'" v-bind="comp.props" />
          <VideoPlayer v-if="comp.type === 'video'" v-bind="comp.props" />
        </div>
      </div>
      <div class="comp-row" v-if="bottom2ZoneComps.length > 0">
        <div class="comp-box" v-for="comp in bottom2ZoneComps" :key="comp.id">
          <LineChart v-if="comp.type === 'line'" v-bind="comp.props" />
          <DynamicList v-if="comp.type === 'list'" v-bind="comp.props" />
        </div>
      </div>
    </Teleport>

    <div class="map-embedded-hud">
      <div class="hud-header">一张图专题控制</div>
      <div class="hud-body">
        <label class="hud-checkbox-row" v-for="layer in globalStore.mapLayers" :key="layer.id">
          <input type="checkbox" v-model="layer.visible" />
          <span class="hud-label-text" :class="{ 'text-warn': layer.isBusiness }">{{ layer.name }}</span>
        </label>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { globalStore } from '../store.js';
import DataCard from '../components/ui/DataCard.vue';
import LineChart from '../components/charts/LineChart.vue';
import DynamicList from '../components/ui/DynamicList.vue';
import VideoPlayer from '../components/ui/VideoPlayer.vue';

const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
});

const activeComponents = computed(() => {
  const comps = [];
  const currentMenus = globalStore.pageMenus['/onemap'] || [];
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
const bottom1ZoneComps = computed(() => activeComponents.value.filter(c => c.zone === 'bottom1'));
const bottom2ZoneComps = computed(() => activeComponents.value.filter(c => c.zone === 'bottom2'));
</script>

<style scoped>
.onemap-view-containers {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
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

/* 左侧边栏内容特化容器 */
.onemap-side-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 4px;
}

.panel-inner-section {
  background-color: rgba(27, 38, 59, 0.4);
  border: 1px solid #1b263b;
  border-radius: 6px;
  padding: 12px;
}

.section-title {
  font-size: 13px;
  font-weight: bold;
  color: #00b4d8;
  border-bottom: 1px solid #1b263b;
  padding-bottom: 6px;
  margin-bottom: 10px;
}

.checkbox-list-layout {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.custom-checkbox-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 13px;
}

.custom-checkbox-item input[type="checkbox"] {
  cursor: pointer;
  accent-color: #00b4d8;
}

.checkbox-text {
  color: #e0e1dd;
}

.highlight-cyan {
  color: #00b4d8;
  font-weight: bold;
}

/* 地球图框之内的HUD浮动面板 */
.map-embedded-hud {
  position: absolute;
  bottom: 16px;
  left: 16px;
  width: 180px;
  background-color: rgba(13, 27, 42, 0.9);
  border: 1px solid #1b263b;
  border-radius: 6px;
  color: #ffffff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  z-index: 50;
  overflow: hidden;
  pointer-events: auto;
}

.hud-header {
  padding: 8px 12px;
  background-color: #1b263b;
  font-size: 12px;
  font-weight: bold;
  color: #00b4d8;
  border-bottom: 1px solid #415a77;
}

.hud-body {
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hud-checkbox-row {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.hud-checkbox-row input[type="checkbox"] {
  cursor: pointer;
  accent-color: #00b4d8;
}

.hud-label-text {
  font-size: 12px;
  color: #e0e1dd;
}

.hud-label-text.text-warn {
  color: #e6a23c;
  font-weight: bold;
}
</style>