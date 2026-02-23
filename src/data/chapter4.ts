export interface Chapter4CodeSample {
  id: string
  title: string
  language: 'javascript' | 'typescript' | 'vue'
  code: string
  tone: 'legacy' | 'modern' | 'neutral'
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
  id: 'data-source' | 'mapping-chain' | 'render-output' | 'feedback-loop'
  title: string
  description: string
  keyCheck: string
}

export interface Chapter4RepoEvidence {
  id: 'data' | 'mapping' | 'render' | 'feedback'
  title: string
  summary: string
  repoPaths: string[]
  checks: string[]
}

export interface Chapter4PracticeSection {
  id: '4.1' | '4.2' | '4.3'
  title: string
  subtitle: string
  objective: string
  what: string[]
  why: string[]
  how: string[]
  codeSamples: Chapter4CodeSample[]
  repoEvidence?: Chapter4RepoEvidence[]
  antiPatternIds?: Chapter4AntiPattern['id'][]
  bestPracticeIds?: Chapter4BestPractice['id'][]
}

export interface Chapter4Content {
  pageTitle: '第四章：端到端项目实践'
  pageSubtitle: string
  chapterSummary: string
  formulaRelation: string
  flowStages: Chapter4FlowStage[]
  conceptSections: Chapter4PracticeSection[]
  antiPatterns: Chapter4AntiPattern[]
  bestPractices: Chapter4BestPractice[]
}

export const chapter4Content: Chapter4Content = {
  pageTitle: '第四章：端到端项目实践',
  pageSubtitle: 'Repository-Driven End-to-End Practice',
  chapterSummary:
    '本章不再讲抽象概念，而是直接复盘当前仓库如何把 src/data、router、views 和组件串成一条可追踪的 UI = f(States) 工程链路。',
  formulaRelation:
    '第四章聚焦“公式落地证据”：数据源定义 States，路由与组件承担 f()，页面输出 UI，并通过交互反馈形成可验证闭环。',
  flowStages: [
    {
      id: 'data-source',
      title: '阶段 1：数据源定义',
      description: '在 src/data 中定义章节状态结构，作为页面渲染的唯一输入。',
      keyCheck: '章节文案与结构是否只在数据层维护一份？'
    },
    {
      id: 'mapping-chain',
      title: '阶段 2：映射链路组装',
      description: 'views 读取 data，并通过 props 把状态映射到章节卡片与代码面板。',
      keyCheck: '模板是否只表达渲染，派生逻辑是否收敛在 script/computed？'
    },
    {
      id: 'render-output',
      title: '阶段 3：渲染输出稳定',
      description: '同一输入应产出同一 UI，避免手动 DOM 绕过状态系统。',
      keyCheck: '是否存在 querySelector 等不受控 UI 修改路径？'
    },
    {
      id: 'feedback-loop',
      title: '阶段 4：交互反馈闭环',
      description: '复制按钮、错误态与清理逻辑显式建模，保证可恢复与可回归。',
      keyCheck: '交互是否覆盖建立、更新、清理三个时机？'
    }
  ],
  conceptSections: [
    {
      id: '4.1',
      title: '链路建立：从数据源到页面',
      subtitle: '结论：先让链路可追踪，再谈优化。',
      objective: '把“数据从哪里来、如何到页面”讲成可定位的仓库路径。',
      what: [
        '第四章以当前仓库为唯一案例，不使用脱离上下文的伪项目。',
        '状态输入来自 src/data，路由和页面组件只做映射，不复制业务真相。',
        '架构图与证据卡对应真实文件，便于评审与新人 onboarding。'
      ],
      why: [
        '当链路被文件路径锚定，任何偏差都能快速定位到责任层。',
        '“讲概念”容易漂移，“讲仓库证据”可以直接做回归。',
        '跨角色协作时，前后端能在同一条链路上对齐接口和状态边界。'
      ],
      how: [
        '统一在 src/data 维护章节输入，不在视图层重复拼装主数据。',
        'view 只做遍历与组合，把复杂展示逻辑下放到章节组件。',
        '每个关键节点给出检查点，形成可执行验收清单。'
      ],
      repoEvidence: [
        {
          id: 'data',
          title: '证据 1：数据源层（States）',
          summary: '章节元信息与章节正文都在 data 层定义，保证单一数据源。',
          repoPaths: ['src/data/chapters.ts', 'src/data/chapter4.ts'],
          checks: ['章节卡片标题与详情页标题一致', '章节小节编号与页面渲染顺序一致']
        },
        {
          id: 'mapping',
          title: '证据 2：映射层（f 的入口）',
          summary: 'Chapter4View 读取 chapter4Content，并按 section 逐段渲染组件。',
          repoPaths: ['src/views/Chapter4View.vue', 'src/components/chapter/chapter4/StateConceptSectionCard.vue'],
          checks: ['页面不直接硬编码业务内容', '组件通过 props 接受结构化数据']
        },
        {
          id: 'render',
          title: '证据 3：渲染层（UI 输出）',
          summary: '模板采用声明式渲染，输入一致时输出保持稳定。',
          repoPaths: ['src/components/chapter/chapter4/StateConceptSectionCard.vue'],
          checks: ['模板无手动 DOM 操作', '相同 section 输入渲染一致']
        },
        {
          id: 'feedback',
          title: '证据 4：反馈层（交互闭环）',
          summary: '代码复制交互显式维护状态与清理逻辑，支持回归验证。',
          repoPaths: ['src/components/chapter/chapter4/CodeSnippetPanel.vue', 'src/utils/clipboard.ts'],
          checks: ['复制状态 1.6s 后恢复', '组件卸载时清理 timer']
        }
      ],
      codeSamples: [
        {
          id: '4.1-repo-chain',
          title: '真实链路：data -> view -> section component',
          language: 'typescript',
          tone: 'neutral',
          code: `// src/data/chapter4.ts
export const chapter4Content = {
  pageTitle: '第四章：端到端项目实践',
  conceptSections: [{ id: '4.1', title: '链路建立：从数据源到页面' }]
}

// src/views/Chapter4View.vue
<StateConceptSectionCard
  v-for="section in chapter4Content.conceptSections"
  :key="section.id"
  :section="section"
  :anti-patterns="chapter4Content.antiPatterns"
  :best-practices="chapter4Content.bestPractices"
/>`
        }
      ]
    },
    {
      id: '4.2',
      title: '反模式修正：从不可追踪到可维护',
      subtitle: '结论：先消灭坏路径，再扩展功能。',
      objective: '把常见失控点收敛为可检查的反模式清单，并给出统一修正方式。',
      what: [
        '反模式不是“代码丑”，而是破坏了状态到 UI 的可追踪性。',
        '本节仅聚焦三类高频问题：DOM 直改、单向流破坏、异步状态混乱。',
        '所有修正都落在“状态建模 + 声明式渲染 + 生命周期清理”。'
      ],
      why: [
        '先修坏路径，后续架构优化才不会被历史债务反复拉回。',
        '反模式统一命名后，评审时能快速形成共识。',
        '修正规则可直接转为 lint 约束与 code review 清单。'
      ],
      how: [
        '禁止直接操作 DOM，改为更新状态并让模板渲染。',
        '子组件保持 props 只读，写操作通过事件回流到上层。',
        '异步流程用显式状态机覆盖 loading/success/error。'
      ],
      antiPatternIds: ['dom-manipulation', 'data-flow-violation', 'async-state-chaos'],
      codeSamples: [
        {
          id: '4.2-fix-pattern',
          title: '修正路径：事件上行 + 状态机',
          language: 'vue',
          tone: 'modern',
          code: `const state = reactive({
  status: 'idle' as 'idle' | 'loading' | 'success' | 'error',
  list: [] as string[],
  error: ''
})

const reload = async () => {
  state.status = 'loading'
  try {
    state.list = await fetchChapterList()
    state.status = 'success'
  } catch (error) {
    state.error = String(error)
    state.status = 'error'
  }
}`
        }
      ]
    },
    {
      id: '4.3',
      title: '实践清单：验收、回归与演进',
      subtitle: '结论：把经验固化成可执行清单。',
      objective: '将最佳实践沉淀为验收项，避免“讲完就散”。',
      what: [
        '最佳实践需要可验证，否则只会停留在口号层。',
        '本节把单一数据源、状态驱动渲染、副作用隔离变成回归项。',
        '验收流程直接绑定本仓库命令和页面行为。'
      ],
      why: [
        '可执行清单能降低版本迭代中的回归风险。',
        '团队成员变更时，清单是最稳定的协作接口。',
        '把“主观经验”转成“客观检查点”，减少争议。'
      ],
      how: [
        '发布前执行类型检查与构建，确保契约稳定。',
        '手工验证 /chapter/4 页面结构与交互顺序。',
        '每次需求改动后复查最佳实践三条基线。'
      ],
      bestPracticeIds: ['single-source-truth', 'state-driven-ui', 'side-effect-isolation'],
      codeSamples: [
        {
          id: '4.3-verification',
          title: '回归清单：命令与页面验收',
          language: 'javascript',
          tone: 'neutral',
          code: `// 1) 工程检查
pnpm type-check
pnpm build-only

// 2) 页面验收
// /chapter/4:
// - 架构图只出现一次
// - 4.2 仅展示反模式
// - 4.3 仅展示最佳实践
// - 代码复制按钮可恢复`
        }
      ]
    }
  ],
  antiPatterns: [
    {
      id: 'dom-manipulation',
      title: '反模式 1：直接操作 DOM',
      problem: '绕过状态层会导致 UI 与业务状态分离，问题来源不可追踪。',
      wrongApproach: 'document.querySelector(...).appendChild(...)',
      correctApproach: '更新响应式状态，让模板重渲染',
      impact: ['调试路径断裂', '难以复用框架调度优化', '回归成本上升']
    },
    {
      id: 'data-flow-violation',
      title: '反模式 2：破坏单向数据流',
      problem: '子组件直接改 props，父层无法追踪写入来源。',
      wrongApproach: 'props.todo.completed = !props.todo.completed',
      correctApproach: "emit('toggle') 交给上层统一更新",
      impact: ['组件职责混乱', '排查链路变长', '复用能力下降']
    },
    {
      id: 'async-state-chaos',
      title: '反模式 3：异步状态混乱',
      problem: '仅有 isLoading 无法表达失败和恢复。',
      wrongApproach: 'const isLoading = ref(false)',
      correctApproach: '显式状态机：idle/loading/success/error',
      impact: ['错误不可见', '并发请求易竞态', '用户反馈断层']
    }
  ],
  bestPractices: [
    {
      id: 'single-source-truth',
      title: '最佳实践 1：单一数据源',
      principle: '主数据在 data 层统一维护，视图层只消费不复制。',
      implementation: ['章节信息统一放在 src/data', '禁止跨组件维护同一业务真相'],
      benefits: ['来源清晰', '减少数据分叉导致的不一致']
    },
    {
      id: 'state-driven-ui',
      title: '最佳实践 2：状态驱动 UI',
      principle: '通过状态变化触发渲染，不走手动 DOM 通道。',
      implementation: ['使用 v-if/v-for/computed 描述 UI', '模板仅负责表达输出结构'],
      benefits: ['输出可预测', '评审和测试成本更低']
    },
    {
      id: 'side-effect-isolation',
      title: '最佳实践 3：副作用隔离',
      principle: '副作用要明确建立、更新、清理时机。',
      implementation: ['用生命周期钩子管理 timer/订阅', '组件卸载前做统一清理'],
      benefits: ['避免内存泄漏', '降低重渲染期间副作用污染']
    }
  ]
}
