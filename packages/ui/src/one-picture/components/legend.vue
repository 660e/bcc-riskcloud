<script lang="ts" setup>
import { legend } from '../../assets/option';
</script>

<template>
  <div class="one-picture__legend">
    <span v-for="l in legend" :key="l.type" :style="{ backgroundColor: l.color }">{{ l.name }}</span>
  </div>
</template>

<style lang="scss" scoped>
.one-picture__legend {
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  position: absolute;
  left: 10px;
  bottom: 10px;
  z-index: 500;
  span {
    color: #fff;
    height: 22px;
    width: 80px;
    line-height: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
