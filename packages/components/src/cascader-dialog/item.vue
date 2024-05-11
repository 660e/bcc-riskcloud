<script lang="ts" name="cascader-item" setup>
defineProps<{ data: any }>();
</script>

<template>
  <ul>
    <li v-for="(item, index) in data" :key="index">{{ item.label }}</li>
  </ul>
</template>
