<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { ElMessage } from 'element-plus';
import { MapClass, TDT } from '@bcc/utils';

const $props = defineProps<{
  company: any;
}>();

let M: any;
let riskCircle: any;

const MapUtils: MapClass = new MapClass();
const contextMenu: TDT.MenuItem[] = [
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
  riskCircle.setRadius(value);
  M.setViewport(Object.values(riskCircle.getBounds()));
};

watchEffect(() => {
  console.log('watchEffect');

  if ($props.company.lnglat) {
    const { lnglat, radius } = $props.company;

    riskCircle = MapUtils.Circle(lnglat, radius);
    riskCircleRadius.value = radius;

    M = MapUtils.Init('map', lnglat, 17);
    M.addContextMenu(MapUtils.ContextMenu(contextMenu, 150));
    M.addOverLay(MapUtils.Marker(lnglat));
    M.addOverLay(riskCircle);
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
