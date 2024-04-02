<script lang="ts" setup>
defineProps<{ label: string; content: string }>();
</script>

<template>
  <div class="label-tooltip">
    <span>{{ label }}</span>
    <el-tooltip :content="content" placement="top">
      <el-icon><QuestionFilled /></el-icon>
    </el-tooltip>
  </div>
</template>

<style lang="scss" scoped>
.label-tooltip {
  display: flex;
  align-items: center;
  & > span {
    margin-right: 4px;
  }
}
</style>
