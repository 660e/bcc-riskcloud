<script lang="ts" setup>
import { watchEffect } from 'vue';
import * as echarts from 'echarts';
import { COLORS } from '@bcc/utils';
import { pieOption } from './index';

const props = defineProps<{ data: any }>();

let levelPie: any;

watchEffect(() => {
  if (props.data?.level) {
    levelPie = echarts.init(document.getElementById('level'));
    levelPie.setOption(
      pieOption({
        data: props.data.level,
        radius: ['40%', '70%'],
        color: [1, 2, 3, 4, 5].map((i: number) => COLORS.risk_level[i])
      })
    );
  }
});
</script>

<template>
  <div class="risk-statistics">
    <div>
      <div class="c-subtitle-1">{{ data?.level?.name || '-' }}</div>
      <div id="level"></div>
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
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
