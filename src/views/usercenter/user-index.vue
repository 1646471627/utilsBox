<template>
  <el-breadcrumb separator="/" class="breadcrumb">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>个人中心</el-breadcrumb-item>
  </el-breadcrumb>
  <span class="title">个人中心</span>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
  .title{
    font-weight: bold;
    font-size: 20px;
  }
  .breadcrumb{
    margin-bottom: 16px ;
  }
</style>
