<template>
    <div class="report-summary-container">
      <GridLayout
        v-model:layout="layout"
        :col-num="24"
        :row-height="30"
        :is-draggable="true"
        :is-resizable="true"
        :margin="[15, 15]"
        :use-css-transforms="true"
      >
        <GridItem
          v-for="item in layout"
          :key="item.i"
          :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i"
          drag-allow-from=".drag-handle"
          class="report-grid-item"
        >
          <div class="grid-item-box">
            <div class="drag-handle">
              <span class="drag-icon">⠿</span>
              <span class="drag-title">{{ item.label }}</span>
            </div>
            <div class="grid-item-body">
              
              <div v-if="item.type === 'statistical-report'" class="report-content-wrapper">
                <div class="report-toolbar">
                  <div class="radio-group">
                    <label v-for="timeOpt in ['日', '周', '月', '年']" :key="timeOpt" class="radio-label">
                      <input type="radio" :name="'time-' + item.id" :value="timeOpt" v-model="timeStates[item.id]" />
                      <span class="radio-text">{{ timeOpt }}报</span>
                    </label>
                  </div>
                  <div class="button-group">
                    <button class="action-btn primary" @click="handleAction('生成', item.label, timeStates[item.id])">生成</button>
                    <button class="action-btn success" @click="handleAction('导出', item.label, timeStates[item.id])">导出</button>
                    <button class="action-btn info" @click="handleAction('打印', item.label, timeStates[item.id])">打印</button>
                  </div>
                </div>
                
                <div class="report-display-area">
                  <div v-if="item.props.reportType === 'data'" class="component-flex-col">
                    <div class="card-row">
                      <DataCard label="水质综合指数" value="96.8" unit="" description="环比" statusText="↑ 0.5%" statusType="up" />
                      <DataCard label="异常波动频次" value="3" unit="次" description="较前一周期" statusText="↓ 2 次" statusType="down" />
                      <DataCard label="数据采集总量" value="12.5" unit="k" description="新增采集" statusText="↑ 1.2k" statusType="up" />
                    </div>
                    <div class="chart-row">
                      <LineChart 
                        :title="`${timeStates[item.id] || '日'}度核心水质指标趋势`" 
                        :xAxisData="['第1期', '第2期', '第3期', '第4期', '第5期', '第6期']" 
                        :seriesData="[{name: '溶解氧', data: [6.2, 6.5, 6.1, 6.8, 6.4, 6.7]}, {name: '浑浊度', data: [2.1, 1.8, 2.2, 1.9, 1.7, 2.0]}]" 
                      />
                    </div>
                  </div>
                  
                  <div v-if="item.props.reportType === 'device'" class="component-flex-row">
                    <div class="half-chart">
                      <PieChart 
                        :title="`${timeStates[item.id] || '日'}度设备运行状态分布`" 
                        :chartData="[{name: '在线运行', value: 342}, {name: '休眠待机', value: 45}, {name: '离线故障', value: 12}]" 
                      />
                    </div>
                    <div class="half-chart border-left">
                      <BarChart 
                        :title="`${timeStates[item.id] || '日'}度各类型设备能耗`" 
                        :categories="['投喂系统', '增氧泵组', '监测网关', '照明控制']" 
                        :values="[450, 820, 120, 310]" 
                      />
                    </div>
                  </div>
                </div>
              </div>
  
              <div v-if="item.type === 'special-report'" class="report-content-wrapper">
                <div class="report-toolbar justify-end">
                  <div class="button-group">
                    <button class="action-btn primary" @click="handleAction('生成', item.label)">生成</button>
                    <button class="action-btn success" @click="handleAction('导出', item.label)">导出</button>
                    <button class="action-btn info" @click="handleAction('打印', item.label)">打印</button>
                  </div>
                </div>
                
                <div class="report-display-area">
                  <div v-if="item.props.reportType === 'risk'" class="component-flex-col">
                    <div class="card-row" style="flex: 0 0 auto; height: 100px;">
                      <DataCard label="整体安全评估得分" value="92" unit="分" description="评估结论" statusText="运行状况优良" statusType="up" style="width: 100%;" />
                    </div>
                    <div class="component-flex-row" style="flex: 1;">
                      <div class="half-chart">
                        <DynamicList 
                          title="预警事件追踪" 
                          actionText="详情" 
                          :listData="[
                            {tagText: '低级', statusType: 'warning', title: '一号养殖区水温轻微波动', descPrefix: '发生时间', descHighlight: '10:24'},
                            {tagText: '中级', statusType: 'danger', title: '边缘计算节点通信中断', descPrefix: '发生时间', descHighlight: '14:15'},
                            {tagText: '解除', statusType: 'success', title: '监测指标全部回归正常区间', descPrefix: '发生时间', descHighlight: '16:00'}
                          ]" 
                        />
                      </div>
                      <div class="half-chart border-left">
                        <PieChart 
                          title="全域风险等级分布" 
                          :chartData="[{name: '低风险', value: 80}, {name: '中风险', value: 15}, {name: '高风险', value: 5}]" 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div v-if="item.props.reportType === 'control'" class="component-flex-col">
                    <div class="component-flex-row" style="flex: 1;">
                      <DynamicList 
                        title="调控策略执行记录" 
                        actionText="查看" 
                        :listData="[
                          {tagText: '成功', statusType: 'success', title: '1号增氧机启动高速模式', descPrefix: '触发时间', descHighlight: '08:00'},
                          {tagText: '成功', statusType: 'success', title: '中央投喂仓执行A区投料', descPrefix: '触发时间', descHighlight: '12:30'},
                          {tagText: '超时', statusType: 'danger', title: '水下相机校准云台角度失败', descPrefix: '触发时间', descHighlight: '14:00'}
                        ]" 
                        style="width: 100%;"
                      />
                    </div>
                    <div class="component-flex-row border-top" style="flex: 1;">
                      <div class="half-chart" style="width: 100%; padding-top: 10px;">
                         <BarChart 
                          title="调控效能评估 (增氧达标平均耗时对比/分钟)" 
                          :categories="['人工常规控制耗时', '算法自动介入耗时']" 
                          :values="[45, 30]" 
                        />
                      </div>
                    </div>
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
  import { ref, reactive, watch } from 'vue';
  import { GridLayout, GridItem } from 'grid-layout-plus';
  import { globalStore } from '../store.js';
  import DataCard from '../components/ui/DataCard.vue';
  import DynamicList from '../components/ui/DynamicList.vue';
  import LineChart from '../components/charts/LineChart.vue';
  import PieChart from '../components/charts/PieChart.vue';
  import BarChart from '../components/charts/BarChart.vue';
  
  const layout = ref([]);
  
  const timeStates = reactive({
    'rep-data': '日',
    'rep-device': '日'
  });
  
  const handleAction = (action, name, timeOpt = '') => {
    const suffix = timeOpt ? ` (${timeOpt}报)` : '';
    alert(`系统提示：正在对 [${name}] 执行 [${action}] 操作${suffix}`);
  };
  
  watch(
    () => {
      const menus = globalStore.pageMenus['/report'];
      if (!menus) return '';
      return menus.map(group => {
        const groupVisible = group.visible ? 'T' : 'F';
        const childrenVisible = group.children ? group.children.map(child => child.visible ? 'T' : 'F').join('') : '';
        return groupVisible + childrenVisible;
      }).join('-');
    },
    () => {
      const flatLayout = [];
      const menus = globalStore.pageMenus['/report'];
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
  .report-summary-container { 
    width: 100%; 
    height: calc(100vh - 55px); 
    overflow-y: auto; 
    background-color: #f4f6f9; 
    padding: 12px; 
    box-sizing: border-box; 
  }
  
  .report-grid-item { 
    background-color: #ffffff; 
    border-radius: 6px; 
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); 
    border: 1px solid #ebeef5; 
    overflow: hidden; 
    display: flex; 
    flex-direction: column; 
  }
  
  .grid-item-box { 
    display: flex; 
    flex-direction: column; 
    height: 100%; 
  }
  
  .drag-handle { 
    padding: 10px 14px; 
    background-color: #fafbfc; 
    border-bottom: 1px solid #ebeef5; 
    cursor: grab; 
    display: flex; 
    align-items: center; 
    gap: 8px; 
    flex-shrink: 0; 
  }
  .drag-handle:active { cursor: grabbing; }
  .drag-icon { color: #c0c4cc; }
  .drag-title { font-size: 14px; font-weight: bold; color: #303133; }
  
  .grid-item-body { 
    flex: 1; 
    padding: 14px; 
    overflow: hidden; 
    display: flex; 
    flex-direction: column; 
  }
  
  .report-content-wrapper { 
    display: flex; 
    flex-direction: column; 
    height: 100%; 
    gap: 14px; 
  }
  
  .report-toolbar { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    flex-shrink: 0; 
  }
  .justify-end { justify-content: flex-end; }
  
  .radio-group { 
    display: flex; 
    background: #f5f7fa; 
    border-radius: 4px; 
    padding: 2px; 
  }
  .radio-label { 
    position: relative; 
    cursor: pointer; 
  }
  .radio-label input { 
    position: absolute; 
    opacity: 0; 
  }
  .radio-text { 
    display: inline-block; 
    padding: 5px 14px; 
    font-size: 13px; 
    color: #606266; 
    border-radius: 3px; 
    transition: all 0.2s; 
  }
  .radio-label input:checked + .radio-text { 
    background: #ffffff; 
    color: #409eff; 
    font-weight: bold; 
    box-shadow: 0 1px 3px rgba(0,0,0,0.1); 
  }
  
  .button-group { display: flex; gap: 8px; }
  .action-btn { 
    padding: 6px 14px; 
    font-size: 12px; 
    border-radius: 4px; 
    cursor: pointer; 
    border: none; 
    font-weight: 500; 
  }
  .action-btn.primary { background: #409eff; color: white; }
  .action-btn.success { background: #67c23a; color: white; }
  .action-btn.info { background: #909399; color: white; }
  
  .report-display-area { 
    flex: 1; 
    background: #ffffff; 
    border: 1px solid #e4e7ed; 
    border-radius: 6px; 
    overflow: hidden; 
    display: flex;
    flex-direction: column;
  }
  
  .component-flex-col {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
  
  .component-flex-row {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
  }
  
  .card-row {
    display: flex;
    gap: 12px;
    padding: 12px;
    border-bottom: 1px dashed #ebeef5;
  }
  
  .chart-row {
    flex: 1;
    min-height: 0;
    padding: 12px;
  }
  
  .half-chart {
    flex: 1;
    min-width: 0;
    padding: 12px;
    display: flex;
    flex-direction: column;
  }
  
  .border-left { border-left: 1px dashed #ebeef5; }
  .border-top { border-top: 1px dashed #ebeef5; }
  
  </style>