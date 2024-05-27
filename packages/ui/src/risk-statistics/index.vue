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
      <div class="c-subtitle-1">风险等级</div>
      <div></div>
    </div>
    <div>
      <div class="c-subtitle-1">风险类型</div>
      <div></div>
    </div>
    <div class="c1">
      <div>
        <div class="c-subtitle-1">应急能力</div>
        <div></div>
      </div>
      <div>
        <div class="c-subtitle-1">单位诊断分级</div>
        <div></div>
      </div>
      <div>
        <div class="c-subtitle-1">评估信息</div>
        <div></div>
      </div>
    </div>
    <div>
      <div class="c-subtitle-1">应急队伍</div>
      <div></div>
    </div>
    <div>
      <div class="c-subtitle-1">应急专家</div>
      <div></div>
    </div>
    <div>
      <div class="c-subtitle-1">应急装备</div>
      <div></div>
    </div>
    <div>
      <div class="c-subtitle-1">应急物资</div>
      <div></div>
    </div>
    <div style="display: none">
      <div id="pie-1" style="height: 300px; margin-top: 10px; background-color: rgba(255, 0, 0, 0.2)"></div>
    </div>
    <div style="display: none">
      <div class="c-subtitle-1">风险源列表</div>
      <div id="bar-1" style="height: 300px; margin-top: 10px; background-color: rgba(255, 0, 0, 0.2)"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
