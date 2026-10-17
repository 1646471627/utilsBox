import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import {computed, ref} from "vue"
import type {UserInfo} from '@/types/user.ts'
export const useUserStore = defineStore('userStore', () => {
  const token = useStorage('userToken','')
  const userInfo = ref<UserInfo | null>(null)
  const isLogin = computed(() => !!token.value)
  function logout() {
    token.value = ''
    userInfo.value = null
  }
  return {token,userInfo,logout,isLogin}
})
