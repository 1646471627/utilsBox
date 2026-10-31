<template>
  <div class="utils-common">
    <!-- 面包屑 -->
    <div class="top-box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>工具箱</el-breadcrumb-item>
      </el-breadcrumb>
      <span><span style="font-style:italic">当前用户:{{ user }}</span></span>
      <span @click="exit" class="exit">退出登录</span>
    </div>

    <!-- 工具切换卡片 -->
    <div class="utils-nav">
      <el-radio-group
        v-model="activeTool"
        @change="handleToolChange"
        class="tool-group"
      >
        <el-radio-button value="calculate">
          <div class="tool-card">
            <el-icon :size="28"><Odometer /></el-icon>
            <span>计算器</span>
          </div>
        </el-radio-button>
        <el-radio-button value="todolist">
          <div class="tool-card">
            <el-icon :size="28"><List /></el-icon>
            <span>待办事项表</span>
          </div>
        </el-radio-button>
      </el-radio-group>
    </div>

    <!-- 子路由出口 -->
    <div class="utils-content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/counter.ts'
import { useRoute, useRouter } from 'vue-router'
import { Odometer, List } from '@element-plus/icons-vue'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const user = computed(() => {
  return userStore.userInfo?.userName || '未知用户'
})

// 从路由推导当前选中项（刷新/直接访问子路由也能正确高亮）
const activeTool = computed(() => {
  return route.name === 'todolist' ? 'todolist' : 'calculate'
})

const handleToolChange = (val: string | number | boolean | undefined) => {
  router.push(`/home/utils/${val}`)
}

const exit = () => {
  ElMessage.success('退出登录成功')
  userStore.logout()
  router.push('/login')
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

  :deep(.tool-group) {
    display: flex;
    gap: 20px;
  }

  :deep(.el-radio-button) {
    width: 120px;
    height: 110px;

    .el-radio-button__inner {
      width: 100%;
      height: 100%;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      border: 1px solid #dcdfe6;
      box-shadow: none;
      transition: all 0.2s;
    }

    &:first-child .el-radio-button__inner,
    &:last-child .el-radio-button__inner {
      border-radius: 8px;
    }

    // 选中态
    &.is-active .el-radio-button__inner {
      border-color: #409eff;
      background: #ecf5ff;
      color: #409eff;
      box-shadow: 0 4px 12px rgba(64, 158, 255, 0.15);
    }

    // hover 态
    &:hover .el-radio-button__inner {
      border-color: #409eff;
      color: #409eff;
    }
  }

  .tool-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    font-size: 14px;
  }
}
.utils-content {
  padding: 16px;
}
.top-box {
  display: flex;
  justify-content: space-between;
  .exit {
    color: #409eff;
    cursor: pointer;
    font-size: 14px;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
