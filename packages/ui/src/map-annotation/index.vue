<script lang="ts" setup>
import { onMounted } from 'vue';
import { MapClass } from '@bcc/utils';

// 地图实例
let M: any;
// 地图工具类
const MapUtils: MapClass = new MapClass();

onMounted(() => {
  M = MapUtils.Init('map', [116.22858, 40.07734], 16);
  console.log(M);
});
</script>

<template>
  <div class="map-annotation">
    <div id="map"></div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
