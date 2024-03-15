<script lang="ts" setup>
import { ref, watch } from 'vue';
import { MapClass, TDT } from '@bcc/utils';
import draggable from 'vuedraggable';

interface Risk {
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

// 风险源列表
const riskSources = ref<Risk[]>();
// 标注风险源
const onEnd = (event: any) => {
  const clientX = event.originalEvent.clientX;
  const clientY = event.originalEvent.clientY;
  const element = document.elementFromPoint(clientX, clientY);

  if (element?.id === 'map') {
    const { item }: { item: HTMLDivElement } = event;
    const rect = mapRef.value.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const marker = MapUtils.Marker(MapUtils.ContainerPointToLngLat(x, y), 'danger', { id: Number(item.dataset.riskId) });

    M.addOverLay(marker);
    marker.enableDragging();
  }
};

// 保存
const save = () => {
  console.log(M.getOverlays());
};

watch(
  () => $props.company,
  company => {
    if (company.lnglat) {
      const { lnglat: center, risks }: { lnglat: TDT.LngLat; risks: Risk[] } = company;

      riskSources.value = risks;

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
        <div class="map-annotation__markers">
          <draggable v-model="riskSources" :sort="false" @end="onEnd" item-key="id">
            <template #item="{ element }">
              <div :data-risk-id="element.id">
                <el-icon><Location /></el-icon>
                <span>{{ element.label }}</span>
              </div>
            </template>
          </draggable>
        </div>
        <div class="map-annotation__buttons">
          <el-button>重置</el-button>
          <el-button @click="save" type="primary">保存</el-button>
        </div>
      </div>
      <el-divider direction="vertical" />
    </div>

    <div id="map" ref="mapRef"></div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
