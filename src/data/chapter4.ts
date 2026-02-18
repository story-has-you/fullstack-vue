export interface Chapter4CodeSample {
  id: string
  title: string
  language: 'javascript' | 'typescript' | 'vue'
  code: string
  tone: 'legacy' | 'modern' | 'neutral'
}

export interface Chapter4ProjectPracticeCard {
  id: 'states-design' | 'ui-components' | 'reactive-binding' | 'interaction-flow'
  title: string
  subtitle: string
  description: string
  examples: string[]
  codeReference: string
}

// 向后兼容：旧的 TaxonomyCard 类型
export interface Chapter4TaxonomyCardLegacy {
  id: 'local' | 'global' | 'remote'
  title: string
  subtitle: string
  definition: string
  backendComparison: string
  examples: string[]
  implementationTips: string[]
}

// 类型别名，用于组件
export type Chapter4TaxonomyCard = Chapter4TaxonomyCardLegacy

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

// 向后兼容：旧的 Pattern 类型
export interface Chapter4PatternLegacy {
  id: 'provide-inject' | 'global-store'
  title: string
  subtitle: string
  backendComparison: string
  suitableScenarios: string[]
  tradeoffs: string[]
  implementationTips: string[]
}

// 类型别名，用于组件
export type Chapter4Pattern = Chapter4PatternLegacy

export interface Chapter4ConceptSection {
  id: '4.1' | '4.2' | '4.3'
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
  formulaRelation?: string
  conceptSections: Chapter4ConceptSection[]
  projectPracticeCards: Chapter4ProjectPracticeCard[]
  antiPatterns: Chapter4AntiPattern[]
  bestPractices: Chapter4BestPractice[]
  // 向后兼容字段
  taxonomyCards: Chapter4TaxonomyCard[]
  patterns: Chapter4Pattern[]
}

export const chapter4Content: Chapter4Content = {
  pageTitle: '第四章：完整应用实践',
  pageSubtitle: 'Complete Application Practice',
  chapterSummary:
    '本章以当前项目为例，展示 UI = f(States) 在实际应用中的完整实践：States 设计、UI 组件拆分、响应式绑定实现、交互流程，以及常见反模式与最佳实践。',
  formulaRelation:
    '在公式 UI = f(States) 中，本章是完整公式的端到端实践验证。以本项目自身为案例：chapters.ts 和 chapter1-6.ts 是 States（唯一数据源），ChapterCard/ConceptSectionCard 等组件是 UI，v-for/props/computed 是 f() 的具体绑定。项目架构体现了公式的三大原则：（1）单一数据源：所有章节内容来自 src/data/，不存在第二份数据；（2）声明式 UI：组件通过模板声明渲染逻辑，不手动操作 DOM；（3）状态驱动：复制按钮、路由导航等交互完全由 State 变化驱动。同时，本章通过反模式案例（直接操作 DOM、破坏单向流、异步状态混乱）展示了违反公式的后果，通过最佳实践（状态驱动、副作用隔离）展示了遵循公式的收益。这是一个"教学内容本身就是教学案例"的自举式设计。',
  conceptSections: [
    {
      id: '4.1',
      title: '本项目的 UI = f(States) 实践',
      subtitle: '以章节导航系统为例',
      what: [
        '本项目是一个全栈分享网站，核心功能是展示章节内容和代码示例。',
        'States 设计：chapters.ts 定义章节元数据，chapter1-6.ts 定义详细内容。',
        'UI 组件：ChapterCard 展示章节卡片，ConceptSectionCard 展示概念小节。',
        '响应式绑定：v-for 遍历 chapters 数组自动渲染卡片列表。'
      ],
      why: [
        '单一数据源：所有章节内容来自 src/data/ 数据文件，避免多处维护。',
        '声明式 UI：组件只描述当前状态应该渲染什么，不关心如何变化。',
        '组件幂等性：同样的 chapter 对象总能渲染出同样的卡片。'
      ],
      how: [
        '定义 Chapter 类型约束章节数据结构（src/types/chapter.ts）。',
        '在 chapters.ts 中维护章节元信息数组，作为唯一数据源。',
        '组件通过 props 接收数据，不直接修改，保持单向数据流。'
      ],
      backendComparisons: [
        'States 设计类似后端领域模型 (Domain Model)：定义清晰的数据结构。',
        'UI 组件类似视图模板：接收数据后渲染，不包含业务逻辑。',
        '响应式绑定类似模板引擎的数据绑定：数据变化自动刷新视图。'
      ],
      codeSamples: [
        {
          id: '4.1-states-design',
          title: 'States 设计：chapters.ts（章节元数据）',
          language: 'typescript',
          tone: 'neutral',
          code: `import type { Chapter } from '@/types/chapter'

export const chapters: Chapter[] = [
  {
    id: 'intro',
    number: 0,
    title: '前言',
    subtitle: '前端开发的本质',
    description: '抛开框架噪音，聚焦 UI、数据、绑定三要素...',
    icon: 'target',
    color: 'blue',
    sections: [
      { id: 'formula', title: '核心公式：UI = f(states)' },
      { id: 'ui', title: 'UI (User Interface)' }
    ],
    route: '/intro'
  },
  // ... 更多章节
]

// 类型定义：src/types/chapter.ts
export interface Chapter {
  id: string
  number: number
  title: string
  subtitle: string
  description: string
  icon: ChapterIconKey
  color: string
  sections: Section[]
  route: string
}`
        },
        {
          id: '4.1-ui-component',
          title: 'UI 组件：ChapterCard（章节卡片）',
          language: 'vue',
          tone: 'modern',
          code: `<!-- src/components/common/ChapterCard.vue -->
<script setup lang="ts">
import type { Chapter } from '@/types/chapter'

// Props: 不可变输入，作为 f() 的参数
const props = defineProps<{
  chapter: Chapter
}>()

// UI 完全由 props.chapter 驱动
// 同一 chapter 对象 → 同一 UI 输出（幂等性）
</script>

<template>
  <article
    class="chapter-card"
    :style="{ borderColor: chapter.color }"
  >
    <LucideIcon :name="chapter.icon" />
    <h3>{{ chapter.title }}</h3>
    <p>{{ chapter.subtitle }}</p>
    <p>{{ chapter.description }}</p>
  </article>
</template>`
        },
        {
          id: '4.1-reactive-binding',
          title: '响应式绑定：HomeView（首页）',
          language: 'vue',
          tone: 'modern',
          code: `<!-- src/views/HomeView.vue -->
<script setup lang="ts">
import { chapters } from '@/data/chapters'
import ChapterCard from '@/components/common/ChapterCard.vue'

// States: 章节数据（静态导入，也可改为异步加载）
// f(): v-for 遍历 + ChapterCard 组件
// UI: 自动渲染所有章节卡片
</script>

<template>
  <div class="chapters-grid">
    <!-- UI = f(chapters) -->
    <ChapterCard
      v-for="chapter in chapters"
      :key="chapter.id"
      :chapter="chapter"
    />
  </div>
</template>

<!--
  公式验证:
  - chapters 是 States
  - v-for + ChapterCard 是 f()
  - 最终渲染的卡片列表是 UI
-->`
        }
      ]
    },
    {
      id: '4.2',
      title: '常见反模式与解决方案',
      subtitle: '违反核心公式的错误实践',
      what: [
        '反模式 1：直接操作 DOM，绕过响应式系统。',
        '反模式 2：破坏单向数据流，子组件直接修改 props。',
        '反模式 3：异步状态管理混乱，只用单个布尔值表示加载状态。'
      ],
      why: [
        'DOM 操作破坏了"数据是唯一真相"的原则，导致状态与 UI 不一致。',
        '双向修改 props 破坏了数据流向，难以追踪数据变化来源。',
        '简化的异步状态无法表达错误和重试，导致用户体验差。'
      ],
      how: [
        '避免 querySelector 等 DOM API，始终通过修改 state 更新 UI。',
        '子组件通过 emit 通知父组件变更，而不是直接修改 props。',
        '使用完整的异步状态机 (idle/loading/success/error) 建模。'
      ],
      backendComparisons: [
        '直接操作 DOM 类似绕过 ORM 直接执行 SQL，破坏了抽象层。',
        '破坏单向流类似在 Service 层直接修改 Controller 的参数。',
        '异步状态混乱类似只用 boolean 表示请求状态，无法处理错误。'
      ],
      codeSamples: [
        {
          id: '4.2-anti-pattern-1',
          title: '反模式 1：直接操作 DOM',
          language: 'javascript',
          tone: 'legacy',
          code: `// ❌ 错误：破坏 UI = f(States)
function addTodo() {
  const li = document.createElement('li')
  li.textContent = 'New Todo'
  document.getElementById('todo-list').appendChild(li)
  // 问题：UI 与 State 分离，无法追踪数据来源
}

// ✅ 正确：修改 State，让框架更新 UI
function addTodo() {
  state.todos.push({
    id: uuid(),
    text: 'New Todo',
    completed: false
  })
  // State 变化 → 响应式系统触发 → UI 自动更新
}`
        },
        {
          id: '4.2-anti-pattern-2',
          title: '反模式 2：破坏单向数据流',
          language: 'vue',
          tone: 'legacy',
          code: `<!-- ❌ 错误：子组件直接修改 props -->
<script setup lang="ts">
const props = defineProps<{ todo: TodoItem }>()

const handleClick = () => {
  props.todo.completed = !props.todo.completed // 破坏单向流
  // 问题：父组件不知道数据被修改，难以调试
}
</script>

<!-- ✅ 正确：通过 emit 通知父组件 -->
<script setup lang="ts">
const emit = defineEmits<{ toggle: [] }>()

const handleClick = () => {
  emit('toggle') // 父组件决定如何修改 State
}
</script>

<!-- 父组件 -->
<script setup lang="ts">
const toggleTodo = (id: string) => {
  const todo = todos.value.find(t => t.id === id)
  if (todo) todo.completed = !todo.completed
}
</script>

<template>
  <TodoItem
    v-for="todo in todos"
    :key="todo.id"
    :todo="todo"
    @toggle="toggleTodo(todo.id)"
  />
</template>`
        },
        {
          id: '4.2-anti-pattern-3',
          title: '反模式 3：异步状态管理混乱',
          language: 'javascript',
          tone: 'legacy',
          code: `// ❌ 错误：只用 isLoading，没有错误态和数据态
const isLoading = ref(false)

const fetchTodos = async () => {
  isLoading.value = true
  const data = await api.getTodos()
  todos.value = data
  isLoading.value = false
  // 问题：
  // 1. 请求失败怎么办？
  // 2. 之前的错误如何清除？
  // 3. 重复触发会导致竞态
}

// ✅ 正确：完整状态机
const state = reactive<AsyncState<TodoItem[]>>({
  status: 'idle',
  data: null,
  error: null
})

const fetchTodos = async () => {
  if (state.status === 'loading') return // 防止重复请求

  state.status = 'loading'
  state.error = null // 清除旧错误

  try {
    state.data = await api.getTodos()
    state.status = 'success'
  } catch (error) {
    state.error = error.message
    state.status = 'error'
  }
}

// UI 根据状态渲染不同内容
// if status === 'loading' → 显示加载中
// if status === 'error' → 显示错误信息 + 重试按钮
// if status === 'success' → 显示数据列表`
        }
      ]
    },
    {
      id: '4.3',
      title: '最佳实践总结',
      subtitle: 'UI = f(States) 的工程落地原则',
      what: [
        '单一数据源：State 是唯一真相，所有 UI 从 State 派生。',
        '状态驱动：通过修改 State 更新 UI，而不是直接操作 DOM。',
        '副作用隔离：将副作用（请求、订阅）放在生命周期钩子中管理。'
      ],
      why: [
        '单一数据源让数据流向清晰，易于追踪和调试。',
        '状态驱动让 UI 更新可预测，避免手动同步导致的不一致。',
        '副作用隔离避免了重渲染时的重复执行和内存泄漏。'
      ],
      how: [
        '将所有数据集中在 src/data/ 或 Pinia store 中管理。',
        '组件只读 props，通过 emit 抛出事件，由父组件更新 State。',
        '使用 onMounted、watch、onUnmounted 管理副作用生命周期。'
      ],
      backendComparisons: [
        '单一数据源类似数据库作为系统唯一真相来源。',
        '状态驱动类似事件溯源 (Event Sourcing)：通过事件序列重建状态。',
        '副作用隔离类似后端事务边界：明确副作用的执行时机和回滚策略。'
      ],
      codeSamples: [
        {
          id: '4.3-best-practice',
          title: '本项目的最佳实践示例',
          language: 'vue',
          tone: 'modern',
          code: `<!-- 最佳实践 1：单一数据源 -->
// src/data/chapters.ts - 唯一定义章节数据
export const chapters: Chapter[] = [...]

<!-- 最佳实践 2：状态驱动 UI -->
<script setup lang="ts">
import { ref } from 'vue'

const copied = ref(false) // State

const handleCopy = async () => {
  await copyToClipboard(props.code)
  copied.value = true // 修改 State
  setTimeout(() => {
    copied.value = false // State 恢复 → UI 恢复
  }, 2000)
}
</script>

<template>
  <!-- UI 由 State 驱动 -->
  <button @click="handleCopy">
    {{ copied ? '已复制' : '复制代码' }}
  </button>
</template>

<!-- 最佳实践 3：副作用隔离 -->
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

let timer: number | null = null

onMounted(() => {
  // 副作用：启动定时器
  timer = setInterval(() => {
    console.log('tick')
  }, 1000)
})

onUnmounted(() => {
  // 清理副作用：停止定时器
  if (timer) clearInterval(timer)
})
</script>`
        }
      ]
    }
  ],
  projectPracticeCards: [
    {
      id: 'states-design',
      title: 'States 设计',
      subtitle: '章节数据结构设计',
      description: '本项目的 States 集中在 src/data/ 目录，包含章节元信息和详细内容。',
      examples: [
        'chapters.ts: 定义章节元数据数组（标题、副标题、描述、图标、颜色、路由）',
        'chapter1-6.ts: 定义各章节的详细内容（概念小节、代码示例、运行指南）',
        'intro.ts: 定义前言页面的内容结构'
      ],
      codeReference: 'src/data/chapters.ts:6-127'
    },
    {
      id: 'ui-components',
      title: 'UI 组件拆分',
      subtitle: '按职责拆分展示组件',
      description: '组件按职责分为通用组件、章节组件、布局组件，遵循单一职责原则。',
      examples: [
        'ChapterCard: 章节卡片，展示章节元信息（src/components/common/）',
        'ConceptSectionCard: 概念小节卡片，展示 what/why/how/backend comparisons',
        'CodeSnippetPanel: 代码面板，展示代码高亮和复制交互',
        'AppHeader/AppFooter: 布局组件，提供全局导航'
      ],
      codeReference: 'src/components/common/ChapterCard.vue:1-50'
    },
    {
      id: 'reactive-binding',
      title: '响应式绑定实现',
      subtitle: 'v-for、props、computed 的组合',
      description: '通过 v-for 遍历数据，通过 props 传递给子组件，通过 computed 计算派生值。',
      examples: [
        'HomeView: v-for 遍历 chapters 渲染 ChapterCard',
        'ChapterCard: 接收 chapter props，通过插值语法绑定到模板',
        'CodeSnippetPanel: computed 计算复制状态，watch 监听代码变化',
        '路由守卫: beforeEach 自动更新页面标题'
      ],
      codeReference: 'src/views/HomeView.vue:15-25'
    },
    {
      id: 'interaction-flow',
      title: '交互流程示例',
      subtitle: '代码复制、路由导航',
      description: '用户操作触发 State 变化，State 变化触发 UI 更新。',
      examples: [
        '代码复制: 点击按钮 → 修改 copied state → 按钮文字变化 → 2秒后恢复',
        '章节导航: 点击卡片 → RouterLink 跳转 → 路由守卫更新标题 → 新页面渲染',
        '主题切换: 点击按钮 → 修改 theme state → 全局样式变量更新',
        '章节筛选: 输入关键词 → 修改 filter state → computed 过滤列表 → UI 更新'
      ],
      codeReference: 'src/components/chapter/chapter1/CodeSnippetPanel.vue:20-35'
    }
  ],
  antiPatterns: [
    {
      id: 'dom-manipulation',
      title: '反模式 1：直接操作 DOM',
      problem: '绕过响应式系统，手动创建和插入 DOM 节点。',
      wrongApproach: 'document.createElement + appendChild',
      correctApproach: '修改 State 数组，让 v-for 自动渲染',
      impact: [
        'State 与 UI 不一致，无法通过数据追踪 UI 状态',
        '手动管理 DOM 导致内存泄漏和事件绑定混乱',
        '无法利用框架的优化（批量更新、虚拟 DOM Diff）'
      ]
    },
    {
      id: 'data-flow-violation',
      title: '反模式 2：破坏单向数据流',
      problem: '子组件直接修改 props，或兄弟组件互相访问。',
      wrongApproach: 'props.data.value = newValue',
      correctApproach: 'emit 事件通知父组件，由父组件更新 State',
      impact: [
        '数据流向混乱，难以追踪数据变化来源',
        '父组件的 State 与子组件的 props 不一致',
        '组件间耦合度高，难以复用和测试'
      ]
    },
    {
      id: 'async-state-chaos',
      title: '反模式 3：异步状态管理混乱',
      problem: '只用单个 isLoading 布尔值，缺少错误态和数据态。',
      wrongApproach: 'const isLoading = ref(false)',
      correctApproach: 'AsyncState<T> { status, data, error }',
      impact: [
        '无法区分"从未加载"和"加载失败"',
        '请求失败后无法展示错误信息和重试按钮',
        'loading 中重复触发导致并发竞态'
      ]
    }
  ],
  bestPractices: [
    {
      id: 'single-source-truth',
      title: '单一数据源 (Single Source of Truth)',
      principle: 'State 是唯一真相，所有 UI 从 State 派生，不存在第二份数据。',
      implementation: [
        '将数据集中在 src/data/ 或 Pinia store 中',
        '避免在多个组件中复制同一份数据',
        '通过 props 传递数据的引用，而不是复制值'
      ],
      benefits: [
        '数据来源清晰，易于追踪和调试',
        '避免数据不一致导致的 Bug',
        '便于实现撤销/重做等高级功能'
      ]
    },
    {
      id: 'state-driven-ui',
      title: '状态驱动 UI',
      principle: '通过修改 State 更新 UI，而不是直接操作 DOM。',
      implementation: [
        '使用 v-if/v-for 等指令声明 UI 结构',
        '通过 computed 计算派生状态',
        '避免 querySelector 等 DOM API'
      ],
      benefits: [
        'UI 更新可预测，避免手动同步',
        '利用框架的优化能力（批量更新、Diff）',
        '代码更简洁，易于维护'
      ]
    },
    {
      id: 'side-effect-isolation',
      title: '副作用隔离',
      principle: '将副作用放在正确的生命周期钩子中，确保可建立、可更新、可清理。',
      implementation: [
        'onMounted: 初始化副作用（请求、订阅、定时器）',
        'watch: 响应依赖变化的副作用',
        'onUnmounted: 清理副作用（取消订阅、清除定时器）'
      ],
      benefits: [
        '避免重渲染时重复执行副作用',
        '防止内存泄漏和事件监听器堆积',
        '副作用的时机和范围更明确'
      ]
    }
  ],
  // 向后兼容: 提供旧字段
  taxonomyCards: [
    {
      id: 'local',
      title: 'Local State',
      subtitle: '组件内部状态',
      definition: '仅在当前组件内生效，生命周期跟随组件创建与销毁。',
      backendComparison: '对应方法内部局部变量，不应外泄到系统全局。',
      examples: ['弹窗开关 isDialogOpen', '输入草稿 draftForm', '当前分页页码 currentPage'],
      implementationTips: ['优先使用 ref/reactive 就近维护', '避免为了"统一"提前放入全局 Store']
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
