import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium'

export default defineConfig({
  plugins: [vue(), cesium()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 指向你的 Spring Boot 后端地址
        changeOrigin: true
      }
    }
  }
})