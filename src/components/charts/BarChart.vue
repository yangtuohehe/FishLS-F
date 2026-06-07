<template>
  <div class="responsive-container" ref="containerDom">
    <div class="chart-header">{{ title }}</div>
    <div class="chart-content">
      <div class="chart-area-wrapper">
        <div ref="chartDom" class="chart-area"></div>
      </div>
      <div class="info-area">
        <div class="info-title">统计明细数据</div>
        <div class="info-list">
          <div v-for="(cat, index) in categories" :key="index" class="info-item">
            <span class="item-name">{{ cat }}</span>
            <span class="item-value">{{ values[index] }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, onUnmounted } from 'vue';
import * as echarts from 'echarts';

const props = defineProps(['title', 'categories', 'values']);
const chartDom = ref(null);
const containerDom = ref(null);
let myChart = null;
let resizeObserver = null;

const init = () => {
  if (myChart) myChart.dispose();
  myChart = echarts.init(chartDom.value);
  myChart.setOption({
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: '2%', right: '8%', bottom: '2%', top: '10%', containLabel: true },
    xAxis: { type: 'value', splitLine: { lineStyle: { color: '#ebeef5', type: 'dashed' } }, axisLine: { show: false }, axisLabel: { color: '#909399' } },
    yAxis: { type: 'category', data: props.categories, axisLine: { lineStyle: { color: '#dcdfe6' } }, axisTick: { show: false }, axisLabel: { color: '#606266' } },
    series: [{
      type: 'bar',
      barWidth: '35%',
      data: props.values,
      itemStyle: { color: '#409eff', borderRadius: [0, 4, 4, 0] }
    }]
  });
};

onMounted(() => { 
  init(); 
  resizeObserver = new ResizeObserver(() => {
    if (myChart) myChart.resize();
  });
  if (containerDom.value) {
    resizeObserver.observe(containerDom.value);
  }
});

onUnmounted(() => {
  if (resizeObserver) resizeObserver.disconnect();
  if (myChart) myChart.dispose();
});

watch([() => props.categories, () => props.values], init, { deep: true });
</script>

<style scoped>
.responsive-container { container-type: size; display: flex; flex-direction: column; width: 100%; height: 100%; background: #fff; }
.chart-header { font-size: clamp(14px, 4cqw, 15px); font-weight: bold; color: #303133; margin-bottom: 2cqh; padding-bottom: 1cqh; border-bottom: 1px solid #ebeef5; flex-shrink: 0; }
.chart-content { display: flex; flex: 1; min-height: 0; min-width: 0; overflow: hidden; }
.chart-area-wrapper { flex: 2; position: relative; min-width: 0; min-height: 0; }
.chart-area { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
.info-area { flex: 1; display: flex; flex-direction: column; justify-content: flex-start; padding-left: 16px; border-left: 1px dashed #ebeef5; overflow-y: auto; min-width: 0; }
.info-title { font-size: 12px; color: #909399; margin-bottom: 12px; flex-shrink: 0; }
.info-list { display: flex; flex-direction: column; gap: 8px; }
.info-item { display: flex; justify-content: space-between; align-items: center; padding: 6px 10px; background: #f5f7fa; border-radius: 4px; }
.item-name { font-size: 13px; color: #606266; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-right: 8px; }
.item-value { font-size: 15px; font-weight: bold; color: #409eff; }

@container (max-width: 400px) {
  .chart-content { flex-direction: column; }
  .chart-area-wrapper { flex: 1; }
  .info-area { padding-left: 0; padding-top: 12px; border-left: none; border-top: 1px dashed #ebeef5; flex: none; max-height: 40%; }
}
</style>