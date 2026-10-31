<template>
  <div class="container">
    <h2 class="center">找回密码</h2>
    <el-form label-width="auto" style="max-width: 600px;">
      <el-form-item label="用户名">
        <el-input placeholder="请输入用户名" clearable v-model="username" @input="flag = false"></el-input>
        <p v-show="flag" class="unregistered-tip">此用户尚未注册&nbsp;<span @click="goRegister">去注册</span></p>
      </el-form-item>
      <el-form-item label="旧密码">
        <el-input placeholder="请输入旧密码" clearable show-password v-model="oldPassword">
        </el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input placeholder="请输入新密码" clearable show-password v-model="newPassword">
        </el-input>
      </el-form-item>
      <div class="btn-container">
        <el-button class="btn" type="success" @click="goLogin">返回登录</el-button>
        <el-button class="btn" type="primary" @click="changePassword">更改密码</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'
import {useUserStore} from "@/stores/counter.ts"
import {ref} from "vue";
import el from '@/utils/el-util/index.ts'

const username = ref('')
const oldPassword = ref('')
const newPassword = ref('')
const router = useRouter()
const u = useUserStore()
const flag = ref(false)
const goLogin = () => {
  router.push('/login')
}


const changePassword = () => {
  flag.value = false
  if(username.value.trim() === '') {
    el.wAlert('请输入用户名')
    return
  }
  if(oldPassword.value === '') {
    el.wAlert('请输入旧密码')
    return
  }
  if(newPassword.value === '') {
    el.wAlert('请输入新密码')
    return
  }
  if (newPassword.value.length < 6) {
    el.wAlert('新密码长度必须大于等于6')
    return
  }
  const user = u.userList.find(item => item.userName === username.value.trim())
  if (!user) {
    flag.value = true
    return   // 用户不存在，必须 return，否则后面会继续往下走
  }
  if (user.password !== oldPassword.value) {
    el.eAlert('旧密码错误')
    return
  }
  if (user.password === newPassword.value) {
    el.wAlert('新密码不能与原密码相同')
    return
  }
  user.password = newPassword.value
  el.sAlert('修改密码成功,请重新登录')
  goLogin()
}
const goRegister = () => {
  flag.value = false
  router.push('/register')
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
.unregistered-tip{
  padding: 0;
  margin: 0;
  color: red;
  span{
    font-style: italic;
    color: #4a90d9;
    &:hover{
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
