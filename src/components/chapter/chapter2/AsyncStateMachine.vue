<script setup lang="ts">
import { ref } from 'vue'

/**
 * 异步状态机可视化组件
 * 用流程图展示 idle -> loading -> success/error 的状态迁移
 */

type AsyncStatus = 'idle' | 'loading' | 'success' | 'error'

const currentStatus = ref<AsyncStatus>('idle')
const transitionHistory = ref<string[]>([])

const addTransition = (from: AsyncStatus, to: AsyncStatus) => {
  transitionHistory.value.push(`${from} → ${to}`)
  if (transitionHistory.value.length > 5) {
    transitionHistory.value.shift()
  }
}

const goToLoading = () => {
  if (currentStatus.value === 'loading') return
  addTransition(currentStatus.value, 'loading')
  currentStatus.value = 'loading'
}

const goToSuccess = () => {
  if (currentStatus.value !== 'loading') return
  addTransition('loading', 'success')
  currentStatus.value = 'success'
}

const goToError = () => {
  if (currentStatus.value !== 'loading') return
  addTransition('loading', 'error')
  currentStatus.value = 'error'
}

const reset = () => {
  addTransition(currentStatus.value, 'idle')
  currentStatus.value = 'idle'
}

const isActive = (status: AsyncStatus) => currentStatus.value === status
</script>

<template>
  <section class="mt-6 rounded-2xl border border-violet-100 bg-violet-50/60 p-6">
    <div class="mb-4">
      <h3 class="text-lg font-semibold text-violet-900">交互演示：异步状态机流程图</h3>
      <p class="mt-1 text-sm text-violet-900/80">点击按钮，看看状态如何迁移</p>
    </div>

    <!-- 状态流程图 -->
    <div class="mb-6 rounded-xl border border-white/70 bg-white p-6">
      <div class="flex flex-col items-center gap-4 md:flex-row md:justify-center">
        <!-- idle 状态 -->
        <div class="relative flex flex-col items-center">
          <div class="flex h-24 w-32 items-center justify-center rounded-lg border-2 p-3 transition-all" :class="isActive('idle') ? 'border-slate-600 bg-slate-100 shadow-lg' : 'border-slate-300 bg-white'">
            <div class="text-center">
              <div class="text-2xl">⚪</div>
              <p class="mt-1 text-xs font-semibold" :class="isActive('idle') ? 'text-slate-900' : 'text-slate-600'">
                idle
              </p>
              <p class="text-xs text-slate-500">还没开始</p>
            </div>
          </div>
          <button v-if="currentStatus === 'idle'" type="button" class="mt-2 rounded bg-violet-600 px-3 py-1 text-xs font-semibold text-white hover:bg-violet-700" @click="goToLoading">
            发起请求
          </button>
        </div>

        <!-- 箭头 -->
        <div class="flex rotate-90 items-center md:rotate-0">
          <div class="h-0.5 w-8 bg-slate-300" />
          <div class="h-0 w-0 border-l-8 border-r-0 border-t-4 border-b-4 border-l-slate-300 border-t-transparent border-b-transparent" />
        </div>

        <!-- loading 状态 -->
        <div class="relative flex flex-col items-center">
          <div class="flex h-24 w-32 items-center justify-center rounded-lg border-2 p-3 transition-all" :class="isActive('loading') ? 'border-amber-600 bg-amber-100 shadow-lg' : 'border-slate-300 bg-white'">
            <div class="text-center">
              <div class="text-2xl" :class="isActive('loading') && 'animate-spin'">⏳</div>
              <p class="mt-1 text-xs font-semibold" :class="isActive('loading') ? 'text-amber-900' : 'text-slate-600'">
                loading
              </p>
              <p class="text-xs text-slate-500">加载中</p>
            </div>
          </div>
          <div v-if="currentStatus === 'loading'" class="mt-2 flex gap-2">
            <button type="button" class="rounded bg-emerald-600 px-2 py-1 text-xs font-semibold text-white hover:bg-emerald-700" @click="goToSuccess">
              模拟成功
            </button>
            <button type="button" class="rounded bg-rose-600 px-2 py-1 text-xs font-semibold text-white hover:bg-rose-700" @click="goToError">
              模拟失败
            </button>
          </div>
        </div>

        <!-- 分叉箭头容器 -->
        <div class="flex flex-col items-center gap-4 md:flex-row">
          <!-- 成功分支 -->
          <div class="flex flex-col items-center gap-2 md:flex-row">
            <div class="flex rotate-90 items-center md:rotate-0">
              <div class="h-0.5 w-8 bg-slate-300" />
              <div class="h-0 w-0 border-l-8 border-r-0 border-t-4 border-b-4 border-l-slate-300 border-t-transparent border-b-transparent" />
            </div>

            <div class="flex flex-col items-center">
              <div class="flex h-24 w-32 items-center justify-center rounded-lg border-2 p-3 transition-all" :class="isActive('success') ? 'border-emerald-600 bg-emerald-100 shadow-lg' : 'border-slate-300 bg-white'">
                <div class="text-center">
                  <div class="text-2xl">✅</div>
                  <p class="mt-1 text-xs font-semibold" :class="isActive('success') ? 'text-emerald-900' : 'text-slate-600'">
                    success
                  </p>
                  <p class="text-xs text-slate-500">成功</p>
                </div>
              </div>
              <button v-if="currentStatus === 'success'" type="button" class="mt-2 rounded bg-slate-600 px-3 py-1 text-xs font-semibold text-white hover:bg-slate-700" @click="reset">
                重置
              </button>
            </div>
          </div>

          <!-- 失败分支 -->
          <div class="flex flex-col items-center gap-2 md:flex-row md:ml-4">
            <div class="flex rotate-90 items-center md:rotate-0">
              <div class="h-0.5 w-8 bg-slate-300" />
              <div class="h-0 w-0 border-l-8 border-r-0 border-t-4 border-b-4 border-l-slate-300 border-t-transparent border-b-transparent" />
            </div>

            <div class="flex flex-col items-center">
              <div class="flex h-24 w-32 items-center justify-center rounded-lg border-2 p-3 transition-all" :class="isActive('error') ? 'border-rose-600 bg-rose-100 shadow-lg' : 'border-slate-300 bg-white'">
                <div class="text-center">
                  <div class="text-2xl">❌</div>
                  <p class="mt-1 text-xs font-semibold" :class="isActive('error') ? 'text-rose-900' : 'text-slate-600'">
                    error
                  </p>
                  <p class="text-xs text-slate-500">失败</p>
                </div>
              </div>
              <button v-if="currentStatus === 'error'" type="button" class="mt-2 rounded bg-slate-600 px-3 py-1 text-xs font-semibold text-white hover:bg-slate-700" @click="reset">
                重置
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 当前状态显示 -->
    <div class="mb-4 rounded-xl border border-white/70 bg-white p-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-semibold text-slate-900">当前状态</p>
          <p class="mt-1 text-xs text-slate-600">状态机只能处于其中一个状态</p>
        </div>
        <span class="rounded-full px-4 py-2 text-sm font-bold" :class="{
            'bg-slate-100 text-slate-700': currentStatus === 'idle',
            'bg-amber-100 text-amber-800': currentStatus === 'loading',
            'bg-emerald-100 text-emerald-800': currentStatus === 'success',
            'bg-rose-100 text-rose-800': currentStatus === 'error'
          }">
          {{ currentStatus }}
        </span>
      </div>
    </div>

    <!-- 状态迁移历史 -->
    <div class="rounded-xl border border-white/70 bg-white p-4">
      <p class="text-sm font-semibold text-slate-900">状态迁移历史</p>
      <div v-if="transitionHistory.length === 0" class="mt-2 text-xs text-slate-500">
        还没有状态迁移记录
      </div>
      <div v-else class="mt-2 space-y-1">
        <div v-for="(transition, index) in transitionHistory" :key="index" class="flex items-center gap-2 text-xs text-slate-600">
          <span class="text-slate-400">{{ index + 1 }}.</span>
          <span class="font-mono">{{ transition }}</span>
        </div>
      </div>
    </div>

    <div class="mt-4 rounded-xl border border-violet-200 bg-white p-4">
      <h4 class="text-sm font-semibold text-violet-900">💡 为什么需要四种状态</h4>
      <ul class="mt-2 space-y-1 text-xs leading-relaxed text-slate-700">
        <li class="flex items-start gap-2">
          <span class="mt-1 h-1 w-1 rounded-full bg-violet-500" />
          <span><span class="font-semibold">idle</span>：还没发起请求，显示"点击加载"按钮</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-1 w-1 rounded-full bg-violet-500" />
          <span><span class="font-semibold">loading</span>：正在请求中，显示转圈动画，防止重复点击</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-1 w-1 rounded-full bg-violet-500" />
          <span><span class="font-semibold">success</span>：请求成功，显示数据内容</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-1 h-1 w-1 rounded-full bg-violet-500" />
          <span><span class="font-semibold">error</span>：请求失败，显示错误信息和"重试"按钮</span>
        </li>
      </ul>
    </div>
  </section>
</template>
