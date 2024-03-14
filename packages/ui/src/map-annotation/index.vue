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
// 地图工具类
const MapUtils: MapClass = new MapClass();

// 风险源
const riskSources = ref<Risk[]>();
const mapRef = ref();

const onEnd = (event: any) => {
  const rect = mapRef.value.getBoundingClientRect();
  const x = event.originalEvent.clientX - rect.left;
  const y = event.originalEvent.clientY - rect.top;

  M.addOverLay(MapUtils.Marker(MapUtils.ContainerPointToLngLat(x, y) as TDT.LngLat, 'danger'));
};

watch(
  () => $props.company,
  company => {
    if (company.lnglat) {
      const { lnglat: center, risks }: { lnglat: TDT.LngLat; risks: Risk[] } = company;

      riskSources.value = risks;

      M = MapUtils.Init('map', center, 18);
    }
  }
);
</script>

<template>
  <div class="map-annotation">
    <div class="map-annotation__sidebar">
      <div class="map-annotation__markers">
        <draggable v-model="riskSources" :sort="false" @end="onEnd" item-key="id">
          <template #item="{ element }">
            <div>
              <el-icon><Location /></el-icon>
              <span>{{ element.label }}</span>
            </div>
          </template>
        </draggable>
      </div>
      <el-divider direction="vertical" />
    </div>

    <div id="map" ref="mapRef"></div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
