<script lang="ts" setup>
import { watch } from 'vue';
import { MapClass } from '@bcc/utils';

const $props = defineProps<{ data: any }>();
watch(
  () => $props.data,
  data => {
    console.log(data);

    MapUtils.Init('map', [104.06333, 30.66125], 10);
  }
);

// 地图实例
// let M: any;
// 地图工具类
const MapUtils: MapClass = new MapClass();
</script>

<template>
  <div class="one-picture">
    <div id="map"></div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
