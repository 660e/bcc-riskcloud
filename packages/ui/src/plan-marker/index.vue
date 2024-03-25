<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';

interface RiskSource {
  id: number;
  label: string;
  position?: [number, number] | undefined;
}

const $props = defineProps<{ company: any }>();
watch(
  () => $props.company,
  company => {
    if (company.sources.length) riskSources.value = company.sources;
  }
);

// 当前正在拖拽的风险源
let draggingSource: RiskSource | undefined;
let draggingSourceOffset = [0, 0];
// 风险源列表
const riskSources = ref<RiskSource[]>([]);
// 标注风险源
const ondragstart = (event: DragEvent) => {
  const { offsetX, offsetY } = event;
  const { clientHeight, clientWidth, dataset } = event.target as HTMLElement;
  draggingSource = riskSources.value.find((risk: RiskSource) => risk.id === Number(dataset.id));
  draggingSourceOffset = dataset.type === 'marker' ? [clientWidth / 2 - offsetX, clientHeight - offsetY] : [0, 0];
};
const ondragover = (event: DragEvent) => event.preventDefault();
const ondrop = (event: DragEvent) => {
  if ((event.target as HTMLElement).id === 'container' && draggingSource) {
    draggingSource.position = [event.offsetX + draggingSourceOffset[0], event.offsetY + draggingSourceOffset[1]];
  }
};
const markerStyle = (position: [number, number] | undefined) => {
  return position ? { top: `${position[1]}px`, left: `${position[0]}px` } : { display: 'none' };
};

// 保存
const save = () => {
  console.log(riskSources.value);
};

// 平面图自适应
const wrapperRef = ref();
const imgRef = ref();
const wrapperStyle = ref({});
const fit = () => {
  const ww = wrapperRef.value.clientWidth;
  const wh = wrapperRef.value.clientHeight;
  const iw = imgRef.value.clientWidth;
  const ih = imgRef.value.clientHeight;
  wrapperStyle.value = ww / wh > iw / ih ? { height: '100%' } : { width: '100%' };
};
onMounted(() => window.addEventListener('resize', fit));
onUnmounted(() => window.removeEventListener('resize', fit));
</script>

<template>
  <div class="map-marker">
    <div class="map-marker__sidebar">
      <div>
        <div class="map-marker__sources">
          <div>
            <div
              v-for="r in riskSources"
              :key="r.id"
              :data-id="r.id"
              :ondragstart="ondragstart"
              :class="{ checked: r.position }"
              draggable="true"
            >
              <span>{{ r.label }}</span>
              <el-icon @click="r.position = undefined"><DeleteLocation /></el-icon>
            </div>
          </div>
        </div>
        <div class="map-marker__buttons">
          <el-button @click="riskSources.forEach((r: RiskSource) => (r.position = undefined))">重置</el-button>
          <el-button @click="save" type="primary">保存</el-button>
        </div>
      </div>
      <el-divider direction="vertical" />
    </div>
    <div class="map-marker__wrapper" ref="wrapperRef">
      <div :style="wrapperStyle">
        <img
          :style="wrapperStyle"
          @load="fit"
          src="https://img.zcool.cn/community/01ed1b603f20cc11013ef90f5a9146.jpg@1280w_1l_2o_100sh.jpg"
          ref="imgRef"
        />
        <div :ondragover="ondragover" :ondrop="ondrop" id="container" class="map-marker__container">
          <div
            v-for="r in riskSources"
            :key="r.id"
            :data-id="r.id"
            :style="markerStyle(r.position)"
            :ondragstart="ondragstart"
            data-type="marker"
            draggable="true"
            class="map-marker__marker"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../map-marker/index.scss';
</style>
