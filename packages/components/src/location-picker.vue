<script lang="ts" name="location-picker" setup>
import { nextTick, reactive, ref } from 'vue';
import { Location } from '@element-plus/icons-vue';
import { MapClass, T, TDT } from '@bcc/utils';

let M: any;
const MapUtils: MapClass = new MapClass();

const emit = defineEmits(['update:model-value', 'update:lnglat']);
const props = defineProps<{ modelValue: string; lnglat: TDT.LngLat }>();
const forms = reactive<{ lnglat: TDT.LngLat; location: string }>({ lnglat: [0, 0], location: '' });

const visible = ref(false);
const open = async () => {
  visible.value = true;
  forms.lnglat = props.lnglat;
  forms.location = props.modelValue;

  await nextTick();
  if (!M) {
    const geocode = new T.Geocoder();
    M = MapUtils.Init('map', forms.lnglat, 16);
    M.addOverLay(MapUtils.Marker(forms.lnglat));
    M.addEventListener('click', ({ lnglat }) => {
      forms.lnglat = [lnglat.lng, lnglat.lat];
      M.clearOverLays();
      M.addOverLay(MapUtils.Marker(forms.lnglat));
      geocode.getLocation(lnglat, (result: any) => {
        forms.location = result.formatted_address;
      });
    });
  }
};
const confirm = () => {
  emit('update:model-value', forms.location);
  emit('update:lnglat', forms.lnglat);
  visible.value = false;
};
</script>

<template>
  <div class="location-picker">
    <el-input v-model="$props.modelValue" readonly>
      <template #append>
        <el-button :icon="Location" @click="open" />
      </template>
    </el-input>
    <el-dialog v-model="visible" width="80%" align-center>
      <div class="map" id="map">Lorem ipsum dolor sit amet.</div>
      <template #footer>
        <div class="dialog-footer">
          <div>经纬度：{{ forms.lnglat.join(', ') }}</div>
          <div>位置：{{ forms.location }}</div>
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
@import '@bcc/utils/styles/tianditu.scss';
.location-picker {
  width: 100%;
  .map {
    height: 80vh;
  }
  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    & > div {
      margin-right: 20px;
    }
  }
}
</style>
