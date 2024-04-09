<template>
  <div class="icon-select-component">
    <el-input
      ref="inputRef"
      v-model="valueIcon"
      v-bind="$attrs"
      :placeholder="placeholder"
      :clearable="clearable"
      @clear="clearIcon"
      @click="openDialog"
    >
      <template #prepend>
        <el-icon><component :is="customIcons[iconValue]"></component></el-icon>
      </template>
    </el-input>
    <el-dialog
      v-model="dialogVisible"
      :title="placeholder"
      @closed="closed"
      top="50px"
      width="66%"
      class="icon-select-dialog-component"
      align-center
      append-to-body
    >
      <el-input v-model="inputValue" placeholder="搜索图标" size="large" :prefix-icon="Icons.Search" clearable />
      <el-scrollbar v-if="Object.keys(iconsList).length">
        <div class="icon-list">
          <div v-for="item in iconsList" :key="item" class="icon-item" @click="selectIcon(item)">
            <component :is="item"></component>
            <span>{{ item.name }}</span>
          </div>
        </div>
      </el-scrollbar>
      <el-empty v-else description="未搜索到您要找的图标~" />
    </el-dialog>
  </div>
</template>

<script lang="ts" name="icon-select" setup>
import { ref, computed, watchEffect } from 'vue';
import * as Icons from '@element-plus/icons-vue';

interface SelectIconProps {
  iconValue: string;
  title?: string;
  clearable?: boolean;
  placeholder?: string;
}

const props = withDefaults(defineProps<SelectIconProps>(), {
  iconValue: '',
  title: '请选择图标',
  clearable: true,
  placeholder: '请选择图标'
});

// 重新接收一下，防止打包后 clearable 报错
const valueIcon = ref(props.iconValue);

// open Dialog
const dialogVisible = ref(false);
const openDialog = () => (dialogVisible.value = true);

// 选择图标(触发更新父组件数据)
const emit = defineEmits<{
  'update:iconValue': [value: string];
}>();
const selectIcon = (item: any) => {
  dialogVisible.value = false;
  valueIcon.value = item.name;
  emit('update:iconValue', item.name);
  setTimeout(() => inputRef.value.blur(), 0);
};

// 清空图标
const inputRef = ref();
const clearIcon = () => {
  valueIcon.value = '';
  emit('update:iconValue', '');
  setTimeout(() => inputRef.value.blur(), 0);
};

// 监听搜索框值
const inputValue = ref('');
const customIcons: { [key: string]: any } = Icons;
const iconsList = computed((): { [key: string]: any } => {
  if (!inputValue.value) return Icons;
  let result: { [key: string]: any } = {};
  for (const key in customIcons) {
    if (key.toLowerCase().indexOf(inputValue.value.toLowerCase()) > -1) result[key] = customIcons[key];
  }
  return result;
});

const closed = () => {
  inputValue.value = '';
};

watchEffect(() => {
  valueIcon.value = props.iconValue;
});
</script>

<style lang="scss">
.icon-select-component {
  width: 100%;
}
.icon-select-dialog-component .el-dialog__body {
  padding: 20px;
  .el-input {
    margin-bottom: 10px;
  }
  .icon-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, 115px);
    justify-content: space-evenly;
    max-height: 70vh;
    .icon-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 0;
      cursor: pointer;
      transition: all 0.2s;
      svg {
        height: 32px;
        width: 32px;
      }
      &:hover {
        background-color: var(--el-color-primary);
        color: #fff;
      }
      span {
        margin-top: 5px;
        text-align: center;
        font-size: 12px;
      }
    }
  }
}
</style>
