<script lang="ts" setup>
import { watch } from 'vue';
import { MapClass } from '@bcc/utils';

const $props = defineProps<{ code: any }>();
// 地图实例
let M: any;
// 地图工具类
const MapUtils: MapClass = new MapClass();
watch(
  () => $props.code,
  code => {
    if (code) {
      M = MapUtils.Init('map');
      drawPolygon(code);
    }
  }
);

// 绘制区域
const drawPolygon = async (code: string) => {
  const administrative: any = await MapUtils.AdministrativeDivision(code);

  // 当前行政区划
  administrative.geometry.coordinates.forEach((coordinate: any) => {
    coordinate.forEach((c: any) => M.addOverLay(MapUtils.Polygon(c, { fillOpacity: 0 })));
  });

  // 下级行政区划
  administrative.child.forEach((child: any) => {
    const polygons = {
      adcode: child.properties.adcode,
      name: child.properties.name,
      data: [] as any[]
    };

    child.geometry.coordinates.forEach((coordinate: any) => {
      coordinate.forEach((c: any) => {
        const polygon = MapUtils.Polygon(c, { weight: 1, lineStyle: 'dashed' });
        M.addOverLay(polygon);
        polygons.data.push(polygon);
      });
    });

    polygons.data.forEach((polygon: any) => {
      polygon.addEventListener('mouseover', () => {
        polygons.data.forEach((p: any) => p.setColor('#f00'));
      });
      polygon.addEventListener('mouseout', () => {
        polygons.data.forEach((p: any) => p.setColor('#00f'));
      });
      polygon.addEventListener('click', () => {
        console.log(polygons);
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
