import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'
import el from '@/utils/el-util/index.ts'
export const userRouter:RouteRecordRaw[] = [
  {
    path:'/',
    redirect:'/login',
  },
  {
    path:'/login',
    name:'login',
    component:() => import('@/views/user/user-login.vue'),
  },
  {
    path:'/register',
    name:'register',
    component:() => import('@/views/user/user-register.vue'),
  },
  {
    path:'/find',
    name:'find',
    component:() => import('@/views/user/user-find-password.vue'),
  }
]

export const mainRouter:RouteRecordRaw[] = [
  {
    path:'/home',
    name:'home',
    redirect:'/home/utils',
    meta:{requiresAuth:true},
    component:() => import('@/views/main/utilsbox-home.vue'),
    children:[
      {
        path:'utils',
        name:'utils',
        meta:{requiresAuth:true},
        component:() => import('@/views/main/utilsbox-content.vue'),
        children:[
          {
            path:'calculate',
            name:'calculate',
            meta:{requiresAuth:true},
            component:() => import('@/views/utils/utils-calculate.vue'),
          },
          {
            path:'todolist',
            name:'todolist',
            meta:{requiresAuth:true},
            component:() => import('@/views/utils/utils-todolist.vue'),
          }
        ]
      },
      {
        path:'userCenter',
        name:'userCenter',
        meta:{requiresAuth:true},
        component:() => import('@/views/usercenter/user-index.vue'),
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...userRouter,
    ...mainRouter,
  ],
})

router.beforeEach((to, from) => {
  const token = localStorage.getItem('userToken')
  if (to.meta.requiresAuth && !token) {
    if (from.path !== '/login') {
      el.wAlert('请先登录')
    }
    return '/login'
  }
})

export default router
