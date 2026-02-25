import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import IntroView from '@/views/IntroView.vue'
import Chapter1View from '@/views/Chapter1View.vue'
import Chapter2View from '@/views/Chapter2View.vue'
import Chapter3View from '@/views/Chapter3View.vue'
import Chapter4View from '@/views/Chapter4View.vue'
import Chapter5View from '@/views/Chapter5View.vue'
import Chapter6View from '@/views/Chapter6View.vue'
import EpilogueView from '@/views/EpilogueView.vue'

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
      meta: { title: '全栈思维跃迁 - 前言：公式与认知基线' }
    },
    {
      path: '/chapter/1',
      name: 'chapter1',
      component: Chapter1View,
      meta: { title: '全栈思维跃迁 - 第一章：UI (声明式表达与组件化)' }
    },
    {
      path: '/chapter/2',
      name: 'chapter2',
      component: Chapter2View,
      meta: { title: '全栈思维跃迁 - 第二章：State (输入建模)' }
    },
    {
      path: '/chapter/3',
      name: 'chapter3',
      component: Chapter3View,
      meta: { title: '全栈思维跃迁 - 第三章：绑定 (f() 响应式机制)' }
    },
    {
      path: '/chapter/4',
      name: 'chapter4',
      component: Chapter4View,
      meta: { title: '全栈思维跃迁 - 第四章：端到端项目实践' }
    },
    {
      path: '/chapter/5',
      name: 'chapter5',
      component: Chapter5View,
      meta: { title: '全栈思维跃迁 - 第五章：执行环境与渲染策略' }
    },
    {
      path: '/chapter/6',
      name: 'chapter6',
      component: Chapter6View,
      meta: { title: '全栈思维跃迁 - 第六章：工程化体系' }
    },
    {
      path: '/epilogue',
      name: 'epilogue',
      component: EpilogueView,
      meta: { title: '全栈思维跃迁 - 结语：全栈视角闭环' }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = (to.meta.title as string) || '全栈思维跃迁'
  next()
})

export default router
