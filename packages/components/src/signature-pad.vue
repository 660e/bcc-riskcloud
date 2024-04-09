<script lang="ts" name="signature-pad" setup>
import SignaturePad from 'signature_pad';

let signaturePad: any;
let canvas: HTMLCanvasElement;

const resizeCanvas = () => {
  const ratio = Math.max(window.devicePixelRatio || 1, 1);

  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  canvas.getContext('2d')?.scale(ratio, ratio);

  clear();
};

const init = () => {
  canvas = document.querySelector('#signature-pad')!;
  signaturePad = new SignaturePad(canvas);

  resizeCanvas();
};
const undo = () => {
  const data = signaturePad.toData();
  if (data) {
    data.pop();
    signaturePad.fromData(data);
  }
};
const clear = () => signaturePad.clear();
const isEmpty = () => signaturePad.isEmpty();
const toData = () => signaturePad.toData();
const toDataURL = () => signaturePad.toDataURL();

defineExpose({ init, undo, clear, isEmpty, toData, toDataURL });
</script>

<template>
  <div class="signature-pad">
    <canvas id="signature-pad"></canvas>
  </div>
</template>

<style lang="scss" scoped>
.signature-pad > canvas {
  height: 100%;
  width: 100%;
}
</style>
