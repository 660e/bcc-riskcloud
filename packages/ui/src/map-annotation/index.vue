<script lang="ts" setup>
import { onMounted } from 'vue';
import { Map, TMarker, TLngLat } from '@bcc/utils';

const contextMenu = [
  {
    text: '测试'
  },
  {
    text: '获取当前坐标',
    callback: (lnglat: TLngLat) => {
      console.log(lnglat);
    }
  }
];

const markers: TMarker[] = [
  { lnglat: [116.22808, 40.07779], type: 'primary' },
  { lnglat: [116.22918, 40.07811], type: 'success' },
  { lnglat: [116.22801, 40.07698], type: 'warning' },
  { lnglat: [116.23013, 40.07778], type: 'danger' }
];

onMounted(() => {
  const M = new Map();
  M.init({
    el: 'map',
    center: [116.22909, 40.07757],
    zoom: 18
  });

  // 添加标注
  markers.forEach(marker => M.marker(marker));

  // 添加右键菜单
  M.contextMenu({ contextMenu, width: 150 });
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
