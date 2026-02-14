<script setup lang="ts">
import StateConceptSectionCard from '@/components/chapter/chapter4/StateConceptSectionCard.vue'
import { chapter4Content } from '@/data/chapter4'
</script>

<template>
  <div class="home-page-bg relative min-h-screen overflow-hidden">
    <div class="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
    <div class="pointer-events-none absolute -right-28 top-40 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl" />

    <div class="container relative z-10 mx-auto px-4 py-10 md:py-14">
      <section class="glass-panel mb-10 rounded-3xl border border-sky-100 p-8 md:p-12">
        <div class="mb-4 inline-flex items-center rounded-full border border-sky-200 bg-sky-50/80 px-4 py-2 text-sm font-semibold text-sky-700">
          Chapter 4
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

      <section class="space-y-8">
        <StateConceptSectionCard
          v-for="section in chapter4Content.conceptSections"
          :key="section.id"
          :section="section"
          :taxonomy-cards="chapter4Content.taxonomyCards"
          :patterns="chapter4Content.patterns"
        />
      </section>
    </div>
  </div>
</template>
