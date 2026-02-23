<script setup lang="ts">
import { ref } from 'vue'

/**
 * 状态分类决策树组件
 * 通过交互式流程图帮助用户决策应该使用哪种状态类型
 */

type QuestionStep = 'start' | 'data-source' | 'need-share' | 'result'
type StateType = 'local' | 'global' | 'remote' | null

const currentStep = ref<QuestionStep>('start')
const selectedStateType = ref<StateType>(null)
const dataSource = ref<'user' | 'server' | null>(null)
const needShare = ref<boolean | null>(null)

const reset = () => {
  currentStep.value = 'start'
  selectedStateType.value = null
  dataSource.value = null
  needShare.value = null
}

const answerDataSource = (source: 'user' | 'server') => {
  dataSource.value = source
  if (source === 'server') {
    selectedStateType.value = 'remote'
    currentStep.value = 'result'
  } else {
    currentStep.value = 'need-share'
  }
}

const answerNeedShare = (share: boolean) => {
  needShare.value = share
  selectedStateType.value = share ? 'global' : 'local'
  currentStep.value = 'result'
}

const getResultInfo = () => {
  switch (selectedStateType.value) {
    case 'local':
      return {
        title: 'Local State（本地状态）',
        icon: '📝',
        color: 'amber',
        description: '使用 ref 或 reactive 在组件内部管理',
        examples: ['弹窗开关 isDialogOpen', '当前Tab索引 activeTabIndex', '表单输入草稿 formDraft'],
        code: 'const isOpen = ref(false)'
      }
    case 'global':
      return {
        title: 'Global State（全局状态）',
        icon: '🎨',
        color: 'sky',
        description: '使用 Pinia Store 跨组件共享',
        examples: ['当前登录用户 currentUser', '应用主题 themeMode', '购物车内容 cartItems'],
        code: 'const userStore = useUserStore()'
      }
    case 'remote':
      return {
        title: 'Remote Data（远程数据）',
        icon: '📚',
        color: 'emerald',
        description: '使用异步请求 + 状态机管理',
        examples: ['商品列表 products', '订单详情 orderDetail', '统计数据 analytics'],
        code: 'const { status, data, error } = useAsyncData(fetchProducts)'
      }
    default:
      return null
  }
}
</script>

<template>
  <section class="mt-6 rounded-2xl border border-teal-100 bg-teal-50/60 p-6">
    <div class="mb-4">
      <h3 class="text-lg font-semibold text-teal-900">交互式决策树：选择合适的状态类型</h3>
      <p class="mt-1 text-sm text-teal-900/80">回答几个问题，帮你判断应该用哪种状态</p>
    </div>

    <div class="rounded-xl border border-white/70 bg-white p-6">
      <!-- Step 1: 开始 -->
      <div v-if="currentStep === 'start'" class="text-center">
        <div class="mb-4 text-5xl">🤔</div>
        <h4 class="text-lg font-semibold text-slate-900">我需要存储一个数据...</h4>
        <p class="mt-2 text-sm text-slate-600">让我们通过几个问题来判断应该用哪种状态类型</p>
        <button type="button" class="mt-6 rounded-lg bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700" @click="currentStep = 'data-source'">
          开始判断
        </button>
      </div>

      <!-- Step 2: 数据来源 -->
      <div v-else-if="currentStep === 'data-source'" class="text-center">
        <div class="mb-4 text-4xl">📍</div>
        <h4 class="text-lg font-semibold text-slate-900">第一个问题：这个数据从哪来？</h4>
        <p class="mt-2 text-sm text-slate-600">数据的来源决定了它的基本类型</p>

        <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <button type="button" class="rounded-xl border-2 border-sky-300 bg-sky-50 p-6 text-left transition hover:border-sky-500 hover:bg-sky-100" @click="answerDataSource('user')">
            <div class="mb-2 text-3xl">👤</div>
            <p class="text-sm font-semibold text-sky-900">用户操作产生</p>
            <p class="mt-1 text-xs text-sky-700">比如点击、输入、选择等交互行为产生的数据</p>
            <p class="mt-2 text-xs text-slate-600">例如：开关状态、输入框内容、选中的选项</p>
          </button>

          <button type="button" class="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-6 text-left transition hover:border-emerald-500 hover:bg-emerald-100" @click="answerDataSource('server')">
            <div class="mb-2 text-3xl">🌐</div>
            <p class="text-sm font-semibold text-emerald-900">服务器提供</p>
            <p class="mt-1 text-xs text-emerald-700">需要通过网络请求从后端API获取的数据</p>
            <p class="mt-2 text-xs text-slate-600">例如：用户列表、商品详情、订单信息</p>
          </button>
        </div>
      </div>

      <!-- Step 3: 是否需要共享 -->
      <div v-else-if="currentStep === 'need-share'" class="text-center">
        <div class="mb-4 text-4xl">🔗</div>
        <h4 class="text-lg font-semibold text-slate-900">第二个问题：需要跨组件共享吗？</h4>
        <p class="mt-2 text-sm text-slate-600">这个数据是只在当前组件用，还是多个组件都要用？</p>

        <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <button type="button" class="rounded-xl border-2 border-amber-300 bg-amber-50 p-6 text-left transition hover:border-amber-500 hover:bg-amber-100" @click="answerNeedShare(false)">
            <div class="mb-2 text-3xl">📝</div>
            <p class="text-sm font-semibold text-amber-900">不需要共享</p>
            <p class="mt-1 text-xs text-amber-700">只在当前组件内使用，其他组件不需要访问</p>
            <p class="mt-2 text-xs text-slate-600">例如：弹窗开关、表单草稿、分页页码</p>
          </button>

          <button type="button" class="rounded-xl border-2 border-sky-300 bg-sky-50 p-6 text-left transition hover:border-sky-500 hover:bg-sky-100" @click="answerNeedShare(true)">
            <div class="mb-2 text-3xl">🎨</div>
            <p class="text-sm font-semibold text-sky-900">需要共享</p>
            <p class="mt-1 text-xs text-sky-700">多个组件、多个页面都要访问这个数据</p>
            <p class="mt-2 text-xs text-slate-600">例如：用户登录信息、主题设置、购物车</p>
          </button>
        </div>
      </div>

      <!-- Step 4: 结果 -->
      <div v-else-if="currentStep === 'result' && getResultInfo()" class="text-center">
        <div class="mb-4 text-5xl">{{ getResultInfo()!.icon }}</div>
        <h4 class="text-xl font-bold text-slate-900">{{ getResultInfo()!.title }}</h4>
        <p class="mt-2 text-sm text-slate-600">{{ getResultInfo()!.description }}</p>

        <div class="mt-6 rounded-lg border p-4 text-left" :class="`border-${getResultInfo()!.color}-200 bg-${getResultInfo()!.color}-50`">
          <p class="text-xs font-semibold uppercase tracking-wide" :class="`text-${getResultInfo()!.color}-900`">
            实际例子
          </p>
          <ul class="mt-2 space-y-1">
            <li v-for="example in getResultInfo()!.examples" :key="example" class="flex items-start gap-2 text-sm" :class="`text-${getResultInfo()!.color}-800`">
              <span class="mt-1 h-1 w-1 rounded-full" :class="`bg-${getResultInfo()!.color}-600`" />
              <span>{{ example }}</span>
            </li>
          </ul>
        </div>

        <div class="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 text-left">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-600">代码示例</p>
          <pre class="mt-2 text-sm text-slate-800"><code>{{ getResultInfo()!.code }}</code></pre>
        </div>

        <div class="mt-6 flex justify-center gap-3">
          <button type="button" class="rounded-lg border border-slate-300 bg-white px-6 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50" @click="reset">
            重新判断
          </button>
        </div>
      </div>
    </div>

    <!-- 决策流程总结 -->
    <div class="mt-4 rounded-xl border border-teal-200 bg-white p-4">
      <h4 class="text-sm font-semibold text-teal-900">💡 决策流程总结</h4>
      <div class="mt-2 space-y-2 text-xs leading-relaxed text-slate-700">
        <div class="flex items-start gap-2">
          <span class="font-bold text-teal-600">1.</span>
          <span>数据来自<span class="font-semibold">服务器</span> → <span class="font-semibold text-emerald-600">Remote Data</span></span>
        </div>
        <div class="flex items-start gap-2">
          <span class="font-bold text-teal-600">2.</span>
          <span>数据来自用户操作 + <span class="font-semibold">需要跨组件共享</span> → <span class="font-semibold text-sky-600">Global State</span></span>
        </div>
        <div class="flex items-start gap-2">
          <span class="font-bold text-teal-600">3.</span>
          <span>数据来自用户操作 + <span class="font-semibold">不需要共享</span> → <span class="font-semibold text-amber-600">Local State</span></span>
        </div>
      </div>
    </div>
  </section>
</template>
