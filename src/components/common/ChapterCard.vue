<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import type { Chapter } from '@/types/chapter'
import { chapterIconMap } from '@/constants/icon-map'

/**
 * 章节卡片组件 Props
 */
interface Props {
  chapter: Chapter
}

defineProps<Props>()

interface ChapterColorTheme {
  border: string
  background: string
  text: string
}

const defaultTheme: ChapterColorTheme = {
  border: 'border-gray-500',
  background: 'bg-gray-50',
  text: 'text-gray-700'
}

const chapterColorThemes: Record<string, ChapterColorTheme> = {
  blue: {
    border: 'border-sky-500 hover:border-sky-600',
    background: 'bg-sky-50',
    text: 'text-sky-700'
  },
  purple: {
    border: 'border-violet-500 hover:border-violet-600',
    background: 'bg-violet-50',
    text: 'text-violet-700'
  },
  indigo: {
    border: 'border-indigo-500 hover:border-indigo-600',
    background: 'bg-indigo-50',
    text: 'text-indigo-700'
  },
  cyan: {
    border: 'border-cyan-500 hover:border-cyan-600',
    background: 'bg-cyan-50',
    text: 'text-cyan-700'
  },
  teal: {
    border: 'border-teal-500 hover:border-teal-600',
    background: 'bg-teal-50',
    text: 'text-teal-700'
  },
  emerald: {
    border: 'border-emerald-500 hover:border-emerald-600',
    background: 'bg-emerald-50',
    text: 'text-emerald-700'
  },
  green: {
    border: 'border-green-500 hover:border-green-600',
    background: 'bg-green-50',
    text: 'text-green-700'
  },
  amber: {
    border: 'border-amber-500 hover:border-amber-600',
    background: 'bg-amber-50',
    text: 'text-amber-700'
  }
}

const resolveTheme = (color: string): ChapterColorTheme => {
  return chapterColorThemes[color] ?? defaultTheme
}

/**
 * 获取章节颜色类名
 */
const getColorClass = (color: string): string => {
  return resolveTheme(color).border
}

/**
 * 获取章节背景色类名
 */
const getBgColorClass = (color: string): string => {
  return resolveTheme(color).background
}

/**
 * 获取章节文本色类名
 */
const getTextColorClass = (color: string): string => {
  return resolveTheme(color).text
}

const getChapterLabel = (number: number): string => {
  if (number === 0) {
    return '前言'
  }
  if (number === 8) {
    return '结语'
  }
  return `第${number}章`
}
</script>

<template>
  <div
    class="group relative cursor-pointer overflow-hidden rounded-2xl border-l-4 bg-white/90 p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-strong)]"
    :class="getColorClass(chapter.color)"
  >
    <!-- 顶部：图标和章节号 -->
    <div class="mb-4 flex items-center justify-between">
      <div
        class="inline-flex h-11 w-11 items-center justify-center rounded-xl"
        :class="getBgColorClass(chapter.color)"
      >
        <component
          :is="chapterIconMap[chapter.icon]"
          class="h-6 w-6"
          :class="getTextColorClass(chapter.color)"
          :stroke-width="2.1"
        />
      </div>
      <span
        class="rounded-full px-3 py-1 text-sm font-semibold"
        :class="[getBgColorClass(chapter.color), getTextColorClass(chapter.color)]"
      >
        {{ getChapterLabel(chapter.number) }}
      </span>
    </div>

    <!-- 标题 -->
    <h3 class="mb-2 text-xl font-bold text-gray-900">
      {{ chapter.title }}
    </h3>

    <!-- 副标题 -->
    <p class="mb-3 text-lg font-medium text-gray-700">
      {{ chapter.subtitle }}
    </p>

    <!-- 描述 -->
    <p class="mb-4 text-sm leading-relaxed text-gray-600">
      {{ chapter.description }}
    </p>

    <!-- 小节预览 -->
    <div v-if="chapter.sections.length > 0" class="border-t border-slate-200 pt-4">
      <p class="mb-2 text-xs font-semibold text-gray-500">主要内容</p>
      <ul class="space-y-1">
        <li
          v-for="section in chapter.sections.slice(0, 3)"
          :key="section.id"
          class="flex items-start text-sm text-gray-600"
        >
          <span class="mr-2 mt-2 h-1.5 w-1.5 rounded-full bg-slate-300" />
          <span>{{ section.title }}</span>
        </li>
        <li v-if="chapter.sections.length > 3" class="text-sm text-gray-400 italic">
          还有 {{ chapter.sections.length - 3 }} 个小节...
        </li>
      </ul>
    </div>

    <!-- 查看详情箭头 -->
    <div
      class="mt-4 flex items-center justify-end text-sm font-medium"
      :class="getTextColorClass(chapter.color)"
    >
      <span>查看详情</span>
      <ChevronRight class="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
    </div>
  </div>
</template>
