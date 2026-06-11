// import * as Cesium from 'cesium';

// let viewer = null;
// let cesiumContainer = null;

// export function getGlobalCesium() {
//   if (!viewer) {
//     cesiumContainer = document.createElement('div');
//     cesiumContainer.style.width = '100%';
//     cesiumContainer.style.height = '100%';
//     viewer = new Cesium.Viewer(cesiumContainer, {
//       animation: false,
//       timeline: false,
//       infoBox: false,
//       selectionIndicator: false,
//       baseLayerPicker: false,
//       navigationHelpButton: false,
//       homeButton: false,
//       fullscreenButton: false,
//       geocoder: false,
//       sceneModePicker: false
//     });
//     viewer.cesiumWidget.creditContainer.style.display = 'none';
//   }
//   return { viewer, cesiumContainer };
// }

import * as Cesium from 'cesium';

// 全局唯一的实例
let viewer = null;
let cesiumContainer = null;

// 初始化函数：只会在内存里创建一次
function init() {
  if (!cesiumContainer) {
    cesiumContainer = document.createElement('div');
    cesiumContainer.style.width = '100%';
    cesiumContainer.style.height = '100%';
    cesiumContainer.style.position = 'relative'; // 确保相对定位
    
    // 永远挂载在 body 上，Vue 销毁页面时碰不到它
    document.body.appendChild(cesiumContainer);
    
    viewer = new Cesium.Viewer(cesiumContainer, {
      animation: false, timeline: false, infoBox: false, selectionIndicator: false,
      baseLayerPicker: false, navigationHelpButton: false, homeButton: false,
      fullscreenButton: false, geocoder: false, sceneModePicker: false
    });
    viewer.cesiumWidget.creditContainer.style.display = 'none';
  }
}

// 供页面“借用”地球的方法
export function borrowCesium(targetElement) {
  init();
  if (targetElement) {
    // 1. 把容器挪到当前页面的占位符里
    targetElement.appendChild(cesiumContainer);
    // 2. 强制触发重绘
    requestAnimationFrame(() => {
      viewer.resize();
      viewer.scene.requestRender();
    });
  }
}

// 供页面“归还”地球的方法
export function returnCesium() {
  if (cesiumContainer && cesiumContainer.parentNode) {
    // 移出 DOM，放回 body 缓存
    document.body.appendChild(cesiumContainer);
  }
}

export function getGlobalCesium() {
    init();
    return { viewer, cesiumContainer };
}