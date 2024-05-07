<script lang="ts" name="location-picker" setup>
import { ref } from 'vue';
import { Location } from '@element-plus/icons-vue';

// const emit = defineEmits(['update:model-value']);
// const update = () => {
//   emit('update:model-value', 123);
// };

const visible = ref(false);
const open = () => {
  visible.value = true;
};
</script>

<template>
  <div style="width: 100%">
    <el-input v-bind="$attrs">
      <template #append>
        <el-button :icon="Location" @click="open" />
      </template>
    </el-input>
    <el-dialog v-model="visible">
      <div>Lorem ipsum dolor sit amet.</div>
    </el-dialog>
  </div>
</template>
