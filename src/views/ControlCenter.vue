<template>
  <div class="control-center-container">
    <div class="main-zone-top" v-if="isZoneVisible('control-top') && topZoneComps.length > 0" :style="{ height: topPanelHeight + 'px' }">
      <div class="comp-wrapper-row">
        <DataCard :label="'数字孪生目标实体'" :value="globalStore.runtimeValve.deviceName" :unit="''" :description="'物理编码'" :statusText="globalStore.runtimeValve.deviceId" :statusType="'info'" />
        <DataCard :label="'执行器当前开度'" :value="globalStore.runtimeValve.currentOpening.toFixed(1)" :unit="'%'" :description="'下发模式'" :statusText="globalStore.runtimeValve.controlMode" :statusType="'up'" />
        <DataCard :label="'激活决策体'" :value="globalStore.runtimeValve.matchedRule" :unit="''" :description="'反馈时延'" :statusText="'14 ms'" :statusType="'up'" />
      </div>
    </div>

    <div class="drag-handle-horizontal" @mousedown="startDragTop" v-if="isZoneVisible('control-top') && topZoneComps.length > 0"></div>

    <div class="main-zone-middle">
      <div class="main-zone-left" v-if="isZoneVisible('control-left') && leftZoneComps.length > 0" :style="{ width: leftPanelWidth + 'px' }">
        <div class="comp-wrapper" v-for="comp in leftZoneComps" :key="comp.id">
          
          <div v-if="comp.type === 'env_sensor'" class="custom-panel">
            <div class="panel-title">孪生空间环境要素感知（可拖动模拟）</div>
            <div class="sensor-sim-form">
              <div class="sim-item">
                <div class="sim-label-row">
                  <span>溶解氧浓度 (dissolvedOxygen)</span>
                  <span class="sim-val font-num">{{ globalStore.runtimeSensors.dissolvedOxygen }} mg/L</span>
                </div>
                <input type="range" min="2" max="10" step="0.1" v-model.number="globalStore.runtimeSensors.dissolvedOxygen" class="custom-slider" @input="runRuleEngine" />
              </div>
              <div class="sim-item">
                <div class="sim-label-row">
                  <span>水体温度 (waterTemp)</span>
                  <span class="sim-val font-num">{{ globalStore.runtimeSensors.waterTemp }} ℃</span>
                </div>
                <input type="range" min="15" max="35" step="0.5" v-model.number="globalStore.runtimeSensors.waterTemp" class="custom-slider" @input="runRuleEngine" />
              </div>
              <div class="sim-item">
                <div class="sim-label-row">
                  <span>氨氮含量 (ammoniaNitrogen)</span>
                  <span class="sim-val font-num">{{ globalStore.runtimeSensors.ammoniaNitrogen }} mg/L</span>
                </div>
                <input type="range" min="0" max="0.5" step="0.01" v-model.number="globalStore.runtimeSensors.ammoniaNitrogen" class="custom-slider" @input="runRuleEngine" />
              </div>
            </div>
          </div>

          <div v-if="comp.type === 'rule_editor'" class="custom-panel flex-1-panel">
            <div class="panel-title">水阀声明式控制规则编辑器 (手动建模语言)</div>
            <div class="code-editor-container">
              <textarea v-model="globalStore.ruleScriptSource" class="rule-textarea" placeholder="// 请遵循文法结构编写控制规则" @input="runRuleEngine"></textarea>
            </div>
            <div class="syntax-tip">文法提示：支持 IF [变量] [运算符] [数值] THEN targetOpening = [数值]</div>
          </div>

        </div>
      </div>

      <div class="drag-handle-vertical" @mousedown="startDragLeft" v-if="isZoneVisible('control-left') && leftZoneComps.length > 0"></div>

      <div class="main-zone-center">
        <div class="cesium-earth-container">
          <CesiumViewer />
        </div>

        <div class="map-interactive-overlay">
          <div class="valve-twin-card">
            <div class="twin-title">
              <span class="pulse-dot"></span>
              <span>水阀实体映射中</span>
            </div>
            <div class="twin-body">
              <p>指令目标位置: <span class="font-num text-warn">{{ globalStore.runtimeValve.targetOpening }}%</span></p>
              <p>步进电机响应: <span class="text-success">就绪</span></p>
              <div class="valve-visual-bar">
                <div class="valve-progress" :style="{ width: globalStore.runtimeValve.currentOpening + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="drag-handle-vertical" @mousedown="startDragRight" v-if="isZoneVisible('control-right') && rightZoneComps.length > 0"></div>

      <div class="main-zone-right" v-if="isZoneVisible('control-right') && rightZoneComps.length > 0" :style="{ width: rightPanelWidth + 'px' }">
        <div class="comp-wrapper" v-for="comp in rightZoneComps" :key="comp.id">
          
          <div v-if="comp.type === 'engine_monitor'" class="custom-panel">
            <div class="panel-title">调控决策引擎诊断</div>
            <div class="engine-diagnose-view">
              <div class="diagnose-status">
                <span class="status-label">引擎解析状态:</span>
                <span class="status-value text-success font-bold">COMPILING_SUCCESS</span>
              </div>
              <div class="rule-match-track">
                <div class="track-title">当前匹配并激发的控制规则：</div>
                <div class="matched-box font-mono">{{ globalStore.runtimeValve.matchedRule }}</div>
              </div>
              <div class="command-delivery-queue">
                <div class="queue-title">工业反向物理控制指令流：</div>
                <div class="log-stream">
                  <div class="log-line" v-for="(log, idx) in controlLogs" :key="idx">
                    <span class="log-time font-num">[{{ log.time }}]</span>
                    <span class="log-text">{{ log.text }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="drag-handle-horizontal" @mousedown="startDragBottom" v-if="isZoneVisible('control-bottom') && bottomZoneComps.length > 0"></div>

    <div class="main-zone-bottom" v-if="isZoneVisible('control-bottom') && bottomZoneComps.length > 0" :style="{ height: bottomPanelHeight + 'px' }">
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { globalStore } from '../store.js';
import DataCard from '../components/ui/DataCard.vue';
import CesiumViewer from '../components/ui/CesiumViewer.vue';

const route = useRoute();
const controlLogs = ref([]);

const isZoneVisible = (zoneId) => {
  const menus = globalStore.pageMenus['/control'] || [];
  const zoneMenu = menus.find(m => m.id === zoneId);
  return zoneMenu ? zoneMenu.visible !== false : false;
};

const activeComponents = computed(() => {
  const comps = [];
  const currentMenus = globalStore.pageMenus['/control'] || [];
  currentMenus.forEach(group => {
    if (group.visible !== false) {
      group.children.forEach(child => {
        if (child.visible) comps.push(child);
      });
    }
  });
  return comps;
});

const topZoneComps = computed(() => activeComponents.value.filter(c => c.zone === 'top'));
const leftZoneComps = computed(() => activeComponents.value.filter(c => c.zone === 'left'));
const rightZoneComps = computed(() => activeComponents.value.filter(c => c.zone === 'right'));
const bottomZoneComps = computed(() => activeComponents.value.filter(c => c.zone === 'bottom'));

const leftPanelWidth = ref(320);
const rightPanelWidth = ref(320);
const topPanelHeight = ref(85);
const bottomPanelHeight = ref(200);

let startX = 0, startY = 0;
let startWidthLeft = 0, startWidthRight = 0;
let startHeightTop = 0, startHeightBottom = 0;

const onDragLeft = (e) => {
  leftPanelWidth.value = Math.max(250, Math.min(startWidthLeft + (e.clientX - startX), 600));
};
const stopDragLeft = () => {
  document.removeEventListener('mousemove', onDragLeft);
  document.removeEventListener('mouseup', stopDragLeft);
  document.body.style.userSelect = '';
};
const startDragLeft = (e) => {
  startX = e.clientX;
  startWidthLeft = leftPanelWidth.value;
  document.addEventListener('mousemove', onDragLeft);
  document.addEventListener('mouseup', stopDragLeft);
  document.body.style.userSelect = 'none';
};

const onDragRight = (e) => {
  rightPanelWidth.value = Math.max(250, Math.min(startWidthRight - (e.clientX - startX), 600));
};
const stopDragRight = () => {
  document.removeEventListener('mousemove', onDragRight);
  document.removeEventListener('mouseup', stopDragRight);
  document.body.style.userSelect = '';
};
const startDragRight = (e) => {
  startX = e.clientX;
  startWidthRight = rightPanelWidth.value;
  document.addEventListener('mousemove', onDragRight);
  document.addEventListener('mouseup', stopDragRight);
  document.body.style.userSelect = 'none';
};

const onDragTop = (e) => {
  topPanelHeight.value = Math.max(60, Math.min(startHeightTop + (e.clientY - startY), 300));
};
const stopDragTop = () => {
  document.removeEventListener('mousemove', onDragTop);
  document.removeEventListener('mouseup', stopDragTop);
  document.body.style.userSelect = '';
};
const startDragTop = (e) => {
  startY = e.clientY;
  startHeightTop = topPanelHeight.value;
  document.addEventListener('mousemove', onDragTop);
  document.addEventListener('mouseup', stopDragTop);
  document.body.style.userSelect = 'none';
};

const onDragBottom = (e) => {
  bottomPanelHeight.value = Math.max(100, Math.min(startHeightBottom - (e.clientY - startY), 450));
};
const stopDragBottom = () => {
  document.removeEventListener('mousemove', onDragBottom);
  document.removeEventListener('mouseup', stopDragBottom);
  document.body.style.userSelect = '';
};
const startDragBottom = (e) => {
  startY = e.clientY;
  startHeightBottom = bottomPanelHeight.value;
  document.addEventListener('mousemove', onDragBottom);
  document.addEventListener('mouseup', stopDragBottom);
  document.body.style.userSelect = 'none';
};

onBeforeUnmount(() => {
  stopDragLeft(); stopDragRight(); stopDragTop(); stopDragBottom();
});

const pushLog = (text) => {
  const now = new Date();
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
  controlLogs.value.unshift({ time: timeStr, text });
  if (controlLogs.value.length > 6) controlLogs.value.pop();
};

const runRuleEngine = () => {
  const lines = globalStore.ruleScriptSource.split('\n');
  const context = globalStore.runtimeSensors;
  let matchedAny = false;
  for (let line of lines) {
    line = line.trim();
    if (line.startsWith('//') || !line) continue;
    const match = line.match(/IF\s+(.+)\s+THEN\s+targetOpening\s*=\s*(\d+)/i);
    if (match) {
      const conditionStr = match[1];
      const targetVal = parseInt(match[2]);
      let jsCondition = conditionStr
        .replace(/dissolvedOxygen/g, String(context.dissolvedOxygen))
        .replace(/waterTemp/g, String(context.waterTemp))
        .replace(/ammoniaNitrogen/g, String(context.ammoniaNitrogen))
        .replace(/AND/g, '&&')
        .replace(/OR/g, '||');
      try {
        if (eval(jsCondition)) {
          if (globalStore.runtimeValve.targetOpening !== targetVal) {
            globalStore.runtimeValve.targetOpening = targetVal;
            pushLog(`激发建模规则，指令下发：水阀目标开度调整至 ${targetVal}%`);
          }
          globalStore.runtimeValve.matchedRule = line;
          matchedAny = true;
          break;
        }
      } catch (e) {
        globalStore.runtimeValve.matchedRule = '文法解析异常，请检查语法结构';
      }
    }
  }
  if (!matchedAny) {
    globalStore.runtimeValve.matchedRule = '未匹配到任何边界规则，维持默认开度';
  }
};

watch(() => globalStore.runtimeValve.targetOpening, (newTarget) => {
  const interval = setInterval(() => {
    const cur = globalStore.runtimeValve.currentOpening;
    if (Math.abs(cur - newTarget) < 1) {
      globalStore.runtimeValve.currentOpening = newTarget;
      clearInterval(interval);
    } else {
      globalStore.runtimeValve.currentOpening += (newTarget - cur) > 0 ? 1 : -1;
    }
  }, 30);
});

onMounted(() => {
  runRuleEngine();
  pushLog('虚实交互核心决策控制链路初始化完毕');
});
</script>

<style scoped>
.control-center-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 0;
  min-width: 0;
  height: 100%;
  overflow: hidden;
  background-color: #0d1b2a;
}
.main-zone-top {
  display: flex;
  flex-shrink: 0;
  width: 100%;
}
.comp-wrapper-row {
  display: flex;
  width: 100%;
  gap: 12px;
}
.comp-wrapper-row > * {
  flex: 1;
}
.main-zone-middle {
  display: flex;
  flex: 1;
  gap: 0;
  min-height: 0;
  min-width: 0;
  width: 100%;
}
.main-zone-left, .main-zone-right {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-shrink: 0;
  overflow-y: auto;
  height: 100%;
}
.main-zone-bottom {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-shrink: 0;
  width: 100%;
}
.drag-handle-vertical {
  width: 10px;
  cursor: col-resize;
  background-color: transparent;
  transition: background-color 0.2s;
  z-index: 10;
  flex-shrink: 0;
}
.drag-handle-vertical:hover, .drag-handle-vertical:active {
  background-color: rgba(0, 180, 216, 0.4);
}
.drag-handle-horizontal {
  height: 10px;
  cursor: row-resize;
  background-color: transparent;
  transition: background-color 0.2s;
  z-index: 10;
  flex-shrink: 0;
  width: 100%;
}
.drag-handle-horizontal:hover, .drag-handle-horizontal:active {
  background-color: rgba(0, 180, 216, 0.4);
}
.main-zone-center {
  flex: 1;
  display: flex;
  min-width: 0;
  min-height: 0;
  background-color: #000000;
  border-radius: 6px;
  border: 1px solid #1b263b;
  overflow: hidden;
  position: relative;
}
.cesium-earth-container {
  width: 100%;
  height: 100%;
}
.comp-wrapper {
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.flex-1-panel {
  flex: 1;
}
.custom-panel {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.panel-title {
  font-size: 13px;
  font-weight: bold;
  color: #303133;
  border-bottom: 1px solid #f0f2f5;
  padding-bottom: 6px;
}
.sensor-sim-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.sim-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.sim-label-row {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #606266;
}
.sim-val {
  font-weight: bold;
  color: #1890ff;
}
.custom-slider {
  accent-color: #1890ff;
  cursor: pointer;
}
.code-editor-container {
  flex: 1;
  background-color: #1e1e1e;
  border-radius: 4px;
  padding: 8px;
  display: flex;
}
.rule-textarea {
  flex: 1;
  background: none;
  border: none;
  color: #a9b7c6;
  font-family: 'Courier New', Courier, monospace;
  font-size: 12px;
  resize: none;
  outline: none;
  line-height: 1.5;
}
.syntax-tip {
  font-size: 11px;
  color: #909399;
}
.map-interactive-overlay {
  position: absolute;
  top: 16px;
  right: 16px;
  pointer-events: none;
}
.valve-twin-card {
  width: 200px;
  background-color: rgba(13, 27, 42, 0.85);
  border: 1px solid #1b263b;
  border-radius: 6px;
  padding: 10px;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}
.twin-title {
  font-size: 12px;
  font-weight: bold;
  color: #00b4d8;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
  border-bottom: 1px solid #415a77;
  padding-bottom: 4px;
}
.pulse-dot {
  width: 8px;
  height: 8px;
  background-color: #67c23a;
  border-radius: 50%;
}
.twin-body p {
  font-size: 12px;
  margin: 4px 0;
  color: #e0e1dd;
}
.text-warn { color: #e6a23c; }
.text-success { color: #67c23a; }
.valve-visual-bar {
  height: 4px;
  background-color: #415a77;
  border-radius: 2px;
  margin-top: 6px;
  overflow: hidden;
}
.valve-progress {
  height: 100%;
  background-color: #67c23a;
  transition: width 0.1s linear;
}
.engine-diagnose-view {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 12px;
}
.diagnose-status {
  display: flex;
  gap: 8px;
}
.status-value {
  color: #67c23a;
}
.rule-match-track {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.track-title, .queue-title {
  color: #606266;
}
.matched-box {
  background-color: #f4f4f5;
  padding: 8px;
  border-radius: 4px;
  color: #303133;
  border-left: 3px solid #e6a23c;
  word-break: break-all;
}
.command-delivery-queue {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.log-stream {
  background-color: #fafafa;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  height: 160px;
  overflow-y: auto;
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.log-line {
  line-height: 1.4;
  color: #606266;
}
.log-time {
  color: #409eff;
  margin-right: 6px;
}
.font-num { font-family: 'Courier New', Courier, monospace; }
.font-mono { font-family: monospace; }
.font-bold { font-weight: bold; }
</style>