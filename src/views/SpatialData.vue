<template>
    <div class="spatial-grid-container">
        <GridLayout v-model:layout="layout" :col-num="24" :row-height="30" :is-draggable="true" :is-resizable="true"
            :margin="[10, 10]" :use-css-transforms="true">
            <GridItem v-for="item in layout" :key="item.i" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i"
                drag-allow-from=".drag-handle" class="grid-item-wrapper">
                <div class="item-content">
                    <div class="drag-handle" v-if="item.type !== 'card'">⠿ {{ item.label }}</div>

                    <div class="body-content" :class="{ 'no-padding': item.type === 'card' }">

                        <DataCard v-if="item.type === 'card'" v-bind="item.props" />
                        <LineChart v-else-if="item.type === 'line'" v-bind="item.props" />
                        <PieChart v-else-if="item.type === 'pie'" v-bind="item.props" />

                        <div v-else-if="item.type === 'tree-catalog'" class="custom-component">
                            <div class="tree-search">
                                <input type="text" placeholder="请输入关键字搜索资源目录..." />
                                <button>🔍</button>
                            </div>
                            <div class="tree-content">
                                <ul>
                                    <li><span class="folder">📂</span> 海洋牧场时空数据
                                        <ul>
                                            <li><span class="folder">📂</span> 基础地理数据
                                                <ul class="sub-list">
                                                    <li class="active-node">📄 海域边界矢量</li>
                                                    <li>📄 岸线测绘数据</li>
                                                    <li>📄 岛礁空间位置</li>
                                                    <li>📄 海底地形(DEM)</li>
                                                </ul>
                                            </li>
                                            <li><span class="folder">📂</span> 监测指标数据
                                                <ul class="sub-list">
                                                    <li>📄 水质实时监测</li>
                                                    <li>📄 气象环境监测</li>
                                                    <li>📄 视频安防监控</li>
                                                </ul>
                                            </li>
                                            <li><span class="folder">📂</span> 在线业务数据</li>
                                            <li><span class="folder">📂</span> 遥感影像底图</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div v-else-if="item.type === 'data-table'" class="custom-component">
                            <div class="table-tabs">
                                <span class="tab-item active">本地数据配置管理</span>
                                <span class="tab-item">在线数据库台账</span>
                                <span class="tab-item">图层服务挂载配置</span>
                            </div>
                            <div class="table-toolbar">
                                <div class="filter-group">
                                    <select>
                                        <option>全部数据类型</option>
                                        <option>矢量数据</option>
                                        <option>栅格影像</option>
                                    </select>
                                    <select>
                                        <option>全部权属部门</option>
                                    </select>
                                    <input type="date" value="2024-05-01" /> 至 <input type="date" value="2024-06-01" />
                                    <input type="text" placeholder="检索台账名称" />
                                    <button class="btn primary">条件查询</button>
                                </div>
                                <div class="action-group">
                                    <button class="btn primary">本地数据上传入库</button>
                                    <button class="btn">加载数据库图层</button>
                                </div>
                            </div>
                            <div class="data-table-wrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>台账名称</th>
                                            <th>数据类型</th>
                                            <th>空间范围</th>
                                            <th>时间跨度</th>
                                            <th>入库更新时间</th>
                                            <th>数据体积</th>
                                            <th>当前状态</th>
                                            <th>台账操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="font-bold">养殖区分布红线</td>
                                            <td>矢量数据</td>
                                            <td>养殖区A,B,C...</td>
                                            <td>2024-05-01 ~ 至今</td>
                                            <td>2024-06-01 10:30</td>
                                            <td>2.35 MB</td>
                                            <td><span class="status-dot online"></span>在线</td>
                                            <td class="action-links"><span>配置</span> <span>增删改</span></td>
                                        </tr>
                                        <tr>
                                            <td class="font-bold">水质理化监测指标 (日)</td>
                                            <td>时序数据</td>
                                            <td>多监测点位集合</td>
                                            <td>2024-01-01 ~ 至今</td>
                                            <td>2024-06-01 09:00</td>
                                            <td>156.32 MB</td>
                                            <td><span class="status-dot online"></span>在线</td>
                                            <td class="action-links"><span>配置</span> <span>增删改</span></td>
                                        </tr>
                                        <tr>
                                            <td class="font-bold">海底地形剖面 (DEM)</td>
                                            <td>栅格数据</td>
                                            <td>全海域全景</td>
                                            <td>2023-01-01 ~ 2023-12</td>
                                            <td>2024-05-20 14:20</td>
                                            <td>1.23 GB</td>
                                            <td><span class="status-dot online"></span>已加载</td>
                                            <td class="action-links"><span>配置</span> <span>卸载</span></td>
                                        </tr>
                                        <tr>
                                            <td class="font-bold">高分卫星遥感底图 (Sentinel)</td>
                                            <td>影像数据</td>
                                            <td>全海域全景</td>
                                            <td>2024-05-01 ~ 05-31</td>
                                            <td>2024-05-31 18:00</td>
                                            <td>12.35 GB</td>
                                            <td><span class="status-dot offline"></span>挂起</td>
                                            <td class="action-links"><span>激活服务</span> <span>移除</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div v-else-if="item.type === 'data-details'" class="custom-component details-panel">
                            <div class="details-header">
                                <span>台账元数据详情</span>
                                <button class="btn primary small">+ 新增业务数据</button>
                            </div>

                            <div class="details-subtitle">资源目录基本信息 <span class="edit-link">编辑台账</span></div>
                            <div class="info-grid">
                                <div class="info-row"><span class="info-label">数据名称:</span><span
                                        class="info-value">养殖区分布红线</span></div>
                                <div class="info-row"><span class="info-label">数据编码:</span><span
                                        class="info-value font-mono">DATA-AQ-20240501-001</span></div>
                                <div class="info-row"><span class="info-label">数据类型:</span><span
                                        class="info-value">矢量几何数据</span></div>
                                <div class="info-row"><span class="info-label">空间范围:</span><span class="info-value">核心养殖区
                                        A、B、C 区块</span></div>
                                <div class="info-row"><span class="info-label">当前状态:</span><span class="info-value"><span
                                            class="status-dot online"></span>在线服务支撑中</span></div>
                            </div>

                            <div class="preview-title">空间位置预览 <span class="edit-link">进入一张图全屏</span></div>
                            <div class="preview-box">
                                <EmbeddedCesium />
                            </div>
                        </div>

                        <div v-else-if="item.type === 'service-cards'" class="custom-component">
                            <div class="service-cards-grid">
                                <div class="s-card">
                                    <div class="s-icon">📋</div>
                                    <div class="s-title">数据目录服务</div>
                                    <div class="s-desc">提供全域时空数据资源的检索、元数据查看及分类展示。</div>
                                </div>
                                <div class="s-card">
                                    <div class="s-icon">🗺️</div>
                                    <div class="s-title">数据地图服务</div>
                                    <div class="s-desc">发布 OGC 标准地图服务，实现空间地理数据的可视化展示。</div>
                                </div>
                                <div class="s-card">
                                    <div class="s-icon">⬇️</div>
                                    <div class="s-title">数据下载服务</div>
                                    <div class="s-desc">支持矢量、影像及原始业务数据的在线提取与加密分发。</div>
                                </div>
                                <div class="s-card">
                                    <div class="s-icon">🔌</div>
                                    <div class="s-title">数据 API</div>
                                    <div class="s-desc">提供标准化系统集成接口，支撑跨系统数据调用与协同。</div>
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
import DataCard from '../components/ui/DataCard.vue';
import LineChart from '../components/charts/LineChart.vue';
import PieChart from '../components/charts/PieChart.vue';
import EmbeddedCesium from '../components/ui/EmbeddedCesium.vue';

const layout = ref([]);

// 完全复用其他页面成熟的 Layout 计算钩子
watch(
    () => {
        const menus = globalStore.pageMenus['/spatial'];
        if (!menus) return '';
        return menus.map(group => {
            const groupVisible = group.visible ? 'T' : 'F';
            const childrenVisible = group.children ? group.children.map(child => child.visible ? 'T' : 'F').join('') : '';
            return groupVisible + childrenVisible;
        }).join('-');
    },
    () => {
        const flatLayout = [];
        const menus = globalStore.pageMenus['/spatial'];
        if (menus) {
            menus.forEach(group => {
                if (group.visible && group.children) {
                    group.children.forEach(child => {
                        if (child.visible) {
                            flatLayout.push({ ...child, i: child.id, x: child.x, y: child.y, w: child.w, h: child.h });
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
.spatial-grid-container {
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
    display: flex;
    flex-direction: column;
    transition: box-shadow 0.3s;
}

.grid-item-wrapper:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
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
    font-weight: bold;
    cursor: grab;
    z-index: 10;
    border-bottom: 1px solid #ebeef5;
    flex-shrink: 0;
}

.drag-handle:active {
    cursor: grabbing;
}

.body-content {
    flex: 1;
    min-height: 0;
    overflow: hidden;
}

.no-padding {
    padding: 0 !important;
}

/* 模块一：自定义组件公共包裹 */
.custom-component {
    padding: 14px;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background: #fff;
    overflow: hidden;
}

/* 模块二：数据目录树 */
.tree-search {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
    flex-shrink: 0;
}

.tree-search input {
    flex: 1;
    padding: 6px 12px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    font-size: 13px;
    outline: none;
}

.tree-search button {
    background: #409eff;
    color: white;
    border: none;
    padding: 0 12px;
    border-radius: 4px;
    cursor: pointer;
}

.tree-content {
    flex: 1;
    overflow-y: auto;
    font-size: 13px;
    color: #606266;
}

.tree-content ul {
    list-style: none;
    padding-left: 18px;
    margin: 4px 0;
    border-left: 1px dashed #ebeef5;
}

.tree-content>ul {
    padding-left: 0;
    border-left: none;
}

.tree-content li {
    margin-bottom: 8px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.tree-content li>span.folder {
    margin-right: 6px;
}

.tree-content li>span {
    display: inline-flex;
    align-items: center;
    padding: 2px 4px;
    border-radius: 4px;
    transition: background 0.2s;
}

.tree-content li>span:hover {
    background: #f5f7fa;
    color: #409eff;
}

.sub-list li {
    margin-bottom: 6px;
    padding-left: 16px;
    position: relative;
}

.sub-list li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 8px;
    width: 10px;
    height: 1px;
    background: #ebeef5;
}

.active-node {
    color: #409eff;
    font-weight: bold;
    background: #ecf5ff;
    border-radius: 4px;
}

/* 模块三：在线数据台账表格 */
.table-tabs {
    display: flex;
    gap: 24px;
    border-bottom: 1px solid #ebeef5;
    margin-bottom: 12px;
    flex-shrink: 0;
}

.tab-item {
    padding: 8px 4px;
    font-size: 14px;
    color: #606266;
    cursor: pointer;
    position: relative;
    transition: color 0.2s;
}

.tab-item.active {
    color: #409eff;
    font-weight: bold;
}

.tab-item.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background: #409eff;
}

.table-toolbar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    gap: 12px;
    flex-wrap: wrap;
    flex-shrink: 0;
}

.filter-group {
    display: flex;
    gap: 8px;
    align-items: center;
    font-size: 13px;
    color: #606266;
}

.filter-group select,
.filter-group input {
    padding: 6px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    font-size: 12px;
    outline: none;
}

.action-group {
    display: flex;
    gap: 8px;
}

.btn {
    padding: 6px 14px;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
    border: 1px solid #dcdfe6;
    background: white;
    color: #606266;
    transition: all 0.2s;
    white-space: nowrap;
}

.btn:hover {
    border-color: #c6e2ff;
    color: #409eff;
}

.btn.primary {
    background: #409eff;
    color: white;
    border-color: #409eff;
}

.btn.primary:hover {
    background: #66b1ff;
    border-color: #66b1ff;
}

.btn.small {
    padding: 4px 10px;
    font-size: 12px;
}

.data-table-wrapper {
    flex: 1;
    overflow-y: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-size: 13px;
}

th {
    padding: 12px 10px;
    background: #f5f7fa;
    color: #909399;
    font-weight: bold;
    position: sticky;
    top: 0;
    z-index: 2;
    border-bottom: 1px solid #ebeef5;
}

td {
    padding: 12px 10px;
    border-bottom: 1px solid #ebeef5;
    color: #606266;
}

.font-bold {
    font-weight: bold;
    color: #303133;
}

.status-dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-right: 6px;
}

.status-dot.online {
    background: #67c23a;
}

.status-dot.offline {
    background: #f56c6c;
}

.action-links span {
    color: #409eff;
    cursor: pointer;
    margin-right: 10px;
    font-size: 12px;
}

.action-links span:hover {
    text-decoration: underline;
}

/* 模块四：元数据详情与预览 */
.details-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    font-weight: bold;
    color: #303133;
    margin-bottom: 16px;
    flex-shrink: 0;
    border-bottom: 1px dashed #ebeef5;
    padding-bottom: 8px;
}

.details-subtitle {
    font-size: 13px;
    font-weight: bold;
    color: #606266;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
}

.edit-link {
    color: #409eff;
    cursor: pointer;
    font-weight: normal;
    font-size: 12px;
}

.edit-link:hover {
    text-decoration: underline;
}

.info-grid {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 16px;
    font-size: 13px;
    flex-shrink: 0;
}

.info-row {
    display: flex;
}

.info-label {
    width: 75px;
    color: #909399;
    flex-shrink: 0;
}

.info-value {
    flex: 1;
    color: #303133;
    font-weight: 500;
    word-break: break-all;
}

.font-mono {
    font-family: monospace;
    color: #409eff;
    background: #f5f7fa;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
}

.preview-title {
    font-size: 13px;
    font-weight: bold;
    color: #606266;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    flex-shrink: 0;
}

.preview-box {
    flex: 1;
    min-height: 120px;
    background: #e4e7ed;
    border-radius: 6px;
    position: relative;
    overflow: hidden;
}


/* 模块五：数据服务集成能力卡片 */
.service-cards-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 14px;
    height: 100%;
}

.s-card {
    border: 1px solid #ebeef5;
    border-radius: 6px;
    padding: 16px 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 6px;
    background: #fafafa;
    transition: all 0.3s;
    cursor: pointer;
}

.s-card:hover {
    border-color: #c6e2ff;
    background: #ecf5ff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(64, 158, 255, 0.1);
}

.s-icon {
    font-size: 28px;
    margin-bottom: 4px;
}

.s-title {
    font-size: 13px;
    font-weight: bold;
    color: #303133;
}

.s-desc {
    font-size: 12px;
    color: #909399;
    line-height: 1.5;
    padding: 0 8px;
}
</style>