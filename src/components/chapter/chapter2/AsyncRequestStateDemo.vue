<script setup lang="ts">
import { computed, ref } from 'vue'

type AsyncStatus = 'idle' | 'loading' | 'success' | 'error'

const status = ref<AsyncStatus>('idle')
const payload = ref<string | null>(null)
const errorMessage = ref<string | null>(null)
const completedAt = ref<string | null>(null)
const latencyMs = ref<number | null>(null)
const requestCount = ref(0)
const shouldFailNext = ref(false)

const isLoading = computed(() => status.value === 'loading')

const statusLabel = computed(() => {
  if (status.value === 'idle') return 'idle'
  if (status.value === 'loading') return 'loading'
  if (status.value === 'success') return 'success'
  return 'error'
})

const statusClass = computed(() => {
  if (status.value === 'idle') {
    return 'border-slate-200 bg-slate-100 text-slate-700'
  }
  if (status.value === 'loading') {
    return 'border-amber-200 bg-amber-100 text-amber-800'
  }
  if (status.value === 'success') {
    return 'border-emerald-200 bg-emerald-100 text-emerald-800'
  }
  return 'border-rose-200 bg-rose-100 text-rose-700'
})

const simulateRequest = (shouldFail: boolean): Promise<string> => {
  return new Promise((resolve, reject) => {
    const delay = 700 + Math.floor(Math.random() * 600)

    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Mock API: request failed with status 500'))
        return
      }

      resolve(`mock-payload-${Date.now().toString(36)}`)
    }, delay)
  })
}

const runRequest = async (): Promise<void> => {
  if (isLoading.value) {
    return
  }

  requestCount.value += 1
  status.value = 'loading'
  payload.value = null
  errorMessage.value = null
  completedAt.value = null
  latencyMs.value = null

  const startTime = performance.now()

  try {
    const result = await simulateRequest(shouldFailNext.value)
    payload.value = result
    status.value = 'success'
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'unknown error'
    status.value = 'error'
  } finally {
    latencyMs.value = Math.round(performance.now() - startTime)
    completedAt.value = new Date().toLocaleTimeString('zh-CN', { hour12: false })
  }
}

const retryRequest = async (): Promise<void> => {
  await runRequest()
}

const resetState = (): void => {
  if (isLoading.value) {
    return
  }

  status.value = 'idle'
  payload.value = null
  errorMessage.value = null
  completedAt.value = null
  latencyMs.value = null
}
</script>

<template>
  <section class="mt-4 rounded-2xl border border-cyan-100 bg-cyan-50/60 p-4">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p class="text-sm font-semibold text-cyan-900">交互演示：请求状态机</p>
        <p class="mt-1 text-xs text-cyan-900/80">idle -> loading -> success/error，并支持失败后重试。</p>
      </div>
      <span class="rounded-full border px-3 py-1 text-xs font-semibold" :class="statusClass">
        {{ statusLabel }}
      </span>
    </div>

    <div class="mt-4 flex flex-wrap items-center gap-3">
      <button
        type="button"
        class="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
        :disabled="isLoading"
        @click="runRequest"
      >
        发起请求
      </button>

      <button
        v-if="status === 'error'"
        type="button"
        class="rounded-lg border border-rose-300 bg-white px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
        :disabled="isLoading"
        @click="retryRequest"
      >
        重试请求
      </button>

      <button
        type="button"
        class="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        :disabled="isLoading"
        @click="resetState"
      >
        重置状态
      </button>

      <label class="inline-flex items-center gap-2 text-sm text-slate-700">
        <input v-model="shouldFailNext" type="checkbox" class="h-4 w-4" :disabled="isLoading" />
        下次请求强制失败
      </label>
    </div>

    <div class="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
      <article class="rounded-xl border border-white/70 bg-white p-3">
        <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">payload</p>
        <p class="mt-2 break-all text-sm text-slate-800">{{ payload ?? '--' }}</p>
      </article>
      <article class="rounded-xl border border-white/70 bg-white p-3">
        <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">error</p>
        <p class="mt-2 break-all text-sm text-rose-700">{{ errorMessage ?? '--' }}</p>
      </article>
    </div>

    <div class="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
      <article class="rounded-xl border border-white/70 bg-white p-3">
        <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">completed_at</p>
        <p class="mt-2 text-sm text-slate-800">{{ completedAt ?? '--' }}</p>
      </article>
      <article class="rounded-xl border border-white/70 bg-white p-3">
        <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">latency_ms</p>
        <p class="mt-2 text-sm text-slate-800">{{ latencyMs ?? '--' }}</p>
      </article>
      <article class="rounded-xl border border-white/70 bg-white p-3">
        <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">request_count</p>
        <p class="mt-2 text-sm text-slate-800">{{ requestCount }}</p>
      </article>
    </div>
  </section>
</template>
