<script lang="ts" setup>
import { ref } from 'vue';
import { ElButton } from 'element-plus';

const count = ref(0);
</script>

<template>
  <div>
    <el-button @click="count = count + 1" type="primary">{{ count }}</el-button>
  </div>
</template>
