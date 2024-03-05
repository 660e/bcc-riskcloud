<template>
  <div class="error-message">
    <div>
      <img src="../assets/images/500.png" />
      <div>
        <h1>500</h1>
        <div>抱歉，您的网络不见了</div>
        <el-button @click="$router.back" type="primary">返回上一页</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
