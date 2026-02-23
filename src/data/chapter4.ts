import type { ResponsibilityBoundary } from '@/types/chapter'

export interface Chapter4CodeSample {
  id: string
  title: string
  language: 'javascript' | 'typescript' | 'vue'
  code: string
  tone: 'legacy' | 'modern' | 'neutral'
}

export interface Chapter4StateTaxonomyCard {
  id: 'local' | 'global' | 'remote'
  title: string
  subtitle: string
  definition: string
  backendComparison: string
  implementationTips: string[]
}

export interface Chapter4StatePatternCard {
  id: 'provide-inject' | 'global-store'
  title: string
  subtitle: string
  backendComparison: string
  suitableScenarios: string[]
  tradeoffs: string[]
}

export interface Chapter4AntiPattern {
  id: 'dom-manipulation' | 'data-flow-violation' | 'async-state-chaos'
  title: string
  problem: string
  wrongApproach: string
  correctApproach: string
  impact: string[]
}

export interface Chapter4BestPractice {
  id: 'single-source-truth' | 'state-driven-ui' | 'side-effect-isolation'
  title: string
  principle: string
  implementation: string[]
  benefits: string[]
}

export interface Chapter4FlowStage {
  id: 'state-input' | 'mapping-function' | 'ui-output' | 'feedback-loop'
  title: string
  description: string
  keyCheck: string
}

export interface Chapter4EvidenceLink {
  kind: 'state-taxonomy' | 'state-pattern' | 'anti-pattern' | 'best-practice'
  ids: string[]
}

export interface Chapter4ConceptSection {
  id: '4.1' | '4.2' | '4.3'
  title: string
  subtitle: string
  what: string[]
  why: string[]
  how: string[]
  backendComparisons: string[]
  codeSamples: Chapter4CodeSample[]
  evidenceLinks: Chapter4EvidenceLink[]
}

export interface Chapter4Content {
  pageTitle: string
  pageSubtitle: string
  chapterSummary: string
  formulaRelation: string
  responsibilityBoundary: ResponsibilityBoundary
  flowStages: Chapter4FlowStage[]
  conceptSections: Chapter4ConceptSection[]
  stateTaxonomyCards: Chapter4StateTaxonomyCard[]
  statePatternCards: Chapter4StatePatternCard[]
  antiPatterns: Chapter4AntiPattern[]
  bestPractices: Chapter4BestPractice[]
}

export const chapter4Content: Chapter4Content = {
  pageTitle: '第四章：状态链路串讲',
  pageSubtitle: 'State-to-UI Chain Guide',
  chapterSummary: '本章不绑定具体项目，直接用通用链路讲清 States、f() 与 UI 的协作方式。',
  formulaRelation:
    '第四章聚焦 UI = f(States) 的运行链路：先建模状态输入，再定义映射函数，最后得到稳定 UI，并通过反馈闭环持续修正。',
  responsibilityBoundary: {
    frontend: ['定义状态分层与组件边界', '维护状态到 UI 的映射关系', '管理副作用生命周期与交互反馈'],
    backend: ['提供稳定字段与错误模型', '保证接口语义和权限边界', '支持前端状态恢复和重试策略'],
    contract: ['约定字段可空性与默认值', '约定分页/过滤/排序协议', '约定错误码和兼容策略']
  },
  flowStages: [
    {
      id: 'state-input',
      title: '阶段 1：状态输入',
      description: '先识别 Local / Global / Remote 三类状态，确定谁拥有写权限。',
      keyCheck: '同一份业务状态是否只有一个写入口？'
    },
    {
      id: 'mapping-function',
      title: '阶段 2：映射函数 f()',
      description: '用 props、computed、v-for、v-if 把状态映射成可预测的界面结构。',
      keyCheck: '模板里是否只做展示，派生逻辑是否收敛在 computed？'
    },
    {
      id: 'ui-output',
      title: '阶段 3：UI 输出',
      description: '确保同一状态输入得到同一 UI 输出，避免手动 DOM 侧写。',
      keyCheck: '是否仍有 querySelector 这类绕过状态层的更新？'
    },
    {
      id: 'feedback-loop',
      title: '阶段 4：反馈闭环',
      description: '把交互反馈、异步错误和重试纳入状态机，形成可恢复链路。',
      keyCheck: '失败态、恢复态、清理时机是否都有显式建模？'
    }
  ],
  conceptSections: [
    {
      id: '4.1',
      title: '状态输入建模',
      subtitle: '结论：先分层，再编码。',
      what: ['States 不是一个变量，而是一组有边界的数据输入。', '先区分 Local / Global / Remote，再决定存放位置。'],
      why: ['分层清楚后，状态来源和写入责任可追踪。', '先建模可以减少后期重构和状态迁移成本。'],
      how: ['用类型定义状态结构与可选字段。', '为每类状态明确唯一写入口和读取范围。'],
      backendComparisons: ['类似后端先定义领域模型再写业务逻辑。', '类似接口分层：DTO、缓存态、会话态职责分离。'],
      codeSamples: [
        {
          id: '4.1-state-modeling',
          title: '状态分层建模示例',
          language: 'typescript',
          tone: 'neutral',
          code: `type AsyncStatus = 'idle' | 'loading' | 'success' | 'error'

interface UiState {
  draftKeyword: string // local
  activeTab: 'all' | 'mine' // local
  currentUserId: string // global
  listStatus: AsyncStatus // remote-meta
}`
        }
      ],
      evidenceLinks: [
        { kind: 'state-taxonomy', ids: ['local', 'global', 'remote'] },
        { kind: 'state-pattern', ids: ['provide-inject', 'global-store'] }
      ]
    },
    {
      id: '4.2',
      title: '映射函数与数据流正确性',
      subtitle: '结论：状态下行，事件上行。',
      what: ['f() 的核心是把状态映射为 UI，而不是手工操作 DOM。', '单向数据流要求 props 只读，写操作通过事件回到上层。'],
      why: ['数据流方向固定后，变更路径更容易定位。', '避免隐式写入可以降低跨组件耦合。'],
      how: ['把复杂派生逻辑放进 computed。', '异步流程统一建模为状态机并处理错误分支。'],
      backendComparisons: ['类似命令与查询分离：读和写路径明确。', '类似后端统一异常处理，避免业务层吞错。'],
      codeSamples: [
        {
          id: '4.2-data-flow',
          title: '单向数据流与异步状态机',
          language: 'vue',
          tone: 'modern',
          code: `const state = reactive({
  status: 'idle' as 'idle' | 'loading' | 'success' | 'error',
  data: [] as string[],
  error: ''
})

const load = async () => {
  state.status = 'loading'
  try {
    state.data = await fetchList()
    state.status = 'success'
  } catch (e) {
    state.error = String(e)
    state.status = 'error'
  }
}`
        }
      ],
      evidenceLinks: [
        { kind: 'state-pattern', ids: ['provide-inject', 'global-store'] },
        { kind: 'anti-pattern', ids: ['dom-manipulation', 'data-flow-violation', 'async-state-chaos'] }
      ]
    },
    {
      id: '4.3',
      title: '输出与反馈闭环',
      subtitle: '结论：可建立、可恢复、可清理。',
      what: ['UI 输出必须可预测：同一状态输入得到同一渲染结果。', '反馈链路要覆盖成功、失败与恢复三个阶段。'],
      why: ['闭环状态能让用户知道系统当前所处阶段。', '副作用可清理可以降低重渲染带来的风险。'],
      how: ['统一使用状态驱动渲染，不直接改 DOM。', '在生命周期中清理订阅和定时器。'],
      backendComparisons: ['类似事务边界：副作用有开始和结束。', '类似重试机制：失败路径必须可恢复。'],
      codeSamples: [
        {
          id: '4.3-feedback-loop',
          title: '反馈闭环与副作用清理',
          language: 'vue',
          tone: 'modern',
          code: `const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

const handleCopy = () => {
  copied.value = true
  timer = setTimeout(() => {
    copied.value = false
  }, 1600)
}

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})`
        }
      ],
      evidenceLinks: [
        { kind: 'best-practice', ids: ['single-source-truth', 'state-driven-ui', 'side-effect-isolation'] },
        { kind: 'anti-pattern', ids: ['async-state-chaos'] }
      ]
    }
  ],
  stateTaxonomyCards: [
    {
      id: 'local',
      title: 'Local State',
      subtitle: '组件内部状态',
      definition: '只在当前组件有效，随组件创建与销毁。',
      backendComparison: '对应方法内局部变量，作用域最小。',
      implementationTips: ['默认优先本地维护', '仅在复用需求明确时再提升']
    },
    {
      id: 'global',
      title: 'Global State',
      subtitle: '跨页面共享状态',
      definition: '多个模块都依赖的共享状态，需要统一读写入口。',
      backendComparison: '类似单例服务，强调一致性和可追踪。',
      implementationTips: ['按领域拆分 Store', '禁止把短期状态放入全局']
    },
    {
      id: 'remote',
      title: 'Remote Data',
      subtitle: '服务端源数据',
      definition: '主数据在服务端，前端负责拉取、缓存和恢复。',
      backendComparison: '对应外部 API 响应，需要处理超时和失败。',
      implementationTips: ['状态与数据分离建模', '显式处理错误与重试']
    }
  ],
  statePatternCards: [
    {
      id: 'provide-inject',
      title: 'Provide / Inject',
      subtitle: '组件树上下文共享',
      backendComparison: '类似 IoC 注入，避免深层 props 透传。',
      suitableScenarios: ['主题/语言/权限上下文', '同组件树的跨层共享'],
      tradeoffs: ['跨页面能力有限', '依赖命名规范保障可维护性']
    },
    {
      id: 'global-store',
      title: 'Global Store（Pinia）',
      subtitle: '集中式共享状态',
      backendComparison: '类似应用级服务，统一状态入口。',
      suitableScenarios: ['跨页面共享登录态、权限态', '复杂链路需要可追踪状态变化'],
      tradeoffs: ['拆分不当会形成巨型 Store', '需要严格约束读写边界']
    }
  ],
  antiPatterns: [
    {
      id: 'dom-manipulation',
      title: '反模式 1：直接操作 DOM',
      problem: '绕过状态层，导致状态与 UI 不一致。',
      wrongApproach: 'document.querySelector(...).appendChild(...)',
      correctApproach: '只更新 state，让模板自动重渲染',
      impact: ['来源不可追踪', '难以复用框架调度优化', '维护成本快速上升']
    },
    {
      id: 'data-flow-violation',
      title: '反模式 2：破坏单向数据流',
      problem: '子组件直接改 props，父层无法感知写入来源。',
      wrongApproach: 'props.todo.completed = !props.todo.completed',
      correctApproach: "emit('toggle') 交由上层更新",
      impact: ['调试链路变长', '组件职责不清晰', '复用能力下降']
    },
    {
      id: 'async-state-chaos',
      title: '反模式 3：异步状态混乱',
      problem: '只用 isLoading 无法覆盖错误和恢复。',
      wrongApproach: 'const isLoading = ref(false)',
      correctApproach: '使用 idle/loading/success/error 状态机',
      impact: ['错误态不可见', '并发请求容易竞态', '用户反馈中断']
    }
  ],
  bestPractices: [
    {
      id: 'single-source-truth',
      title: '最佳实践 1：单一数据源',
      principle: '状态是唯一真相，UI 只做派生输出。',
      implementation: ['业务状态集中定义', '禁止在多个组件重复维护同一真相'],
      benefits: ['定位更直接', '减少状态不一致缺陷']
    },
    {
      id: 'state-driven-ui',
      title: '最佳实践 2：状态驱动 UI',
      principle: '通过状态变化触发渲染，不手动写 DOM。',
      implementation: ['使用 v-if/v-for/computed 描述 UI', '模板只表达“显示什么”'],
      benefits: ['输出可预测', '降低维护和排错成本']
    },
    {
      id: 'side-effect-isolation',
      title: '最佳实践 3：副作用隔离',
      principle: '副作用要有建立、更新、清理三个时机。',
      implementation: ['在生命周期钩子中管理副作用', '卸载时统一清理定时器和订阅'],
      benefits: ['减少内存泄漏', '避免副作用重复执行']
    }
  ]
}
