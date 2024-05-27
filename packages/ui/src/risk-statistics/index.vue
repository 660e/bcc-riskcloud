<script lang="ts" setup>
import { watchEffect } from 'vue';
import * as echarts from 'echarts';
import { COLORS } from '@bcc/utils';
import { barOption, pieOption } from './index';

const props = defineProps<{ data: any }>();

let levelPie: any;
let typeBar: any;
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
  if (props.data?.type) {
    typeBar = echarts.init(document.getElementById('type'));
    typeBar.setOption(barOption({ data: props.data.type, color: [1, 2, 3, 4].map((i: number) => COLORS.risk_level[i]) }));
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
      <div class="c-subtitle-1">{{ data?.type?.name || '-' }}</div>
      <div id="type"></div>
    </div>
    <div class="c1">
      <div>
        <div class="c-subtitle-1">{{ data?.ability?.name || '-' }}</div>
        <div>{{ data?.ability?.value || '-' }}</div>
      </div>
      <div>
        <div class="c-subtitle-1">{{ data?.diagnosis?.name || '-' }}</div>
        <div>{{ data?.diagnosis?.value || '-' }}</div>
      </div>
      <div>
        <div class="c-subtitle-1">{{ data?.report?.name || '-' }}</div>
        <div>
          <el-button v-for="report in data?.report?.value" :key="report" type="primary" link>{{ report }}</el-button>
        </div>
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
