<script setup lang="ts">
import { computed } from 'vue'
import type {
  Chapter5ConceptSection,
  Chapter5RenderModeCard,
  Chapter5SelectionStrategy
} from '@/data/chapter5'
import CodeSnippetPanel from '@/components/chapter/chapter5/CodeSnippetPanel.vue'

interface Props {
  section: Chapter5ConceptSection
  renderModeCards: Chapter5RenderModeCard[]
  selectionStrategies: Chapter5SelectionStrategy[]
}

const props = defineProps<Props>()

const codeGridClass = computed(() =>
  props.section.codeSamples.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1'
)

const showRenderModeCards = computed(() => props.section.id === '5.1')
const showSelectionStrategies = computed(() => props.section.id === '5.4')

const renderModeColorClassMap: Record<Chapter5RenderModeCard['id'], string> = {
  csr: 'border-sky-100 bg-sky-50/70',
  ssr: 'border-indigo-100 bg-indigo-50/70',
  ssg: 'border-emerald-100 bg-emerald-50/70'
}

const renderModeTitleClassMap: Record<Chapter5RenderModeCard['id'], string> = {
  csr: 'text-sky-900',
  ssr: 'text-indigo-900',
  ssg: 'text-emerald-900'
}

const renderModeDotClassMap: Record<Chapter5RenderModeCard['id'], string> = {
  csr: 'bg-sky-500',
  ssr: 'bg-indigo-500',
  ssg: 'bg-emerald-500'
}

const strategyDotClassMap: Record<Chapter5SelectionStrategy['id'], string> = {
  admin: 'bg-sky-500',
  portal: 'bg-indigo-500',
  docs: 'bg-emerald-500'
}

const getRenderModeColorClass = (id: Chapter5RenderModeCard['id']) => renderModeColorClassMap[id]
const getRenderModeTitleClass = (id: Chapter5RenderModeCard['id']) => renderModeTitleClassMap[id]
const getRenderModeDotClass = (id: Chapter5RenderModeCard['id']) => renderModeDotClassMap[id]
const getStrategyDotClass = (id: Chapter5SelectionStrategy['id']) => strategyDotClassMap[id]
</script>

<template>
  <article class="glass-panel rounded-3xl border border-sky-100 p-7 md:p-9">
    <header class="mb-6">
      <p class="text-sm font-semibold text-sky-700">{{ section.id }}</p>
      <h2 class="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">{{ section.title }}</h2>
      <p class="mt-2 text-sm text-slate-600 md:text-base">{{ section.subtitle }}</p>
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

    <section class="mt-4 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4">
      <h3 class="text-base font-semibold text-indigo-900">后端对比映射</h3>
      <ul class="mt-3 space-y-2 text-sm leading-relaxed text-indigo-900/85">
        <li v-for="item in section.backendComparisons" :key="item" class="flex items-start gap-2">
          <span class="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-500" />
          <span>{{ item }}</span>
        </li>
      </ul>
    </section>

    <section v-if="showRenderModeCards" class="mt-4">
      <h3 class="mb-3 text-base font-semibold text-slate-900">CSR / SSR 对比视角</h3>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article
          v-for="card in renderModeCards"
          :key="card.id"
          class="rounded-2xl border p-4"
          :class="getRenderModeColorClass(card.id)"
        >
          <h4 class="text-base font-semibold" :class="getRenderModeTitleClass(card.id)">{{ card.title }}</h4>
          <p class="mt-1 text-xs font-medium text-slate-600">{{ card.subtitle }}</p>
          <p class="mt-3 text-xs leading-relaxed text-slate-700">
            <span class="font-semibold">执行时机：</span>{{ card.executionTiming }}
          </p>
          <p class="mt-1 text-xs leading-relaxed text-slate-700">
            <span class="font-semibold">执行位置：</span>{{ card.executionLocation }}
          </p>
          <p class="mt-1 text-xs leading-relaxed text-slate-700">
            <span class="font-semibold">公式映射：</span>{{ card.formulaMapping }}
          </p>
          <p v-if="card.definition" class="mt-2 text-xs leading-relaxed text-slate-600">{{ card.definition }}</p>
          <p v-if="card.backendComparison" class="mt-1 text-xs leading-relaxed text-slate-600">
            {{ card.backendComparison }}
          </p>

          <div class="mt-3 border-t border-white/80 pt-3">
            <p class="text-xs font-semibold text-slate-500">优势</p>
            <ul class="mt-2 space-y-1 text-sm text-slate-700">
              <li v-for="item in card.advantages" :key="item" class="flex items-start gap-2">
                <span class="mt-2 h-1.5 w-1.5 rounded-full" :class="getRenderModeDotClass(card.id)" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <div class="mt-3 border-t border-white/80 pt-3">
            <p class="text-xs font-semibold text-slate-500">限制</p>
            <ul class="mt-2 space-y-1 text-sm text-slate-700">
              <li v-for="item in card.limitations" :key="item" class="flex items-start gap-2">
                <span class="mt-2 h-1.5 w-1.5 rounded-full" :class="getRenderModeDotClass(card.id)" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </section>

    <section v-if="showSelectionStrategies" class="mt-4 rounded-2xl border border-cyan-100 bg-cyan-50/70 p-4">
      <h3 class="mb-3 text-base font-semibold text-cyan-900">场景选择策略</h3>
      <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
        <article
          v-for="strategy in selectionStrategies"
          :key="strategy.id"
          class="rounded-xl border border-white/80 bg-white/90 p-3"
        >
          <p class="text-sm font-semibold text-slate-900">{{ strategy.scenario }}</p>
          <p class="mt-1 text-xs font-semibold text-cyan-700">推荐：{{ strategy.recommendation }}</p>
          <p class="mt-2 flex items-start gap-2 text-sm text-slate-700">
            <span class="mt-2 h-1.5 w-1.5 rounded-full" :class="getStrategyDotClass(strategy.id)" />
            <span>{{ strategy.reason }}</span>
          </p>
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
