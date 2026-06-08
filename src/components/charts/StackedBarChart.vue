<template>
    <div class="responsive-container" ref="containerDom">
      <div class="component-header">
        <div class="title-area">
          <span class="main-title">{{ title }}</span>
          <span class="sub-title" v-if="unit">({{ unit }})</span>
        </div>
      </div>
      <div class="chart-content">
        <div ref="chartDom" class="chart-area"></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref, watch, onUnmounted } from 'vue';
  import * as echarts from 'echarts';
  
  const props = defineProps({
    title: String,
    unit: String,
    xAxisData: Array,
    seriesData: Array
  });
  
  const chartDom = ref(null);
  const containerDom = ref(null);
  let myChart = null;
  let resizeObserver = null;
  
  const init = () => {
    if (myChart) myChart.dispose();
    myChart = echarts.init(chartDom.value);
    
    const series = props.seriesData.map((item) => {
      return {
        name: item.name,
        type: 'bar',
        stack: 'total',
        barWidth: '35%',
        data: item.data,
        itemStyle: {
          color: item.color,
          borderRadius: item.isTop ? [4, 4, 0, 0] : [0, 0, 0, 0]
        }
      };
    });
  
    myChart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      legend: {
        icon: 'rect',
        itemWidth: 12,
        itemHeight: 12,
        itemGap: 16,
        top: 0,
        textStyle: {
          color: '#606266',
          fontSize: 12
        }
      },
      grid: {
        left: '0%',
        right: '2%',
        bottom: '0%',
        top: '18%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: props.xAxisData,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: '#606266', fontSize: 11, interval: 0, margin: 12 }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: { color: '#ebeef5', type: 'solid' }
        },
        axisLabel: { color: '#909399', fontSize: 11 }
      },
      series: series
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
  
  watch([() => props.xAxisData, () => props.seriesData], init, { deep: true });
  </script>
  
  <style scoped>
  .responsive-container {
    container-type: size;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 8px;
    box-sizing: border-box;
  }
  
  .component-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    flex-shrink: 0;
  }
  
  .title-area {
    display: flex;
    align-items: baseline;
  }
  
  .main-title {
    font-size: 15px;
    font-weight: bold;
    color: #303133;
  }
  
  .sub-title {
    font-size: 12px;
    color: #909399;
    margin-left: 6px;
  }
  
  
  .chart-content {
    flex: 1;
    min-height: 0;
    min-width: 0;
    position: relative;
  }
  
  .chart-area {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  </style>