<template>
  <div class="container">
    <h2 class="center">用户注册</h2>
    <el-form label-width="auto" style="max-width: 600px;">
      <el-form-item label="用户名">
        <el-input placeholder="请输入用户名" clearable v-model="username">
        </el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input placeholder="请输入密码" clearable show-password v-model="password">
        </el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input placeholder="请再次输入密码" clearable show-password v-model="rePassword">
        </el-input>
      </el-form-item>
      <div class="btn-container">
        <el-button class="btn" type="success" @click="goLogin">返回登录</el-button>
        <el-button class="btn" type="primary" @click="register">注册</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'
import {useUserStore} from "@/stores/counter.ts"
import {ref} from "vue"
import el from '@/utils/el-util/index.ts'

const username = ref('')
const password = ref('')
const rePassword = ref('')
const router = useRouter()
const u = useUserStore()
const goLogin = () => {
  username.value = ''
  password.value = ''
  rePassword.value = ''
  router.push('/login')
}
const register = () => {
  if(username.value.trim() === '') {
    el.wAlert('请输入用户名')
    return
  }
  if(password.value === '') {
    el.wAlert('请输入密码')
    return
  }
  if(rePassword.value === '') {
    el.wAlert('请输入确认密码')
    return
  }
  if(username.value.trim().length < 6 || password.value.length < 6) {
    el.wAlert('用户名和密码的长度必须大于等于6,请重新输入')
    return
  }
  if(password.value !== rePassword.value) {
    el.eAlert('两次输入的密码不一致')
    return
  }
  const ok = u.userList.some((u) => u.userName.trim() === username.value.trim())
  if(ok){
    el.eAlert('该用户名已注册,请重新输入用户名')
    return
  }
  u.userList.push({
    userName: username.value.trim(),
    password: password.value,
    remember: false
  })
  el.sAlert('注册成功,请登录')
  router.push('/login')
  username.value = ''
  password.value = ''
  rePassword.value = ''
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
