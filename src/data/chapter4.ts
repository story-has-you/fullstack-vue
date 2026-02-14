export interface Chapter4CodeSample {
  id: string
  title: string
  language: 'javascript' | 'typescript' | 'vue'
  code: string
  tone: 'legacy' | 'modern' | 'neutral'
}

export interface Chapter4TaxonomyCard {
  id: 'local' | 'global' | 'remote'
  title: string
  subtitle: string
  definition: string
  backendComparison: string
  examples: string[]
  implementationTips: string[]
}

export interface Chapter4Pattern {
  id: 'provide-inject' | 'global-store'
  title: string
  subtitle: string
  backendComparison: string
  suitableScenarios: string[]
  tradeoffs: string[]
  implementationTips: string[]
}

export interface Chapter4ConceptSection {
  id: '4.1' | '4.2'
  title: string
  subtitle: string
  what: string[]
  why: string[]
  how: string[]
  backendComparisons: string[]
  codeSamples: Chapter4CodeSample[]
}

export interface Chapter4Content {
  pageTitle: string
  pageSubtitle: string
  chapterSummary: string
  conceptSections: Chapter4ConceptSection[]
  taxonomyCards: Chapter4TaxonomyCard[]
  patterns: Chapter4Pattern[]
}

export const chapter4Content: Chapter4Content = {
  pageTitle: '第四章：状态管理设计',
  pageSubtitle: 'State Management Design',
  chapterSummary:
    '本章聚焦“状态分类先行”的工程方法：先区分 Local / Global / Remote 三类状态，再基于依赖注入或集中式 Store 选择实现模式，避免把所有数据塞进一个容器。',
  conceptSections: [
    {
      id: '4.1',
      title: '状态管理分类学',
      subtitle: 'Local State、Global State、Remote Data 分层治理',
      what: [
        'Local State 仅在当前组件有效，例如弹窗开关、输入框草稿值。',
        'Global State 在多个页面或组件共享，例如当前用户信息、主题偏好。',
        'Remote Data 源头在服务端，前端按需请求并展示，例如商品列表、订单详情。'
      ],
      why: [
        '避免把所有数据堆到全局 Store，导致状态耦合和维护成本失控。',
        '减少 Prop Drilling，把跨层共享信息通过合理机制分发。',
        '把数据获取逻辑和 UI 状态逻辑分离，保证职责清晰。'
      ],
      how: [
        '先标注状态归属，再决定数据存放位置，不要先写代码再回头分类。',
        '优先局部化状态；只有跨组件共享时再提升为全局状态。',
        '远程数据单独维护请求状态，避免和表单临时值混在同一个对象。'
      ],
      backendComparisons: [
        'Local State 对应方法内局部变量，生命周期随调用结束而结束。',
        'Global State 对应单例服务或会话级对象，跨模块共享但需边界约束。',
        'Remote Data 对应外部 API 调用结果，应独立处理缓存、错误和重试策略。'
      ],
      codeSamples: [
        {
          id: '4.1-classification',
          title: '状态分类决策示意（先分类后落地）',
          language: 'typescript',
          tone: 'neutral',
          code: `type StateKind = 'local' | 'global' | 'remote'

interface StateCandidate {
  name: string
  crossesComponentBoundary: boolean
  sourceOfTruth: 'client' | 'server'
}

function classifyState(candidate: StateCandidate): StateKind {
  if (candidate.sourceOfTruth === 'server') {
    return 'remote'
  }

  if (candidate.crossesComponentBoundary) {
    return 'global'
  }

  return 'local'
}`
        }
      ]
    },
    {
      id: '4.2',
      title: '详细实现模式',
      subtitle: 'Provide/Inject 与 Global Store（Pinia 推荐、Vuex 维护模式）',
      what: [
        'Provide/Inject 适合在组件树中下发上下文，避免多层 props 透传。',
        'Global Store 适合承载跨页面共享状态，统一更新入口和读取语义。',
        '在 Vue 3 生态中，Pinia 是推荐方案；Vuex 常见于历史项目维护。'
      ],
      why: [
        '通过依赖注入降低中间组件传参噪音，让关注点聚焦在真正消费状态的节点。',
        '通过集中式 Store 让共享状态可追踪，方便调试与重构。',
        '在增量演进场景里保留 Vuex 认知，便于理解旧项目迁移成本。'
      ],
      how: [
        '上下文型数据优先 Provide/Inject，例如当前用户、权限上下文。',
        '全局共享业务状态放 Pinia Store，约束 Action 入口并导出类型。',
        '维护旧项目时保留 Vuex 分层语义，但新功能优先落在 Pinia。'
      ],
      backendComparisons: [
        'Provide/Inject 类似 Spring IoC 容器中的 Bean 注入。',
        'Pinia Store 类似单例 Service：state 是成员变量，action 是成员方法。',
        'Vuex 类似带显式写入层的旧式状态容器：mutation/action 分层更重。'
      ],
      codeSamples: [
        {
          id: '4.2-provide-inject',
          title: 'Provide / Inject：跨层依赖注入',
          language: 'vue',
          tone: 'modern',
          code: `<script setup lang="ts">
import { provide, ref } from 'vue'

interface CurrentUser {
  id: number
  name: string
}

const currentUser = ref<CurrentUser>({ id: 1, name: 'Admin' })
provide('currentUser', currentUser)
</script>

<template>
  <RouterView />
</template>

<!-- 深层子组件 -->
<script setup lang="ts">
import { inject, type Ref } from 'vue'

const user = inject<Ref<CurrentUser>>('currentUser')
</script>

<template>
  <p>{{ user?.name }}</p>
</template>`
        },
        {
          id: '4.2-pinia',
          title: 'Pinia（推荐）：State / Getter / Action',
          language: 'typescript',
          tone: 'modern',
          code: `import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  const increment = () => {
    count.value += 1
  }

  return { count, doubleCount, increment }
})

// 组件中使用
// const counter = useCounterStore()
// counter.increment()`
        },
        {
          id: '4.2-vuex',
          title: 'Vuex（维护模式）：mutation + action',
          language: 'typescript',
          tone: 'legacy',
          code: `import { createStore } from 'vuex'

export default createStore({
  state: () => ({ count: 0 }),
  mutations: {
    increment(state) {
      state.count += 1
    }
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => commit('increment'), 300)
    }
  }
})`
        }
      ]
    }
  ],
  taxonomyCards: [
    {
      id: 'local',
      title: 'Local State',
      subtitle: '组件内部状态',
      definition: '仅在当前组件内生效，生命周期跟随组件创建与销毁。',
      backendComparison: '对应方法内部局部变量，不应外泄到系统全局。',
      examples: ['弹窗开关 isDialogOpen', '输入草稿 draftForm', '当前分页页码 currentPage'],
      implementationTips: ['优先使用 ref/reactive 就近维护', '避免为了“统一”提前放入全局 Store']
    },
    {
      id: 'global',
      title: 'Global State',
      subtitle: '跨组件共享状态',
      definition: '多个页面或模块复用的状态，需要统一读写语义和生命周期。',
      backendComparison: '对应单例服务或会话对象，强调共享与一致性。',
      examples: ['登录用户 currentUser', '主题偏好 themeMode', '全局权限 permissionMap'],
      implementationTips: ['优先 Pinia 原子化 Store', '按领域拆分 Store，避免巨型单仓库']
    },
    {
      id: 'remote',
      title: 'Remote Data',
      subtitle: '服务端源数据',
      definition: '数据主源在服务端，前端负责按需加载、缓存和错误恢复。',
      backendComparison: '对应外部 API 响应 DTO，需要处理超时、失败和重试。',
      examples: ['商品列表 products', '订单详情 orderDetail', '报表数据 analyticsData'],
      implementationTips: ['把请求状态与数据本体分开建模', '明确 idle/loading/success/error 状态机']
    }
  ],
  patterns: [
    {
      id: 'provide-inject',
      title: 'Provide / Inject',
      subtitle: '依赖注入模式（组件树上下文共享）',
      backendComparison: '类似 Spring IoC 的 Bean 注入，消费方不需层层传参。',
      suitableScenarios: ['用户上下文、权限上下文', '主题、语言等跨层配置', '避免 5 层以上 props drilling'],
      tradeoffs: ['适合同一组件树内部共享，不适合全局业务状态编排', '调试链路不如 Store 明显，需要命名规范'],
      implementationTips: ['使用语义化 key，并导出注入类型', '在提供端集中维护上下文默认值']
    },
    {
      id: 'global-store',
      title: 'Global Store（Pinia / Vuex）',
      subtitle: '集中式共享状态（Pinia 推荐，Vuex 维护模式）',
      backendComparison: '类似单例服务聚合跨模块共享状态和操作入口。',
      suitableScenarios: ['跨页面读写的登录态、权限态', '复杂业务链路的状态追踪与调试', '需要统一 action 入口的共享数据'],
      tradeoffs: ['全量集中可能导致耦合，需按领域拆分', 'Vuex 冗余较高，适合旧项目兼容'],
      implementationTips: ['新项目优先 Pinia setup store', '历史 Vuex 项目逐步迁移，避免一次性重写']
    }
  ]
}
