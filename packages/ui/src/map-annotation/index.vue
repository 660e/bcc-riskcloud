<script lang="ts" setup>
import { onMounted } from 'vue';
import { Map, TDTMarker } from '@bcc/utils';

let M: any;
const markers: TDTMarker[] = [
  { lnglat: [116.22808, 40.07779], type: 'primary' },
  { lnglat: [116.22918, 40.07811], type: 'success' },
  { lnglat: [116.22801, 40.07698], type: 'warning' },
  { lnglat: [116.23013, 40.07778], type: 'danger' }
];

onMounted(() => {
  const MapClass = new Map({
    el: 'map',
    center: [116.22909, 40.07757],
    zoom: 18
  });
  M = MapClass.init();

  markers.forEach(marker => M.addOverLay(MapClass.marker(marker)));
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
