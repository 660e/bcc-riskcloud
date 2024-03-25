<script lang="ts" setup>
import { ref } from 'vue';

interface RiskSource {
  id: number;
  label: string;
  position?: [number, number] | undefined;
}

const visible = ref(false);

const open = (sources: RiskSource[]) => {
  console.log(sources);
  visible.value = true;
};

defineExpose({ open });
</script>

<template>
  <el-dialog v-model="visible" title="预览" class="preview-dialog" fullscreen>
    <div class="dialog-body">Lorem ipsum dolor sit amet.</div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="visible = false">关闭</el-button>
        <el-button type="primary">下载</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.dialog-body {
  flex: 1;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
