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
.one-picture__detail {
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 4px;
  color: #fff;
  padding: 10px;
  width: 300px;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 500;
  &__title {
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      font-size: 20px;
      line-height: 1;
    }
    .el-button {
      border: 0;
      padding: 0;
    }
  }
  &__chart {
    height: 150px;
  }
}
</style>
