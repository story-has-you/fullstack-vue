<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { introContent } from '@/data/intro'
import { copyTextToClipboard } from '@/utils/clipboard'
import 'highlight.js/styles/github-dark.css'

const legacyCodeRef = ref<HTMLElement | null>(null)
const modernCodeRef = ref<HTMLElement | null>(null)
const isLegacyCopied = ref(false)
const isModernCopied = ref(false)
let legacyCopyTimer: ReturnType<typeof setTimeout> | null = null
let modernCopyTimer: ReturnType<typeof setTimeout> | null = null

const highlightCodeBlocks = async () => {
  const [{ default: hljs }, { default: javascript }, { default: xml }] = await Promise.all([
    import('highlight.js/lib/core'),
    import('highlight.js/lib/languages/javascript'),
    import('highlight.js/lib/languages/xml'),
  ])

  hljs.registerLanguage('javascript', javascript)
  hljs.registerLanguage('xml', xml)

  if (legacyCodeRef.value) {
    hljs.highlightElement(legacyCodeRef.value)
  }
  if (modernCodeRef.value) {
    hljs.highlightElement(modernCodeRef.value)
  }
}

onMounted(async () => {
  await nextTick()
  await highlightCodeBlocks()
})

const markCopied = (target: 'legacy' | 'modern') => {
  if (target === 'legacy') {
    isLegacyCopied.value = true
    if (legacyCopyTimer) {
      clearTimeout(legacyCopyTimer)
    }
    legacyCopyTimer = setTimeout(() => {
      isLegacyCopied.value = false
    }, 1600)
    return
  }

  isModernCopied.value = true
  if (modernCopyTimer) {
    clearTimeout(modernCopyTimer)
  }
  modernCopyTimer = setTimeout(() => {
    isModernCopied.value = false
  }, 1600)
}

const copyLegacyCode = async () => {
  try {
    await copyTextToClipboard(introContent.bindingEvolution.legacyCode)
    markCopied('legacy')
  } catch (error) {
    console.error('复制旧版示例失败', error)
  }
}

const copyModernCode = async () => {
  try {
    await copyTextToClipboard(introContent.bindingEvolution.modernCode)
    markCopied('modern')
  } catch (error) {
    console.error('复制现代示例失败', error)
  }
}

onBeforeUnmount(() => {
  if (legacyCopyTimer) {
    clearTimeout(legacyCopyTimer)
  }
  if (modernCopyTimer) {
    clearTimeout(modernCopyTimer)
  }
})
</script>

<template>
  <div class="home-page-bg relative min-h-screen overflow-hidden">
    <div
      class="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl"
    />
    <div
      class="pointer-events-none absolute -right-28 top-40 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl"
    />

    <div class="container relative z-10 mx-auto px-4 py-10 md:py-14">
      <section class="glass-panel mb-10 rounded-3xl border border-sky-100 p-8 md:p-12">
        <div
          class="mb-4 inline-flex items-center rounded-full border border-sky-200 bg-sky-50/80 px-4 py-2 text-sm font-semibold text-sky-700"
        >
          前言 / Intro
        </div>
        <h1 class="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
          {{ introContent.pageTitle }}
        </h1>
        <p class="mt-2 text-base font-medium text-slate-500 md:text-lg">
          {{ introContent.pageSubtitle }}
        </p>
        <p class="mt-6 max-w-4xl text-base leading-relaxed text-slate-700 md:text-lg">
          {{ introContent.lead }}
        </p>

        <div
          class="mt-8 max-w-3xl rounded-2xl border border-sky-100 bg-linear-to-r from-sky-50 to-cyan-50 p-6"
        >
          <p class="text-sm font-medium text-slate-600">核心公式</p>
          <p class="mt-2 font-mono text-2xl font-bold tracking-wide text-sky-700 md:text-3xl">
            {{ introContent.formula }}
          </p>
          <p class="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
            {{ introContent.formulaExplanation }}
          </p>
        </div>
      </section>

      <section class="glass-panel mb-12 rounded-3xl border border-sky-100 p-8 md:p-10">
        <h2 class="section-title">前端核心三要素</h2>
        <p class="mb-6 text-center text-sm text-slate-500">三要素静态展示，便于连续阅读与对比。</p>
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          <article
            v-for="pillar in introContent.pillars"
            :key="pillar.id"
            class="flex h-full min-h-[280px] flex-col rounded-2xl border border-sky-100 bg-white/90 p-6 shadow-(--shadow-soft) sm:min-h-80"
          >
            <span
              class="inline-flex w-fit items-center rounded-full border border-sky-200 bg-sky-50/80 px-3 py-1 text-xs font-semibold text-sky-700"
            >
              核心要素
            </span>
            <h3 class="mt-4 text-xl font-semibold text-slate-900 md:text-2xl">{{ pillar.title }}</h3>
            <dl class="mt-4 flex-1 space-y-3 text-sm text-slate-700">
              <div>
                <dt class="font-semibold text-slate-900">定义</dt>
                <dd class="mt-1 leading-relaxed">{{ pillar.definition }}</dd>
              </div>
              <div>
                <dt class="font-semibold text-slate-900">载体</dt>
                <dd class="mt-1 leading-relaxed">{{ pillar.carrier }}</dd>
              </div>
              <div>
                <dt class="font-semibold text-slate-900">性质</dt>
                <dd class="mt-1 leading-relaxed">{{ pillar.nature }}</dd>
              </div>
            </dl>
          </article>
        </div>
      </section>

      <section class="glass-panel rounded-3xl border border-sky-100 p-8 md:p-10">
        <h2 class="text-2xl font-bold text-slate-900">绑定机制演进</h2>
        <p class="mt-2 text-sm text-slate-500 md:text-base">从手动 DOM 操作到自动数据驱动渲染。</p>

        <div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <article class="rounded-2xl border border-rose-100 bg-rose-50/70 p-5">
            <h3 class="text-lg font-semibold text-rose-700">Old: 手动绑定</h3>
            <ul class="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
              <li
                v-for="line in introContent.bindingEvolution.legacy"
                :key="line"
                class="flex items-start gap-2"
              >
                <span class="mt-2 h-1.5 w-1.5 rounded-full bg-rose-400" />
                <span>{{ line }}</span>
              </li>
            </ul>
            <div class="mt-4 overflow-hidden rounded-xl border border-rose-200 bg-slate-900">
              <div class="flex items-center justify-between border-b border-slate-700 px-3 py-2">
                <p class="text-xs font-semibold text-slate-300">JavaScript 示例</p>
                <button
                  type="button"
                  class="rounded-md border border-rose-300/60 bg-rose-900/35 px-2 py-1 text-[11px] font-semibold text-rose-100 transition hover:bg-rose-900/60"
                  @click="copyLegacyCode"
                >
                  {{ isLegacyCopied ? '已复制' : '复制代码' }}
                </button>
              </div>
              <pre
                class="code-block-pre"
              ><code ref="legacyCodeRef" class="language-javascript">{{ introContent.bindingEvolution.legacyCode }}</code></pre>
            </div>
          </article>

          <article class="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-5">
            <h3 class="text-lg font-semibold text-emerald-700">Modern: 自动绑定</h3>
            <ul class="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
              <li
                v-for="line in introContent.bindingEvolution.modern"
                :key="line"
                class="flex items-start gap-2"
              >
                <span class="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>{{ line }}</span>
              </li>
            </ul>
            <div class="mt-4 overflow-hidden rounded-xl border border-emerald-200 bg-slate-900">
              <div class="flex items-center justify-between border-b border-slate-700 px-3 py-2">
                <p class="text-xs font-semibold text-slate-300">Vue 示例</p>
                <button
                  type="button"
                  class="rounded-md border border-emerald-300/60 bg-emerald-900/35 px-2 py-1 text-[11px] font-semibold text-emerald-100 transition hover:bg-emerald-900/60"
                  @click="copyModernCode"
                >
                  {{ isModernCopied ? '已复制' : '复制代码' }}
                </button>
              </div>
              <pre
                class="code-block-pre"
              ><code ref="modernCodeRef" class="language-xml">{{ introContent.bindingEvolution.modernCode }}</code></pre>
            </div>
          </article>
        </div>

        <p
          class="mt-6 rounded-xl border border-sky-100 bg-white/80 px-4 py-3 text-sm font-medium leading-relaxed text-slate-700 md:text-base"
        >
          {{ introContent.bindingEvolution.conclusion }}
        </p>
      </section>
    </div>
  </div>
</template>
