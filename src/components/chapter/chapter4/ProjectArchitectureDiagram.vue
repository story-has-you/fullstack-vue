<script setup lang="ts">
import type { Chapter4FlowStage } from '@/data/chapter4'

interface Props {
  flowStages: Chapter4FlowStage[]
}

defineProps<Props>()
</script>

<template>
  <section class="mb-8 rounded-3xl border border-amber-100 bg-amber-50/55 p-6">
    <h2 class="text-xl font-bold text-amber-900">项目架构图解（src/data -> view/component -> router -> UI反馈）</h2>
    <p class="mt-2 text-sm leading-relaxed text-slate-700">
      本仓库第四章只讲真实链路：以文件路径为证据，逐层验证 UI = f(States) 的工程闭环。
    </p>

    <div class="mt-4 grid grid-cols-1 gap-3 md:grid-cols-4">
      <article
        v-for="stage in flowStages"
        :key="stage.id"
        class="rounded-xl border border-amber-100 bg-white/90 p-4"
      >
        <h3 class="text-sm font-semibold text-amber-900">{{ stage.title }}</h3>
        <p class="mt-2 text-sm leading-relaxed text-slate-700">{{ stage.description }}</p>
        <p class="mt-2 text-xs font-medium text-slate-600">检查点：{{ stage.keyCheck }}</p>
      </article>
    </div>

    <div class="mt-5 rounded-2xl border border-slate-200 bg-white/90 p-4">
      <p class="text-sm font-semibold text-slate-900">真实路径锚点</p>
      <div class="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
        <article class="rounded-xl border border-sky-100 bg-sky-50/60 p-3">
          <p class="text-xs font-semibold text-sky-800">States 输入层</p>
          <ul class="mt-2 space-y-1 text-xs text-slate-700">
            <li><code>src/data/chapters.ts</code></li>
            <li><code>src/data/chapter4.ts</code></li>
          </ul>
        </article>
        <article class="rounded-xl border border-cyan-100 bg-cyan-50/60 p-3">
          <p class="text-xs font-semibold text-cyan-800">f() 映射层</p>
          <ul class="mt-2 space-y-1 text-xs text-slate-700">
            <li><code>src/views/Chapter4View.vue</code></li>
            <li><code>src/components/chapter/chapter4/StateConceptSectionCard.vue</code></li>
          </ul>
        </article>
        <article class="rounded-xl border border-indigo-100 bg-indigo-50/60 p-3">
          <p class="text-xs font-semibold text-indigo-800">路由与页面输出层</p>
          <ul class="mt-2 space-y-1 text-xs text-slate-700">
            <li><code>src/router/index.ts</code></li>
            <li><code>/chapter/4</code> 页面路由</li>
          </ul>
        </article>
        <article class="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3">
          <p class="text-xs font-semibold text-emerald-800">交互反馈层</p>
          <ul class="mt-2 space-y-1 text-xs text-slate-700">
            <li><code>src/components/chapter/chapter4/CodeSnippetPanel.vue</code></li>
            <li><code>src/utils/clipboard.ts</code></li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
