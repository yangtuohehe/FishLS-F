

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

                        <div v-else-if="item.type === 'entity-tree'" class="entity-tree-panel">
                            <div class="tree-container">
                                <div v-for="entity in item.props.entities" :key="entity.id" class="tree-group">
                                    <div class="tree-parent">
                                        <span class="expand-icon" @click="entity.expanded = !entity.expanded">
                                            {{ entity.expanded ? '▼' : '▶' }}
                                        </span>
                                        <input type="checkbox" v-model="entity.visible" class="tree-checkbox" @change="toggleEntityVisibility(entity)" />
                                        <span class="tree-label parent-label">{{ entity.name }}</span>
                                    </div>
                                    <div v-show="entity.expanded" class="tree-children">
                                        <label v-for="child in entity.children" :key="child.id" class="tree-child">
                                            <input type="checkbox" v-model="child.visible" class="tree-checkbox" />
                                            <span class="tree-label">{{ child.name }}</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-else-if="item.type === 'entity-attr'" class="entity-attr-panel">
                            <div class="attr-header">{{ item.props.title }}</div>
                            <table class="attr-table">
                                <tbody>
                                    <tr v-for="(attr, idx) in item.props.attributes" :key="idx">
                                        <td class="attr-key">{{ attr.key }}</td>
                                        <td class="attr-val">
                                            <span v-if="attr.status === 'ok'" class="status-badge ok">{{ attr.value }}</span>
                                            <span v-else>{{ attr.value }}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </GridItem>
        </GridLayout>
    </div>
</template>
  
<!-- <script setup>
import { ref, watch } from 'vue';
import { GridLayout, GridItem } from 'grid-layout-plus';
import { globalStore } from '../store.js';
import CesiumViewer from '../components/ui/CesiumViewer.vue';

const layout = ref([]);

const toggleEntityVisibility = (entity) => {
    if (entity.children && entity.children.length > 0) {
        entity.children.forEach(child => {
            child.visible = entity.visible;
        });
    }
};

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
</script> -->
  
<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { GridLayout, GridItem } from 'grid-layout-plus';
import { globalStore } from '../store.js';
import CesiumViewer from '../components/ui/CesiumViewer.vue';

const layout = ref([]);
let ws = null;

const toggleEntityVisibility = (entity) => {
    if (entity.children && entity.children.length > 0) {
        entity.children.forEach(child => {
            child.visible = entity.visible;
        });
    }
};

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

const initDigitalTwin = async () => {
    try {
        const response = await fetch('/api/v1/twin/init', {
            method: 'POST' 
        });
        if (response.ok) {
            connectWebSocket();
        } else {
            console.error('状态码异常:', response.status);
        }
    } catch (error) {
        console.error('初始化请求失败:', error);
    }
};

const connectWebSocket = () => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws/digital_twin`;
    
    ws = new WebSocket(wsUrl);

    ws.onopen = () => {
        console.log('WebSocket 连接成功');
    };

    ws.onmessage = (event) => {
        console.log('收到后端实时数据:', event.data);
    };

    ws.onerror = (error) => {
        console.error('WebSocket 连接发生错误:', error);
    };

    ws.onclose = () => {
        console.log('WebSocket 连接已经关闭');
    };
};

onMounted(() => {
    initDigitalTwin();
});

onUnmounted(() => {
    if (ws) {
        ws.close();
    }
});
</script>


<style scoped>
.digital-grid-container { width: 100%; height: calc(100vh - 55px); overflow: auto; background: #f0f2f5; position: relative; }
.grid-item-wrapper { background: #ffffff; border: 1px solid #ebeef5; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); color: #303133; transition: box-shadow 0.3s ease; display: flex; flex-direction: column; }
.grid-item-wrapper:hover { box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12); }
.grid-item-wrapper.earth-grid-item { touch-action: auto !important; pointer-events: auto !important; z-index: 5; }
.item-content { display: flex; flex-direction: column; height: 100%; }
.drag-handle { padding: 8px 12px; background: #f5f7fa; color: #606266; font-size: 13px; font-weight: 500; cursor: grab; z-index: 10; border-bottom: 1px solid #ebeef5; flex-shrink: 0; }
.drag-handle:active { cursor: grabbing; }
.body-content { flex: 1; min-height: 0; overflow: hidden; }

.action-card-inline { display: flex; justify-content: space-between; align-items: center; width: 100%; height: 100%; padding: 0 16px; box-sizing: border-box; }
.card-left { display: flex; align-items: center; gap: 12px; }
.device-icon { font-size: 24px; background: #f5f7fa; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 8px; border: 1px solid #ebeef5; }
.device-name { font-size: 15px; font-weight: bold; color: #303133; }
.action-btn { background-color: #ecf5ff; color: #409eff; border: 1px solid #b3d8ff; padding: 6px 16px; border-radius: 4px; font-size: 13px; font-weight: bold; cursor: pointer; transition: all 0.2s; }
.action-btn:hover { background-color: #409eff; color: #ffffff; }

.layer-control-panel { padding: 12px; display: flex; flex-direction: column; height: 100%; overflow-y: auto; box-sizing: border-box; }
.layer-checkbox-item { display: flex; align-items: center; padding: 10px; margin-bottom: 10px; border-radius: 6px; background: #f8f9fa; border: 1px solid #ebeef5; cursor: pointer; transition: all 0.2s; }
.layer-checkbox-item:hover { background: #ecf5ff; border-color: #c6e2ff; }
.layer-checkbox-item input { margin-right: 12px; width: 16px; height: 16px; cursor: pointer; accent-color: #409eff; }
.layer-name { font-size: 14px; color: #606266; font-weight: bold; }

.slider-control-container { padding: 16px; height: 100%; display: flex; flex-direction: column; overflow-y: auto; box-sizing: border-box; }
.slider-list { display: flex; flex-direction: column; gap: 18px; padding-right: 4px; padding-bottom: 10px; }
.slider-item { display: flex; flex-direction: column; gap: 8px; }
.slider-info { display: flex; justify-content: space-between; font-size: 13px; color: #606266; }
.slider-value { color: #409eff; font-weight: bold; font-family: monospace; }
.custom-slider { width: 100%; accent-color: #409eff; cursor: pointer; }

.entity-tree-panel { padding: 16px; height: 100%; overflow-y: auto; box-sizing: border-box; }
.tree-container { display: flex; flex-direction: column; gap: 12px; }
.tree-group { display: flex; flex-direction: column; }
.tree-parent { display: flex; align-items: center; gap: 8px; font-size: 14px; color: #303133; margin-bottom: 6px; }
.expand-icon { cursor: pointer; color: #909399; font-size: 12px; width: 14px; text-align: center; user-select: none; }
.expand-icon:hover { color: #409eff; }
.tree-checkbox { width: 14px; height: 14px; cursor: pointer; accent-color: #409eff; }
.parent-label { font-weight: bold; }
.tree-children { display: flex; flex-direction: column; gap: 8px; margin-left: 20px; padding-left: 12px; border-left: 1px solid #ebeef5; }
.tree-child { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #606266; cursor: pointer; }

.entity-attr-panel { padding: 16px; height: 100%; overflow-y: auto; box-sizing: border-box; }
.attr-header { font-size: 15px; font-weight: bold; color: #303133; margin-bottom: 16px; padding-bottom: 10px; border-bottom: 1px solid #ebeef5; }
.attr-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.attr-key { color: #909399; padding: 10px 8px; width: 40%; vertical-align: top; border-bottom: 1px dashed #ebeef5; }
.attr-val { color: #303133; padding: 10px 8px; font-weight: 500; border-bottom: 1px dashed #ebeef5; }
.status-badge { padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: normal; }
.status-badge.ok { background-color: #f0f9eb; color: #67c23a; border: 1px solid #e1f3d8; }
</style>