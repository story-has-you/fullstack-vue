import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import IntroView from '@/views/IntroView.vue'
import Chapter1View from '@/views/Chapter1View.vue'
import Chapter2View from '@/views/Chapter2View.vue'
import Chapter3View from '@/views/Chapter3View.vue'
import Chapter4View from '@/views/Chapter4View.vue'
import Chapter5View from '@/views/Chapter5View.vue'
import Chapter6View from '@/views/Chapter6View.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: '全栈思维跃迁 - 首页' }
    },
    {
      path: '/intro',
      name: 'intro',
      component: IntroView,
      meta: { title: '全栈思维跃迁 - 前言' }
    },
    {
      path: '/chapter/1',
      name: 'chapter1',
      component: Chapter1View,
      meta: { title: '全栈思维跃迁 - 第一章：范式转移' }
    },
    {
      path: '/chapter/2',
      name: 'chapter2',
      component: Chapter2View,
      meta: { title: '全栈思维跃迁 - 第二章：运行时环境与异步机制' }
    },
    {
      path: '/chapter/3',
      name: 'chapter3',
      component: Chapter3View,
      meta: { title: '全栈思维跃迁 - 第三章：组件化架构' }
    },
    {
      path: '/chapter/4',
      name: 'chapter4',
      component: Chapter4View,
      meta: { title: '全栈思维跃迁 - 第四章：状态管理设计' }
    },
    {
      path: '/chapter/5',
      name: 'chapter5',
      component: Chapter5View,
      meta: { title: '全栈思维跃迁 - 第五章：渲染模式演进' }
    },
    {
      path: '/chapter/6',
      name: 'chapter6',
      component: Chapter6View,
      meta: { title: '全栈思维跃迁 - 第六章：工程化体系' }
    },
    // 后续添加章节路由
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

// 路由守卫：更新页面标题
router.beforeEach((to, from, next) => {
  document.title = (to.meta.title as string) || '全栈思维跃迁'
  next()
})

export default router
