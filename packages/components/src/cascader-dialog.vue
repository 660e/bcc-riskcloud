<script lang="ts" name="cascader-dialog" setup>
import { ref } from 'vue';

const { httpRequest } = withDefaults(defineProps<{ title?: string; httpRequest: any }>(), { title: '' });

const visible = ref(false);
const data = ref([]);
const open = async (selected: any) => {
  console.log(selected);

  visible.value = true;

  data.value = (await httpRequest()).data;
};
const confirm = () => {
  visible.value = false;
};

defineExpose({ open });
</script>

<template>
  <el-dialog v-model="visible" :title="title">
    <div class="_cascader"></div>
    <template #footer>
      <div class="flex justify-end">
        <el-button @click="visible = false">取消</el-button>
        <el-button @click="confirm" type="primary">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
._cascader {
  display: flex;
}
</style>
