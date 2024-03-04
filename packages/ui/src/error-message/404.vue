<template>
  <div class="error-message">
    <div>
      <img src="./assets/404.png" />
      <div>
        <h1>404</h1>
        <div>抱歉，您访问的页面不存在</div>
        <el-button @click="$router.back" type="primary">返回上一页</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
