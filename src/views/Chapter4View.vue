<script setup lang="ts">
import StateConceptSectionCard from '@/components/chapter/chapter4/StateConceptSectionCard.vue'
import FormulaRelationPanel from '@/components/common/FormulaRelationPanel.vue'
import { chapter4Content } from '@/data/chapter4'
</script>

<template>
  <div class="home-page-bg relative min-h-screen overflow-hidden">
    <div class="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
    <div class="pointer-events-none absolute -right-28 top-40 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl" />

    <div class="container relative z-10 mx-auto px-4 py-10 md:py-14">
      <section class="glass-panel mb-10 rounded-3xl border border-sky-100 p-8 md:p-12">
        <div class="mb-4 inline-flex items-center rounded-full border border-sky-200 bg-sky-50/80 px-4 py-2 text-sm font-semibold text-sky-700">
          Core Chapter
        </div>
        <h1 class="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
          {{ chapter4Content.pageTitle }}
        </h1>
        <p class="mt-2 text-base font-medium text-slate-500 md:text-lg">
          {{ chapter4Content.pageSubtitle }}
        </p>
        <p class="mt-6 max-w-4xl text-base leading-relaxed text-slate-700 md:text-lg">
          {{ chapter4Content.chapterSummary }}
        </p>
      </section>

      <FormulaRelationPanel :relation="chapter4Content.formulaRelation" />

      <section class="mb-8 rounded-3xl border border-amber-100 bg-amber-50/50 p-6">
        <h2 class="text-xl font-bold text-amber-900">链路总览（States -> f() -> UI）</h2>
        <p class="mt-2 text-sm leading-relaxed text-slate-700">
          先确认状态输入，再定义映射函数，得到可预测 UI，并通过反馈闭环持续修正。
        </p>
        <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <article
            v-for="stage in chapter4Content.flowStages"
            :key="stage.id"
            class="rounded-xl border border-amber-100 bg-white/90 p-4"
          >
            <h3 class="text-sm font-semibold text-amber-900">{{ stage.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-700">{{ stage.description }}</p>
            <p class="mt-2 text-xs font-medium text-slate-600">检查点：{{ stage.keyCheck }}</p>
          </article>
        </div>
      </section>

      <section class="space-y-8">
        <StateConceptSectionCard
          v-for="section in chapter4Content.conceptSections"
          :key="section.id"
          :section="section"
          :state-taxonomy-cards="chapter4Content.stateTaxonomyCards"
          :state-pattern-cards="chapter4Content.statePatternCards"
          :anti-patterns="chapter4Content.antiPatterns"
          :best-practices="chapter4Content.bestPractices"
        />
      </section>
    </div>
  </div>
</template>
