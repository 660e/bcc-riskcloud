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

const sensitiveTargets = ref<TDT.Marker[]>([
  { id: 1, label: 'Target-001', lnglat: [116.22685, 40.07829] },
  { id: 2, label: 'Target-002', lnglat: [116.22733, 40.07677] },
  { id: 3, label: 'Target-003', lnglat: [116.22988, 40.07792] },
  { id: 4, label: 'Target-004', lnglat: [116.22924, 40.07646] }
]);
const checkedTargets = ref<TDT.Marker[]>();
const checkedTargetsChange = (checked: TDT.Marker[]) => {
  const center = M.getCenter();
  const activated: any[] = M.getOverlays().filter((overlay: any) => {
    // 获取所有标注（排除中心点）
    return overlay.getType() === 2 && overlay.or.lng !== center.lng && overlay.or.lat !== center.lat;
  });

  // 获取标注列表与地图标注差异
  const diff1 = checked.filter(c => !activated.some(a => a.or.lng === c.lnglat[0] && a.or.lat === c.lnglat[1]));
  const diff2 = activated.filter(a => !checked.some(c => c.lnglat[0] === a.or.lng && c.lnglat[1] === a.or.lat));

  // 根据差异创建或删除标注
  if (diff1.length > diff2.length) {
    diff1.forEach((marker: TDT.Marker) => M.addOverLay(MapUtils.Marker(marker.lnglat, 'danger')));
  } else if (diff1.length < diff2.length) {
    diff2.forEach((overlay: any) => M.removeOverLay(overlay));
  }
};
const save = () => {
  console.log(checkedTargets.value);
};

watchEffect(() => {
  console.log('watchEffect');

  if ($props.company.lnglat) {
    const { lnglat, radius, markers }: { lnglat: TDT.LngLat; radius: number; markers: TDT.Marker[] } = $props.company;

    riskCircle = MapUtils.Circle(lnglat, radius, { weight: 1 });
    riskCircleRadius.value = radius;
    checkedTargets.value = markers;

    M = MapUtils.Init('map', lnglat);
    M.addContextMenu(MapUtils.ContextMenu(contextMenu, 150));
    M.addOverLay(MapUtils.Marker(lnglat));
    M.addOverLay(riskCircle);

    riskCircleRadiusChange(radius);
    checkedTargetsChange(markers);
  }
});
</script>

<template>
  <div class="map-annotation">
    <div class="map-annotation__sidebar">
      <div>
        <div class="map-annotation__markers">
          <el-checkbox-group v-model="checkedTargets" @change="checkedTargetsChange">
            <el-checkbox v-for="s in sensitiveTargets" :key="s.id" :value="s">
              <span>{{ s.label }}</span>
              <el-icon><Position /></el-icon>
              <span>100米</span>
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="map-annotation__buttons">
          <el-button @click="save" type="primary">保存</el-button>
        </div>
      </div>
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
