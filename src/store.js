import { reactive } from 'vue';

export const globalStore = reactive({
  currentPath: '/overview',
  sidebarVisible: true,
  controlState: {
    valveStates: {
      'b1111111-1111-1111-1111-111111111111': { mode: 'manual', isOpen: false }
    },
    rules: [
      {
        id: 'rule_default_1',
        content: "IF (AVG( ['a1111111-1111-1111-1111-111111111111'], ['a2222222-2222-2222-2222-222222222222'], ['a3333333-3333-3333-3333-333333333333'], ['a4444444-4444-4444-4444-444444444444'], ['a5555555-5555-5555-5555-555555555555'] ) > 0.3) THEN CLOSE ['b1111111-1111-1111-1111-111111111111']"
      }
    ],
    deviceCoordinates: {} 
  },
  systemMenus: [
    { id: 'nav-overview', label: '监管总览', path: '/overview', icon: '📊' },
    { id: 'nav-monitor', label: '实时监测', path: '/monitor', icon: '📡' },
    { id: 'nav-digital', label: '三维数字孪生', path: '/digital', icon: '🧊' },
    { id: 'nav-onemap', label: '一张图管理', path: '/onemap', icon: '🗺️' },
    { id: 'nav-control', label: '虚实交互控制', path: '/control', icon: '🎛️' },
    { id: 'nav-spatial', label: '时空数据管理', path: '/spatial', icon: '🌍' },
    { id: 'nav-report', label: '报表汇总', path: '/report', icon: '📑' }
  ],
  mapLayers: [
    { id: 'layer_boundary', name: '海域边界红线', visible: true, isBusiness: false },
    { id: 'layer_vector', name: '养殖区范围矢量', visible: true, isBusiness: false },
    { id: 'layer_devices', name: '监测设备点位', visible: true, isBusiness: false },
    { id: 'layer_heatmap', name: '风险预测热力图', visible: true, isBusiness: true }
  ],
  pageMenus: {
    '/overview': [
      {
        id: 'menu-operation', label: '牧场运行情况', open: true, visible: true,
        children: [
          { id: 't1', label: '海洋牧场概况', visible: true, x: 0, y: 0, w: 4, h: 4, type: 'card', props: { label: '总覆盖海域', value: '120', unit: 'km²', description: '较上季度', statusText: '持平', statusType: 'info' } },
          { id: 't2', label: '水质综合状态', visible: true, x: 4, y: 0, w: 5, h: 4, type: 'card', props: { label: '水质达标率', value: '98.5', unit: '%', description: '整体评估', statusText: '优良', statusType: 'up' } },
          { id: 't3', label: '牧场设备情况', visible: true, x: 9, y: 0, w: 6, h: 4, type: 'card', props: { label: '资产设备总数', value: '456', unit: '台', description: '新增部署', statusText: '↑ 12', statusType: 'up' } },
          { id: 't4', label: '预警信息提示', visible: true, x: 15, y: 0, w: 5, h: 4, type: 'card', props: { label: '当前活跃预警', value: '5', unit: '条', description: '高风险级别', statusText: '2 条', statusType: 'danger' } },
          { id: 't5', label: '养殖区分布', visible: true, x: 20, y: 0, w: 4, h: 4, type: 'card', props: { label: '规划养殖区', value: '18', unit: '个', description: '投产状态', statusText: '全部投产', statusType: 'up' } }
        ]
      },
      {
        id: 'menu-indicators', label: '核心指标面板', open: true, visible: true,
        children: [
          { id: 'l1', label: '设备在线状态', visible: true, x: 0, y: 4, w: 6, h: 4, type: 'card', props: { label: '设备在线率', value: '94.2', unit: '%', description: '离线设备', statusText: '26 台', statusType: 'down' } },
          { id: 'l2', label: '溶解氧分布', visible: true, x: 0, y: 8, w: 6, h: 8, type: 'pie', props: { title: '溶解氧浓度区间', chartData: [{ name: '丰富(>6)', value: 45 }, { name: '正常(4-6)', value: 30 }, { name: '偏低(<4)', value: 5 }] } },
          { id: 'l3', label: '温湿度实时曲线', visible: true, x: 0, y: 16, w: 6, h: 8, type: 'line', props: { title: '表层温湿度波动', xAxisData: ['08:00', '10:00', '12:00', '14:00'], seriesData: [{ name: '水温(℃)', data: [22.1, 23.5, 24.2, 23.8] }, { name: '湿度(%)', data: [75, 72, 68, 70] }] } }
        ]
      },
      {
        id: 'menu-alerts', label: '预警信息', open: true, visible: true,
        children: [
          { id: 'r1', label: '实时预警队列', visible: true, x: 18, y: 4, w: 6, h: 10, type: 'list', props: { title: '实时预警追踪', actionText: '处置', listData: [{ tagText: '低氧预警', statusType: 'danger', time: '14:20', title: '三号养殖区', descPrefix: '指标异常', descHighlight: '3.2 mg/L' }, { tagText: '设备异常', statusType: 'warning', time: '13:15', title: '主干通信网关', descPrefix: '通信异常', descHighlight: '延迟过高' }] } },
          { id: 'r2', label: '预警维度统计', visible: true, x: 18, y: 14, w: 6, h: 10, type: 'pie', props: { title: '本月风险类型统计', chartData: [{ name: '环境指标越界', value: 56 }, { name: '设备硬件故障', value: 23 }, { name: '通信链路异常', value: 12 }, { name: '人为活动入侵', value: 9 }] } }
        ]
      },
      {
        id: 'menu-trends', label: '指标趋势预测', open: true, visible: true,
        children: [
          { id: 'b1', label: '指标变化趋势', visible: true, x: 6, y: 18, w: 6, h: 6, type: 'line', props: { title: '核心水质指标多维时序曲线', xAxisData: ['周一', '周二', '周三', '周四', '周五'], seriesData: [{ name: '区域A溶解氧', data: [5.5, 6.2, 5.8, 6.5, 6.1] }, { name: '区域B溶解氧', data: [4.8, 5.1, 4.9, 5.3, 5.0] }] } },
          { id: 'b2', label: '风险预测估计', visible: true, x: 12, y: 18, w: 6, h: 6, type: 'line', props: { title: '全域风险指数回归预测', xAxisData: ['未来1天', '未来2天', '未来3天', '未来4天', '未来5天'], seriesData: [{ name: '自然环境风险', data: [0.12, 0.15, 0.22, 0.18, 0.14] }, { name: '设备损耗风险', data: [0.05, 0.06, 0.06, 0.07, 0.08] }] } }
        ]
      }
    ],
    '/monitor': [
      {
        id: 'monitor-core', label: '三维孪生控制台', open: true, visible: true,
        children: [
          { id: 'earth', label: '数字孪生底座', visible: true, i: 'earth', x: 6, y: 0, w: 12, h: 16, type: 'earth' }
        ]
      },
      {
        id: 'monitor-weather', label: '气象环境参数', open: true, visible: true,
        children: [
          { id: 'weather-1', label: '实时风速', visible: true, i: 'weather-1', x: 0, y: 0, w: 6, h: 3, type: 'card', props: { label: '海面风速', value: '12.4', unit: 'm/s', description: '风力等级', statusText: '6级强风', statusType: 'warning' } },
          { id: 'weather-2', label: '实时气温', visible: true, i: 'weather-2', x: 18, y: 0, w: 6, h: 3, type: 'card', props: { label: '表层气温', value: '26.5', unit: '℃', description: '较昨日', statusText: '↑ 1.2', statusType: 'up' } },
          { id: 'weather-3', label: '海面气压', visible: true, i: 'weather-3', x: 0, y: 3, w: 6, h: 3, type: 'card', props: { label: '大气压强', value: '1012', unit: 'hPa', description: '气压状态', statusText: '稳定', statusType: 'info' } },
          { id: 'water-1', label: '水质监测网络', visible: true, i: 'water-1', x: 0, y: 6, w: 6, h: 10, type: 'list', props: { title: '溶解氧与水温', actionText: '历史曲线', listData: [{ tagText: 'A区', statusType: 'success', time: '实时', title: 'A01号浮标', descPrefix: '溶解氧', descHighlight: '6.8 mg/L' }, { tagText: 'B区', statusType: 'warning', time: '实时', title: 'B04号浮标', descPrefix: '水温异常', descHighlight: '28.1 ℃' }] } }
        ]
      },
      {
        id: 'monitor-video', label: '现场视频安防', open: true, visible: true,
        children: [
          { id: 'video-1', label: '主航道监控', visible: true, i: 'video-1', x: 18, y: 3, w: 6, h: 7, type: 'video', props: { cameraName: '南侧主干航道球机' } },
          { id: 'video-2', label: '养殖区监控', visible: true, i: 'video-2', x: 18, y: 10, w: 6, h: 6, type: 'video', props: { cameraName: '一号网箱水下摄像' } }
        ]
      },
      {
        id: 'monitor-device', label: '基础设施状态', open: true, visible: true,
        children: [
          { id: 'device-1', label: '设备在线状态监测', visible: true, i: 'device-1', x: 6, y: 16, w: 6, h: 6, type: 'list', props: { title: '通信链路状态', listData: [{ tagText: '在线', statusType: 'success', title: '中央控制网关', descPrefix: '延时', descHighlight: '12ms' }, { tagText: '离线', statusType: 'danger', title: '北侧边缘计算节点', descPrefix: '断连时长', descHighlight: '2小时' }] } },
          { id: 'device-2', label: '核心机组运行参数', visible: true, i: 'device-2', x: 12, y: 16, w: 6, h: 6, type: 'card', props: { label: '主循环水泵', value: '85', unit: 'kW', description: '运行负荷', statusText: '高负载', statusType: 'warning' } }
        ]
      }
    ],
    '/digital': [
      {
        id: 'digital-core', label: '核心空间视图', open: true, visible: true,
        children: [
          { id: 'earth', label: '三维数字孪生底座', visible: true, x: 5, y: 0, w: 14, h: 27, type: 'earth' }
        ]
      },
      {
        id: 'digital-modeling', label: '单体设备建模', open: true, visible: true,
        children: [
          { id: 'dt-m1', label: '网箱建模', visible: true, x: 0, y: 0, w: 5, h: 3, type: 'action-card', props: { icon: '📦', name: '深水网箱主体', btnText: '建模' } },
          { id: 'dt-m2', label: '浮标建模', visible: true, x: 0, y: 3, w: 5, h: 3, type: 'action-card', props: { icon: '🛟', name: '水质监测浮标', btnText: '建模' } },
          { id: 'dt-m3', label: '传感器建模', visible: true, x: 0, y: 6, w: 5, h: 3, type: 'action-card', props: { icon: '🌡️', name: '多参数传感器', btnText: '建模' } },
          { id: 'dt-m4', label: '投喂机建模', visible: true, x: 0, y: 9, w: 5, h: 3, type: 'action-card', props: { icon: '⚙️', name: '智能投喂机', btnText: '建模' } },
          { id: 'dt-m5', label: '机器人建模', visible: true, x: 0, y: 12, w: 5, h: 3, type: 'action-card', props: { icon: '🤖', name: '水下巡检机器人', btnText: '建模' } }
        ]
      },
      {
        id: 'digital-field', label: '场剖分分析', open: true, visible: true,
        children: [
          { id: 'dt-f1', label: '物理场显隐控制', visible: true, x: 19, y: 0, w: 5, h: 7, type: 'field-control', props: { fields: [{ id: 'f_flow', name: '综合流场', visible: false }, { id: 'f_temp', name: '温盐场', visible: false }, { id: 'f_current', name: '洋流海流', visible: false }] } },
          { id: 'dt-f2', label: '剖切控制台', visible: true, x: 19, y: 7, w: 5, h: 9, type: 'sliders', props: { title: '六自由度空间剖切', sliders: [{ label: 'X轴平移', min: -100, max: 100, value: 0 }, { label: 'Y轴平移', min: -100, max: 100, value: 0 }, { label: 'Z轴平移', min: -100, max: 0, value: -10 }, { label: '俯仰角', min: -90, max: 90, value: 0 }, { label: '偏航角', min: -180, max: 180, value: 0 }, { label: '翻滚角', min: -180, max: 180, value: 0 }] } }
        ]
      },
      {
        id: 'digital-entity-mgmt', label: '孪生实体管理', open: true, visible: true,
        children: [
          {
            id: 'dt-tree', label: '实体显隐控制层级树', visible: true, x: 0, y: 15, w: 5, h: 12, type: 'entity-tree',
            props: {
              entities: [
                { id: 'e1', name: '1号深水网箱', visible: true, expanded: true, children: [{ id: 'c1', name: '三维高精模型', visible: true }, { id: 'c2', name: '周边流速矢量场', visible: true }, { id: 'c3', name: '水温分布栅格场', visible: false }] },
                { id: 'e2', name: '主干环境浮标', visible: true, expanded: false, children: [{ id: 'c4', name: '设备物理模型', visible: true }, { id: 'c5', name: '实时监测点位数据', visible: true }] },
                { id: 'e3', name: '海底巡检机器人', visible: false, expanded: false, children: [{ id: 'c6', name: '机器人骨骼模型', visible: false }, { id: 'c7', name: '历史巡检轨迹线', visible: false }, { id: 'c8', name: '实时视频流点', visible: false }] }
              ]
            }
          },
          {
            id: 'dt-attr', label: '实体属性信息', visible: true, x: 19, y: 16, w: 5, h: 11, type: 'entity-attr',
            props: {
              title: '1号深水网箱',
              attributes: [
                { key: '实体空间编码', value: 'CAGE-DW-001' },
                { key: '数字孪生类型', value: '生产设施实体' },
                { key: '三维空间坐标', value: '121.5E, 28.6N, -5M' },
                { key: '设计抗风浪等级', value: '14级强台风' },
                { key: '外围网衣材质', value: '超高分子量聚乙烯' },
                { key: '数据同步状态', value: '实时在线 (健康)', status: 'ok' }
              ]
            }
          }
        ]
      }
    ],
    '/control': [
      {
        id: 'control-core', label: '核心空间视图', open: true, visible: true,
        children: [
          { id: 'earth', label: '三维数字孪生底座', visible: true, x: 5, y: 0, w: 14, h: 20, type: 'earth' }
        ]
      },
      {
        id: 'control-stations', label: '观测站点实时曲线', open: true, visible: true,
        children: [
          { id: 'st1', label: '东海一号', visible: true, x: 0, y: 0, w: 5, h: 6, type: 'line', props: { deviceId: 'a1111111-1111-1111-1111-111111111111', title: '东海一号盐度(连接中...)', xAxisData: ['0h','4h','8h','12h','16h','20h','24h'], seriesData: [{name:'盐度(‰)', data:[0,0,0,0,0,0,0]}] } },
          { id: 'st2', label: '东海二号', visible: true, x: 0, y: 6, w: 5, h: 6, type: 'line', props: { deviceId: 'a2222222-2222-2222-2222-222222222222', title: '东海二号盐度(连接中...)', xAxisData: ['0h','4h','8h','12h','16h','20h','24h'], seriesData: [{name:'盐度(‰)', data:[0,0,0,0,0,0,0]}] } },
          { id: 'st3', label: '南海一号', visible: true, x: 0, y: 12, w: 5, h: 6, type: 'line', props: { deviceId: 'a3333333-3333-3333-3333-333333333333', title: '南海一号盐度(连接中...)', xAxisData: ['0h','4h','8h','12h','16h','20h','24h'], seriesData: [{name:'盐度(‰)', data:[0,0,0,0,0,0,0]}] } },
          { id: 'st4', label: '南海二号', visible: true, x: 19, y: 0, w: 5, h: 6, type: 'line', props: { deviceId: 'a4444444-4444-4444-4444-444444444444', title: '南海二号盐度(连接中...)', xAxisData: ['0h','4h','8h','12h','16h','20h','24h'], seriesData: [{name:'盐度(‰)', data:[0,0,0,0,0,0,0]}] } },
          { id: 'st5', label: '黄海一号', visible: true, x: 19, y: 6, w: 5, h: 6, type: 'line', props: { deviceId: 'a5555555-5555-5555-5555-555555555555', title: '黄海一号盐度(连接中...)', xAxisData: ['0h','4h','8h','12h','16h','20h','24h'], seriesData: [{name:'盐度(‰)', data:[0,0,0,0,0,0,0]}] } }
        ]
      },
      {
        id: 'control-action', label: '虚实交互设备与规则', open: true, visible: true,
        children: [
          { id: 'valve1', label: '主干道一号入水控制阀', visible: true, x: 19, y: 12, w: 5, h: 6, type: 'valve-control', props: { deviceId: 'b1111111-1111-1111-1111-111111111111', deviceName: '主干道一号入水控制阀' } },
          { id: 'rule1', label: '数字孪生关联规则引擎', visible: true, x: 5, y: 20, w: 14, h: 4, type: 'rule-editor', props: {} }
        ]
      }
    ],
    '/spatial': [
      {
        id: 'spatial-top', label: '数据概览指标', open: true, visible: true,
        children: [
          { id: 'sp-t1', label: '数据总量', visible: true, x: 0, y: 0, w: 5, h: 3, type: 'card', props: { label: '空间与业务数据总计', value: '28,560', unit: '条', description: '较上月', statusText: '↑ 12.6%', statusType: 'up' } },
          { id: 'sp-t2', label: '空间数据', visible: true, x: 5, y: 0, w: 5, h: 3, type: 'card', props: { label: '矢量与栅格数据', value: '15,230', unit: '条', description: '较上月', statusText: '↑ 10.3%', statusType: 'up' } },
          { id: 'sp-t3', label: '时序数据', visible: true, x: 10, y: 0, w: 4, h: 3, type: 'card', props: { label: '传感器物联网数据', value: '8,650', unit: '条', description: '较上月', statusText: '↑ 15.7%', statusType: 'up' } },
          { id: 'sp-t4', label: '数据服务', visible: true, x: 14, y: 0, w: 5, h: 3, type: 'card', props: { label: '已发布对外接口', value: '186', unit: '个', description: '较上月', statusText: '↑ 8.1%', statusType: 'up' } },
          { id: 'sp-t5', label: '使用量', visible: true, x: 19, y: 0, w: 5, h: 3, type: 'card', props: { label: 'API月度调用总计', value: '56,892', unit: '次', description: '较上月', statusText: '↑ 13.4%', statusType: 'up' } }
        ]
      },
      {
        id: 'spatial-middle', label: '核心数据管理', open: true, visible: true,
        children: [
          { id: 'sp-m1', label: '数据资源目录树', visible: true, x: 0, y: 3, w: 4, h: 14, type: 'tree-catalog' },
          { id: 'sp-m2', label: '本地数据与在线数据库台账', visible: true, x: 4, y: 3, w: 14, h: 14, type: 'data-table' },
          { id: 'sp-m3', label: '数据详情与空间预览', visible: true, x: 18, y: 3, w: 6, h: 14, type: 'data-details' }
        ]
      },
      {
        id: 'spatial-bottom', label: '统计与服务', open: true, visible: true,
        children: [
          { id: 'sp-b1', label: '数据服务能力集成接口', visible: true, x: 0, y: 17, w: 8, h: 9, type: 'service-cards' },
          { id: 'sp-b2', label: '数据使用统计分析', visible: true, x: 8, y: 17, w: 10, h: 9, type: 'line', props: { title: '数据使用时序统计(近7天)', xAxisData: ['05-26', '05-27', '05-28', '05-29', '05-30', '05-31', '06-01'], seriesData: [{ name: '接口访问量', data: [5000, 7000, 6500, 8000, 7500, 9000, 8500] }, { name: '资源下载量', data: [2000, 3000, 2500, 3500, 3000, 4000, 3800] }] } },
          { id: 'sp-b3', label: '资源入库类型分布', visible: true, x: 18, y: 17, w: 6, h: 9, type: 'pie', props: { title: '数据库台账类型占比', chartData: [{ name: '矢量数据', value: 6523 }, { name: '栅格数据', value: 4860 }, { name: '时序数据', value: 8650 }, { name: '影像数据', value: 5230 }, { name: '业务数据', value: 3297 }] } }
        ]
      }
    ],
    '/onemap': [
      // 新增：将图层控制和地球注册到二级菜单数据源中
      {
        id: 'onemap-core', label: '核心空间视图', open: true, visible: true,
        children: [
          { id: 'layer-control', label: '图层与空间控制', visible: true, x: 0, y: 0, w: 5, h: 12, type: 'layer-control' },
          { id: 'earth', label: '三维数字孪生视图', visible: true, x: 5, y: 0, w: 14, h: 16, type: 'earth' }
        ]
      },
      {
        id: 'onemap-top', label: '养殖区管理', open: true, visible: true,
        children: [
          { id: 'om-t1', label: '养殖区名称', visible: true, x: 0, y: 12, w: 5, h: 4, type: 'card', props: { label: '当前核心监测海域', value: '大陈岛一号区', unit: '', description: '空间编码', statusText: 'DC-01', statusType: 'info' } },
          { id: 'om-t2', label: '海域面积', visible: true, x: 0, y: 16, w: 5, h: 4, type: 'card', props: { label: '规范确权海域面积', value: '84.5', unit: '公顷', description: '界址点位置', statusText: '已锁定', statusType: 'up' } },
          { id: 'om-t3', label: '集约类型', visible: true, x: 0, y: 20, w: 5, h: 4, type: 'card', props: { label: '集约化养殖类型', value: '钢质重力式网箱', unit: '', description: '抗风浪等级', statusText: '12级强台风', statusType: 'up' } },
          { id: 'om-t4', label: '产权权属', visible: true, x: 19, y: 0, w: 5, h: 4, type: 'card', props: { label: '海域所有权属人', value: '现代牧场股份', unit: '', description: '不动产证号', statusText: '浙海证第002号', statusType: 'info' } },
          { id: 'om-t5', label: '养殖信息', visible: true, x: 19, y: 4, w: 5, h: 4, type: 'card', props: { label: '当前在养主要生物', value: '高体鰤/拟穴青蟹', unit: '', description: '投苗总存栏量', statusText: '85万尾', statusType: 'up' } }
        ]
      },
      {
        id: 'onemap-bottom', label: '监测点与设备管理', open: true, visible: true,
        children: [
          { id: 'om-b1', label: '综合运行状态', visible: true, x: 19, y: 8, w: 5, h: 4, type: 'card', props: { label: '感知网络终端在线率', value: '97.4', unit: '%', description: '数据报文丢包率', statusText: '0.02%', statusType: 'up' } },
          { id: 'om-b2', label: '工作船只定位监控', visible: true, x: 19, y: 12, w: 5, h: 12, type: 'video', props: { cameraName: '智能自动投喂无人船甲板机位' } },
          { id: 'om-b3', label: '多传感器时序曲线', visible: true, x: 5, y: 16, w: 7, h: 8, type: 'line', props: { title: '物联网传感器24小时环境监控', xAxisData: ['04:00', '08:00', '12:00', '16:00'], seriesData: [{ name: '溶解氧(mg/L)', data: [6.8, 6.2, 5.9, 6.4] }, { name: '盐度(‰)', data: [31.2, 31.1, 31.4, 31.3] }] } },
          { id: 'om-b4', label: '自动调控生产终端', visible: true, x: 12, y: 16, w: 7, h: 8, type: 'list', props: { title: '自主运行调控设备清单', actionText: '指令统发', listData: [{ tagText: '变频增氧', statusType: 'success', time: '高能效', title: '深层叶轮增氧机组', descPrefix: '瞬时功率', descHighlight: '5.5kW' }, { tagText: '精密投喂', statusType: 'warning', time: '抛撒中', title: '中央气动下料系统', descPrefix: '下料频率', descHighlight: '20kg/min' }] } }
        ]
      }
    ],
    '/report': [
      {
        id: 'group-statistical',
        label: '统计报告',
        open: true,
        visible: true,
        children: [
          { id: 'rep-data', label: '数据统计报表', visible: true, x: 0, y: 0, w: 12, h: 14, type: 'statistical-report', props: { reportType: 'data' } },
          { id: 'rep-device', label: '设备统计报表', visible: true, x: 12, y: 0, w: 12, h: 14, type: 'statistical-report', props: { reportType: 'device' } }
        ]
      },
      {
        id: 'group-special',
        label: '专题报告',
        open: true,
        visible: true,
        children: [
          { id: 'rep-risk', label: '风险评估报告', visible: true, x: 0, y: 14, w: 12, h: 14, type: 'special-report', props: { reportType: 'risk' } },
          { id: 'rep-control', label: '调控决策报告', visible: true, x: 12, y: 14, w: 12, h: 14, type: 'special-report', props: { reportType: 'control' } }
        ]
      }
    ]
  }
});