<script lang="ts" setup>
import { ref, watch } from 'vue';
import { MapClass, TDT } from '@bcc/utils';

interface RiskSource {
  id: number;
  label: string;
}

const $props = defineProps<{ company: any }>();

// 地图实例
let M: any;
// 地图容器
const mapRef = ref();
// 地图工具类
const MapUtils: MapClass = new MapClass();

// 当前正在拖拽的风险源
let draggingSource: RiskSource | undefined;
// 当前选中的风险源
const currentSource = ref();
// 风险源列表
const riskSources = ref<RiskSource[]>([]);
// 已标注风险源列表
const checkedSources = ref<RiskSource[]>([]);
// 标注风险源
const ondragstart = (event: DragEvent) => {
  draggingSource = riskSources.value.find((risk: RiskSource) => {
    return risk.id === Number((event.target as HTMLElement)?.dataset.id);
  });
};
const ondragover = (event: DragEvent) => event.preventDefault();
const ondrop = (event: DragEvent) => {
  if (draggingSource) {
    const marker = MapUtils.Marker(MapUtils.ContainerPointToLngLat(event.offsetX, event.offsetY), 'danger', draggingSource);

    M.addOverLay(marker);
    marker.enableDragging();
    marker.addEventListener('mouseover', ({ target }) => (currentSource.value = target));
    marker.addEventListener('mouseout', () => (currentSource.value = null));

    checkedSources.value.push(draggingSource);
  }
};

// 重置
const reset = () => {
  console.log('reset');
};

// 保存
const save = () => {
  console.log(checkedSources.value);
};

watch(
  () => $props.company,
  company => {
    if (company.lnglat) {
      const { lnglat: center, sources }: { lnglat: TDT.LngLat; sources: RiskSource[] } = company;

      riskSources.value = sources;

      M = MapUtils.Init('map', center, 18);
      M.addOverLay(MapUtils.Marker(center));
    }
  }
);
</script>

<template>
  <div class="map-annotation">
    <div class="map-annotation__sidebar">
      <div>
        <div class="map-annotation__sources">
          <div>
            <div v-for="r in riskSources" :key="r.id" :data-id="r.id" :ondragstart="ondragstart" draggable="true">
              <el-icon><Location /></el-icon>
              <span>{{ r.label }}</span>
            </div>
          </div>
        </div>
        <div class="map-annotation__buttons">
          <el-button @click="reset">重置</el-button>
          <el-button @click="save" type="primary">保存</el-button>
        </div>
      </div>
      <el-divider direction="vertical" />
    </div>

    <div :ondragover="ondragover" :ondrop="ondrop" id="map" ref="mapRef">
      <transition name="fade">
        <el-alert
          v-if="currentSource"
          :title="currentSource.options.title.label"
          :closable="false"
          class="map-annotation__tooltip"
        />
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
