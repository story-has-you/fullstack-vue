<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import ChapterCard from '@/components/common/ChapterCard.vue'
import { homeIconMap, type HomeIconKey } from '@/constants/icon-map'
import { implementedChapterNumbers } from '@/constants/implemented-routes'
import { chapters } from '@/data/chapters'

const router = useRouter()

/**
 * 导航到章节详情页
 */
const navigateToChapter = (route: string) => {
  router.push(route)
}

/**
 * 分离前言、主要章节和结语
 */
const introChapter = chapters.find(c => c.id === 'intro')
const mainChapters = chapters.filter(c => c.number >= 1 && c.number <= 6)
const epilogueChapter = chapters.find(c => c.id === 'epilogue')
const firstMainChapter = mainChapters[0]

const heroFacts = [
  { label: '已实现章节', value: String(implementedChapterNumbers.length) },
  { label: '架构主线', value: '状态机 + 数据流' },
  { label: '推荐节奏', value: '3 阶段学习路径' }
]

interface LearningPath {
  id: string
  title: string
  range: string
  detail: string
  icon: HomeIconKey
}

const learningPaths: LearningPath[] = [
  {
    id: 'basic',
    title: '基础篇',
    range: '前言 + 第 1-3 章',
    detail: '建立声明式 UI 与组件化认知',
    icon: 'basicPath'
  },
  {
    id: 'advanced',
    title: '进阶篇',
    range: '第 4-6 章',
    detail: '掌握状态管理与工程化体系',
    icon: 'advancedPath'
  },
  {
    id: 'architecture',
    title: '架构篇',
    range: '第 6 章 + 结语',
    detail: '完成全栈思维与安全边界闭环',
    icon: 'architecturePath'
  }
]
</script>

<template>
  <div class="home-page-bg relative min-h-screen overflow-hidden">
    <div class="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
    <div class="pointer-events-none absolute -right-28 top-40 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl" />
    <div class="container relative z-10 mx-auto px-4 py-10 md:py-14">
      <!-- Hero Section -->
      <section class="glass-panel mb-14 rounded-3xl border border-sky-100 p-8 md:p-12">
        <div class="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50/80 px-4 py-2 text-sm font-semibold text-sky-700">
          <component :is="homeIconMap.hero" class="h-4 w-4" />
          <span>后端视角的前端工程体系</span>
        </div>
        <h1 class="mb-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          全栈思维跃迁
        </h1>
        <p class="max-w-3xl text-lg leading-relaxed text-slate-600 md:text-2xl">
          基于后端视角的现代前端架构深度解析
        </p>
        <div class="mt-8 max-w-5xl rounded-2xl border border-sky-100 bg-linear-to-r from-sky-50 to-cyan-50 p-6">
          <p class="text-xl leading-relaxed text-slate-700">
            通过计算机科学通识原理，消除后端开发者对前端"混乱"的误解，
            建立基于<strong class="text-sky-700">状态机</strong>和<strong class="text-cyan-700">数据流</strong>的严谨开发思维。
          </p>
        </div>

        <div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <article
            v-for="fact in heroFacts"
            :key="fact.label"
            class="rounded-xl border border-sky-100 bg-white/80 p-4"
          >
            <p class="text-xs font-semibold uppercase tracking-wide text-sky-600">{{ fact.label }}</p>
            <p class="mt-2 text-lg font-semibold text-slate-900">{{ fact.value }}</p>
          </article>
        </div>

        <div class="mt-8 flex flex-wrap gap-3">
          <button
            v-if="introChapter"
            class="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
            @click="navigateToChapter(introChapter.route)"
          >
            从前言开始
            <ArrowRight class="h-4 w-4" />
          </button>
          <button
            v-if="firstMainChapter"
            class="inline-flex items-center gap-2 rounded-lg border border-sky-200 bg-white px-5 py-2.5 text-sm font-semibold text-sky-700 transition hover:bg-sky-50"
            @click="navigateToChapter(firstMainChapter.route)"
          >
            进入核心章节
            <ArrowRight class="h-4 w-4" />
          </button>
        </div>
      </section>

      <!-- 前言卡片 -->
      <section v-if="introChapter" class="mb-12">
        <h2 class="section-title">
          <component :is="homeIconMap.intro" class="h-6 w-6 text-sky-600" />
          开始之前
        </h2>
        <p class="mb-6 text-center text-sm text-slate-500">先构建一致的前端认知模型，再进入章节细化学习。</p>
        <div class="max-w-2xl mx-auto">
          <ChapterCard
            :chapter="introChapter"
            @click="navigateToChapter(introChapter.route)"
          />
        </div>
      </section>

      <!-- 主要章节网格 -->
      <section class="mb-12">
        <h2 class="section-title">
          <component :is="homeIconMap.core" class="h-6 w-6 text-sky-600" />
          核心章节
        </h2>
        <p class="mb-6 text-center text-sm text-slate-500">覆盖范式、异步机制、组件化、状态管理、渲染模式与工程化实践。</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ChapterCard
            v-for="chapter in mainChapters"
            :key="chapter.id"
            :chapter="chapter"
            @click="navigateToChapter(chapter.route)"
          />
        </div>
      </section>

      <!-- 结语卡片 -->
      <section v-if="epilogueChapter" class="mb-12">
        <h2 class="section-title">
          <component :is="homeIconMap.epilogue" class="h-6 w-6 text-sky-600" />
          总结与展望
        </h2>
        <div class="max-w-2xl mx-auto">
          <ChapterCard
            :chapter="epilogueChapter"
            @click="navigateToChapter(epilogueChapter.route)"
          />
        </div>
      </section>

      <!-- 学习路径提示 -->
      <section class="glass-panel mx-auto max-w-5xl rounded-3xl border border-sky-100 p-8">
        <h3 class="mb-4 flex items-center justify-center gap-2 text-2xl font-bold text-slate-900">
          <component :is="homeIconMap.highlight" class="h-5 w-5 text-sky-600" />
          学习路径建议
        </h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <article
            v-for="path in learningPaths"
            :key="path.id"
            class="rounded-2xl border border-sky-100 bg-white/90 p-5 text-center transition hover:-translate-y-1 hover:shadow-(--shadow-soft)"
          >
            <div class="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
              <component :is="homeIconMap[path.icon]" class="h-6 w-6" />
            </div>
            <h4 class="mb-2 font-semibold text-slate-900">{{ path.title }}</h4>
            <p class="text-sm font-medium text-slate-700">{{ path.range }}</p>
            <p class="mt-2 text-xs text-slate-500">{{ path.detail }}</p>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>
