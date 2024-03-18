<script lang="ts" setup>
import { ref, watch } from 'vue';
import { MapClass, TDT } from '@bcc/utils';

interface RiskSource {
  id: number;
  label: string;
}

const $props = defineProps<{ company: any }>();
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
let catching = false;
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
  if ((event.target as HTMLElement).id === 'map' && draggingSource) {
    const marker = MapUtils.Marker(MapUtils.ContainerPointToLngLat(event.offsetX, event.offsetY), 'danger', draggingSource);

    M.addOverLay(marker);
    marker.enableDragging();
    marker.addEventListener('dragstart', () => (catching = true));
    marker.addEventListener('dragend', () => (catching = false));
    marker.addEventListener('mouseover', ({ target }) => {
      currentSource.value = target.options.title;
    });
    marker.addEventListener('mouseout', () => {
      if (!catching) currentSource.value = null;
    });

    if (checkedSources.value.some(checked => checked.id === draggingSource?.id)) removeSource(draggingSource.id);
    checkedSources.value.push(draggingSource);
  }
};
// 移除风险源
const removeSource = (id: number) => {
  const overlay = M.getOverlays().find((overlay: any) => overlay.options.title.id === id);
  M.removeOverLay(overlay);
  checkedSources.value = checkedSources.value.filter(checked => checked.id !== id);
};

// 重置
const reset = () => {
  checkedSources.value = [];
  M.getOverlays()
    .filter((overlay: any) => {
      return overlay.options.title.id;
    })
    .forEach((overlay: any) => {
      M.removeOverLay(overlay);
    });
};

// 保存
const save = () => {
  const params = checkedSources.value.map(checked => {
    const lnglat = M.getOverlays()
      .find((overlay: any) => overlay.options.title.id === checked.id)
      .getLngLat();
    return {
      lnglat: [lnglat.lng, lnglat.lat],
      ...checked
    };
  });

  console.log(params);
};
</script>

<template>
  <div class="map-annotation">
    <div class="map-annotation__sidebar">
      <div>
        <div class="map-annotation__sources">
          <div>
            <div
              v-for="r in riskSources"
              :key="r.id"
              :data-id="r.id"
              :ondragstart="ondragstart"
              :class="{ checked: checkedSources.map((c: RiskSource) => c.id).includes(r.id) }"
              draggable="true"
            >
              <span>{{ r.label }}</span>
              <el-icon @click="removeSource(r.id)"><DeleteLocation /></el-icon>
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
        <el-alert v-if="currentSource" :title="currentSource.label" :closable="false" class="map-annotation__tooltip" />
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
