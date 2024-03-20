<script lang="ts" setup>
import { watch } from 'vue';
import { MapClass } from '@bcc/utils';

const $props = defineProps<{ code: any }>();
watch(
  () => $props.code,
  async code => {
    if (code) {
      const administrative: any = await MapUtils.AdministrativeDivision(code);

      if (administrative) {
        console.log(administrative);
        MapUtils.Init('map', [administrative.lnt, administrative.lat], 10);
      }
    }
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
