<script setup lang="ts">
import { computed } from 'vue'
import type { Chapter2ConceptSection } from '@/data/chapter2'
import CodeSnippetPanel from '@/components/chapter/chapter2/CodeSnippetPanel.vue'
import EventLoopTimelineDiagram from '@/components/chapter/chapter2/EventLoopTimelineDiagram.vue'
import StateBasicDemo from '@/components/chapter/chapter2/StateBasicDemo.vue'
import StateClassificationDemo from '@/components/chapter/chapter2/StateClassificationDemo.vue'
import PropDrillingDemo from '@/components/chapter/chapter2/PropDrillingDemo.vue'
import AsyncStateMachine from '@/components/chapter/chapter2/AsyncStateMachine.vue'

interface Props {
  section: Chapter2ConceptSection
}

const props = defineProps<Props>()

const codeGridClass = computed(() =>
  props.section.codeSamples.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1'
)

const showEventLoopDiagram = computed(() => props.section.id === '2.1')
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

    <section v-if="section.analogies && section.analogies.length > 0" class="mt-4 rounded-2xl border border-purple-100 bg-purple-50/70 p-4">
      <h3 class="text-base font-semibold text-purple-900">生活化类比</h3>
      <ul class="mt-3 space-y-2 text-sm leading-relaxed text-purple-900/85">
        <li v-for="item in section.analogies" :key="item" class="flex items-start gap-2">
          <span class="mt-2 h-1.5 w-1.5 rounded-full bg-purple-500" />
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

    <EventLoopTimelineDiagram v-if="showEventLoopDiagram" />

    <StateBasicDemo v-if="section.demoComponent === 'StateBasicDemo'" />
    <StateClassificationDemo v-if="section.demoComponent === 'StateClassificationDemo'" />
    <PropDrillingDemo v-if="section.demoComponent === 'PropDrillingDemo'" />
    <AsyncStateMachine v-if="section.demoComponent === 'AsyncStateMachine'" />

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
