<script lang="ts" name="simple-tabs" setup>
import { ref } from 'vue';

interface Tab {
  label: string;
  value: string | number;
  count: number;
}

const props = defineProps<{ tabs: Tab[] }>();
const emit = defineEmits(['change']);
const active = ref(props.tabs[0].value);
const tabClick = (value: string | number) => {
  active.value = value;
  emit('change', value);
};
</script>

<template>
  <div class="simple-tabs">
    <div v-for="tab in tabs" :key="tab.value" :class="{ active: active === tab.value }" @click="tabClick(tab.value)">
      <span>{{ tab.label }} {{ tab.count }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.simple-tabs {
  height: 32px;
  margin-bottom: 10px;
  display: flex;
  & > div {
    cursor: pointer;
    margin-right: 30px;
    position: relative;
    display: flex;
    align-items: center;
    &::after {
      content: '';
      display: block;
      height: 2px;
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
    }
    &.active {
      color: var(--el-color-primary);
      &::after {
        background-color: var(--el-color-primary);
      }
    }
  }
}
</style>
