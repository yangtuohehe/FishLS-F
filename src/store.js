import { reactive } from 'vue';

export const globalStore = reactive({
  currentPath: '/overview',
  systemMenus: [
    { id: 'nav-overview', label: '监管总览', path: '/overview', icon: '📊' },
    { id: 'nav-monitor', label: '实时监测', path: '/monitor', icon: '📡' },
    { id: 'nav-digital', label: '三维数字孪生', path: '/digital', icon: '🧊' },
    { id: 'nav-onemap', label: '一张图管理', path: '/onemap', icon: '🗺️' },
    { id: 'nav-control', label: '虚实交互控制', path: '/control', icon: '🎛️' }
  ],
  mapLayers: [
    { id: 'layer_buoy', name: '水质监测浮标', visible: true },
    { id: 'layer_valve', name: '智能执行水阀', visible: true },
    { id: 'layer_camera', name: '视频监控矩阵', visible: true },
    { id: 'layer_cage', name: '养殖网箱区域', visible: false },
    { id: 'layer_terrain', name: '海底地形洋流', visible: false }
  ],
  // 新增：物联网环境模拟传感器流
  runtimeSensors: {
    dissolvedOxygen: 5.5,
    waterTemp: 24.0,
    ammoniaNitrogen: 0.05
  },
  // 新增：水阀孪生实体运行时状态
  runtimeValve: {
    deviceId: 'VALVE_001',
    deviceName: '一号主干道进水阀',
    controlMode: 'AUTO_RULE',
    currentOpening: 20.0,
    targetOpening: 20.0,
    matchedRule: '系统默认低耗运行规则'
  },
  // 新增：手动构建的规则语言脚本源码
  ruleScriptSource: `// 海洋牧场水阀空间调控脚本
IF dissolvedOxygen < 4.5 AND waterTemp > 26.0 THEN targetOpening = 90
IF ammoniaNitrogen > 0.15 THEN targetOpening = 100
IF dissolvedOxygen >= 4.5 AND ammoniaNitrogen <= 0.15 THEN targetOpening = 20`,
  pageMenus: {
    '/overview': [
      {
        id: 'view', label: '监督总览面板控制', open: true,
        children: [
          { id: 't1', label: '顶部第一行: 养殖区数量', visible: true, zone: 'top1', type: 'card', props: { label: '养殖区数量', value: '12', unit: '个', description: '较昨日', statusText: '↑ 2', statusType: 'up' } },
          { id: 't2', label: '顶部第一行: 网箱数量', visible: true, zone: 'top1', type: 'card', props: { label: '网箱数量', value: '186', unit: '口', description: '较昨日', statusText: '↑ 5', statusType: 'up' } },
          { id: 't3', label: '顶部第一行: 监测点数量', visible: true, zone: 'top1', type: 'card', props: { label: '监测点数量', value: '98', unit: '个', description: '较昨日', statusText: '↑ 3', statusType: 'up' } },
          { id: 't4', label: '顶部第二行: 在线设备率', visible: true, zone: 'top2', type: 'card', props: { label: '在线设备率', value: '90.2', unit: '%', description: '较昨日', statusText: '↑ 1.2%', statusType: 'up' } },
          { id: 't5', label: '顶部第二行: 当前预警数', visible: true, zone: 'top2', type: 'card', props: { label: '当前预警数', value: '8', unit: '条', description: '较昨日', statusText: '↑ 3', statusType: 'down' } },
          { id: 'l1', label: '左侧: 设备在线率', visible: true, zone: 'left', type: 'pie', props: { title: '设备在线率', chartData: [{name: '在线', value: 231}, {name: '离线', value: 18}, {name: '故障', value: 7}] } },
          { id: 'l2', label: '左侧: 风险等级分布', visible: true, zone: 'left', type: 'pie', props: { title: '风险等级分布', chartData: [{name: '高风险', value: 2}, {name: '较高风险', value: 3}, {name: '中风险', value: 4}, {name: '低风险', value: 3}] } },
          { id: 'l3', label: '左侧: 水质达标评估', visible: true, zone: 'left', type: 'pie', props: { title: '水质达标评估', chartData: [{name: 'Ⅰ类', value: 45}, {name: 'Ⅱ类', value: 30}, {name: 'Ⅲ类', value: 20}, {name: '劣Ⅴ类', value: 5}] } },
          { id: 'r1', label: '右侧: 当前预警', visible: true, zone: 'right', type: 'list', props: { title: '当前预警', actionText: '查看更多', footerText: '查看全部预警', listData: [{ tagText: '低氧预警', statusType: 'danger', time: '06-01 08:30', title: '养殖区 3', descPrefix: '溶解氧', descHighlight: '4.25 mg/L' }, { tagText: '设备异常', statusType: 'warning', time: '06-01 07:45', title: '监测点A08', descPrefix: '浮标设备离线' }] } },
          { id: 'r2', label: '右侧: 待办事项', visible: true, zone: 'right', type: 'list', props: { title: '待办事项', actionText: '更多', listData: [{ showIcon: true, statusType: 'danger', title: '低氧预警处置', descPrefix: '养殖区3 溶解氧低于阈值', badgeText: '2' }, { showIcon: true, statusType: 'warning', title: '设备故障处理', descPrefix: '监测点A08 浮标设备离线', badgeText: '1' }] } },
          { id: 'b1', label: '底部第一行: 溶解氧趋势', visible: true, zone: 'bottom1', type: 'line', props: { title: '溶解氧变化趋势(mg/L)', xAxisData: ['00:00', '06:00', '12:00', '18:00'], seriesData: [{name: '养殖区A', data: [6.5, 7.2, 6.8, 7.5]}, {name: '养殖区B', data: [5.5, 6.0, 5.8, 6.2]}] } },
          { id: 'b2', label: '底部第一行: 水温变化趋势', visible: true, zone: 'bottom1', type: 'line', props: { title: '水温变化趋势(°C)', xAxisData: ['00:00', '06:00', '12:00', '18:00'], seriesData: [{name: '养殖区A', data: [24, 25, 26, 25]}, {name: '养殖区B', data: [23, 24, 25, 24]}] } },
          { id: 'b3', label: '底部第二行: 预警数量统计', visible: true, zone: 'bottom2', type: 'stacked-bar', props: { title: '预警数量趋势', unit: '条', xAxisData: ['05-26', '05-27', '05-28', '06-29', '05-30'], seriesData: [{name: '其他', color: '#409eff', data: [2, 3, 3, 2, 3]}, {name: '低氧预警', color: '#f56c6c', isTop: true, data: [4, 5, 7, 5, 6]}] } }
        ]
      }
    ],
    '/monitor': [
      {
        id: 'monitor_view', label: '实时监测面板控制', open: true,
        children: [
          { id: 'm_t1', label: '顶部第一行: 水质监测点', visible: true, zone: 'top1', type: 'card', props: { label: '水质监测点', value: '98', unit: '个', description: '在线', statusText: '92 个', statusType: 'up' } },
          { id: 'm_t2', label: '顶部第一行: 气象监测点', visible: true, zone: 'top1', type: 'card', props: { label: '气象监测点', value: '56', unit: '个', description: '更新时间', statusText: '10:30', statusType: 'info' } },
          { id: 'm_t3', label: '顶部第二行: 视频监控设备', visible: true, zone: 'top2', type: 'card', props: { label: '视频监控设备', value: '231', unit: '台', description: '在线率', statusText: '90.2%', statusType: 'up' } },
          { id: 'm_t4', label: '顶部第二行: 今日告警', visible: true, zone: 'top2', type: 'card', props: { label: '今日告警', value: '8', unit: '条', description: '待处理', statusText: '3 条', statusType: 'danger' } },
          { id: 'm_t5', label: '顶部第二行: 在线设备', visible: true, zone: 'top2', type: 'card', props: { label: '在线设备', value: '256', unit: '台', description: '在线率', statusText: '90.2%', statusType: 'up' } },
          { id: 'm_l1', label: '左侧: 水质实时监测', visible: true, zone: 'left', type: 'list', props: { title: '水质实时监测', listData: [{ title: '溶解氧', descPrefix: '6.25 mg/L', statusType: 'primary' }, { title: '水温', descPrefix: '24.8 °C', statusType: 'primary' }] } },
          { id: 'm_cb1', label: '中下: 设备状态', visible: true, zone: 'center-bottom', type: 'pie', props: { title: '设备状态', chartData: [{name: '正常', value: 198}, {name: '离线', value: 32}, {name: '故障', value: 18}] } },
          { id: 'm_r1', label: '右侧: 实时告警', visible: true, zone: 'right', type: 'list', props: { title: '实时告警', actionText: '查看更多', listData: [{ tagText: '严重', statusType: 'danger', time: '10:28', title: '养殖区C-05', descPrefix: '溶解氧过低 3.2 mg/L' }] } },
          { id: 'm_r2', label: '右侧: 实时监控视频', visible: true, zone: 'right', type: 'video', props: { cameraName: '养殖区A-01号摄像头' } }
        ]
      }
    ],
    '/digital': [],
    '/onemap': [
      {
        id: 'onemap_view', label: '一张图图层控制', open: true,
        children: [
          { id: 'map_t1', label: '顶部第一行: 资产总数', visible: true, zone: 'top1', type: 'card', props: { label: '海域资产总数', value: '542', unit: '项', description: '覆盖面积', statusText: '120 km²', statusType: 'info' } },
          { id: 'map_t2', label: '顶部第二行: 预警区域', visible: true, zone: 'top2', type: 'card', props: { label: '当前预警区域', value: '3', unit: '个', description: '处理中', statusText: '1 个', statusType: 'danger' } },
          { id: 'map_l1', label: '左侧: 空间资源分布', visible: true, zone: 'left', type: 'pie', props: { title: '空间资源分布', chartData: [{name: '养殖用海', value: 320}, {name: '生态红线', value: 150}, {name: '航道占用', value: 72}] } },
          { id: 'map_l2', label: '左侧: 图层数据统计', visible: true, zone: 'left', type: 'bar', props: { title: '图层数据统计(个)', categories: ['监测点', '执行阀', '网箱区', '视频点'], values: [98, 45, 12, 24] } },
          { id: 'map_l3', label: '左侧: 空间快捷查询', visible: true, zone: 'left', type: 'query', props: { title: '空间快捷查询', placeholders: '输入设备名称或编号', tags: ['全部', '站点', '水阀', '告警中'] } },
          { id: 'map_r1', label: '右侧: 区域动态报表', visible: true, zone: 'right', type: 'list', props: { title: '区域动态报表', actionText: '刷新', listData: [{ tagText: '新增', statusType: 'primary', time: '14:20', title: '三号标段', descPrefix: '设施部署完毕' }] } },
          { id: 'map_r2', label: '右侧: 预警类型分布', visible: true, zone: 'right', type: 'pie', props: { title: '预警类型分布', chartData: [{name: '水质超标', value: 5}, {name: '设备离线', value: 3}, {name: '电压过低', value: 2}] } },
          { id: 'map_b1', label: '底部第一行: 流量监控', visible: true, zone: 'bottom1', type: 'line', props: { title: '海域航行器流量', xAxisData: ['周一', '周二', '周三'], seriesData: [{name: '商船', data: [45, 52, 48]}, {name: '渔船', data: [120, 135, 110]}] } }
        ]
      }
    ],
    '/control': [
      {
        id: 'ctrl_view', label: '虚实交互与调控面板', open: true,
        children: [
          { id: 'c_t1', label: '核心受控对象', visible: true, zone: 'top', type: 'card' },
          { id: 'c_l1', label: '环境感知要素', visible: true, zone: 'left', type: 'env_sensor' },
          { id: 'c_l2', label: '控制规则编译', visible: true, zone: 'left', type: 'rule_editor' },
          { id: 'c_r1', label: '决策控制引擎', visible: true, zone: 'right', type: 'engine_monitor' }
        ]
      }
    ]
  }
});