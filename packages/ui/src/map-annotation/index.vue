<script setup>
import { onMounted } from 'vue';
import { T, MarkerIconPrimary } from '@bcc/utils';

let M;

const marker = new T.Marker(new T.LngLat(116.22808, 40.07779), { icon: MarkerIconPrimary });

onMounted(() => {
  M = new T.Map('map');
  M.centerAndZoom(new T.LngLat(116.22808, 40.07779), 18);
  M.addOverLay(marker);
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
