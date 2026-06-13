<!-- <template>
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
 -->

 <template>
  <div class="onemap-grid-container">
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
            
            <div v-else-if="item.type === 'layer-control'" class="layer-control-panel">
              <div class="layer-group">
                <div class="group-title">一张图专属图层管理</div>
                <label v-for="layer in globalStore.mapLayers" :key="layer.id" class="layer-checkbox-item">
                  <input type="checkbox" v-model="layer.visible" />
                  <span class="layer-name" :class="{'is-business': layer.isBusiness}">{{ layer.name }}</span>
                  <span class="badge" v-if="layer.isBusiness">业务</span>
                </label>
              </div>
            </div>

            <DataCard v-else-if="item.type === 'card'" v-bind="item.props" />
            <LineChart v-else-if="item.type === 'line'" v-bind="item.props" />
            <DynamicList v-else-if="item.type === 'list'" v-bind="item.props" />
            <VideoPlayer v-else-if="item.type === 'video'" v-bind="item.props" />
            
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
import LineChart from '../components/charts/LineChart.vue';
import DynamicList from '../components/ui/DynamicList.vue';
import VideoPlayer from '../components/ui/VideoPlayer.vue';

const layout = ref([]);

watch(
  () => {
    const menus = globalStore.pageMenus['/onemap'];
    if (!menus) return '';
    return menus.map(group => {
      const groupVisible = group.visible ? 'T' : 'F';
      const childrenVisible = group.children ? group.children.map(child => child.visible ? 'T' : 'F').join('') : '';
      return groupVisible + childrenVisible;
    }).join('-');
  },
  () => {
    const flatLayout = [];
    
    // 动态提取 store.js 中的全部坐标配置（包括了刚加进去的图层控制和地球）
    const menus = globalStore.pageMenus['/onemap'];
    if (menus) {
      menus.forEach(group => {
        if (group.visible && group.children) {
          group.children.forEach(child => {
            if (child.visible) {
              flatLayout.push({
                ...child,
                i: child.id,
                x: child.x,
                y: child.y,
                w: child.w,
                h: child.h
              });
            }
          });
        }
      });
    }
    layout.value = flatLayout;
  },
  { immediate: true, deep: true }
);
</script>

<style scoped>
.onemap-grid-container {
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
  padding: 8px;
}

/* 图层控制面板样式 */
.layer-control-panel {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.group-title {
  font-size: 14px;
  font-weight: bold;
  color: #409eff;
  margin-bottom: 12px;
  border-bottom: 2px solid #ecf5ff;
  padding-bottom: 6px;
}

.layer-checkbox-item {
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 6px;
  background: #f8f9fa;
  border: 1px solid #ebeef5;
  cursor: pointer;
  transition: all 0.2s;
}

.layer-checkbox-item:hover {
  background: #ecf5ff;
  border-color: #c6e2ff;
}

.layer-checkbox-item input {
  margin-right: 12px;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.layer-name {
  flex-grow: 1;
  font-size: 14px;
  color: #606266;
}

.layer-name.is-business {
  color: #e6a23c;
  font-weight: bold;
}

.badge {
  font-size: 12px;
  background-color: #e6a23c;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
}
</style>