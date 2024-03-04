<template>
  <div class="h-screen flex justify-center items-center">
    <div class="flex items-center space-x-10">
      <img src="@/assets/images/403.png" />
      <div class="text-gray-600 space-y-5">
        <div class="text-6xl">403</div>
        <div>抱歉，您无权访问该页面</div>
        <el-button @click="$router.back" type="primary">返回上一页</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" name="403" setup></script>
