<script lang="ts" setup>
import { onMounted } from 'vue';
import { T, MarkerIconPrimary, MarkerIconSuccess, MarkerIconWarning, MarkerIconDanger } from '@bcc/utils';

let M: any;

const markers = [
  new T.Marker(new T.LngLat(116.22808, 40.07779), { icon: MarkerIconPrimary }),
  new T.Marker(new T.LngLat(116.22918, 40.07811), { icon: MarkerIconSuccess }),
  new T.Marker(new T.LngLat(116.22801, 40.07698), { icon: MarkerIconWarning }),
  new T.Marker(new T.LngLat(116.23013, 40.07778), { icon: MarkerIconDanger })
];

onMounted(() => {
  M = new T.Map('map');
  M.centerAndZoom(new T.LngLat(116.22909, 40.07757), 18);

  markers.forEach(marker => {
    M.addOverLay(marker);
  });
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
