<template>
  <div class="card h-full">
    <div class="h-full" id="map"></div>
  </div>
</template>

<script lang="ts" name="tianditu" setup>
import { onMounted, ref } from 'vue';
import { T } from '@bcc/utils';

const map = ref();

onMounted(() => {
  map.value = new T.Map('map');
  map.value.centerAndZoom(new T.LngLat(116.40769, 39.89945), 12);
});
</script>

<style lang="scss">
#map.tdt-container {
  .tdt-control-copyright {
    display: none;
  }
}
</style>
