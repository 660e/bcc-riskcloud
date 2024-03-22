<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';

interface RiskSource {
  id: number;
  label: string;
}

const $props = defineProps<{ company: any }>();
// 风险源列表
const riskSources = ref<RiskSource[]>([]);
watch(
  () => $props.company,
  company => {
    if (company.sources.length) riskSources.value = company.sources;
  }
);

// 平面图自适应
const wrapperRef = ref();
const imgRef = ref();
const style = ref({});
const fit = () => {
  const ww = wrapperRef.value.clientWidth;
  const wh = wrapperRef.value.clientHeight;
  const iw = imgRef.value.clientWidth;
  const ih = imgRef.value.clientHeight;
  style.value = ww / wh > iw / ih ? { height: '100%' } : { width: '100%' };
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
            <div v-for="r in riskSources" :key="r.id" draggable="true">
              <span>{{ r.label }}</span>
              <el-icon><DeleteLocation /></el-icon>
            </div>
          </div>
        </div>
        <div class="map-marker__buttons">
          <el-button>重置</el-button>
          <el-button type="primary">保存</el-button>
        </div>
      </div>
      <el-divider direction="vertical" />
    </div>
    <div class="map-marker__wrapper" ref="wrapperRef">
      <img
        :style="style"
        @load="fit"
        src="https://img.zcool.cn/community/01ed1b603f20cc11013ef90f5a9146.jpg@1280w_1l_2o_100sh.jpg"
        ref="imgRef"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../map-marker/index.scss';
</style>
