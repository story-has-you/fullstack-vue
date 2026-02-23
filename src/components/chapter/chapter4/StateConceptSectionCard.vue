<script setup lang="ts">
import { computed } from 'vue'
import type {
  Chapter4AntiPattern,
  Chapter4BestPractice,
  Chapter4ConceptSection,
  Chapter4EvidenceLink,
  Chapter4StatePatternCard,
  Chapter4StateTaxonomyCard
} from '@/data/chapter4'
import AntiPatternCard from '@/components/chapter/chapter4/AntiPatternCard.vue'
import CodeSnippetPanel from '@/components/chapter/chapter4/CodeSnippetPanel.vue'

interface Props {
  section: Chapter4ConceptSection
  stateTaxonomyCards: Chapter4StateTaxonomyCard[]
  statePatternCards: Chapter4StatePatternCard[]
  antiPatterns: Chapter4AntiPattern[]
  bestPractices: Chapter4BestPractice[]
}

const props = defineProps<Props>()

const codeGridClass = computed(() =>
  props.section.codeSamples.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1'
)

const getEvidenceIds = (kind: Chapter4EvidenceLink['kind']) =>
  props.section.evidenceLinks.find((link) => link.kind === kind)?.ids ?? []

const pickByIds = <T extends { id: string }>(list: T[], ids: string[]): T[] => {
  const idSet = new Set(ids)
  return list.filter((item) => idSet.has(item.id))
}

const visibleStateTaxonomyCards = computed(() =>
  pickByIds(props.stateTaxonomyCards, getEvidenceIds('state-taxonomy'))
)

const visibleStatePatternCards = computed(() =>
  pickByIds(props.statePatternCards, getEvidenceIds('state-pattern'))
)

const visibleAntiPatterns = computed(() =>
  pickByIds(props.antiPatterns, getEvidenceIds('anti-pattern'))
)

const visibleBestPractices = computed(() =>
  pickByIds(props.bestPractices, getEvidenceIds('best-practice'))
)

const taxonomyColorClassMap: Record<Chapter4StateTaxonomyCard['id'], string> = {
  local: 'border-sky-100 bg-sky-50/70',
  global: 'border-indigo-100 bg-indigo-50/70',
  remote: 'border-emerald-100 bg-emerald-50/70'
}

const taxonomyTitleClassMap: Record<Chapter4StateTaxonomyCard['id'], string> = {
  local: 'text-sky-900',
  global: 'text-indigo-900',
  remote: 'text-emerald-900'
}

const taxonomyDotClassMap: Record<Chapter4StateTaxonomyCard['id'], string> = {
  local: 'bg-sky-500',
  global: 'bg-indigo-500',
  remote: 'bg-emerald-500'
}

const patternColorClassMap: Record<Chapter4StatePatternCard['id'], string> = {
  'provide-inject': 'border-cyan-100 bg-cyan-50/70',
  'global-store': 'border-amber-100 bg-amber-50/70'
}

const patternTitleClassMap: Record<Chapter4StatePatternCard['id'], string> = {
  'provide-inject': 'text-cyan-900',
  'global-store': 'text-amber-900'
}

const patternDotClassMap: Record<Chapter4StatePatternCard['id'], string> = {
  'provide-inject': 'bg-cyan-500',
  'global-store': 'bg-amber-500'
}

const getTaxonomyColorClass = (id: Chapter4StateTaxonomyCard['id']) => taxonomyColorClassMap[id]
const getTaxonomyTitleClass = (id: Chapter4StateTaxonomyCard['id']) => taxonomyTitleClassMap[id]
const getTaxonomyDotClass = (id: Chapter4StateTaxonomyCard['id']) => taxonomyDotClassMap[id]

const getPatternColorClass = (id: Chapter4StatePatternCard['id']) => patternColorClassMap[id]
const getPatternTitleClass = (id: Chapter4StatePatternCard['id']) => patternTitleClassMap[id]
const getPatternDotClass = (id: Chapter4StatePatternCard['id']) => patternDotClassMap[id]
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

    <section v-if="visibleStateTaxonomyCards.length" class="mt-4">
      <h3 class="mb-3 text-base font-semibold text-slate-900">证据面板：状态分层</h3>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article
          v-for="card in visibleStateTaxonomyCards"
          :key="card.id"
          class="rounded-2xl border p-4"
          :class="getTaxonomyColorClass(card.id)"
        >
          <h4 class="text-base font-semibold" :class="getTaxonomyTitleClass(card.id)">{{ card.title }}</h4>
          <p class="mt-1 text-xs font-medium text-slate-600">{{ card.subtitle }}</p>
          <p class="mt-3 text-sm leading-relaxed text-slate-700">{{ card.definition }}</p>
          <p class="mt-3 text-xs leading-relaxed text-slate-600">{{ card.backendComparison }}</p>

          <div class="mt-3 border-t border-white/80 pt-3">
            <p class="text-xs font-semibold text-slate-500">实现建议</p>
            <ul class="mt-2 space-y-1 text-sm text-slate-700">
              <li v-for="tip in card.implementationTips" :key="tip" class="flex items-start gap-2">
                <span class="mt-2 h-1.5 w-1.5 rounded-full" :class="getTaxonomyDotClass(card.id)" />
                <span>{{ tip }}</span>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </section>

    <section v-if="visibleStatePatternCards.length" class="mt-4">
      <h3 class="mb-3 text-base font-semibold text-slate-900">证据面板：实现模式</h3>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <article
          v-for="pattern in visibleStatePatternCards"
          :key="pattern.id"
          class="rounded-2xl border p-4"
          :class="getPatternColorClass(pattern.id)"
        >
          <h4 class="text-base font-semibold" :class="getPatternTitleClass(pattern.id)">{{ pattern.title }}</h4>
          <p class="mt-1 text-xs font-medium text-slate-600">{{ pattern.subtitle }}</p>
          <p class="mt-3 text-sm leading-relaxed text-slate-700">{{ pattern.backendComparison }}</p>

          <div class="mt-3 border-t border-white/80 pt-3">
            <p class="text-xs font-semibold text-slate-500">适用场景</p>
            <ul class="mt-2 space-y-1 text-sm text-slate-700">
              <li v-for="item in pattern.suitableScenarios" :key="item" class="flex items-start gap-2">
                <span class="mt-2 h-1.5 w-1.5 rounded-full" :class="getPatternDotClass(pattern.id)" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <div class="mt-3 border-t border-white/80 pt-3">
            <p class="text-xs font-semibold text-slate-500">权衡</p>
            <ul class="mt-2 space-y-1 text-sm text-slate-700">
              <li v-for="item in pattern.tradeoffs" :key="item" class="flex items-start gap-2">
                <span class="mt-2 h-1.5 w-1.5 rounded-full" :class="getPatternDotClass(pattern.id)" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </section>

    <section v-if="visibleAntiPatterns.length" class="mt-4 rounded-2xl border border-rose-100 bg-rose-50/40 p-4">
      <h3 class="mb-3 text-base font-semibold text-rose-900">证据面板：反模式</h3>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <AntiPatternCard
          v-for="item in visibleAntiPatterns"
          :key="item.id"
          :anti-pattern="item"
        />
      </div>
    </section>

    <section v-if="visibleBestPractices.length" class="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4">
      <h3 class="mb-3 text-base font-semibold text-emerald-900">证据面板：最佳实践</h3>
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
