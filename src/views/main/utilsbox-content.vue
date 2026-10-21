<template>
  <div class="utils-common">
    <!-- 面包屑 -->
    <div class="top-box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>工具箱</el-breadcrumb-item>
      </el-breadcrumb>
      <span><span style="font-style:italic">当前用户:{{user}}</span></span>
      <span @click="exit" class="exit">退出登录</span>
    </div>


    <!-- 工具切换按钮 -->
    <div class="utils-nav">
      <el-button
        type="primary"
        @click="$router.push('/home/utils/calculate')"
      >
        计算器
      </el-button>
      <el-button
        type="primary"
        @click="$router.push('/home/utils/todolist')"
      >
        待办事项表
      </el-button>
    </div>

    <!-- 子路由出口 -->
    <div class="utils-content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
  import {computed} from 'vue'
  import {ElMessage} from "element-plus"
  import {useUserStore} from "@/stores/counter.ts"
  import {useRouter} from "vue-router"

  const userStore = useUserStore()
  const router = useRouter()


  const user = computed(() => {
    return userStore.userInfo?.userName || '未知用户'
  })
  const exit = () => {
    ElMessage.success('退出登录成功')
    router.push('/login')
    userStore.logout()
  }
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
.top-box{
  display: flex;
  justify-content: space-between;
  .exit{
    color: #409eff;
    cursor: pointer;
    font-size: 14px;
    &:hover{
      text-decoration: underline;
    }
  }
}
</style>
