<script setup lang="ts">
import type { ProjectCase } from '@/types/chapter'

interface Props {
  cases: ProjectCase[]
}

defineProps<Props>()
</script>

<template>
  <section class="mb-8 rounded-2xl border border-amber-100 bg-amber-50/70 p-5">
    <h3 class="text-base font-semibold text-amber-900">项目实例映射</h3>
    <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
      <article
        v-for="item in cases"
        :key="item.id"
        class="rounded-xl border border-amber-200/80 bg-white/90 p-4"
      >
        <h4 class="text-sm font-semibold text-slate-900">{{ item.title }}</h4>
        <p class="mt-1 text-xs leading-relaxed text-slate-600">{{ item.scenario }}</p>
        <div class="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
          <div>
            <p class="text-xs font-semibold text-sky-800">前端执行</p>
            <ul class="mt-1 space-y-1 text-xs text-slate-700">
              <li v-for="action in item.frontendActions" :key="action">- {{ action }}</li>
            </ul>
          </div>
          <div>
            <p class="text-xs font-semibold text-cyan-800">后端支撑</p>
            <ul class="mt-1 space-y-1 text-xs text-slate-700">
              <li v-for="action in item.backendActions" :key="action">- {{ action }}</li>
            </ul>
          </div>
        </div>
        <div class="mt-3 border-t border-amber-100 pt-2">
          <p class="text-xs font-semibold text-amber-900">边界决策</p>
          <ul class="mt-1 space-y-1 text-xs text-slate-700">
            <li v-for="note in item.boundaryNotes" :key="note">- {{ note }}</li>
          </ul>
        </div>
      </article>
    </div>
  </section>
</template>
