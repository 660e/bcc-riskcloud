<script lang="ts" name="cascader-dialog" setup>
import { ref } from 'vue';

const { httpRequest } = withDefaults(defineProps<{ title?: string; httpRequest: any }>(), { title: '' });

const visible = ref(false);
const data = ref();
const selection = ref();
const open = async (selected: any) => {
  visible.value = true;
  selection.value = selected;
  data.value = (await httpRequest()).data;
};
const confirm = () => {
  visible.value = false;
};

defineExpose({ open });
</script>

<template>
  <el-dialog v-model="visible" :title="title">
    <div class="_cascader">
      <div class="_cascader__tags">
        <el-tag v-for="e in selection" :key="e.value" class="my-1 mr-2" closable>{{ e.label }}</el-tag>
      </div>
      <el-divider />
      <div class="_cascader__list">
        <ul>
          <li v-for="(item, index) in data" :key="index">{{ item.label }}</li>
        </ul>
      </div>
    </div>
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
  &__tags {
    padding: 6px 10px;
  }
  & > .el-divider {
    margin: 0;
  }
  &__list {
    display: flex;
  }
}
</style>
