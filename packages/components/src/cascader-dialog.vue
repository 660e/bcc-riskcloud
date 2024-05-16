<script lang="ts" name="cascader-dialog" setup>
import { ref } from 'vue';
import { cloneDeep } from 'lodash';

const { httpRequest } = withDefaults(defineProps<{ title?: string; httpRequest: any }>(), { title: '' });
const emit = defineEmits(['selection']);
const visible = ref(false);
const data = ref();
const cascader = ref();
const selection = ref();

const open = async (selected: any) => {
  visible.value = true;
  data.value = (await httpRequest()).data;
  cascader.value = [data.value];
  selection.value = cloneDeep(selected);
};
const confirm = () => {
  emit('selection', cloneDeep(selection.value));
  visible.value = false;
};
const add = (item: any, index: number) => {
  if (item.children?.length) {
    cascader.value.length = index + 1;
    cascader.value[index].forEach((e: any) => (e.active = item.id === e.id));
    cascader.value[index + 1] = item.children;
  } else {
    if (selection.value.includes(item)) {
      remove(item);
    } else {
      selection.value.push(item);
    }
  }
};
const remove = (item: any) => {
  selection.value.splice(selection.value.indexOf(item), 1);
};

defineExpose({ open });
</script>

<template>
  <el-dialog v-model="visible" :title="title">
    <div class="_cascader">
      <div class="_cascader__tags">
        <el-tag v-for="e in selection" :key="e.id" @close="remove(e)" closable>{{ e.label }}</el-tag>
      </div>
      <el-divider />
      <div class="_cascader__list">
        <template v-for="(item, index) in cascader" :key="index">
          <ul>
            <li
              v-for="e in item"
              :key="e.id"
              :class="{ active: e.active, selected: selection.includes(e) }"
              @click="add(e, index)"
            >
              <span>{{ e.label }}</span>
              <el-icon v-if="e.children?.length"><ArrowRight /></el-icon>
            </li>
          </ul>
          <el-divider direction="vertical" />
        </template>
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
    padding: 10px 0 0 10px;
    .el-tag {
      margin: 0 10px 10px 0;
    }
  }
  & > .el-divider {
    margin: 0;
  }
  &__list {
    display: flex;
    ul {
      padding: 10px 0;
      min-width: 200px;
      li {
        cursor: pointer;
        line-height: 1;
        padding: 5px 10px;
        display: flex;
        justify-content: space-between;
        &:hover {
          background-color: var(--el-fill-color-light);
        }
        &.active {
          background-color: var(--el-color-primary-light-9);
        }
        &.selected {
          background-color: transparent;
          color: var(--el-color-primary);
        }
        .el-icon {
          margin-left: 20px;
        }
      }
    }
    & > .el-divider {
      height: auto;
      margin: 0;
    }
  }
}
</style>
