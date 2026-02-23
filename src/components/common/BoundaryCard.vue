<script setup lang="ts">
import type { ResponsibilityBoundary } from '@/types/chapter'

interface Props {
  boundary: ResponsibilityBoundary
}

defineProps<Props>()
</script>

<template>
  <section class="mb-6 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-5">
    <h3 class="text-base font-semibold text-indigo-900">前后端职责边界</h3>
    <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
      <article class="rounded-xl border border-sky-100 bg-white/90 p-4">
        <p class="text-sm font-semibold text-sky-900">前端职责</p>
        <ul class="mt-2 space-y-1 text-sm text-slate-700">
          <li v-for="item in boundary.frontend" :key="item">- {{ item }}</li>
        </ul>
      </article>
      <article class="rounded-xl border border-cyan-100 bg-white/90 p-4">
        <p class="text-sm font-semibold text-cyan-900">后端职责</p>
        <ul class="mt-2 space-y-1 text-sm text-slate-700">
          <li v-for="item in boundary.backend" :key="item">- {{ item }}</li>
        </ul>
      </article>
      <article class="rounded-xl border border-violet-100 bg-white/90 p-4">
        <p class="text-sm font-semibold text-violet-900">契约边界</p>
        <ul class="mt-2 space-y-1 text-sm text-slate-700">
          <li v-for="item in boundary.contract" :key="item">- {{ item }}</li>
        </ul>
      </article>
    </div>
  </section>
</template>
