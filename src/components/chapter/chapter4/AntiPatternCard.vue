<template>
  <article :class="['rounded-2xl border p-4', colors.border, colors.bg]">
    <!-- 标题与标签 -->
    <div class="flex items-start justify-between">
      <h3 :class="['text-base font-semibold', colors.titleText]">
        {{ antiPattern.title }}
      </h3>
      <span :class="['rounded-full px-2 py-0.5 text-xs font-medium', colors.badgeBg, colors.badgeText]">
        反模式
      </span>
    </div>

    <!-- 问题描述 -->
    <div class="mt-3">
      <p class="text-xs font-semibold text-slate-700">问题</p>
      <p :class="['mt-1 text-sm leading-relaxed', colors.bodyText]">
        {{ antiPattern.problem }}
      </p>
    </div>

    <!-- 错误做法 -->
    <div class="mt-3">
      <div class="flex items-center gap-2">
        <span class="inline-flex h-2 w-2 rounded-full bg-rose-500" />
        <p class="text-xs font-semibold text-slate-700">错误做法</p>
      </div>
      <div :class="['mt-2 rounded-lg p-3', colors.codeBg]">
        <code class="text-xs text-slate-800">{{ antiPattern.wrongApproach }}</code>
      </div>
    </div>

    <!-- 正确做法 -->
    <div class="mt-3">
      <div class="flex items-center gap-2">
        <span class="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        <p class="text-xs font-semibold text-slate-700">正确做法</p>
      </div>
      <div class="mt-2 rounded-lg bg-emerald-50 p-3">
        <code class="text-xs text-emerald-900">{{ antiPattern.correctApproach }}</code>
      </div>
    </div>

    <!-- 影响 -->
    <div class="mt-3">
      <p class="text-xs font-semibold text-slate-700">影响</p>
      <ul :class="['mt-2 space-y-1 rounded-lg border p-3', colors.impactBorder, 'bg-white/80']">
        <li
          v-for="(item, index) in antiPattern.impact"
          :key="index"
          class="text-xs leading-relaxed text-slate-700"
        >
          • {{ item }}
        </li>
      </ul>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Chapter4AntiPattern } from '@/data/chapter4'
import { computed } from 'vue'

const props = defineProps<{
  antiPattern: Chapter4AntiPattern
}>()

// 根据 ID 映射颜色主题
const colorMap = {
  'dom-manipulation': {
    border: 'border-red-200',
    bg: 'bg-red-50/70',
    titleText: 'text-red-900',
    bodyText: 'text-red-900/80',
    badgeBg: 'bg-red-100',
    badgeText: 'text-red-700',
    codeBg: 'bg-red-50',
    impactBorder: 'border-red-100'
  },
  'data-flow-violation': {
    border: 'border-orange-200',
    bg: 'bg-orange-50/70',
    titleText: 'text-orange-900',
    bodyText: 'text-orange-900/80',
    badgeBg: 'bg-orange-100',
    badgeText: 'text-orange-700',
    codeBg: 'bg-orange-50',
    impactBorder: 'border-orange-100'
  },
  'async-state-chaos': {
    border: 'border-amber-200',
    bg: 'bg-amber-50/70',
    titleText: 'text-amber-900',
    bodyText: 'text-amber-900/80',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-700',
    codeBg: 'bg-amber-50',
    impactBorder: 'border-amber-100'
  }
} as const

const colors = computed(() => {
  return colorMap[props.antiPattern.id] || colorMap['dom-manipulation']
})
</script>
