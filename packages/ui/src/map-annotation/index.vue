<script lang="ts" setup>
import { watchEffect } from 'vue';
import { ElMessage } from 'element-plus';
import { Map, TLngLat } from '@bcc/utils';

const $props = defineProps<{
  company: any;
}>();

let M: any;
const contextMenu = [
  {
    text: '获取当前坐标',
    callback: (lnglat: any) => {
      const text = `${lnglat.lng}, ${lnglat.lat}`;
      navigator.clipboard.writeText(text).then(() => ElMessage.success(text));
    }
  }
];

watchEffect(() => {
  if ($props.company.lnglat) {
    const lnglat: TLngLat = $props.company.lnglat;
    M = new Map();
    M.Init({ el: 'map', center: lnglat, zoom: 18 });
    M.ContextMenu({ contextMenu, width: 150 });
    M.Marker({ lnglat, type: 'primary' });
  }
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
