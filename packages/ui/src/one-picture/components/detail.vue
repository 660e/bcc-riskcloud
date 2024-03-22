<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { option } from '../../assets/option';
import * as echarts from 'echarts';

defineProps<{ detail: any }>();

const $emit = defineEmits(['back']);

const chart = ref();
onMounted(() => {
  chart.value = echarts.init(document.getElementById('chart'));
  chart.value.setOption(option);
});
</script>

<template>
  <div class="one-picture__detail">
    <div class="one-picture__detail__title">
      <h1>{{ detail?.name || '...' }}</h1>
      <el-button v-if="detail?.level === 'district'" @click="$emit('back')" type="primary" link>返回</el-button>
    </div>
    <div class="one-picture__detail__chart" id="chart"></div>
  </div>
</template>

<style lang="scss" scoped>
@import './detail.scss';
</style>
