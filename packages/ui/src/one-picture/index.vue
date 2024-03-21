<script lang="ts" setup>
import { watch } from 'vue';
import { MapClass } from '@bcc/utils';

const $props = defineProps<{ code: any }>();
// 行政区划信息
let administrative: any;
// 地图实例
let M: any;
// 地图工具类
const MapUtils: MapClass = new MapClass();
watch(
  () => $props.code,
  async code => {
    if (code) {
      administrative = await MapUtils.AdministrativeDivision(code);

      if (administrative) {
        console.log(administrative);

        M = MapUtils.Init('map');
        drawPolygon();
      }
    }
  }
);

// 绘制区域
const drawPolygon = () => {
  // 当前行政区划
  administrative.geometry.coordinates.forEach((coordinate: any) => {
    coordinate.forEach((c: any) => {
      const polygon = MapUtils.Polygon(c, { fillOpacity: 0 });
      M.addOverLay(polygon);
    });
  });

  // 下级行政区划
  administrative.child.forEach((child: any) => {
    child.geometry.coordinates.forEach((coordinate: any) => {
      coordinate.forEach((c: any) => {
        const polygon = MapUtils.Polygon(c, { weight: 1, lineStyle: 'dashed' });
        M.addOverLay(polygon);
      });
    });
  });

  // 自适应
  const bound = administrative.bound.split(',');
  M.setViewport([MapUtils.LngLat([bound[0], bound[1]]), MapUtils.LngLat([bound[2], bound[3]])]);
};
</script>

<template>
  <div class="one-picture">
    <div id="map"></div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
