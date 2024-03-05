<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { T } from '@bcc/utils';

const map = ref();

onMounted(() => {
  map.value = new T.Map('map');
  map.value.centerAndZoom(new T.LngLat(116.40769, 39.89945), 12);
  console.log('Map Annotation');
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
