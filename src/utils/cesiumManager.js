
// import * as Cesium from 'cesium';

// // 全局唯一的实例
// let viewer = null;
// let cesiumContainer = null;

// // 核心：维护一个借用者栈 (LIFO 后进先出)
// const hostStack = []; 

// function init() {
//   if (!cesiumContainer) {
//     cesiumContainer = document.createElement('div');
//     cesiumContainer.style.width = '100%';
//     cesiumContainer.style.height = '100%';
//     cesiumContainer.style.position = 'absolute'; 
//     cesiumContainer.style.top = '0';
//     cesiumContainer.style.left = '0';
//     cesiumContainer.style.pointerEvents = 'auto'; // 确保交互正常
    
//     // 初始化时仅创建，不挂载到 body，由组件按需借用
//     viewer = new Cesium.Viewer(cesiumContainer, {
//       animation: false, timeline: false, infoBox: false, selectionIndicator: false,
//       baseLayerPicker: false, navigationHelpButton: false, homeButton: false,
//       fullscreenButton: false, geocoder: false, sceneModePicker: false
//     });
//     viewer.cesiumWidget.creditContainer.style.display = 'none';
//   }
// }

// // 供页面“借用”地球的方法
// export function borrowCesium(targetElement) {
//   init();
//   if (!targetElement) return;

//   // 1. 如果这个 DOM 已经在栈里，先移除，保证它被排到队伍的最末尾（拥有最高优先级）
//   const index = hostStack.indexOf(targetElement);
//   if (index > -1) hostStack.splice(index, 1);
  
//   // 2. 登记新的借用者
//   hostStack.push(targetElement);
  
//   // 3. 把地球容器挪给最新的借用者
//   targetElement.appendChild(cesiumContainer);
  
//   // 4. 强制触发重绘，防止尺寸错乱黑屏
//   requestAnimationFrame(() => {
//     if(viewer) {
//       viewer.resize();
//       viewer.scene.requestRender();
//     }
//   });
// }

// // 供页面“归还”地球的方法
// export function returnCesium(targetElement) {
//   // 1. 借用者使用完毕，将自己从队伍中除名
//   const index = hostStack.indexOf(targetElement);
//   if (index > -1) {
//     hostStack.splice(index, 1);
//   }

//   // 2. 看看队伍里还有没有其他老借用者（比如 App.vue）
//   if (hostStack.length > 0) {
//     // 自动把地球归还给上一个借用者
//     const previousHost = hostStack[hostStack.length - 1];
//     previousHost.appendChild(cesiumContainer);
    
//     // 触发重绘
//     requestAnimationFrame(() => {
//       if(viewer) {
//         viewer.resize();
//         viewer.scene.requestRender();
//       }
//     });
//   } else {
//     // 真的没人用了，就随便扔在 body 里（防止被 Vue 销毁）
//     if (cesiumContainer && cesiumContainer.parentNode) {
//       document.body.appendChild(cesiumContainer);
//     }
//   }
// }

// // 保留此方法供需要直接获取 viewer 实例的逻辑使用
// export function getGlobalCesium() {
//     init();
//     return { viewer, cesiumContainer };
// }


import * as Cesium from 'cesium';

let viewer = null;
let cesiumContainer = null;
const hostStack = []; 

function init() {
  if (!cesiumContainer) {
    cesiumContainer = document.createElement('div');
    cesiumContainer.style.width = '100%';
    cesiumContainer.style.height = '100%';
    cesiumContainer.style.position = 'absolute'; 
    cesiumContainer.style.top = '0';
    cesiumContainer.style.left = '0';
    cesiumContainer.style.pointerEvents = 'auto';
    
    viewer = new Cesium.Viewer(cesiumContainer, {
      animation: false, timeline: false, infoBox: false, selectionIndicator: false,
      baseLayerPicker: false, navigationHelpButton: false, homeButton: false,
      fullscreenButton: false, geocoder: false, sceneModePicker: false
    });
    viewer.cesiumWidget.creditContainer.style.display = 'none';
  }
}

export function borrowCesium(targetElement) {
  init();
  if (!targetElement) return;

  const index = hostStack.indexOf(targetElement);
  if (index > -1) hostStack.splice(index, 1);
  
  hostStack.push(targetElement);
  targetElement.appendChild(cesiumContainer);
  
  requestAnimationFrame(() => {
    if(viewer) {
      viewer.resize();
      viewer.scene.requestRender();
    }
  });
}

export function returnCesium(targetElement) {
  const index = hostStack.indexOf(targetElement);
  if (index > -1) {
    hostStack.splice(index, 1);
  }

  if (hostStack.length > 0) {
    const previousHost = hostStack[hostStack.length - 1];
    previousHost.appendChild(cesiumContainer);
    
    requestAnimationFrame(() => {
      if(viewer) {
        viewer.resize();
        viewer.scene.requestRender();
      }
    });
  } else {
    if (cesiumContainer && cesiumContainer.parentNode) {
      // document.body.appendChild(cesiumContainer);
      cesiumContainer.remove();
    }
  }
}

export function getGlobalCesium() {
    init();
    return { viewer, cesiumContainer };
}