import * as Cesium from 'cesium';

let viewer = null;
let cesiumContainer = null;

export function getGlobalCesium() {
  if (!viewer) {
    cesiumContainer = document.createElement('div');
    cesiumContainer.style.width = '100%';
    cesiumContainer.style.height = '100%';
    viewer = new Cesium.Viewer(cesiumContainer, {
      animation: false,
      timeline: false,
      infoBox: false,
      selectionIndicator: false,
      baseLayerPicker: false,
      navigationHelpButton: false,
      homeButton: false,
      fullscreenButton: false,
      geocoder: false,
      sceneModePicker: false
    });
    viewer.cesiumWidget.creditContainer.style.display = 'none';
  }
  return { viewer, cesiumContainer };
}