<script lang="ts" setup>
import { onMounted } from 'vue';
import { T, MapClass } from '@bcc/utils';
import points from '../assets/points.json';

onMounted(() => {
  const MapUtils: MapClass = new MapClass();
  const lnglats: any[] = points.map((point: number[]) => MapUtils.LngLat([point[0], point[1]]));
  const M: any = MapUtils.Init('map', [108.95, 34.27], 6);
  M.addOverLay(new T.CloudMarkerCollection(lnglats));
});
</script>

<template>
  <div class="cloud-marker-collection">
    <div id="map"></div>
  </div>
</template>

<style lang="scss" scoped>
@import '@bcc/utils';
@import './index.scss';
</style>
