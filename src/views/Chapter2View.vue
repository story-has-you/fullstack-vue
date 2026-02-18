<script setup lang="ts">
import RuntimeConceptSectionCard from '@/components/chapter/chapter2/RuntimeConceptSectionCard.vue'
import StateDecisionTree from '@/components/chapter/chapter2/StateDecisionTree.vue'
import AsyncRequestStateDemo from '@/components/chapter/chapter2/AsyncRequestStateDemo.vue'
import { chapter2Content } from '@/data/chapter2'

const eventLoopOrder = [
  '执行当前宏任务中的同步代码（Call Stack）',
  '清空所有微任务（Promise.then / queueMicrotask）',
  '浏览器执行一次渲染机会（布局与绘制）',
  '取下一个宏任务继续下一轮循环'
]
</script>

<template>
  <div class="home-page-bg relative min-h-screen overflow-hidden">
    <div class="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
    <div class="pointer-events-none absolute -right-28 top-40 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl" />

    <div class="container relative z-10 mx-auto px-4 py-10 md:py-14">
      <section class="glass-panel mb-10 rounded-3xl border border-sky-100 p-8 md:p-12">
        <div class="mb-4 inline-flex items-center rounded-full border border-sky-200 bg-sky-50/80 px-4 py-2 text-sm font-semibold text-sky-700">
          Chapter 2
        </div>
        <h1 class="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
          {{ chapter2Content.pageTitle }}
        </h1>
        <p class="mt-2 text-base font-medium text-slate-500 md:text-lg">
          {{ chapter2Content.pageSubtitle }}
        </p>
        <p class="mt-6 max-w-4xl text-base leading-relaxed text-slate-700 md:text-lg">
          {{ chapter2Content.chapterSummary }}
        </p>
      </section>

      <section class="glass-panel mb-8 rounded-3xl border border-sky-100 p-6 md:p-8">
        <header class="mb-4">
          <h2 class="text-2xl font-bold text-slate-900 md:text-3xl">宏任务与微任务速览</h2>
          <p class="mt-2 text-sm text-slate-600 md:text-base">
            关键规则：每一轮事件循环里，微任务会在当前宏任务结束后立即清空，优先于下一个宏任务执行。
          </p>
        </header>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <article class="rounded-2xl border border-rose-100 bg-rose-50/70 p-4">
            <h3 class="text-base font-semibold text-rose-900">宏任务（Macro Task）</h3>
            <p class="mt-2 text-sm leading-relaxed text-rose-900/85">
              事件循环每轮取一个执行的大任务。常见来源：script、setTimeout、setInterval、I/O、UI 事件。
            </p>
          </article>
          <article class="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
            <h3 class="text-base font-semibold text-emerald-900">微任务（Micro Task）</h3>
            <p class="mt-2 text-sm leading-relaxed text-emerald-900/85">
              在当前宏任务结束后、下一轮宏任务前必须清空的任务。常见来源：Promise.then、queueMicrotask、MutationObserver。
            </p>
          </article>
        </div>

        <section class="mt-4 rounded-2xl border border-sky-100 bg-white/85 p-4">
          <h3 class="text-base font-semibold text-slate-900">事件循环顺序</h3>
          <ol class="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
            <li v-for="(step, index) in eventLoopOrder" :key="step" class="flex items-start gap-2">
              <span class="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-sky-600 px-1 text-xs font-semibold text-white">
                {{ index + 1 }}
              </span>
              <span>{{ step }}</span>
            </li>
          </ol>
        </section>
      </section>

      <section class="space-y-8">
        <RuntimeConceptSectionCard
          v-for="section in chapter2Content.conceptSections"
          :key="section.id"
          :section="section"
        />
      </section>

      <!-- 状态分类决策树（放在所有概念章节之后） -->
      <StateDecisionTree />

      <!-- 完整的异步请求示例 -->
      <section class="glass-panel mt-8 rounded-3xl border border-sky-100 p-7 md:p-9">
        <header class="mb-4">
          <p class="text-sm font-semibold text-sky-700">2.4</p>
          <h2 class="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
            {{ chapter2Content.exampleSection.title }}
          </h2>
          <p class="mt-2 text-sm text-slate-600 md:text-base">
            {{ chapter2Content.exampleSection.scenario }}
          </p>
        </header>

        <AsyncRequestStateDemo />

        <div v-if="chapter2Content.exampleSection.antiPatterns.length > 0" class="mt-6 rounded-2xl border border-rose-100 bg-rose-50/70 p-4">
          <h3 class="text-base font-semibold text-rose-900">常见错误模式</h3>
          <ul class="mt-3 space-y-2 text-sm leading-relaxed text-rose-900/85">
            <li v-for="pattern in chapter2Content.exampleSection.antiPatterns" :key="pattern" class="flex items-start gap-2">
              <span class="mt-2 h-1.5 w-1.5 rounded-full bg-rose-500" />
              <span>{{ pattern }}</span>
            </li>
          </ul>
        </div>

        <div class="mt-4 rounded-2xl border border-sky-100 bg-sky-50/70 p-4">
          <h3 class="text-base font-semibold text-sky-900">运行指南</h3>
          <p class="mt-2 text-sm leading-relaxed text-sky-900/85">
            {{ chapter2Content.exampleSection.runGuide }}
          </p>
        </div>
      </section>

    </div>
  </div>
</template>
