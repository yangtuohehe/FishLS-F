<template>
  <div class="responsive-container" ref="containerDom">
    <div class="chart-header">{{ title }}</div>
    <div class="chart-content">
      <div class="chart-area-wrapper">
        <div ref="chartDom" class="chart-area"></div>
      </div>
      <div class="info-area">
        <div class="info-list">
          <div v-for="(item, index) in chartData" :key="index" class="info-item">
            <div class="item-header">
              <span class="color-dot" :style="{ backgroundColor: colors[index % colors.length] }"></span>
              <span class="item-name">{{ item.name }}</span>
            </div>
            <div class="item-data">
              <span class="item-value">{{ item.value }}</span>
              <span class="item-percent">{{ getPercent(item.value) }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, onUnmounted, computed } from 'vue';
import * as echarts from 'echarts';

const props = defineProps(['title', 'chartData']);
const chartDom = ref(null);
const containerDom = ref(null);
let myChart = null;
let resizeObserver = null;

const colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272'];

const totalValue = computed(() => {
  return props.chartData.reduce((sum, item) => sum + Number(item.value), 0);
});

const getPercent = (value) => {
  if (totalValue.value === 0) return 0;
  return ((Number(value) / totalValue.value) * 100).toFixed(1);
};

const init = () => {
  if (myChart) myChart.dispose();
  myChart = echarts.init(chartDom.value);
  myChart.setOption({
    color: colors,
    tooltip: { trigger: 'item' },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '50%'],
      data: props.chartData,
      itemStyle: { borderRadius: 4, borderColor: '#fff', borderWidth: 2 },
      label: { show: false }
    }]
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

watch(() => props.chartData, init, { deep: true });
</script>

<style scoped>
.responsive-container { container-type: size; display: flex; flex-direction: column; width: 100%; height: 100%; background: #fff; }
.chart-header { font-size: clamp(14px, 4cqw, 15px); font-weight: bold; color: #303133; margin-bottom: 2cqh; padding-bottom: 1cqh; border-bottom: 1px solid #ebeef5; flex-shrink: 0; }
.chart-content { display: flex; flex: 1; min-height: 0; min-width: 0; overflow: hidden; }
.chart-area-wrapper { flex: 1.5; position: relative; min-width: 0; min-height: 0; }
.chart-area { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
.info-area { flex: 1; display: flex; flex-direction: column; justify-content: center; padding-left: 16px; border-left: 1px dashed #ebeef5; overflow-y: auto; min-width: 0; }
.info-list { display: flex; flex-direction: column; gap: 12px; }
.info-item { display: flex; flex-direction: column; gap: 2px; }
.item-header { display: flex; align-items: center; gap: 6px; }
.color-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.item-name { font-size: 13px; color: #606266; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.item-data { display: flex; justify-content: space-between; align-items: baseline; padding-left: 14px; }
.item-value { font-size: clamp(14px, 3cqh, 18px); font-weight: bold; color: #303133; }
.item-percent { font-size: 12px; color: #909399; }

@container (max-width: 350px) {
  .chart-content { flex-direction: column; }
  .chart-area-wrapper { flex: 1; }
  .info-area { padding-left: 0; padding-top: 12px; border-left: none; border-top: 1px dashed #ebeef5; flex: none; justify-content: flex-start; max-height: 40%; }
  .info-list { flex-direction: row; flex-wrap: wrap; }
  .info-item { width: 45%; }
}
</style>