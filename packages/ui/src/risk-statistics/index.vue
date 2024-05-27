<script lang="ts" setup>
import { watchEffect } from 'vue';
import * as echarts from 'echarts';
import { COLORS } from '@bcc/utils';
import { pieOption } from './index';

const props = defineProps<{ data: any }>();

let levelPie: any;

let teamPie: any;
let expertPie: any;
let equipmentPie: any;
let supplyPie: any;

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

  if (props.data?.team) {
    teamPie = echarts.init(document.getElementById('team'));
    teamPie.setOption(pieOption({ data: props.data.team, radius: ['0%', '70%'] }));
  }
  if (props.data?.expert) {
    expertPie = echarts.init(document.getElementById('expert'));
    expertPie.setOption(pieOption({ data: props.data.expert, radius: ['0%', '70%'] }));
  }
  if (props.data?.equipment) {
    equipmentPie = echarts.init(document.getElementById('equipment'));
    equipmentPie.setOption(pieOption({ data: props.data.equipment, radius: ['0%', '70%'] }));
  }
  if (props.data?.supply) {
    supplyPie = echarts.init(document.getElementById('supply'));
    supplyPie.setOption(pieOption({ data: props.data.supply, radius: ['0%', '70%'] }));
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
      <div class="c-subtitle-1">{{ data?.team?.name || '-' }}</div>
      <div id="team"></div>
    </div>
    <div>
      <div class="c-subtitle-1">{{ data?.expert?.name || '-' }}</div>
      <div id="expert"></div>
    </div>
    <div>
      <div class="c-subtitle-1">{{ data?.equipment?.name || '-' }}</div>
      <div id="equipment"></div>
    </div>
    <div>
      <div class="c-subtitle-1">{{ data?.supply?.name || '-' }}</div>
      <div id="supply"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
