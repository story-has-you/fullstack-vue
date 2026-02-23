<script setup lang="ts">
import ConceptSectionCard from '@/components/chapter/chapter1/ConceptSectionCard.vue'
import CodeSnippetPanel from '@/components/chapter/chapter1/CodeSnippetPanel.vue'
import FormulaRelationPanel from '@/components/common/FormulaRelationPanel.vue'
import { chapter1Content } from '@/data/chapter1'
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
          {{ chapter1Content.pageTitle }}
        </h1>
        <p class="mt-2 text-base font-medium text-slate-500 md:text-lg">
          {{ chapter1Content.pageSubtitle }}
        </p>
        <p class="mt-6 max-w-4xl text-base leading-relaxed text-slate-700 md:text-lg">
          {{ chapter1Content.chapterSummary }}
        </p>
      </section>

      <FormulaRelationPanel :relation="chapter1Content.formulaRelation" />

      <section class="space-y-8">
        <ConceptSectionCard
          v-for="section in chapter1Content.conceptSections"
          :key="section.id"
          :section="section"
        />
      </section>

      <section v-if="chapter1Content.exampleSections.length > 0" class="mt-8 space-y-6">
        <article
          v-for="example in chapter1Content.exampleSections"
          :key="example.id"
          class="glass-panel rounded-3xl border border-sky-100 p-6"
        >
          <header>
            <p class="text-sm font-semibold text-sky-700">{{ example.id }}</p>
            <h3 class="mt-1 text-xl font-bold text-slate-900">{{ example.title }}</h3>
            <p class="mt-2 text-sm text-slate-600">{{ example.scenario }}</p>
          </header>

          <div class="mt-4">
            <CodeSnippetPanel
              :title="example.codeSample.title"
              :language="example.codeSample.language"
              :code="example.codeSample.code"
              :tone="example.codeSample.tone"
            />
          </div>

          <p class="mt-4 rounded-xl border border-sky-100 bg-white/80 p-3 text-sm text-slate-700">
            运行指引：{{ example.runGuide }}
          </p>

          <div class="mt-4 rounded-xl border border-rose-100 bg-rose-50/70 p-3">
            <p class="text-sm font-semibold text-rose-900">反模式提醒</p>
            <ul class="mt-2 space-y-1 text-sm text-rose-900/85">
              <li v-for="item in example.antiPatterns" :key="item">- {{ item }}</li>
            </ul>
          </div>
        </article>
      </section>
    </div>
  </div>
</template>
