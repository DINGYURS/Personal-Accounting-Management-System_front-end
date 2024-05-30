import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/LoginPage.vue')
    }, // 登录页面
    {
      path: '/',
      component: () => import('@/views/layout/LayoutPage.vue'),
      redirect: '/user',
      children: [
        {
          path: '/home',
          component: () => import('@/views/layout/Home.vue')
        },
        {
          path: '/homework',
          component: () => import('@/views/homework/ten.vue')
        },
        {
          path: '/layout',
          component: () => import('@/views/container/OverallLayout.vue')
        },
        {
          path: '/message',
          component: () => import('@/views/layout/Message.vue')
        },
        {
          path: '/student',
          component: () => import('@/views/student/StudentPage.vue')
        },
        {
          path: '/article/:words?',
          component: () => import('@/views/article/ArticlePage.vue'),
          children: [
            {
              path: '/article/channel',
              component: () => import('@/views/article/ArticleChannel.vue')
            },
            {
              path: '/article/manage',
              component: () => import('@/views/article/ArticleManage.vue')
            }
          ]
        },
        {
          path: '/user',
          component: () => import('@/views/user/UserPage.vue'),
          children: [
            {
              path: '/user/info',
              component: () => import('@/views/user/AccountInfo.vue')
            },
            {
              path: '/user/screen',
              component: () => import('@/views/user/DataDisplay.vue')
            }
          ]
        },
        // 添加 catch-all 路由
        {
          path: '/:pathMatch(.*)',
          redirect: '/404' // 重定向到 404 页面
        }
      ]
    },
    // 添加 404 页面路由
    {
      path: '/404',
      component: () => import('@/views/error/404.vue')
    }
  ]
})

// 登录访问拦截
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  console.log('Token:', userStore.token, 'Path:', to.path)
  if (!userStore.token && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

export default router
