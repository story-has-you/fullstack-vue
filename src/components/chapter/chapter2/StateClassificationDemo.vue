<script setup lang="ts">
import { ref, provide } from 'vue'

/**
 * 状态分类演示组件
 * 通过三栏布局直观展示 Local、Global、Remote 三种状态的区别
 */

// Local State 示例：折叠面板状态（只在当前组件有效）
const isPanelExpanded = ref(false)
const togglePanel = () => {
  isPanelExpanded.value = !isPanelExpanded.value
}

// Global State 示例：主题模式（跨组件共享）
// 使用 provide/inject 模拟全局状态
const theme = ref<'light' | 'dark'>('light')
provide('theme', theme)

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

// Remote Data 示例：用户信息加载
type RemoteStatus = 'idle' | 'loading' | 'success' | 'error'

interface User {
  id: number
  name: string
  email: string
}

const remoteStatus = ref<RemoteStatus>('idle')
const userData = ref<User | null>(null)
const remoteError = ref<string | null>(null)

const simulateFetchUser = (): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail = Math.random() < 0.3
      if (shouldFail) {
        reject(new Error('网络请求失败'))
      } else {
        resolve({
          id: 1,
          name: '张三',
          email: 'zhangsan@example.com'
        })
      }
    }, 800)
  })
}

const loadUserData = async () => {
  if (remoteStatus.value === 'loading') return

  remoteStatus.value = 'loading'
  remoteError.value = null

  try {
    userData.value = await simulateFetchUser()
    remoteStatus.value = 'success'
  } catch (error) {
    remoteError.value = error instanceof Error ? error.message : '未知错误'
    remoteStatus.value = 'error'
  }
}
</script>

<template>
  <section class="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-6">
    <div class="mb-4">
      <h3 class="text-lg font-semibold text-indigo-900">交互演示：三种状态对比</h3>
      <p class="mt-1 text-sm text-indigo-900/80">看看便利贴、白板、图书馆的区别</p>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <!-- Local State：便利贴 -->
      <article class="rounded-xl border border-white/70 bg-white p-4">
        <div class="mb-3 flex items-center gap-2">
          <span class="text-xl">📝</span>
          <div>
            <h4 class="text-sm font-semibold text-slate-900">Local State</h4>
            <p class="text-xs text-slate-600">便利贴（只在这里）</p>
          </div>
        </div>

        <div class="mb-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-amber-900">折叠面板</p>
            <button type="button" class="text-xs font-semibold text-amber-700 hover:text-amber-800" @click="togglePanel">
              {{ isPanelExpanded ? '收起' : '展开' }}
            </button>
          </div>
          <div v-if="isPanelExpanded" class="mt-2 rounded bg-white p-2 text-xs text-slate-700">
            这是面板的详细内容，只有展开时才显示。
          </div>
        </div>

        <div class="rounded-lg border border-slate-200 bg-slate-50 p-2">
          <p class="text-xs font-mono text-slate-600">isPanelExpanded:</p>
          <p class="text-sm font-semibold text-slate-900">{{ isPanelExpanded }}</p>
        </div>

        <p class="mt-3 text-xs leading-relaxed text-slate-600">
          <span class="font-semibold text-amber-700">数据存在：</span>当前组件内部<br />
          <span class="font-semibold text-amber-700">生命周期：</span>组件销毁时消失<br />
          <span class="font-semibold text-amber-700">适用场景：</span>弹窗开关、Tab索引
        </p>
      </article>

      <!-- Global State：白板 -->
      <article class="rounded-xl border border-white/70 bg-white p-4">
        <div class="mb-3 flex items-center gap-2">
          <span class="text-xl">🎨</span>
          <div>
            <h4 class="text-sm font-semibold text-slate-900">Global State</h4>
            <p class="text-xs text-slate-600">白板（所有人可见）</p>
          </div>
        </div>

        <div class="mb-3 rounded-lg border p-3" :class="theme === 'light' ? 'border-sky-200 bg-sky-50' : 'border-slate-600 bg-slate-800'">
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium" :class="theme === 'light' ? 'text-sky-900' : 'text-white'">
              当前主题
            </p>
            <button type="button" class="rounded-full px-3 py-1 text-xs font-semibold transition" :class="theme === 'light' ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-amber-100 text-amber-900 hover:bg-amber-200'" @click="toggleTheme">
              {{ theme === 'light' ? '🌙 切换暗色' : '☀️ 切换亮色' }}
            </button>
          </div>
          <p class="mt-2 text-xs" :class="theme === 'light' ? 'text-sky-700' : 'text-slate-300'">
            这个设置会影响所有组件
          </p>
        </div>

        <div class="rounded-lg border border-slate-200 bg-slate-50 p-2">
          <p class="text-xs font-mono text-slate-600">theme:</p>
          <p class="text-sm font-semibold text-slate-900">"{{ theme }}"</p>
        </div>

        <p class="mt-3 text-xs leading-relaxed text-slate-600">
          <span class="font-semibold text-sky-700">数据存在：</span>全局 Store（Pinia）<br />
          <span class="font-semibold text-sky-700">生命周期：</span>应用运行期间<br />
          <span class="font-semibold text-sky-700">适用场景：</span>用户信息、主题设置
        </p>
      </article>

      <!-- Remote Data：图书馆 -->
      <article class="rounded-xl border border-white/70 bg-white p-4">
        <div class="mb-3 flex items-center gap-2">
          <span class="text-xl">📚</span>
          <div>
            <h4 class="text-sm font-semibold text-slate-900">Remote Data</h4>
            <p class="text-xs text-slate-600">图书馆（去服务器借）</p>
          </div>
        </div>

        <div class="mb-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-emerald-900">用户信息</p>
            <span class="rounded-full px-2 py-0.5 text-xs font-semibold" :class="{
                'bg-slate-100 text-slate-600': remoteStatus === 'idle',
                'bg-amber-100 text-amber-700': remoteStatus === 'loading',
                'bg-emerald-100 text-emerald-700': remoteStatus === 'success',
                'bg-rose-100 text-rose-700': remoteStatus === 'error'
              }">
              {{ remoteStatus }}
            </span>
          </div>

          <div v-if="remoteStatus === 'idle'" class="mt-2">
            <button type="button" class="w-full rounded bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700" @click="loadUserData">
              点击加载数据
            </button>
          </div>

          <div v-else-if="remoteStatus === 'loading'" class="mt-2 text-center">
            <div class="inline-block h-5 w-5 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
            <p class="mt-1 text-xs text-emerald-700">加载中...</p>
          </div>

          <div v-else-if="remoteStatus === 'success' && userData" class="mt-2 rounded bg-white p-2 text-xs">
            <p class="font-semibold text-slate-900">{{ userData.name }}</p>
            <p class="text-slate-600">{{ userData.email }}</p>
          </div>

          <div v-else-if="remoteStatus === 'error'" class="mt-2">
            <p class="rounded bg-rose-100 p-2 text-xs text-rose-700">{{ remoteError }}</p>
            <button type="button" class="mt-2 w-full rounded bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-700" @click="loadUserData">
              重试
            </button>
          </div>
        </div>

        <div class="rounded-lg border border-slate-200 bg-slate-50 p-2">
          <p class="text-xs font-mono text-slate-600">status:</p>
          <p class="text-sm font-semibold text-slate-900">"{{ remoteStatus }}"</p>
        </div>

        <p class="mt-3 text-xs leading-relaxed text-slate-600">
          <span class="font-semibold text-emerald-700">数据存在：</span>服务器（按需获取）<br />
          <span class="font-semibold text-emerald-700">生命周期：</span>请求完成后缓存<br />
          <span class="font-semibold text-emerald-700">适用场景：</span>商品列表、订单详情
        </p>
      </article>
    </div>

    <div class="mt-4 rounded-xl border border-indigo-200 bg-white p-4">
      <h4 class="text-sm font-semibold text-indigo-900">💡 如何选择</h4>
      <div class="mt-2 grid grid-cols-1 gap-2 text-xs leading-relaxed text-slate-700 md:grid-cols-3">
        <div>
          <span class="font-semibold text-amber-600">📝 便利贴：</span>只在当前组件用 → Local State
        </div>
        <div>
          <span class="font-semibold text-sky-600">🎨 白板：</span>多个组件要共享 → Global State
        </div>
        <div>
          <span class="font-semibold text-emerald-600">📚 图书馆：</span>数据来自服务器 → Remote Data
        </div>
      </div>
    </div>
  </section>
</template>
