import { createRouter, createWebHistory } from 'vue-router';
import Overview from '../views/Overview.vue';
import RealtimeMonitor from '../views/RealtimeMonitor.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/overview' },
    { path: '/overview', component: Overview },
    { path: '/monitor', component: RealtimeMonitor }
  ]
});

export default router;