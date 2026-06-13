import { createRouter, createWebHistory } from 'vue-router';
import Overview from '../views/Overview.vue';
import OneMap from '../views/OneMap.vue';
import ControlCenter from '../views/ControlCenter.vue';
import RealtimeMonitor from '../views/RealtimeMonitor.vue';
import DigitalTwin from '../views/DigitalTwin.vue';
import SpatialData from '../views/SpatialData.vue';



const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/overview' },
    { path: '/overview', component: Overview },
    { path: '/monitor', component: RealtimeMonitor },
    { path: '/onemap', component: OneMap },
    { path: '/control', component: ControlCenter },
    { path: '/digital', name: 'DigitalTwin',component: DigitalTwin },
    { path: '/spatial', component: SpatialData },
  ]
});

export default router;