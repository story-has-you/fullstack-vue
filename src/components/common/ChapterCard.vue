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

/**
 * 获取章节颜色类名
 */
const getColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    blue: 'border-sky-500 hover:border-sky-600',
    purple: 'border-violet-500 hover:border-violet-600',
    indigo: 'border-indigo-500 hover:border-indigo-600',
    cyan: 'border-cyan-500 hover:border-cyan-600',
    teal: 'border-teal-500 hover:border-teal-600',
    emerald: 'border-emerald-500 hover:border-emerald-600',
    green: 'border-green-500 hover:border-green-600',
    amber: 'border-amber-500 hover:border-amber-600'
  }
  return colorMap[color] || 'border-gray-500'
}

/**
 * 获取章节背景色类名
 */
const getBgColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    blue: 'bg-sky-50',
    purple: 'bg-violet-50',
    indigo: 'bg-indigo-50',
    cyan: 'bg-cyan-50',
    teal: 'bg-teal-50',
    emerald: 'bg-emerald-50',
    green: 'bg-green-50',
    amber: 'bg-amber-50'
  }
  return colorMap[color] || 'bg-gray-50'
}

/**
 * 获取章节文本色类名
 */
const getTextColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    blue: 'text-sky-700',
    purple: 'text-violet-700',
    indigo: 'text-indigo-700',
    cyan: 'text-cyan-700',
    teal: 'text-teal-700',
    emerald: 'text-emerald-700',
    green: 'text-green-700',
    amber: 'text-amber-700'
  }
  return colorMap[color] || 'text-gray-700'
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
        {{ chapter.number === 0 ? '前言' : chapter.number === 8 ? '结语' : `第${chapter.number}章` }}
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
