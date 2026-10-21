<template>
  <div class="container">
    <h2 class="center">用户登录</h2>
    <el-form label-width="auto" style="max-width: 600px;">
      <el-form-item label="用户名">
        <el-input placeholder="请输入用户名" clearable v-model="username">
        </el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input placeholder="请输入密码" clearable show-password v-model="password">
        </el-input>
      </el-form-item>
      <el-form-item label="记住我">
        <div class="box">
          <el-switch v-model="remember"></el-switch>
          <span class="forget" @click="toForgot">忘记密码？</span>
        </div>
      </el-form-item>
      <div class="btn-container">
        <el-button class="btn" type="success" @click="toLogin">登录</el-button>
        <el-button class="btn" type="primary" @click="toRegister">去注册</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/counter.ts'
import { useRouter } from 'vue-router'
import el from '@/utils/el-util/index.ts'
const username = ref('')
const password = ref('')
const remember = ref(false)

const u = useUserStore()
const router = useRouter()

const toLogin = () => {
  if (username.value === '' || password.value === '') {
    el.wAlert('请输入用户名和密码')
    return
  }

  const found = u.userList.find(
    (u) => u.userName.trim() === username.value.trim() &&
      u.password === password.value
  )

  if (!found) {
    el.eAlert('用户名或密码错误')
    return
  }

  u.token = 'mock-token-' + found.userName
  u.userInfo = {
    id: '1',
    userName: found.userName,
    nickname: found.userName,
    avatar: '',
  }

  el.sAlert('登录成功')
  router.push('/home')
  username.value = ''
  password.value = ''
}

const toRegister = () => {
  router.push('/register')
}

const toForgot = () => {
  router.push('/find')
}
</script>

<style lang="scss" scoped>
@use '../../css/variables' as v;

.container {
  @include v.container;
}

.center {
  text-align: center;
}

.btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;

  .btn {
    width: 200px;
    height: 40px;
  }
}

.box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .forget {
    color: #409eff;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
