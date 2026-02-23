import type { ProjectCase, ResponsibilityBoundary } from '@/types/chapter'

export interface Chapter5CodeSample {
  id: string
  title: string
  language: 'javascript' | 'typescript' | 'vue'
  code: string
  tone: 'legacy' | 'modern' | 'neutral'
}

export interface Chapter5RenderModeCard {
  id: 'csr' | 'ssr' | 'ssg'
  title: string
  subtitle: string
  executionTiming: string
  executionLocation: string
  formulaMapping: string
  definition?: string
  backendComparison?: string
  advantages: string[]
  limitations: string[]
}

export interface Chapter5ConceptSection {
  id: '5.1' | '5.2' | '5.3' | '5.4'
  title: string
  subtitle: string
  what: string[]
  why: string[]
  how: string[]
  backendComparisons: string[]
  codeSamples: Chapter5CodeSample[]
}

export interface Chapter5SelectionStrategy {
  id: string
  scenario: string
  recommendation: string
  reason: string
}

export interface Chapter5Content {
  pageTitle: string
  pageSubtitle: string
  chapterSummary: string
  formulaRelation: string
  responsibilityBoundary: ResponsibilityBoundary
  projectCases: ProjectCase[]
  conceptSections: Chapter5ConceptSection[]
  renderModeCards: Chapter5RenderModeCard[]
  selectionStrategies: Chapter5SelectionStrategy[]
}

export const chapter5Content: Chapter5Content = {
  pageTitle: '第五章：SSR 与 CSR 渲染策略',
  pageSubtitle: 'SSR vs CSR Rendering',
  chapterSummary:
    '本章聚焦一个核心问题：同样的 UI = f(States)，在 CSR 与 SSR 下到底差在哪里，以及该怎么选。',
  formulaRelation:
    'UI = f(States) 在本章落到“Where/When to run f()”：状态模型不变，执行位置和时机决定首屏、SEO 与交互体验。',
  responsibilityBoundary: {
    frontend: ['在页面级选择 CSR 或 SSR', '实现 hydration 一致性与交互恢复', '优化首屏速度与路由切换体验'],
    backend: ['提供可用于首屏渲染的数据接口', '保证接口稳定和响应时延', '配合缓存策略降低 SSR 开销'],
    contract: ['约定首屏字段与默认值', '约定 SEO 元数据输出规则', '约定缓存与失效策略']
  },
  projectCases: [
    {
      id: 'content-site-ssr',
      title: '案例：内容站首页使用 SSR',
      scenario: '首屏曝光与 SEO 直接影响转化。',
      frontendActions: ['服务端产出首屏 HTML', '客户端 hydration 后接管交互'],
      backendActions: ['聚合首屏接口并控制时延', '提供可缓存的内容接口'],
      boundaryNotes: ['首屏渲染链路由前端接入', '数据可用性与性能由后端保障']
    },
    {
      id: 'admin-csr',
      title: '案例：后台工作台使用 CSR',
      scenario: '交互密集、页面切换频繁，SEO 诉求弱。',
      frontendActions: ['浏览器端执行渲染与路由', '通过状态管理驱动交互反馈'],
      backendActions: ['提供权限化 API', '保证写入接口一致性'],
      boundaryNotes: ['复杂交互与状态编排在前端', '业务规则裁决在后端']
    }
  ],
  conceptSections: [
    {
      id: '5.1',
      title: '执行环境总览',
      subtitle: '先建立 CSR / SSR 的统一判断框架',
      what: [
        'CSR：HTML 外壳先到浏览器，再由 JS 执行 f() 产出可见内容。',
        'SSR：服务端先执行 f() 输出首屏 HTML，客户端再 hydration 接管交互。',
        '两者核心差异是首屏执行位置，不是状态建模方式。'
      ],
      why: ['先明确执行环境，才能正确权衡首屏、SEO 和交互成本。', '避免把“框架能力”误当成“业务问题”。'],
      how: ['先评估页面是否依赖 SEO。', '再评估交互密度和首屏时延目标。', '最后选择 CSR 或 SSR 并制定配套缓存策略。'],
      backendComparisons: ['类似后端把同一业务放到离线批处理或在线请求链路执行。'],
      codeSamples: [
        {
          id: '5.1-mode-selector',
          title: '按页面特征选择渲染模式',
          language: 'typescript',
          tone: 'neutral',
          code: `type RenderMode = 'csr' | 'ssr'

interface PageSignals {
  seoCritical: boolean
  firstScreenMsTarget: number
  interactionHeavy: boolean
}

export function chooseRenderMode(signals: PageSignals): RenderMode {
  if (signals.seoCritical || signals.firstScreenMsTarget < 1200) {
    return 'ssr'
  }
  if (signals.interactionHeavy) {
    return 'csr'
  }
  return 'csr'
}`
        }
      ]
    },
    {
      id: '5.2',
      title: 'CSR：客户端渲染',
      subtitle: '交互优先，首屏依赖 JS 下载与执行',
      what: ['浏览器先拿到基础 HTML，再下载并执行前端脚本渲染页面。', '路由切换和状态更新主要发生在客户端。'],
      why: ['高频交互场景体验更顺滑。', '服务端只提供 API，渲染链路压力更低。'],
      how: ['入口使用 createApp 挂载应用。', '首屏采用骨架屏或 loading 态兜底。', '路由级懒加载减少首包体积。'],
      backendComparisons: ['类似前后端分离架构，后端聚焦接口与权限能力。'],
      codeSamples: [
        {
          id: '5.2-csr',
          title: 'CSR 启动入口与首屏数据拉取',
          language: 'vue',
          tone: 'modern',
          code: `import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

// 页面组件内
const state = reactive({
  status: 'loading' as 'loading' | 'success' | 'error',
  list: [] as string[]
})

onMounted(async () => {
  try {
    state.list = await fetchCourseList()
    state.status = 'success'
  } catch {
    state.status = 'error'
  }
})`
        }
      ]
    },
    {
      id: '5.3',
      title: 'SSR：服务端渲染与 Hydration',
      subtitle: '首屏与 SEO 优先，关注同构一致性',
      what: ['请求到达后，服务端先生成 HTML 返回浏览器。', '客户端使用 createSSRApp 挂载并接管事件，完成 hydration。'],
      why: ['首屏内容可更早可见。', '搜索引擎抓取首屏结构更稳定。'],
      how: [
        '服务端执行 renderToString 产出 HTML。',
        '客户端使用 createSSRApp(...).mount(...) 进行 hydration。',
        '避免随机值、时区差异或浏览器专属 API 直接参与首屏渲染。'
      ],
      backendComparisons: ['类似后端模板渲染首屏，但后续交互由前端状态系统持续驱动。'],
      codeSamples: [
        {
          id: '5.3-ssr',
          title: 'SSR 渲染与 hydration 一致性',
          language: 'typescript',
          tone: 'modern',
          code: `// server-entry.ts
import { renderToString } from 'vue/server-renderer'
import { createSSRApp } from 'vue'
import App from './App.vue'

export async function render() {
  const app = createSSRApp(App)
  const html = await renderToString(app)
  return html
}

// client-entry.ts
import { createSSRApp, onMounted, ref } from 'vue'
import App from './App.vue'

createSSRApp(App).mount('#app')

// 对随机值/时区格式化这类非确定内容，建议在 onMounted 后处理`
        }
      ]
    },
    {
      id: '5.4',
      title: 'CSR vs SSR：差异对比与选型清单',
      subtitle: '把选型条件收敛为可执行判断',
      what: ['对比维度：首屏可见速度、SEO 要求、交互密度、服务端成本。', '没有绝对最优，只有是否匹配当前业务目标。'],
      why: ['统一判断口径后，可减少反复重构。', '有助于前后端对齐性能与稳定性目标。'],
      how: [
        '后台工作台优先 CSR，保障交互效率。',
        '营销/内容首页优先 SSR，保障首屏与抓取。',
        '混合业务按页面拆分策略，不强行全站单一模式。'
      ],
      backendComparisons: ['类似按接口类型区分在线链路与离线链路，而不是一刀切。'],
      codeSamples: [
        {
          id: '5.4-checklist',
          title: '渲染模式选型清单',
          language: 'typescript',
          tone: 'neutral',
          code: `interface RenderChecklist {
  seoCritical: boolean
  firstScreenNeedFast: boolean
  interactionHeavy: boolean
}

export function decideMode(input: RenderChecklist): 'CSR' | 'SSR' {
  if (input.seoCritical || input.firstScreenNeedFast) {
    return 'SSR'
  }
  if (input.interactionHeavy) {
    return 'CSR'
  }
  return 'CSR'
}`
        }
      ]
    }
  ],
  renderModeCards: [
    {
      id: 'csr',
      title: 'CSR',
      subtitle: 'Client-Side Rendering',
      executionTiming: '用户访问后，浏览器下载并执行前端脚本',
      executionLocation: '浏览器',
      formulaMapping: '浏览器执行 f(runtimeStates) 并驱动 UI',
      definition: '客户端主导渲染，适合交互密集页面。',
      backendComparison: '后端主要承担 API 与鉴权能力。',
      advantages: ['交互流畅', '后端渲染压力较低', '前后端分工清晰'],
      limitations: ['首屏受 JS 体积影响', 'SEO 需要额外处理']
    },
    {
      id: 'ssr',
      title: 'SSR',
      subtitle: 'Server-Side Rendering',
      executionTiming: '请求阶段服务端先渲染，客户端再 hydration',
      executionLocation: '服务端 + 浏览器',
      formulaMapping: '服务端先执行 f(initialStates)，客户端接力 f(runtimeStates)',
      definition: '服务端先给可见首屏，客户端继续交互生命周期。',
      backendComparison: '后端参与首屏渲染链路与缓存体系。',
      advantages: ['首屏可见更快', 'SEO 友好', '弱网下首屏体验更稳'],
      limitations: ['架构复杂度更高', 'hydration 一致性需要严格控制']
    }
  ],
  selectionStrategies: [
    {
      id: 'admin',
      scenario: '后台管理系统',
      recommendation: 'CSR',
      reason: '交互密集且登录后使用，SEO 非核心，CSR 成本更低。'
    },
    {
      id: 'portal',
      scenario: '内容站或营销首页',
      recommendation: 'SSR',
      reason: '需要更快首屏可见与更稳定抓取，SSR 更匹配目标。'
    },
    {
      id: 'docs',
      scenario: '混合页面（入口页 + 工作台）',
      recommendation: '入口 SSR，内页 CSR',
      reason: '入口页要曝光与首屏，工作台要交互效率，按页面分治。'
    }
  ]
}
