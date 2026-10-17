<template>
  <div class="utils-common">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>工具箱</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 工具切换按钮 -->
    <div class="utils-nav">
      <el-button
        type="primary"
        @click="$router.push('/home/utils/calculate')"
      >
        计算器
      </el-button>
    </div>

    <!-- 子路由出口 -->
    <div class="utils-content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.utils-common {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.utils-nav {
  display: flex;
  gap: 8px;
}
.utils-content {
  padding: 16px;
}
</style>
