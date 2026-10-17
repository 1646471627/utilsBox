<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <el-menu
        router
        class="layout-menu"
        :default-active="$route.path"
      >
        <el-menu-item index="/home/utils">
          <el-icon><Box/></el-icon>
          <span>工具箱</span>
        </el-menu-item>
        <el-menu-item index="/home/userCenter">
          <el-icon><User/></el-icon>
          <span>个人中心</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import {Box,User} from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
}
.layout-menu {
  height: 100%;

}
.layout-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--el-border-color-light);
}
</style>
