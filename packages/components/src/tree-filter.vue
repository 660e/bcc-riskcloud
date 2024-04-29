<template>
  <div class="tree-filter card">
    <h4 v-if="title">{{ title }}</h4>
    <div class="tree-filter__filter">
      <el-input v-model="filterText" placeholder="输入关键字进行过滤" clearable />
      <el-button :icon="Refresh" @click="refresh" circle />
    </div>
    <el-scrollbar :style="{ height: title ? `calc(100% - 38px - ${inputSize}px)` : `calc(100% - 10px - ${inputSize}px)` }">
      <el-tree
        ref="treeRef"
        default-expand-all
        :node-key="id"
        :data="multiple ? treeData : treeAllData"
        :show-checkbox="multiple"
        :check-strictly="false"
        :current-node-key="!multiple ? selected : ''"
        :highlight-current="!multiple"
        :expand-on-click-node="false"
        :check-on-click-node="multiple"
        :props="defaultProps"
        :filter-node-method="filterNode"
        :default-checked-keys="multiple ? selected : []"
        @node-click="handleNodeClick"
        @check="handleCheckChange"
      >
        <template #default="scope">
          <span class="el-tree-node__label">
            <slot :row="scope">
              {{ scope.node.label }}
            </slot>
          </span>
        </template>
      </el-tree>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" name="tree-filter" setup>
import { computed, ref, watch, onBeforeMount, nextTick } from 'vue';
import { ElTree, useGlobalSize } from 'element-plus';
import { Refresh } from '@element-plus/icons-vue';

// 接收父组件参数并设置默认值
interface TreeFilterProps {
  requestApi?: (data?: any) => Promise<any>; // 请求分类数据的 api ==> 非必传
  data?: { [key: string]: any }[]; // 分类数据，如果有分类数据，则不会执行 api 请求 ==> 非必传
  title?: string; // treeFilter 标题 ==> 非必传
  id?: string; // 选择的id ==> 非必传，默认为 “id”
  label?: string; // 显示的label ==> 非必传，默认为 “label”
  multiple?: boolean; // 是否为多选 ==> 非必传，默认为 false
  defaultValue?: any; // 默认选中的值 ==> 非必传
}
const props = withDefaults(defineProps<TreeFilterProps>(), {
  id: 'id',
  label: 'label',
  multiple: false
});

const defaultProps = {
  children: 'children',
  label: props.label
};

const size = useGlobalSize();
const inputSize = computed(() => {
  switch (size.value) {
    case 'small':
      return 24;
    case 'large':
      return 40;
    default:
      return 32;
  }
});
const treeRef = ref<InstanceType<typeof ElTree>>();
const treeData = ref<{ [key: string]: any }[]>([]);
const treeAllData = ref<{ [key: string]: any }[]>([]);

const selected = ref();
const setSelected = () => {
  if (props.multiple) selected.value = Array.isArray(props.defaultValue) ? props.defaultValue : [props.defaultValue];
  else selected.value = typeof props.defaultValue === 'string' ? props.defaultValue : '';
};

const refresh = async () => {
  if (props.requestApi) {
    const { data } = await props.requestApi!();
    treeData.value = data;
    treeAllData.value = [{ id: '', [props.label]: '全部' }, ...data];
  }
};

onBeforeMount(() => {
  setSelected();
  refresh();
});

// 使用 nextTick 防止打包后赋值不生效，开发环境是正常的
watch(
  () => props.defaultValue,
  () => nextTick(() => setSelected()),
  { deep: true, immediate: true }
);

watch(
  () => props.data,
  () => {
    if (props.data?.length) {
      treeData.value = props.data;
      treeAllData.value = [{ id: '', [props.label]: '全部' }, ...props.data];
    }
  },
  { deep: true, immediate: true }
);

const filterText = ref('');
watch(filterText, val => {
  treeRef.value!.filter(val);
});

// 过滤
const filterNode = (value: string, data: { [key: string]: any }, node: any) => {
  if (!value) return true;
  let parentNode = node.parent,
    labels = [node.label],
    level = 1;
  while (level < node.level) {
    labels = [...labels, parentNode.label];
    parentNode = parentNode.parent;
    level++;
  }
  return labels.some(label => label.indexOf(value) !== -1);
};

// emit
const emit = defineEmits<{
  change: [value: any];
}>();

// 单选
const handleNodeClick = (data: { [key: string]: any }) => {
  if (props.multiple) return;
  emit('change', data[props.id]);
};

// 多选
const handleCheckChange = () => {
  emit('change', treeRef.value?.getCheckedKeys());
};

// 暴露给父组件使用
defineExpose({ treeData, treeAllData, treeRef, refresh });
</script>

<style lang="scss" scoped>
.tree-filter {
  padding: 1.25rem;
  & > h4 {
    line-height: 1;
    font-size: 1.125rem;
    margin-bottom: 0.625rem;
  }
  &__filter {
    padding-bottom: 0.625rem;
    display: flex;
    .el-input {
      margin-right: 10px;
    }
  }
  :deep(.el-tree) {
    .el-tree-node__content {
      height: 32px;
    }
    &.el-tree--highlight-current {
      .el-tree-node.is-current > .el-tree-node__content {
        background-color: var(--el-color-primary);
        .el-tree-node__label,
        .el-tree-node__expand-icon {
          color: white;
        }
        .is-leaf {
          color: transparent;
        }
      }
    }
  }
}
</style>
