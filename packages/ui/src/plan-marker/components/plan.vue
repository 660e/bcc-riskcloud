<script lang="ts" setup></script>

<template>
  <div class="plan-marker__wrapper" ref="wrapperRef">
    <!-- <div :style="wrapperStyle">
      <img
        :style="wrapperStyle"
        @load="fit"
        src="https://img.zcool.cn/community/01ed1b603f20cc11013ef90f5a9146.jpg@1280w_1l_2o_100sh.jpg"
        ref="imgRef"
      />
      <div :ondragover="ondragover" :ondrop="ondrop" id="container" ref="containerRef" class="plan-marker__container">
        <div
          v-for="r in riskSources"
          :key="r.id"
          :data-id="r.id"
          :style="markerStyle(r.position)"
          :ondragstart="ondragstart"
          :class="[`plan-marker__marker--${r.type}`]"
          data-type="marker"
          draggable="true"
          class="plan-marker__marker"
        ></div>
      </div>
    </div> -->
    <div>Lorem ipsum dolor sit amet.</div>
  </div>
</template>

<style lang="scss" scoped>
.plan-marker {
  &__wrapper {
    flex: 1;
    background-color: #999;
    display: flex;
    justify-content: center;
    align-items: center;
    & > div {
      opacity: 0;
      transition: opacity 0.3s;
      position: relative;
    }
  }
  &__container {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }
  &__marker {
    height: 41px;
    width: 25px;
    transform: translate(-12.5px, -41px);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
  }
  &__marker--danger {
    background: url(@bcc/utils/src/assets/tianditu/marker-danger.svg);
  }
  &__marker--primary {
    background: url(@bcc/utils/src/assets/tianditu/marker-primary.svg);
  }
  &__marker--success {
    background: url(@bcc/utils/src/assets/tianditu/marker-success.svg);
  }
  &__marker--warning {
    background: url(@bcc/utils/src/assets/tianditu/marker-warning.svg);
  }
}
</style>
