<template>
  <div class="responsive-horizontal-menu">
    <div 
      v-for="item in items" 
      :key="item.id" 
      class="menu-item" 
      :class="{ active: modelValue === item.id }"
      @click="$emit('update:modelValue', item.id)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script setup>
defineProps(['items', 'modelValue']);
defineEmits(['update:modelValue']);
</script>

<style scoped>
.responsive-horizontal-menu { container-type: size; display: flex; flex-wrap: wrap; align-items: center; width: 100%; height: 100%; overflow-x: auto; overflow-y: hidden; scrollbar-width: none; gap: clamp(8px, 2cqw, 24px); padding: 0 clamp(8px, 4cqw, 40px); box-sizing: border-box; }
.responsive-horizontal-menu::-webkit-scrollbar { display: none; }
.menu-item { display: flex; align-items: center; justify-content: center; cursor: pointer; color: #606266; font-size: clamp(13px, 4cqw, 15px); border-bottom: 2px solid transparent; transition: all 0.2s; font-weight: 500; height: 100%; min-height: 36px; white-space: nowrap; }
.menu-item:hover { color: #409eff; }
.menu-item.active { color: #409eff; border-bottom-color: #409eff; font-weight: bold; }
</style>