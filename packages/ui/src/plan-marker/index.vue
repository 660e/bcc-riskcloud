<script lang="ts" setup>
import { ref } from 'vue';

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
</script>

<template>
  <div class="plan-marker">
    <div class="plan-marker__sidebar">
      <div>
        <div class="plan-marker__sources"></div>
      </div>
      <el-divider direction="vertical" />
    </div>
    <div class="plan-marker__wrapper" ref="wrapperRef">
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
@import './index.scss';
</style>
