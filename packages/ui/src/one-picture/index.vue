<script lang="ts" setup>
import { watch } from 'vue';
import { MapClass } from '@bcc/utils';

const $props = defineProps<{ city: string }>();
watch(
  () => $props.city,
  async city => {
    if (city) {
      const administrative: any = await MapUtils.AdministrativeDivision({
        searchWord: city,
        searchType: 1,
        needSubInfo: true,
        needAll: true,
        needPolygon: true
      });

      if (administrative.length) {
        console.log(administrative[0]);
        MapUtils.Init('map', [administrative[0].lnt, administrative[0].lat], 10);
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
