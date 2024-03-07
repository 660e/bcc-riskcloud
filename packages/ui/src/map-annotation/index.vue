<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { ElMessage } from 'element-plus';
import { Map, TLngLat } from '@bcc/utils';

const $props = defineProps<{
  company: any;
}>();

const active = ref(0);

let M: any;
const contextMenu = [
  {
    text: '获取当前坐标',
    callback: (lnglat: any) => {
      const text = `${lnglat.lng}, ${lnglat.lat}`;
      navigator.clipboard.writeText(text).then(() => ElMessage.success(text));
    }
  }
];

watchEffect(() => {
  if ($props.company.lnglat) {
    const { lnglat, radius }: { lnglat: TLngLat; radius: number } = $props.company;
    M = new Map();
    M.Init({ el: 'map', center: lnglat, zoom: 17 });
    M.ContextMenu({ contextMenu, width: 150 });
    M.Marker({ lnglat, type: 'primary' });
    M.Circle({ lnglat, radius });
  }
});
</script>

<template>
  <div class="map-annotation">
    <div class="map-annotation__points">
      <el-tabs v-model="active" stretch>
        <el-tab-pane label="未标注" :name="0">
          <div style="height: 2000px">未标注</div>
        </el-tab-pane>
        <el-tab-pane label="已标注" :name="1">已标注</el-tab-pane>
      </el-tabs>
      <el-divider direction="vertical" />
    </div>
    <div id="map"></div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
