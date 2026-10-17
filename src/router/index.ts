import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'

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
    component:() => import('@/views/main/utilsbox-home.vue'),
    children:[
      {
        path:'utils',
        name:'utils',
        component:() => import('@/views/main/utilsbox-content.vue'),
        children:[
          {
            path:'calculate',
            name:'calculate',
            component:() => import('@/views/utils/utils-calculate.vue'),
          }
        ]
      },
      {
        path:'userCenter',
        name:'userCenter',
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

export default router
