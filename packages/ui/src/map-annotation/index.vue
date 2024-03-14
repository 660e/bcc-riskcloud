<script lang="ts" setup>
import { ref, watch } from 'vue';
import { MapClass, TDT } from '@bcc/utils';

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

watch(
  () => $props.company,
  company => {
    if (company.lnglat) {
      const { lnglat: center, risks }: { lnglat: TDT.LngLat; risks: Risk[] } = company;

      riskSources.value = risks;

      M = MapUtils.Init('map', center, 18);

      console.log(M);
    }
  }
);
</script>

<template>
  <div class="map-annotation">
    <div class="map-annotation__sidebar">
      <div class="map-annotation__markers">
        <ul>
          <li v-for="r in riskSources" :key="r.id">
            <el-icon><Location /></el-icon>
            <span>{{ r.label }}</span>
          </li>
        </ul>
      </div>
      <el-divider direction="vertical" />
    </div>

    <div id="map"></div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
