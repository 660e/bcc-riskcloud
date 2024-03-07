<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { ElMessage } from 'element-plus';
import { MapClass, TDT } from '@bcc/utils';

const $props = defineProps<{
  company: any;
}>();

let M: MapClass;
let centerLngLat: TDT.LngLat;
let riskCircle: any;

const contextMenu = [
  {
    text: '获取当前坐标',
    callback: (lnglat: any) => {
      const text = `${lnglat.lng}, ${lnglat.lat}`;
      navigator.clipboard.writeText(text).then(() => ElMessage.success(text));
    }
  }
];

const active = ref(0);

const riskCircleRadius = ref(0);
const riskCircleRadiusRadios = [
  { label: '100米', value: 100 },
  { label: '200米', value: 200 },
  { label: '500米', value: 500 },
  { label: '1000米', value: 1000 },
  { label: '2000米', value: 2000 }
];
const riskCircleRadiusChange = (value: number) => {
  let zoom: number;
  if (value <= 100) {
    zoom = 18;
  } else if (value > 100 && value <= 200) {
    zoom = 17;
  } else if (value > 200 && value <= 500) {
    zoom = 16;
  } else if (value > 500 && value <= 1000) {
    zoom = 15;
  } else if (value > 1000 && value <= 2000) {
    zoom = 14;
  } else {
    zoom = 13;
  }
  M.centerAndZoom({ lnglat: centerLngLat, zoom });
  riskCircle.setRadius(value);
};

watchEffect(() => {
  console.log('watchEffect');

  if ($props.company.lnglat) {
    const { lnglat, radius }: { lnglat: TDT.LngLat; radius: number } = $props.company;
    centerLngLat = lnglat;
    riskCircleRadius.value = radius;

    M = new MapClass();
    M.Init({ el: 'map', center: lnglat });
    M.ContextMenu({ contextMenu, width: 150 });
    M.Marker({ lnglat });
    riskCircle = M.Circle({ lnglat, radius });

    riskCircleRadiusChange(radius);
  }
});
</script>

<template>
  <div class="map-annotation">
    <div class="map-annotation__points">
      <el-tabs v-model="active" stretch>
        <el-tab-pane label="未标注" :name="0">
          <div style="height: 2000px">未标注</div>
        </el-tab-pane>
        <el-tab-pane label="已标注" :name="1">已标注</el-tab-pane>
      </el-tabs>
      <el-divider direction="vertical" />
    </div>

    <div id="map"></div>

    <div class="map-annotation__radius">
      <el-radio-group v-model="riskCircleRadius" @change="riskCircleRadiusChange">
        <el-radio-button v-for="r in riskCircleRadiusRadios" :key="r.value" :label="r.label" :value="r.value" />
      </el-radio-group>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
