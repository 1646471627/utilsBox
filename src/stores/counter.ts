import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { UserInfo, UserLogin } from '@/types/user.ts'

export const useUserStore = defineStore('userStore', () => {
  const token = useStorage('userToken', '')
  const userInfo = useStorage<UserInfo | null>('userInfo',null)

  const userList = useStorage<UserLogin[]>('userForm', [{
    userName: 'admin',
    password: '123456',
    remember: false,
  }])
  /**
   * 登出
   */
  function logout() {
    token.value = ''
    userInfo.value = null
  }

  return { token, userInfo, userList, logout }
})
