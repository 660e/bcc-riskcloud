<script lang="ts" setup>
import { ref, watch } from 'vue';
import { MapClass, TDT } from '@bcc/utils';
import { ElMessage, ElMessageBox } from 'element-plus';

import CreateDialog from './dialogs/create.vue';

const $props = defineProps<{ company: any }>();
const $emit = defineEmits(['save']);

// 地图实例
let M: any;
// 地图工具类
const MapUtils: MapClass = new MapClass();
// “添加敏感目标”弹窗
const createDialogRef = ref();

// 风险范围实例
let riskCircle: any;
// 风险范围半径缓存
let riskCircleRadiusCache: number;
// 风险范围半径
const riskCircleRadius = ref(0);
const riskCircleRadiusRadios = [
  { label: '100米', value: 100 },
  { label: '200米', value: 200 },
  { label: '500米', value: 500 },
  { label: '1000米', value: 1000 },
  { label: '2000米', value: 2000 }
];

const setRadius = (radius: number) => {
  riskCircle.setRadius(radius);
  M.setViewport(Object.values(riskCircle.getBounds()));
  sensitiveTargets.value = [
    { id: 1, label: 'Target-001', lnglat: [116.22685, 40.07829] },
    { id: 2, label: 'Target-002', lnglat: [116.22733, 40.07677] },
    { id: 3, label: 'Target-003', lnglat: [116.22988, 40.07792] },
    { id: 4, label: 'Target-004', lnglat: [116.22924, 40.07646] }
  ];
};
const riskCircleRadiusChange = (radius: number) => {
  ElMessageBox.confirm('调整风险范围将清空已标注的敏感目标', '系统提示', { type: 'warning' })
    .then(() => {
      checkAllTargetsChange(false);
      setRadius(radius);
      riskCircleRadiusCache = radius;
    })
    .catch(() => {
      riskCircleRadius.value = riskCircleRadiusCache;
    });
};

// 右键菜单
const contextMenu: TDT.MenuItem[] = [
  {
    text: '添加敏感目标',
    callback: (lnglat: any) => {
      if (MapUtils.PointInCircle([lnglat.lng, lnglat.lat], $props.company.lnglat, riskCircleRadius.value)) {
        createDialogRef.value.open(lnglat);
      } else {
        ElMessage.warning('请在圆形范围内添加敏感目标');
      }
    }
  }
];

// 敏感目标列表
const sensitiveTargets = ref<TDT.Marker[]>([]);

const checkedTargets = ref<TDT.Marker[]>();
const createTarget = (forms: any) => {
  const target = { id: new Date().getTime(), label: forms.name, lnglat: forms.lnglat };
  M.addOverLay(MapUtils.Marker(target.lnglat, 'danger'));
  sensitiveTargets.value.push(target);
  checkedTargets.value?.push(target);
};

// 全选
const checkAllTargets = ref(false);
const checkAllTargetsChange = (check: boolean) => {
  checkedTargets.value = check ? sensitiveTargets.value : [];
  checkedTargetsChange(check ? sensitiveTargets.value : []);
};
const checkedTargetsChange = (checked: TDT.Marker[]) => {
  const center = M.getCenter();

  // 获取所有标注（排除中心点）
  const activated: any[] = M.getOverlays().filter((overlay: any) => {
    return overlay.getType() === 2 && overlay.or.lng !== center.lng && overlay.or.lat !== center.lat;
  });

  // 获取标注列表与地图标注差异
  const diff1 = checked.filter(c => !activated.some(a => a.or.lng === c.lnglat[0] && a.or.lat === c.lnglat[1]));
  const diff2 = activated.filter(a => !checked.some(c => c.lnglat[0] === a.or.lng && c.lnglat[1] === a.or.lat));

  // 根据差异添加或移除标注
  if (diff1.length > diff2.length) {
    diff1.forEach((target: TDT.Marker) => M.addOverLay(MapUtils.Marker(target.lnglat, 'danger')));
  } else if (diff1.length < diff2.length) {
    diff2.forEach((overlay: any) => M.removeOverLay(overlay));
  }

  checkAllTargets.value = checked.length === sensitiveTargets.value.length;
  isIndeterminate.value = checked.length > 0 && checked.length < sensitiveTargets.value.length;
};
const isIndeterminate = ref(true);
// 保存
const save = () => {
  console.log($props.company);
  console.log(checkedTargets.value);
  $emit('save');
};

watch(
  () => $props.company,
  company => {
    if (company.lnglat) {
      const { lnglat: center, radius, targets }: { lnglat: TDT.LngLat; radius: number; targets: TDT.Marker[] } = company;

      riskCircle = MapUtils.Circle(center, radius, { weight: 1 });
      riskCircleRadius.value = radius;
      riskCircleRadiusCache = radius;
      checkedTargets.value = targets;

      M = MapUtils.Init('map', center);
      M.addContextMenu(MapUtils.ContextMenu(contextMenu, 150));
      M.addOverLay(MapUtils.Marker(center));
      M.addOverLay(riskCircle);

      setRadius(radius);
      checkedTargetsChange(targets);
    }
  }
);
</script>

<template>
  <div class="sensitive-targets">
    <div class="sensitive-targets__sidebar">
      <div>
        <div class="sensitive-targets__markers">
          <el-checkbox-group v-model="checkedTargets" @change="checkedTargetsChange">
            <el-checkbox v-for="s in sensitiveTargets" :key="s.id" :value="s">
              <span>{{ s.label }}</span>
              <template v-if="company.lnglat">
                <el-icon><Position /></el-icon>
                <span>{{ MapUtils.PointToPointDistance(company.lnglat, s.lnglat) }}米</span>
              </template>
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="sensitive-targets__buttons">
          <el-checkbox v-model="checkAllTargets" :indeterminate="isIndeterminate" @change="checkAllTargetsChange">
            全选
          </el-checkbox>
          <el-button @click="save" type="primary">保存</el-button>
        </div>
      </div>
      <el-divider direction="vertical" />
    </div>

    <div id="map"></div>

    <div class="sensitive-targets__radius">
      <el-radio-group v-model="riskCircleRadius" @change="riskCircleRadiusChange">
        <el-radio-button v-for="r in riskCircleRadiusRadios" :key="r.value" :label="r.label" :value="r.value" />
      </el-radio-group>
    </div>

    <!-- 添加敏感目标弹窗 -->
    <create-dialog @confirm="createTarget" ref="createDialogRef" />
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
