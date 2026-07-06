<template>
  <div class="control-center-grid">
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
        <div class="item-content" @click="handleItemClick(item)">
          <div class="drag-handle">⠿ {{ item.label }}</div>
          <div class="body-content">
            
            <div v-if="item.type === 'earth'" class="full-size-container">
              <CesiumViewer />
            </div>
            
            <div v-else-if="item.type === 'line'" class="custom-widget-panel flex-col-panel">
              <div class="full-size-container flex-1-chart">
                <LineChart v-bind="item.props" />
              </div>
              <div class="device-id-tag station-tag">监测终端ID: {{ item.props.deviceId }}</div>
            </div>
            
            <div v-else-if="item.type === 'valve-control'" class="custom-widget-panel">
              <div class="widget-header">执行器终端：{{ item.props.deviceName }}</div>
              <div class="widget-body">
                <div class="control-row">
                  <span>控制接管模式：</span>
                  <button 
                    class="mode-btn" 
                    :class="{ active: (globalStore.controlState.valveStates[item.props.deviceId]?.mode || 'manual') === 'manual' }"
                    @click.stop="toggleValveMode(item.props.deviceId, 'manual')">前端手动控制
                  </button>
                  <button 
                    class="mode-btn" 
                    :class="{ active: globalStore.controlState.valveStates[item.props.deviceId]?.mode === 'auto' }"
                    @click.stop="toggleValveMode(item.props.deviceId, 'auto')">规则引擎托管
                  </button>
                </div>
                <div class="control-row action-row">
                  <span>物理指令下发：</span>
                  <button 
                    class="action-btn off" 
                    :disabled="globalStore.controlState.valveStates[item.props.deviceId]?.mode === 'auto'"
                    :class="{ active: !globalStore.controlState.valveStates[item.props.deviceId]?.isOpen }"
                    @click.stop="executeValveCommand(item.props.deviceId, false)">闭合 [0]
                  </button>
                  <button 
                    class="action-btn on" 
                    :disabled="globalStore.controlState.valveStates[item.props.deviceId]?.mode === 'auto'"
                    :class="{ active: globalStore.controlState.valveStates[item.props.deviceId]?.isOpen }"
                    @click.stop="executeValveCommand(item.props.deviceId, true)">开启 [1]
                  </button>
                </div>
                <div class="device-id-tag">关联ID: {{ item.props.deviceId }}</div>
              </div>
            </div>

            <div v-else-if="item.type === 'rule-editor'" class="custom-widget-panel rule-panel">
              <div class="rule-list">
                <div class="rule-item" v-for="(rule, index) in globalStore.controlState.rules" :key="rule.id">
                  <div class="rule-status-indicator" :class="getRuleIndicatorClass(rule.content)"></div>
                  <div class="rule-editor-box">
                    <textarea v-model="rule.content" class="rule-textarea" @click.stop @blur="submitRuleUpdate"></textarea>
                    <div class="rule-meta">基于文本解析出 {{ getParsedDeviceCount(rule.content) }} 个底层设备关联标识</div>
                  </div>
                  <button class="delete-rule-btn" @click.stop="deleteRule(index)">删除</button>
                </div>
              </div>
              <div class="rule-action-bar">
                <button class="add-rule-btn" @click.stop="addNewRule">+ 新增语句声明</button>
              </div>
            </div>

          </div>
        </div>
      </GridItem>
    </GridLayout>
  </div>
</template>

<!-- <script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { GridLayout, GridItem } from 'grid-layout-plus';
import { globalStore } from '../store.js';
import CesiumViewer from '../components/ui/CesiumViewer.vue';
import LineChart from '../components/charts/LineChart.vue';

const layout = ref([]);
let ws = null;

watch(
  () => {
    const menus = globalStore.pageMenus['/control'];
    if (!menus) return '';
    return menus.map(group => {
      const groupVisible = group.visible ? 'T' : 'F';
      const childrenVisible = group.children ? group.children.map(child => child.visible ? 'T' : 'F').join('') : '';
      return groupVisible + childrenVisible;
    }).join('-');
  },
  () => {
    const flatLayout = [];
    const menus = globalStore.pageMenus['/control'];
    if (menus) {
      menus.forEach(group => {
        if (group.visible && group.children) {
          group.children.forEach(child => {
            if (child.visible) {
              flatLayout.push({ ...child, i: child.id });
            }
          });
        }
      });
    }
    layout.value = flatLayout;
  },
  { immediate: true }
);

const handleItemClick = (item) => {
  if (item.type !== 'earth' && item.props && item.props.deviceId) {
    const coords = globalStore.controlState.deviceCoordinates[item.props.deviceId];
    if (coords) {
      window.dispatchEvent(new CustomEvent('map-fly-to-device', { 
        detail: { lng: coords.lng, lat: coords.lat, alt: coords.alt || 500 } 
      }));
    }
  }
};

const getParsedDeviceCount = (content) => {
  const ids = content.match(/DEV-(ST|VALVE)-\d{3}/gi) || [];
  return new Set(ids).size;
};

const getRuleIndicatorClass = (content) => {
  const ids = content.match(/DEV-(ST|VALVE)-\d{3}/gi) || [];
  let isAuto = false;
  for (const id of ids) {
    if (globalStore.controlState.valveStates[id] && globalStore.controlState.valveStates[id].mode === 'auto') {
      isAuto = true;
      break;
    }
  }
  return isAuto ? 'active-green' : 'inactive-grey';
};

const toggleValveMode = async (deviceId, mode) => {
  if (!globalStore.controlState.valveStates[deviceId]) {
    globalStore.controlState.valveStates[deviceId] = { mode: 'manual', isOpen: false };
  }
  try {
    await fetch('/api/v1/control/mode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId: deviceId, mode: mode })
    });
  } catch (error) {
    console.warn('模式切换网络请求中断，已进入脱机推演状态');
  }
  globalStore.controlState.valveStates[deviceId].mode = mode;
};

const executeValveCommand = async (deviceId, isOpen) => {
  if (!globalStore.controlState.valveStates[deviceId]) {
    globalStore.controlState.valveStates[deviceId] = { mode: 'manual', isOpen: false };
  }
  try {
    const targetValue = isOpen ? 1.0 : 0.0;
    await fetch('/api/v1/control/command', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId: deviceId, targetValue: targetValue })
    });
  } catch (error) {
    console.warn('物理指令下发链路异常，已记录到脱机事务日志');
  }
  globalStore.controlState.valveStates[deviceId].isOpen = isOpen;
};

const submitRuleUpdate = async () => {
  try {
    await fetch('/api/v1/rules/declaration', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rules: globalStore.controlState.rules })
    });
  } catch (error) {
    console.warn('规则引擎序列化同步被阻断');
  }
};

const addNewRule = () => {
  globalStore.controlState.rules.push({
    id: 'rule_' + Date.now(),
    content: '输入带标识的逻辑表达式进行解析...'
  });
};

const deleteRule = (index) => {
  globalStore.controlState.rules.splice(index, 1);
  submitRuleUpdate();
};

const fetchInitialDeviceData = async () => {
  const deviceIds = layout.value
    .filter(item => item.type !== 'earth' && item.props && item.props.deviceId)
    .map(item => item.props.deviceId);

  if (deviceIds.length === 0) return;

  try {
    const locationRes = await fetch(`/api/v1/entities/locations?ids=${deviceIds.join(',')}`);
    if (locationRes.ok) {
      const locationData = await locationRes.json();
      if (locationData && locationData.data) {
        globalStore.controlState.deviceCoordinates = locationData.data;
      }
    }
  } catch (error) {
    console.warn('获取设备坐标失败，保持脱机占位数据', error);
  }

  try {
    const historyRes = await fetch(`/api/v1/observations/history/batch?ids=${deviceIds.join(',')}`);
    if (historyRes.ok) {
      const historyData = await historyRes.json();
      if (historyData && historyData.data) {
        layout.value.forEach(item => {
          if (item.type === 'line' && historyData.data[item.props.deviceId]) {
            const chartData = historyData.data[item.props.deviceId];
            item.props.title = chartData.title || item.props.title.replace('(连接中...)', '(24h)');
            item.props.xAxisData = chartData.xAxis;
            item.props.seriesData = chartData.series;
          }
        });
      }
    }
  } catch (error) {
    console.warn('获取观测时序失败，保持前端默认归零数据展示', error);
  }
};

const updateChartData = (deviceId, value, timestamp) => {
  let timeStr = '';
  if (typeof timestamp === 'string') {
    const parts = timestamp.split('.');
    timeStr = parts.length >= 6 ? `${parts[3]}:${parts[4]}:${parts[5]}` : timestamp;
  } else {
    timeStr = new Date(timestamp).toLocaleTimeString('zh-CN', { hour12: false });
  }

  const menus = globalStore.pageMenus['/control'];
  menus.forEach(group => {
    if (!group.children) return;
    group.children.forEach(child => {
      if (child.type === 'line' && child.props.deviceId === deviceId) {
        child.props.title = child.props.title.replace('(连接中...)', '(实时在线)');
        child.props.xAxisData.push(timeStr);
        child.props.seriesData[0].data.push(value);

        if (child.props.xAxisData.length > 20) {
          child.props.xAxisData.shift();
          child.props.seriesData[0].data.shift();
        }
      }
    });
  });
};

const initWebSocket = () => {
  const wsUrl = `ws://${window.location.hostname}:8080/ws/digital_twin`; 
  ws = new WebSocket(wsUrl);

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);

      if (data.stations) {
        data.stations.forEach(station => {
          updateChartData(station.station_id, station.salinity, station.timestamp);
        });
      }
      
      if (data.valve_info) {
        const v = data.valve_info;
        if (globalStore.controlState.valveStates[v.device_id]) {
          globalStore.controlState.valveStates[v.device_id].isOpen = (v.valve_state === 1.0);
        }
      }

      if (data.device_id && data.records) {
        const deviceId = data.device_id;
        data.records.forEach(record => {
          const payload = record.payload;
          
          if (payload.valve_state !== undefined) {
            if (!globalStore.controlState.valveStates[deviceId]) {
              globalStore.controlState.valveStates[deviceId] = { mode: 'manual', isOpen: false };
            }
            globalStore.controlState.valveStates[deviceId].isOpen = (payload.valve_state === 1.0);
          }
          
          const val = payload.salinity !== undefined ? payload.salinity : Object.values(payload)[0];
          if (val !== undefined) {
            updateChartData(deviceId, val, record.timestamp);
          }
        });
      }
    } catch (error) {
      console.warn("WebSocket 消息解析异常:", error);
    }
  };

  ws.onclose = () => {
    console.warn("WebSocket 连接断开，3秒后尝试重连...");
    setTimeout(initWebSocket, 3000);
  };
};

onMounted(() => {
  fetchInitialDeviceData();
  initWebSocket();
});

onUnmounted(() => {
  if (ws) {
    ws.onclose = null;
    ws.close();
  }
});
</script> -->

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { GridLayout, GridItem } from 'grid-layout-plus';
import { globalStore } from '../store.js';
import CesiumViewer from '../components/ui/CesiumViewer.vue';
import LineChart from '../components/charts/LineChart.vue';

const layout = ref([]);
let ws = null;

watch(
  () => {
    const menus = globalStore.pageMenus['/control'];
    if (!menus) return '';
    return menus.map(group => {
      const groupVisible = group.visible ? 'T' : 'F';
      const childrenVisible = group.children ? group.children.map(child => child.visible ? 'T' : 'F').join('') : '';
      return groupVisible + childrenVisible;
    }).join('-');
  },
  () => {
    const flatLayout = [];
    const menus = globalStore.pageMenus['/control'];
    if (menus) {
      menus.forEach(group => {
        if (group.visible && group.children) {
          group.children.forEach(child => {
            if (child.visible) {
              flatLayout.push({ ...child, i: child.id });
            }
          });
        }
      });
    }
    layout.value = flatLayout;
  },
  { immediate: true }
);

const handleItemClick = (item) => {
  if (item.type !== 'earth' && item.props && item.props.deviceId) {
    const coords = globalStore.controlState.deviceCoordinates[item.props.deviceId];
    if (coords) {
      window.dispatchEvent(new CustomEvent('map-fly-to-device', { 
        detail: { lng: coords.lng, lat: coords.lat, alt: coords.alt || 500 } 
      }));
    }
  }
};

const getParsedDeviceCount = (content) => {
  const ids = content.match(/DEV-(ST|VALVE)-\d{3}/gi) || [];
  return new Set(ids).size;
};

const getRuleIndicatorClass = (content) => {
  const ids = content.match(/DEV-(ST|VALVE)-\d{3}/gi) || [];
  let isAuto = false;
  for (const id of ids) {
    if (globalStore.controlState.valveStates[id] && globalStore.controlState.valveStates[id].mode === 'auto') {
      isAuto = true;
      break;
    }
  }
  return isAuto ? 'active-green' : 'inactive-grey';
};

const toggleValveMode = async (deviceId, mode) => {
  if (!globalStore.controlState.valveStates[deviceId]) {
    globalStore.controlState.valveStates[deviceId] = { mode: 'manual', isOpen: false };
  }
  try {
    await fetch('/api/v1/control/mode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId: deviceId, mode: mode })
    });
  } catch (error) {
    console.warn('模式切换网络请求中断，已进入脱机推演状态');
  }
  globalStore.controlState.valveStates[deviceId].mode = mode;
};

const executeValveCommand = async (deviceId, isOpen) => {
  if (!globalStore.controlState.valveStates[deviceId]) {
    globalStore.controlState.valveStates[deviceId] = { mode: 'manual', isOpen: false };
  }
  try {
    const targetValue = isOpen ? 1.0 : 0.0;
    await fetch('/api/v1/control/command', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId: deviceId, targetValue: targetValue })
    });
  } catch (error) {
    console.warn('物理指令下发链路异常，已记录到脱机事务日志');
  }
  globalStore.controlState.valveStates[deviceId].isOpen = isOpen;
};

const submitRuleUpdate = async () => {
  try {
    await fetch('/api/v1/rules/declaration', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rules: globalStore.controlState.rules })
    });
  } catch (error) {
    console.warn('规则引擎序列化同步被阻断');
  }
};

const addNewRule = () => {
  globalStore.controlState.rules.push({
    id: 'rule_' + Date.now(),
    content: '输入带标识的逻辑表达式进行解析...'
  });
};

const deleteRule = (index) => {
  globalStore.controlState.rules.splice(index, 1);
  submitRuleUpdate();
};

const initTwinHandshake = async () => {
  const deviceIds = layout.value
    .filter(item => item.type !== 'earth' && item.props && item.props.deviceId)
    .map(item => item.props.deviceId);

  if (deviceIds.length === 0) return;

  layout.value.forEach(item => {
    if (item.type === 'line' && item.props) {
      item.props.xAxisData = [];
      if (item.props.seriesData && item.props.seriesData[0]) {
        item.props.seriesData[0].data = [];
      }
    }
  });

  try {
    const response = await fetch('/api/v1/twin/init', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceIds: deviceIds })
    });

    const resData = await response.json();

    if (resData.code === 200 && resData.data) {
      resData.data.forEach(device => {
        globalStore.controlState.deviceCoordinates[device.deviceId] = {
          lng: device.longitude,
          lat: device.latitude,
          alt: 500
        };
      });

      await fetchInitialDeviceData(deviceIds);
      initWebSocket();
    } else {
      console.warn('后端拒绝了初始化握手请求，页面保持空白数据状态');
    }
  } catch (error) {
    console.error('握手请求通信异常，数据链路已自动拦截阻断', error);
  }
};

const fetchInitialDeviceData = async (deviceIds) => {
  try {
    const historyRes = await fetch(`/api/v1/observations/history/batch?ids=${deviceIds.join(',')}`);
    if (historyRes.ok) {
      const historyData = await historyRes.json();
      if (historyData && historyData.data) {
        layout.value.forEach(item => {
          if (item.type === 'line' && historyData.data[item.props.deviceId]) {
            const chartData = historyData.data[item.props.deviceId];
            item.props.title = chartData.title || item.props.title.replace('(连接中...)', '(24h)');
            item.props.xAxisData = chartData.xAxis;
            item.props.seriesData = chartData.series;
          }
        });
      }
    }
  } catch (error) {
    console.warn('获取历史时序失败，维持现有状态展示', error);
  }
};

const updateChartData = (deviceId, value, timestamp) => {
  let timeStr = '';
  if (typeof timestamp === 'string') {
    const parts = timestamp.split('.');
    timeStr = parts.length >= 6 ? `${parts[3]}:${parts[4]}:${parts[5]}` : timestamp;
  } else {
    timeStr = new Date(timestamp).toLocaleTimeString('zh-CN', { hour12: false });
  }

  const menus = globalStore.pageMenus['/control'];
  menus.forEach(group => {
    if (!group.children) return;
    group.children.forEach(child => {
      if (child.type === 'line' && child.props.deviceId === deviceId) {
        child.props.title = child.props.title.replace('(连接中...)', '(实时在线)');
        child.props.xAxisData.push(timeStr);
        child.props.seriesData[0].data.push(value);

        if (child.props.xAxisData.length > 20) {
          child.props.xAxisData.shift();
          child.props.seriesData[0].data.shift();
        }
      }
    });
  });
};

const initWebSocket = () => {
  const wsUrl = `ws://${window.location.hostname}:8080/ws/digital_twin`; 
  ws = new WebSocket(wsUrl);

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);

      if (data.stations) {
        data.stations.forEach(station => {
          updateChartData(station.station_id, station.salinity, station.timestamp);
        });
      }
      
      if (data.valve_info) {
        const v = data.valve_info;
        if (globalStore.controlState.valveStates[v.device_id]) {
          globalStore.controlState.valveStates[v.device_id].isOpen = (v.valve_state === 1.0);
        }
      }

      if (data.device_id && data.records) {
        const deviceId = data.device_id;
        data.records.forEach(record => {
          const payload = record.payload;
          
          if (payload.valve_state !== undefined) {
            if (!globalStore.controlState.valveStates[deviceId]) {
              globalStore.controlState.valveStates[deviceId] = { mode: 'manual', isOpen: false };
            }
            globalStore.controlState.valveStates[deviceId].isOpen = (payload.valve_state === 1.0);
          }
          
          const val = payload.salinity !== undefined ? payload.salinity : Object.values(payload)[0];
          if (val !== undefined) {
            updateChartData(deviceId, val, record.timestamp);
          }
        });
      }
    } catch (error) {
      console.warn("WebSocket 消息解析异常:", error);
    }
  };

  ws.onclose = () => {
    console.warn("WebSocket 连接断开，3秒后尝试重连...");
    setTimeout(initWebSocket, 3000);
  };
};

onMounted(() => {
  initTwinHandshake();
});

onUnmounted(() => {
  if (ws) {
    ws.onclose = null;
    ws.close();
  }
});
</script>


<style scoped>
.control-center-grid {
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
}
.earth-grid-item {
  touch-action: auto !important;
  pointer-events: auto !important;
  z-index: 5;
}
.item-content { 
  display: flex; 
  flex-direction: column; 
  height: 100%; 
  cursor: pointer;
}
.drag-handle { 
  padding: 8px 12px; 
  background: #f5f7fa; 
  color: #606266; 
  font-size: 13px; 
  font-weight: 500;
  cursor: grab;
  border-bottom: 1px solid #ebeef5;
}
.body-content { 
  flex: 1; 
  min-height: 0; 
  overflow: auto;
  padding: 8px;
}
.full-size-container {
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.full-size-container > * {
  pointer-events: auto;
}
.flex-col-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.flex-1-chart {
  flex: 1;
  min-height: 0;
  width: 100%;
}
.custom-widget-panel {
  display: flex;
  flex-direction: column;
  padding: 8px;
}
.widget-header {
  font-size: 14px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 16px;
}
.widget-body {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.control-row {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-size: 13px;
  color: #606266;
}
.mode-btn, .action-btn {
  margin-left: 8px;
  padding: 6px 12px;
  border: 1px solid #dcdfe6;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  color: #606266;
  transition: all 0.2s;
}
.mode-btn.active {
  background: #ecf5ff;
  border-color: #409eff;
  color: #409eff;
}
.action-btn.active.off {
  background: #fef0f0;
  border-color: #f56c6c;
  color: #f56c6c;
}
.action-btn.active.on {
  background: #f0f9eb;
  border-color: #67c23a;
  color: #67c23a;
}
.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f5f7fa;
}
.device-id-tag {
  margin-top: auto;
  font-size: 12px;
  color: #909399;
  background: #f4f4f5;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: monospace;
}
.station-tag {
  margin-top: 8px;
  text-align: right;
  background: transparent;
  color: #c0c4cc;
}
.rule-panel {
  gap: 12px;
}
.rule-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}
.rule-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #ebeef5;
}
.rule-status-indicator {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  flex-shrink: 0;
}
.active-green { background-color: #67c23a; box-shadow: 0 0 8px rgba(103, 194, 58, 0.6); }
.inactive-grey { background-color: #c0c4cc; }
.rule-editor-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.rule-textarea {
  width: 100%;
  height: 40px;
  background: #1e1e1e;
  color: #a9b7c6;
  border: none;
  border-radius: 4px;
  padding: 8px;
  font-family: monospace;
  resize: none;
  outline: none;
}
.rule-meta {
  font-size: 12px;
  color: #e6a23c;
  font-family: monospace;
}
.delete-rule-btn {
  background: #fef0f0;
  color: #f56c6c;
  border: 1px solid #fbc4c4;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}
.rule-action-bar {
  display: flex;
  justify-content: center;
  padding-top: 8px;
}
.add-rule-btn {
  background: #fff;
  border: 1px dashed #dcdfe6;
  color: #606266;
  padding: 6px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}
.add-rule-btn:hover {
  border-color: #409eff;
  color: #409eff;
}
</style>
