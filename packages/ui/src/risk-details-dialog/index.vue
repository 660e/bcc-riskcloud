<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
const forms = ref();

const open = (data: any) => {
  forms.value = data;
  visible.value = true;
};

defineExpose({ open });
</script>

<template>
  <el-dialog v-model="visible" title="风险源详情" width="1200px">
    <div>
      <pre>{{ forms }}</pre>
    </div>
    <template #footer>
      <div class="flex justify-end">
        <el-button @click="visible = false">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>
