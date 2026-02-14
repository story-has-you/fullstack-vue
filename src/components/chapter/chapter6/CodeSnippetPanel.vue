<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { copyTextToClipboard } from '@/utils/clipboard'
import 'highlight.js/styles/github-dark.css'

interface Props {
  title: string
  language: 'javascript' | 'typescript' | 'vue'
  code: string
  tone: 'legacy' | 'modern' | 'neutral'
}

const props = defineProps<Props>()
const codeRef = ref<HTMLElement | null>(null)
const isCopied = ref(false)
let copyTimer: ReturnType<typeof setTimeout> | null = null

const normalizedLanguage = computed(() => {
  if (props.language === 'vue') {
    return 'xml'
  }
  return props.language
})

const panelClass = computed(() => {
  if (props.tone === 'legacy') {
    return 'border-rose-200'
  }
  if (props.tone === 'modern') {
    return 'border-emerald-200'
  }
  return 'border-sky-200'
})

const headerClass = computed(() => {
  if (props.tone === 'legacy') {
    return 'border-slate-700 bg-rose-950/40 text-rose-200'
  }
  if (props.tone === 'modern') {
    return 'border-slate-700 bg-emerald-950/35 text-emerald-200'
  }
  return 'border-slate-700 bg-slate-800 text-slate-200'
})

const copyButtonClass = computed(() => {
  if (props.tone === 'legacy') {
    return 'border-rose-300/60 bg-rose-900/35 text-rose-100 hover:bg-rose-900/60'
  }
  if (props.tone === 'modern') {
    return 'border-emerald-300/60 bg-emerald-900/35 text-emerald-100 hover:bg-emerald-900/60'
  }
  return 'border-slate-500 bg-slate-700 text-slate-100 hover:bg-slate-600'
})

const highlightCode = async () => {
  const [{ default: hljs }, { default: javascript }, { default: typescript }, { default: xml }] =
    await Promise.all([
      import('highlight.js/lib/core'),
      import('highlight.js/lib/languages/javascript'),
      import('highlight.js/lib/languages/typescript'),
      import('highlight.js/lib/languages/xml')
    ])

  hljs.registerLanguage('javascript', javascript)
  hljs.registerLanguage('typescript', typescript)
  hljs.registerLanguage('xml', xml)

  if (codeRef.value) {
    hljs.highlightElement(codeRef.value)
  }
}

onMounted(async () => {
  await nextTick()
  await highlightCode()
})

const copyCode = async () => {
  try {
    await copyTextToClipboard(props.code)
    isCopied.value = true

    if (copyTimer) {
      clearTimeout(copyTimer)
    }

    copyTimer = setTimeout(() => {
      isCopied.value = false
    }, 1600)
  } catch (error) {
    console.error('复制代码失败', error)
  }
}

onBeforeUnmount(() => {
  if (copyTimer) {
    clearTimeout(copyTimer)
  }
})
</script>

<template>
  <article class="overflow-hidden rounded-xl border bg-slate-900" :class="panelClass">
    <div class="flex items-center justify-between border-b px-3 py-2" :class="headerClass">
      <p class="text-xs font-semibold tracking-wide">{{ title }}</p>
      <button
        type="button"
        class="rounded-md border px-2 py-1 text-[11px] font-semibold transition"
        :class="copyButtonClass"
        @click="copyCode"
      >
        {{ isCopied ? '已复制' : '复制代码' }}
      </button>
    </div>
    <pre class="code-block-pre"><code ref="codeRef" :class="`language-${normalizedLanguage}`">{{ code }}</code></pre>
  </article>
</template>
