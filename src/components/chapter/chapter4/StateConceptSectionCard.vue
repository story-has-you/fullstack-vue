<script setup lang="ts">
import { computed } from 'vue'
import type {
  Chapter4AntiPattern,
  Chapter4BestPractice,
  Chapter4PracticeSection
} from '@/data/chapter4'
import AntiPatternCard from '@/components/chapter/chapter4/AntiPatternCard.vue'
import CodeSnippetPanel from '@/components/chapter/chapter4/CodeSnippetPanel.vue'

interface Props {
  section: Chapter4PracticeSection
  antiPatterns: Chapter4AntiPattern[]
  bestPractices: Chapter4BestPractice[]
}

const props = defineProps<Props>()

const codeGridClass = computed(() =>
  props.section.codeSamples.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1'
)

const showRepoEvidence = computed(
  () => props.section.id === '4.1' && (props.section.repoEvidence?.length ?? 0) > 0
)

const visibleAntiPatterns = computed(() => {
  if (props.section.id !== '4.2') {
    return []
  }
  const ids = props.section.antiPatternIds ?? []
  const idSet = new Set(ids)
  return props.antiPatterns.filter((item) => idSet.has(item.id))
})

const visibleBestPractices = computed(() => {
  if (props.section.id !== '4.3') {
    return []
  }
  const ids = props.section.bestPracticeIds ?? []
  const idSet = new Set(ids)
  return props.bestPractices.filter((item) => idSet.has(item.id))
})

const evidenceColorClassMap = {
  data: 'border-sky-100 bg-sky-50/70',
  mapping: 'border-cyan-100 bg-cyan-50/70',
  render: 'border-indigo-100 bg-indigo-50/70',
  feedback: 'border-emerald-100 bg-emerald-50/70'
} as const

const evidenceTitleClassMap = {
  data: 'text-sky-900',
  mapping: 'text-cyan-900',
  render: 'text-indigo-900',
  feedback: 'text-emerald-900'
} as const

const evidenceDotClassMap = {
  data: 'bg-sky-500',
  mapping: 'bg-cyan-500',
  render: 'bg-indigo-500',
  feedback: 'bg-emerald-500'
} as const

const getEvidenceColorClass = (id: 'data' | 'mapping' | 'render' | 'feedback') =>
  evidenceColorClassMap[id]
const getEvidenceTitleClass = (id: 'data' | 'mapping' | 'render' | 'feedback') =>
  evidenceTitleClassMap[id]
const getEvidenceDotClass = (id: 'data' | 'mapping' | 'render' | 'feedback') =>
  evidenceDotClassMap[id]
</script>

<template>
  <article class="glass-panel rounded-3xl border border-sky-100 p-7 md:p-9">
    <header class="mb-6">
      <p class="text-sm font-semibold text-sky-700">{{ section.id }}</p>
      <h2 class="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">{{ section.title }}</h2>
      <p class="mt-2 text-sm text-slate-600 md:text-base">{{ section.subtitle }}</p>
      <p class="mt-3 rounded-xl border border-sky-100 bg-sky-50/70 px-4 py-3 text-sm text-sky-900">
        <span class="font-semibold">本节目标：</span>{{ section.objective }}
      </p>
    </header>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <section class="rounded-2xl border border-sky-100 bg-white/80 p-4">
        <h3 class="text-base font-semibold text-slate-900">是什么</h3>
        <ul class="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
          <li v-for="item in section.what" :key="item" class="flex items-start gap-2">
            <span class="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500" />
            <span>{{ item }}</span>
          </li>
        </ul>
      </section>

      <section class="rounded-2xl border border-sky-100 bg-white/80 p-4">
        <h3 class="text-base font-semibold text-slate-900">为什么</h3>
        <ul class="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
          <li v-for="item in section.why" :key="item" class="flex items-start gap-2">
            <span class="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-500" />
            <span>{{ item }}</span>
          </li>
        </ul>
      </section>
    </div>

    <section class="mt-4 rounded-2xl border border-sky-100 bg-white/80 p-4">
      <h3 class="text-base font-semibold text-slate-900">怎么做</h3>
      <ul class="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
        <li v-for="item in section.how" :key="item" class="flex items-start gap-2">
          <span class="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>{{ item }}</span>
        </li>
      </ul>
    </section>

    <section
      v-if="showRepoEvidence"
      class="mt-4 rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4"
    >
      <h3 class="mb-3 text-base font-semibold text-indigo-900">仓库证据面板（4.1）</h3>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <article
          v-for="item in section.repoEvidence"
          :key="item.id"
          class="rounded-2xl border p-4"
          :class="getEvidenceColorClass(item.id)"
        >
          <h4 class="text-base font-semibold" :class="getEvidenceTitleClass(item.id)">
            {{ item.title }}
          </h4>
          <p class="mt-2 text-sm leading-relaxed text-slate-700">{{ item.summary }}</p>

          <div class="mt-3 border-t border-white/80 pt-3">
            <p class="text-xs font-semibold text-slate-600">仓库路径</p>
            <ul class="mt-2 space-y-1 text-sm text-slate-700">
              <li v-for="path in item.repoPaths" :key="path" class="flex items-start gap-2">
                <span class="mt-2 h-1.5 w-1.5 rounded-full" :class="getEvidenceDotClass(item.id)" />
                <code class="rounded bg-white/90 px-1.5 py-0.5 text-xs text-slate-800">{{ path }}</code>
              </li>
            </ul>
          </div>

          <div class="mt-3 border-t border-white/80 pt-3">
            <p class="text-xs font-semibold text-slate-600">检查点</p>
            <ul class="mt-2 space-y-1 text-sm text-slate-700">
              <li v-for="check in item.checks" :key="check" class="flex items-start gap-2">
                <span class="mt-2 h-1.5 w-1.5 rounded-full" :class="getEvidenceDotClass(item.id)" />
                <span>{{ check }}</span>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </section>

    <section
      v-if="section.id === '4.2' && visibleAntiPatterns.length"
      class="mt-4 rounded-2xl border border-rose-100 bg-rose-50/40 p-4"
    >
      <h3 class="mb-3 text-base font-semibold text-rose-900">反模式面板（4.2）</h3>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <AntiPatternCard v-for="item in visibleAntiPatterns" :key="item.id" :anti-pattern="item" />
      </div>
    </section>

    <section
      v-if="section.id === '4.3' && visibleBestPractices.length"
      class="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4"
    >
      <h3 class="mb-3 text-base font-semibold text-emerald-900">最佳实践面板（4.3）</h3>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article
          v-for="item in visibleBestPractices"
          :key="item.id"
          class="rounded-xl border border-emerald-200 bg-white/90 p-4"
        >
          <h4 class="text-sm font-semibold text-emerald-900">{{ item.title }}</h4>
          <p class="mt-2 text-sm leading-relaxed text-slate-700">{{ item.principle }}</p>
          <div class="mt-3">
            <p class="text-xs font-semibold text-slate-600">实现建议</p>
            <ul class="mt-1 space-y-1 text-sm text-slate-700">
              <li v-for="tip in item.implementation" :key="tip">- {{ tip }}</li>
            </ul>
          </div>
          <div class="mt-3">
            <p class="text-xs font-semibold text-slate-600">收益</p>
            <ul class="mt-1 space-y-1 text-sm text-slate-700">
              <li v-for="benefit in item.benefits" :key="benefit">- {{ benefit }}</li>
            </ul>
          </div>
        </article>
      </div>
    </section>

    <section class="mt-6 grid grid-cols-1 gap-4" :class="codeGridClass">
      <CodeSnippetPanel
        v-for="sample in section.codeSamples"
        :key="sample.id"
        :title="sample.title"
        :language="sample.language"
        :code="sample.code"
        :tone="sample.tone"
      />
    </section>
  </article>
</template>
