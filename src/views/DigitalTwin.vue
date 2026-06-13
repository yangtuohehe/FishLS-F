<!-- <template>
    <div class="digital-grid-container">
        <GridLayout v-model:layout="layout" :col-num="24" :row-height="30" :is-draggable="true" :is-resizable="true"
            :margin="[10, 10]" :use-css-transforms="true">
            <GridItem v-for="item in layout" :key="item.i" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i"
                drag-allow-from=".drag-handle" class="grid-item-wrapper"
                :class="{ 'earth-grid-item': item.type === 'earth' }">
                <div class="item-content">
                    <div class="drag-handle">⠿ {{ item.label }}</div>
                    <div class="body-content">

                        <CesiumViewer v-if="item.type === 'earth'" />

                        <ActionCard v-else-if="item.type === 'action-card'" v-bind="item.props" />

                        <ToggleList v-else-if="item.type === 'toggle-list'" v-bind="item.props" />

                        <SliderControl v-else-if="item.type === 'sliders'" v-bind="item.props" />

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
import DynamicList from '../components/ui/DynamicList.vue';
import SliderControl from '../components/ui/SliderControl.vue'; 
import ActionCard from '../components/ui/ActionCard.vue';
import ToggleList from '../components/ui/ToggleList.vue';
const layout = ref([]);

// 动态提取 store.js 中的全部坐标配置
watch(
    () => {
        const menus = globalStore.pageMenus['/digital'];
        if (!menus) return '';
        return menus.map(group => {
            const groupVisible = group.visible ? 'T' : 'F';
            const childrenVisible = group.children ? group.children.map(child => child.visible ? 'T' : 'F').join('') : '';
            return groupVisible + childrenVisible;
        }).join('-');
    },
    () => {
        const flatLayout = [];
        const menus = globalStore.pageMenus['/digital'];
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
.digital-grid-container {
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
    overflow: hidden;
}
</style> -->


<template>
    <div class="digital-grid-container">
        <GridLayout v-model:layout="layout" :col-num="24" :row-height="30" :is-draggable="true" :is-resizable="true"
            :margin="[10, 10]" :use-css-transforms="true">
            <GridItem v-for="item in layout" :key="item.i" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i"
                drag-allow-from=".drag-handle" class="grid-item-wrapper"
                :class="{ 'earth-grid-item': item.type === 'earth' }">
                <div class="item-content">
                    <div class="drag-handle">⠿ {{ item.label }}</div>
                    <div class="body-content">

                        <CesiumViewer v-if="item.type === 'earth'" />

                        <div v-else-if="item.type === 'action-card'" class="action-card-inline">
                            <div class="card-left">
                                <span class="device-icon">{{ item.props.icon }}</span>
                                <span class="device-name">{{ item.props.name }}</span>
                            </div>
                            <button class="action-btn">{{ item.props.btnText }}</button>
                        </div>

                        <div v-else-if="item.type === 'field-control'" class="layer-control-panel">
                            <label v-for="field in item.props.fields" :key="field.id" class="layer-checkbox-item">
                                <input type="checkbox" v-model="field.visible" />
                                <span class="layer-name">{{ field.name }}</span>
                            </label>
                        </div>

                        <div v-else-if="item.type === 'sliders'" class="slider-control-container">
                            <div class="slider-list">
                                <div v-for="(slider, index) in item.props.sliders" :key="index" class="slider-item">
                                    <div class="slider-info">
                                        <span>{{ slider.label }}</span>
                                        <span class="slider-value">{{ slider.value }}</span>
                                    </div>
                                    <input type="range" :min="slider.min" :max="slider.max" v-model="slider.value" class="custom-slider" />
                                </div>
                            </div>
                        </div>

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

const layout = ref([]);

watch(
    () => {
        const menus = globalStore.pageMenus['/digital'];
        if (!menus) return '';
        return menus.map(group => {
            const groupVisible = group.visible ? 'T' : 'F';
            const childrenVisible = group.children ? group.children.map(child => child.visible ? 'T' : 'F').join('') : '';
            return groupVisible + childrenVisible;
        }).join('-');
    },
    () => {
        const flatLayout = [];
        const menus = globalStore.pageMenus['/digital'];
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
/* 网格容器通用样式 */
.digital-grid-container { width: 100%; height: calc(100vh - 55px); overflow: auto; background: #f0f2f5; position: relative; }
.grid-item-wrapper { background: #ffffff; border: 1px solid #ebeef5; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); color: #303133; transition: box-shadow 0.3s ease; display: flex; flex-direction: column; }
.grid-item-wrapper:hover { box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12); }
.grid-item-wrapper.earth-grid-item { touch-action: auto !important; pointer-events: auto !important; z-index: 5; }
.item-content { display: flex; flex-direction: column; height: 100%; }
.drag-handle { padding: 8px 12px; background: #f5f7fa; color: #606266; font-size: 13px; font-weight: 500; cursor: grab; z-index: 10; border-bottom: 1px solid #ebeef5; }
.drag-handle:active { cursor: grabbing; }
.body-content { flex: 1; min-height: 0; overflow: hidden; }

/* 2. 建模卡片专属样式 (精简独立) */
.action-card-inline { display: flex; justify-content: space-between; align-items: center; width: 100%; height: 100%; padding: 0 16px; box-sizing: border-box; }
.card-left { display: flex; align-items: center; gap: 12px; }
.device-icon { font-size: 24px; background: #f5f7fa; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 8px; border: 1px solid #ebeef5; }
.device-name { font-size: 15px; font-weight: bold; color: #303133; }
.action-btn { background-color: #ecf5ff; color: #409eff; border: 1px solid #b3d8ff; padding: 6px 16px; border-radius: 4px; font-size: 13px; font-weight: bold; cursor: pointer; transition: all 0.2s; }
.action-btn:hover { background-color: #409eff; color: #ffffff; }

/* 3. 物理场控制样式 (完全复用 OneMap) */
.layer-control-panel { 
    padding: 12px; 
    display: flex; 
    flex-direction: column; 
    height: 100%; 
    overflow-y: auto; 
    box-sizing: border-box; /* 修复点：防止内边距撑破高度 */
}
.layer-checkbox-item { display: flex; align-items: center; padding: 10px; margin-bottom: 10px; border-radius: 6px; background: #f8f9fa; border: 1px solid #ebeef5; cursor: pointer; transition: all 0.2s; }
.layer-checkbox-item:hover { background: #ecf5ff; border-color: #c6e2ff; }
.layer-checkbox-item input { margin-right: 12px; width: 16px; height: 16px; cursor: pointer; accent-color: #409eff; }
.layer-name { font-size: 14px; color: #606266; font-weight: bold; }

/* 4. 六自由度滑块控制样式 */
.slider-control-container { 
    padding: 16px; 
    height: 100%; 
    display: flex; 
    flex-direction: column; 
    overflow-y: auto; 
    box-sizing: border-box; /* 修复点：解决滑块触底显示不全的问题 */
}
.slider-list { display: flex; flex-direction: column; gap: 18px; padding-right: 4px; padding-bottom: 10px; /* 额外加一点底部留白会更好看 */ }
.slider-item { display: flex; flex-direction: column; gap: 8px; }
.slider-info { display: flex; justify-content: space-between; font-size: 13px; color: #606266; }
.slider-value { color: #409eff; font-weight: bold; font-family: monospace; }
.custom-slider { width: 100%; accent-color: #409eff; cursor: pointer; }
</style>