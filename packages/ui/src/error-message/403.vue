<template>
  <div class="error-message">
    <div>
      <img src="./assets/403.png" />
      <div>
        <h1>403</h1>
        <div>抱歉，您无权访问该页面</div>
        <el-button @click="$router.back" type="primary">返回上一页</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
