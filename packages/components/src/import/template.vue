<script lang="ts" name="import-template" setup>
import { ref } from 'vue';
import { saveAs } from 'file-saver';
import { UploadInstance, ElMessage } from 'element-plus';

const $emit = defineEmits(['confirm']);

const visible = ref(false);
const options = ref();
const updateSupport = ref(false);
const uploadRef = ref<UploadInstance>();
const fileList = ref();

const open = (params: any) => {
  visible.value = true;
  options.value = params;
};
const download = async () => {
  const blob: any = await options.value.templateApi();
  saveAs(blob, options.value.templateName);
};
const confirm = () => uploadRef.value!.submit();
const httpRequest = () => options.value.importApi(updateSupport.value, { file: fileList.value[0].raw });
const onSuccess = (response: any) => {
  fileList.value = [];
  $emit('confirm');
  ElMessage({
    type: 'success',
    dangerouslyUseHTMLString: true,
    message: response.msg
  });
  visible.value = false;
};

defineExpose({ open });
</script>

<template>
  <el-dialog v-model="visible" title="导入模板" width="400">
    <div class="upload-panel">
      <el-upload
        v-model:file-list="fileList"
        :auto-upload="false"
        :limit="1"
        :http-request="httpRequest"
        :on-success="onSuccess"
        accept=".xls, .xlsx"
        action="#"
        ref="uploadRef"
        drag
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">将文件拖到此处，或点击上传</div>
        <template #tip>
          <div class="tip">
            <span>仅允许上传xls、xlsx格式文件</span>
            <el-checkbox v-model="updateSupport" label="覆盖原数据" size="small" />
          </div>
        </template>
      </el-upload>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="download" type="success">下载模板</el-button>
        <div></div>
        <el-button @click="visible = false">取消</el-button>
        <el-button @click="confirm" type="primary">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.upload-panel {
  padding: 10px;
  :deep(.tip) {
    font-size: 12px;
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-checkbox {
      height: auto;
    }
  }
  :deep(.el-upload-list) {
    .el-upload-list__item {
      margin: 0;
    }
  }
}
.dialog-footer {
  display: flex;
  & > div {
    flex: 1;
  }
}
</style>
