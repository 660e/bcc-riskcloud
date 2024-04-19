<script lang="ts" name="risk-grade-matrix" setup>
withDefaults(defineProps<{ grade: number[] }>(), { grade: () => [-1, -1] });

const xData = ['很小', '小', '一般', '大', '很大'];
const yData = [
  { td: [0, 0, 0, 1, 1], th: '基本不可能' },
  { td: [0, 0, 1, 1, 2], th: '较不可能' },
  { td: [0, 1, 1, 2, 3], th: '可能' },
  { td: [1, 1, 2, 2, 3], th: '较可能' },
  { td: [1, 2, 2, 3, 3], th: '很可能' }
];
const dict = ['低', '一般', '较大', '重大'];
</script>

<template>
  <table class="risk-grade-matrix">
    <thead>
      <tr>
        <th colspan="2" rowspan="2" style="background-color: var(--el-color-danger-light-9)">风险等级</th>
        <th colspan="5" style="background-color: var(--el-color-primary-light-9)">严重性</th>
      </tr>
      <tr>
        <th v-for="th in xData" :key="th" style="background-color: var(--el-color-primary-light-9)">{{ th }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(tr, index) in yData" :key="index">
        <th v-if="!index" rowspan="5" style="background-color: var(--el-color-warning-light-9)">可能性</th>
        <th style="background-color: var(--el-color-warning-light-9)">{{ tr.th }}</th>
        <td v-for="(td, i) in tr.td" :key="i" :class="[grade[0] === index && grade[1] === i ? 'current' : '', `grade-${td}`]">
          {{ dict[td] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
.risk-grade-matrix {
  width: 100%;
  th,
  td {
    border: 1px #ccc solid;
    padding: 10px 0;
    font-weight: 400;
    text-align: center;
  }
  td {
    width: 80px;
    &.grade-0.current {
      background-color: var(--el-color-success-light-3);
    }
    &.grade-1.current {
      background-color: var(--el-color-primary-light-3);
    }
    &.grade-2.current {
      background-color: var(--el-color-warning-light-3);
    }
    &.grade-3.current {
      background-color: var(--el-color-danger-light-3);
    }
  }
}
</style>
