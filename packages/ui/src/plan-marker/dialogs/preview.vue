<script lang="ts" setup>
import { ref } from 'vue';
import { TDT } from '@bcc/utils';
import { useWrapperFit } from '../hooks';
import { legend } from '../../assets/option';
import html2canvas from 'html2canvas';

interface RiskSource {
  id: number;
  label: string;
  type?: TDT.Icon;
  position?: [number, number] | undefined;
}

const visible = ref(false);
const riskSources = ref<RiskSource[]>([]);

const open = (sources: RiskSource[]) => {
  riskSources.value = sources.filter(source => source.position);
  visible.value = true;
};

const markerStyle = (position: [number, number] | undefined) => {
  return position ? { top: `${position[1]}%`, left: `${position[0]}%` } : { display: 'none' };
};

const screenRef = ref();
const screenshot = () => {
  html2canvas(screenRef.value).then(canvas => {
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'screenshot.png';
    link.href = image;
    link.click();
  });
};

// 平面图自适应
const wrapperRef = ref();
const imgRef = ref();
const { fit, wrapperStyle } = useWrapperFit(wrapperRef, imgRef);

defineExpose({ open });
</script>

<template>
  <el-dialog v-model="visible" title="预览" class="preview-dialog" fullscreen>
    <div class="dialog-body" ref="screenRef">
      <div class="plan-marker__wrapper" ref="wrapperRef">
        <div :style="wrapperStyle">
          <img :style="wrapperStyle" @load="fit" src="../../assets/bg.jpg" ref="imgRef" />
          <div class="plan-marker__container">
            <div
              v-for="(r, i) in riskSources"
              :key="r.id"
              :data-id="r.id"
              :style="markerStyle(r.position)"
              class="plan-marker__location"
            >
              <span :style="{ color: legend.find(l => l.type === r.type)?.color }">{{ i + 1 }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="plan-marker__sidebar">
        <dl v-for="item in legend" :key="item.color">
          <dt v-if="riskSources.filter(r => r.type === item.type).length" :style="{ backgroundColor: item.color }">
            {{ item.name }}
          </dt>
          <dd v-for="r in riskSources.filter(r => r.type === item.type)" :key="r.id">
            {{ riskSources.findIndex(e => e.id === r.id) + 1 }}. {{ r.label }}
          </dd>
        </dl>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="visible = false">关闭</el-button>
        <el-button @click="screenshot" type="primary">截图</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
@import '../index.scss';

.dialog-body {
  flex: 1;
  display: flex;
  .plan-marker__sidebar {
    width: auto;
    min-width: 200px;
    display: block;
    padding: 10px;
    dl {
      font-size: 12px;
      dt {
        color: #fff;
        border-radius: 4px;
        line-height: 1;
        padding: 5px 10px;
        margin-bottom: 5px;
        text-align: center;
      }
      dd {
        line-height: 1;
        padding-bottom: 5px;
      }
    }
  }
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
