import { createRouter, createWebHistory } from 'vue-router';
import Overview from '../views/Overview.vue';
import RealtimeMonitor from '../views/RealtimeMonitor.vue';
import OneMap from '../views/OneMap.vue';
import ControlCenter from '../views/ControlCenter.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/overview' },
    { path: '/overview', component: Overview },
    { path: '/monitor', component: RealtimeMonitor },
    { path: '/onemap', component: OneMap },
    { path: '/control', component: ControlCenter }
  ]
});

export default router;