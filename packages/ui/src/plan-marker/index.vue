<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { TDT } from '@bcc/utils';
import PreviewDialog from './dialogs/preview.vue';

interface RiskSource {
  id: number;
  label: string;
  type?: TDT.Icon;
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
    draggingSource.position = [
      ((event.offsetX + draggingSourceOffset[0]) / containerRef.value.clientWidth) * 100,
      ((event.offsetY + draggingSourceOffset[1]) / containerRef.value.clientHeight) * 100
    ];
  }
};
const markerStyle = (position: [number, number] | undefined) => {
  return position ? { top: `${position[1]}%`, left: `${position[0]}%` } : { display: 'none' };
};

// 预览
const previewRef = ref();
const preview = () => previewRef.value.open(riskSources.value);

// 保存
const save = () => {
  console.log(riskSources.value);
};

// 平面图自适应
const wrapperRef = ref();
const wrapperStyle = ref({});
const imgRef = ref();
const containerRef = ref();
const fit = () => {
  const ww = wrapperRef.value.clientWidth;
  const wh = wrapperRef.value.clientHeight;
  const iw = imgRef.value.clientWidth;
  const ih = imgRef.value.clientHeight;
  wrapperStyle.value = { opacity: 1, ...(ww / wh > iw / ih ? { height: '100%' } : { width: '100%' }) };
};
onMounted(() => window.addEventListener('resize', fit));
onUnmounted(() => window.removeEventListener('resize', fit));
</script>

<template>
  <div class="plan-marker">
    <div class="plan-marker__sidebar">
      <div>
        <div class="plan-marker__sources">
          <div>
            <div
              v-for="r in riskSources"
              :key="r.id"
              :data-id="r.id"
              :ondragstart="ondragstart"
              :class="{ checked: r.position }"
              draggable="true"
            >
              <el-icon><Location /></el-icon>
              <span>{{ r.label }}</span>
              <div></div>
              <el-icon @click="r.position = undefined"><CircleClose /></el-icon>
            </div>
          </div>
        </div>
        <div class="plan-marker__buttons">
          <el-button @click="riskSources.forEach((r: RiskSource) => (r.position = undefined))">重置</el-button>
          <el-button @click="preview">预览</el-button>
          <el-button @click="save" type="primary">保存</el-button>
        </div>
      </div>
      <el-divider direction="vertical" />
    </div>
    <div class="plan-marker__wrapper" ref="wrapperRef">
      <div :style="wrapperStyle">
        <img
          :style="wrapperStyle"
          @load="fit"
          src="https://img.zcool.cn/community/01ed1b603f20cc11013ef90f5a9146.jpg@1280w_1l_2o_100sh.jpg"
          ref="imgRef"
        />
        <div :ondragover="ondragover" :ondrop="ondrop" id="container" ref="containerRef" class="plan-marker__container">
          <div
            v-for="r in riskSources"
            :key="r.id"
            :data-id="r.id"
            :style="markerStyle(r.position)"
            :ondragstart="ondragstart"
            :class="[`plan-marker__marker--${r.type}`]"
            data-type="marker"
            draggable="true"
            class="plan-marker__marker"
          ></div>
        </div>
      </div>
    </div>

    <!-- 预览 -->
    <preview-dialog ref="previewRef" />
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
