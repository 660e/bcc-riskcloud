<script lang="ts" setup>
import * as echarts from 'echarts/core';

defineProps<{ detail: any }>();

console.log(echarts);

const $emit = defineEmits(['back']);
const back = () => {
  $emit('back');
};
</script>

<template>
  <div class="one-picture__detail">
    <div class="one-picture__detail__title">
      <h1>{{ detail?.name }}</h1>
      <el-button v-if="detail?.level === 'district'" @click="back" type="primary" link>返回</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './detail.scss';
</style>
