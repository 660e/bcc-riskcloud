<script lang="ts" setup>
import { watchEffect } from 'vue';
import * as echarts from 'echarts';
import { barOption, pieOption } from './index';

const $props = defineProps<{ data: any }>();

let pie1: any;
let bar1: any;

watchEffect(() => {
  if ($props.data?.type) {
    pie1 = echarts.init(document.getElementById('pie-1')!);
    pie1.setOption(pieOption());

    bar1 = echarts.init(document.getElementById('bar-1')!);
    bar1.setOption(barOption());
  }
});
</script>

<template>
  <div class="risk-statistics">
    <div>
      <div class="c-subtitle-1">风险源等级</div>
      <div id="pie-1" style="height: 300px; margin-top: 10px; background-color: rgba(255, 0, 0, 0.2)"></div>
    </div>
    <div>
      <div class="c-subtitle-1">风险源列表</div>
      <div id="bar-1" style="height: 300px; margin-top: 10px; background-color: rgba(255, 0, 0, 0.2)"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.risk-statistics {
  padding: 10px;
  display: flex;
  & > div {
    flex: 1;
  }
}
</style>
