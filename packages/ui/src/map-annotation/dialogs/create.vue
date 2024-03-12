<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { FormInstance, FormRules } from 'element-plus';

const $emit = defineEmits(['confirm']);

const visible = ref(false);
const formsRef = ref<FormInstance>();
const forms = ref({
  lnglat: [0, 0],
  type: '',
  subtype: '',
  name: ''
});
const rules = reactive<FormRules>({
  type: [{ required: false, message: '请选择敏感目标类型', trigger: 'change' }],
  subtype: [{ required: false, message: '请选择敏感目标子类型', trigger: 'change' }],
  name: [{ required: true, message: '请填写敏感目标名称', trigger: 'blur' }]
});

const open = (lnglat: any) => {
  visible.value = true;
  forms.value.lnglat = [lnglat.lng, lnglat.lat];
};
const closed = () => formsRef.value?.resetFields();
const confirm = () => {
  formsRef.value?.validate(valid => {
    if (valid) {
      $emit('confirm', JSON.parse(JSON.stringify(forms.value)));
      visible.value = false;
    }
  });
};

defineExpose({ open });
</script>

<template>
  <el-dialog v-model="visible" @closed="closed" title="添加敏感目标" width="500" align-center draggable>
    <el-form :model="forms" :rules="rules" label-width="130" ref="formsRef">
      <el-form-item label="地理经纬度" prop="lnglat">
        <div>{{ forms.lnglat.join(', ') }}</div>
      </el-form-item>
      <el-form-item label="敏感目标类型" prop="type">
        <el-select v-model="forms.type"></el-select>
      </el-form-item>
      <el-form-item label="敏感目标子类型" prop="subtype">
        <el-select v-model="forms.subtype"></el-select>
      </el-form-item>
      <el-form-item label="敏感目标名称" prop="name">
        <el-input v-model="forms.name" />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button @click="confirm" type="primary">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.el-form {
  padding: 20px 20px 0;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
