<script lang="ts" setup>
import { onMounted } from 'vue';
import { Map, TDTMarker } from '@bcc/utils';

const contextMenu = [
  {
    text: '测试',
    callback: (a, b, c) => {
      console.log(a);
      console.log(b);
      console.log(c);
    }
  },
  {
    text: '获取当前坐标',
    callback: lnglat => {
      console.log(lnglat);
    }
  }
];

const markers: TDTMarker[] = [
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
  M.contextMenu({ menu: contextMenu, width: 150 });
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
