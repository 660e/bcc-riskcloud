<script lang="ts" setup>
import { watch } from 'vue';
import { MapClass, TDT } from '@bcc/utils';

const $props = defineProps<{ code: number | undefined }>();
// 地图实例
let M: any;
// 地图工具类
const MapUtils: MapClass = new MapClass();
watch(
  () => $props.code,
  code => {
    if (code) {
      M = MapUtils.Init('map');
      drawPolygon(code, 'country');
    }
  }
);

// 绘制区域
const drawPolygon = async (code: number, level: TDT.Level) => {
  M.clearOverLays();
  const geojson: any = await MapUtils.GetGeoJson(code, level);
  const isLeaf = !geojson.children?.length;

  // 当前行政区划
  geojson.geometry.coordinates.forEach((coordinate: any) => {
    coordinate.forEach((c: any) => {
      M.addOverLay(MapUtils.Polygon(c, { fillOpacity: isLeaf ? 0.2 : 0 }));
    });
  });

  // 下级行政区划
  if (!isLeaf) {
    geojson.children.forEach((child: any) => {
      const polygons = {
        adcode: child.properties.adcode,
        name: child.properties.name,
        level: child.properties.level,
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
          drawPolygon(polygons.adcode, polygons.level);
        });
      });
    });
  }

  // 自适应
  M.setViewport(geojson.geometry.coordinates.flat(2).map((c: any) => MapUtils.LngLat([c[0], c[1]])));
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
