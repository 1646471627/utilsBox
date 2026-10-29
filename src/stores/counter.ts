import { defineStore } from 'pinia'
import { useStorage, type Serializer } from '@vueuse/core'
import type { UserInfo, UserLogin } from '@/types/user.ts'


const userInfoSerializer: Serializer<UserInfo | null> = {
  read: (raw: string) => {
    try {
      const parsed = JSON.parse(raw) as UserInfo | null
      return parsed && typeof parsed === 'object' ? parsed : null
    } catch {
      return null
    }
  },
  write: (value: UserInfo | null) => JSON.stringify(value ?? null),
}

export const useUserStore = defineStore('userStore', () => {
  const token = useStorage('userToken', '')
  const userInfo = useStorage<UserInfo | null>('userInfo', null, undefined, {
    serializer: userInfoSerializer,
  })

  const userList = useStorage<UserLogin[]>('userForm', [{
    userName: 'admin',
    password: '123456',
    remember: false,
  }])


  function restoreUserInfo() {
    if (userInfo.value || !token.value) return

    const userName = token.value.replace(/^mock-token-/, '').trim()
    if (!userName) return

    userInfo.value = {
      id: '1',
      userName,
      nickname: userName,
      avatar: '',
    }
  }

  restoreUserInfo()

  /**
   * 登出
   */
  function logout() {
    token.value = ''
    userInfo.value = null
  }

  return { token, userInfo, userList, logout }
})
