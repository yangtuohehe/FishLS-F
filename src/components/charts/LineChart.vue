<template>
  <div class="responsive-container" ref="containerDom">
    <div class="chart-header">{{ title }}</div>
    <div class="chart-content">
      <div class="chart-area-wrapper">
        <div ref="chartDom" class="chart-area"></div>
      </div>
      <div class="info-area">
        <div class="info-title">最新监测指标</div>
        <div class="info-list">
          <div v-for="(item, index) in seriesData" :key="index" class="info-item">
            <div class="item-header">
              <span class="color-line" :style="{ backgroundColor: colors[index % colors.length] }"></span>
              <span class="item-name">{{ item.name }}</span>
            </div>
            <div class="item-data">
              <span class="item-value">{{ item.data[item.data.length - 1] }}</span>
              <span class="item-unit">°C</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, onUnmounted } from 'vue';
import * as echarts from 'echarts';

const props = defineProps(['title', 'xAxisData', 'seriesData']);
const chartDom = ref(null);
const containerDom = ref(null);
let myChart = null;
let resizeObserver = null;

const colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666'];

const init = () => {
  if (myChart) myChart.dispose();
  myChart = echarts.init(chartDom.value);
  myChart.setOption({
    color: colors,
    tooltip: { trigger: 'axis' },
    grid: { left: '2%', right: '5%', bottom: '2%', top: '10%', containLabel: true },
    xAxis: { type: 'category', boundaryGap: false, data: props.xAxisData, axisLine: { lineStyle: { color: '#909399' } } },
    yAxis: { type: 'value', splitLine: { lineStyle: { color: '#ebeef5', type: 'dashed' } }, axisLine: { show: false }, axisTick: { show: false } },
    series: props.seriesData.map((item) => ({
      name: item.name,
      type: 'line',
      data: item.data,
      smooth: true,
      symbolSize: 6,
      areaStyle: { opacity: 0.1 }
    }))
  });
};

onMounted(() => { 
  init(); 
  resizeObserver = new ResizeObserver(() => myChart?.resize());
  if (containerDom.value) resizeObserver.observe(containerDom.value);
});

onUnmounted(() => {
  if (resizeObserver) resizeObserver.disconnect();
  if (myChart) myChart.dispose();
});

const updateChartData = () => {
  if (!myChart) return;
  // 仅更新数据项，ECharts会自动处理平滑动画过渡
  myChart.setOption({
    xAxis: { data: props.xAxisData },
    series: props.seriesData.map((item) => ({
      name: item.name,
      data: item.data
    }))
  });
};

watch([() => props.xAxisData, () => props.seriesData], updateChartData, { deep: true });
</script>

<style scoped>
.responsive-container { container-type: size; display: flex; flex-direction: column; width: 100%; height: 100%; background: #fff; }
.chart-header { font-size: clamp(14px, 4cqw, 15px); font-weight: bold; color: #303133; margin-bottom: 2cqh; padding-bottom: 1cqh; border-bottom: 1px solid #ebeef5; flex-shrink: 0; }
.chart-content { display: flex; flex: 1; min-height: 0; min-width: 0; overflow: hidden; }
.chart-area-wrapper { flex: 2; position: relative; min-width: 0; min-height: 0; }
.chart-area { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
.info-area { flex: 1; display: flex; flex-direction: column; padding-left: 16px; border-left: 1px dashed #ebeef5; overflow-y: auto; min-width: 0; }
.info-title { font-size: 12px; color: #909399; margin-bottom: 12px; flex-shrink: 0; }
.info-list { display: flex; flex-direction: column; gap: 12px; }
.info-item { display: flex; flex-direction: column; gap: 2px; }
.item-header { display: flex; align-items: center; gap: 6px; }
.color-line { width: 12px; height: 3px; border-radius: 2px; flex-shrink: 0; }
.item-name { font-size: 13px; color: #606266; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.item-data { display: flex; align-items: baseline; padding-left: 18px; gap: 4px; }
.item-value { font-size: clamp(14px, 3cqh, 18px); font-weight: bold; color: #303133; }
.item-unit { font-size: 12px; color: #909399; }

@container (max-width: 450px) {
  .chart-content { flex-direction: column; }
  .chart-area-wrapper { flex: 1; }
  .info-area { padding-left: 0; padding-top: 12px; border-left: none; border-top: 1px dashed #ebeef5; flex: none; max-height: 40%; }
  .info-list { flex-direction: row; flex-wrap: wrap; }
  .info-item { width: 45%; }
}
</style>