import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { chapters } from '@/data/chapters'
import HomeView from '@/views/HomeView.vue'
import IntroView from '@/views/IntroView.vue'
import Chapter1View from '@/views/Chapter1View.vue'
import Chapter2View from '@/views/Chapter2View.vue'
import Chapter3View from '@/views/Chapter3View.vue'
import Chapter4View from '@/views/Chapter4View.vue'
import Chapter5View from '@/views/Chapter5View.vue'
import Chapter6View from '@/views/Chapter6View.vue'
import EpilogueView from '@/views/EpilogueView.vue'

const APP_TITLE = '全栈思维跃迁'

const chapterComponentMap: Record<string, RouteRecordRaw['component']> = {
  intro: IntroView,
  chapter1: Chapter1View,
  chapter2: Chapter2View,
  chapter3: Chapter3View,
  chapter4: Chapter4View,
  chapter5: Chapter5View,
  chapter6: Chapter6View,
  epilogue: EpilogueView
}

const chapterNumberChineseMap: Record<number, string> = {
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  7: '七'
}

const getChapterRouteName = (id: string, number: number): string => {
  if (id === 'intro' || id === 'epilogue') {
    return id
  }
  return `chapter${number}`
}

const getChapterMetaTitle = (id: string, number: number, subtitle: string): string => {
  if (id === 'intro') {
    return `${APP_TITLE} - 前言：${subtitle}`
  }
  if (id === 'epilogue') {
    return `${APP_TITLE} - 结语：${subtitle}`
  }
  const chapterNumberLabel = chapterNumberChineseMap[number] ?? String(number)
  return `${APP_TITLE} - 第${chapterNumberLabel}章：${subtitle}`
}

const chapterRoutes: RouteRecordRaw[] = chapters.map((chapter) => ({
  path: chapter.route,
  name: getChapterRouteName(chapter.id, chapter.number),
  component: chapterComponentMap[chapter.id],
  meta: { title: getChapterMetaTitle(chapter.id, chapter.number, chapter.subtitle) }
}))

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: `${APP_TITLE} - 首页` }
  },
  ...chapterRoutes
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = (to.meta.title as string) || APP_TITLE
  next()
})

export default router
