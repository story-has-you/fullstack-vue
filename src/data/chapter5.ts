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
  // 向后兼容字段
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

// 向后兼容类型
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
  formulaRelation?: string
  conceptSections: Chapter5ConceptSection[]
  renderModeCards: Chapter5RenderModeCard[]
  selectionStrategies: Chapter5SelectionStrategy[]
}

export const chapter5Content: Chapter5Content = {
  pageTitle: '第五章：执行环境与渲染模式',
  pageSubtitle: 'Execution Environment & Rendering Modes',
  chapterSummary:
    '本章聚焦"何时何地执行 f(States)"：响应式更新调度机制（事件循环、nextTick）、渲染模式的本质（CSR、SSR、SSG），理解 UI = f(States) 在不同执行环境下的表现。',
  formulaRelation:
    '在公式 UI = f(States) 中，本章聚焦 f() 函数的执行时机与执行位置。（1）执行时机：响应式更新调度决定"States 变化后何时执行 f()"——事件循环的微任务队列确保批量更新，nextTick 让开发者在 f() 执行后访问最新 UI。（2）执行位置：CSR 在浏览器执行 f()，SSR 在服务端预执行 f(initialStates) 再在客户端 Hydration，SSG 在构建时执行 f(staticStates) 输出静态 HTML。三种模式的本质区别不是技术选型，而是"在什么环境、什么时间点执行同一个公式"。公式的数学性质（幂等性、确定性）保证了无论在哪里执行，同样的 States 总能得到同样的 UI——这是同构渲染的理论基础。理解执行环境，就能理解如何在性能、SEO、交互体验之间做工程权衡。',
  conceptSections: [
    {
      id: '5.1',
      title: '响应式更新调度机制',
      subtitle: '事件循环与 nextTick：何时执行 f() 更新 UI',
      what: [
        'JavaScript 主线程通过事件循环调度任务，包括响应式更新。',
        'nextTick 利用微任务队列，在 DOM 更新后执行回调。',
        '批量更新调度避免同一帧内多次执行 f() 重渲染。',
        '在公式中，调度机制决定了 State 变化后何时触发 f() 重新计算 UI。'
      ],
      why: [
        '批量更新提升性能，避免每次 state 变化都立即重渲染。',
        '微任务优先级高于宏任务，确保 UI 更新在下一帧前完成。',
        'nextTick 让开发者在 DOM 更新后访问最新的 DOM 状态。'
      ],
      how: [
        'State 变化时，响应式系统将更新任务加入队列，而不是立即执行。',
        '使用 Promise.resolve().then() 创建微任务批量执行更新。',
        'nextTick 返回 Promise，await 后可安全访问更新后的 DOM。'
      ],
      backendComparisons: [
        '事件循环类似消息队列的消费循环：不断从队列取任务执行。',
        '批量更新类似数据库的批量提交：合并多次写操作减少 IO。',
        'nextTick 类似事务提交后的回调：确保变更已应用再执行后续逻辑。'
      ],
      codeSamples: [
        {
          id: '5.1-event-loop',
          title: '事件循环与响应式更新调度',
          language: 'javascript',
          tone: 'modern',
          code: `// 同一帧内多次修改 state，只会触发一次重渲染
state.count++ // 加入更新队列
state.count++ // 合并到同一个更新任务
state.count++ // 合并到同一个更新任务

// 事件循环调度
// 1. 同步代码执行完毕
// 2. 清空微任务队列（包括响应式更新）
// 3. 浏览器渲染 (DOM 更新、样式计算、绘制)
// 4. 取一个宏任务继续执行

console.log('A: 同步代码')

setTimeout(() => {
  console.log('D: 宏任务 (setTimeout)')
}, 0)

Promise.resolve().then(() => {
  console.log('C: 微任务 #1')
})

console.log('B: 同步代码结束')

// 输出顺序：A -> B -> C -> D
// 响应式更新在 C 阶段执行 (微任务)`
        },
        {
          id: '5.1-next-tick',
          title: 'nextTick: 等待 DOM 更新完成',
          language: 'vue',
          tone: 'modern',
          code: `<script setup lang="ts">
import { ref, nextTick } from 'vue'

const count = ref(0)
const divRef = ref<HTMLDivElement>()

const handleClick = async () => {
  count.value++ // 修改 State

  // 此时 DOM 还未更新
  console.log('当前 DOM 内容:', divRef.value?.textContent) // 旧值

  // 等待 nextTick，DOM 更新完成
  await nextTick()

  // 现在可以访问更新后的 DOM
  console.log('更新后 DOM 内容:', divRef.value?.textContent) // 新值
}
</script>

<template>
  <div ref="divRef">{{ count }}</div>
  <button @click="handleClick">+1</button>
</template>`
        }
      ]
    },
    {
      id: '5.2',
      title: '客户端渲染 (CSR)',
      subtitle: '浏览器执行 f(States)，交互体验强',
      what: [
        'CSR 在浏览器下载 JS 后，客户端执行 f(States) 生成 UI。',
        '服务端只返回空 HTML 壳和 JS 资源链接。',
        '页面切换由前端路由完成，无需整页刷新。',
        '在公式中，f() 完全在客户端执行，States 来自客户端状态或 API 请求。'
      ],
      why: [
        '交互流畅，页面切换接近原生应用体验。',
        '服务端渲染压力低，适合后台系统和高交互应用。',
        '前后端职责边界清晰，API 化协作效率高。'
      ],
      how: [
        '入口只挂载根组件，页面内容由前端路由按需加载。',
        '将数据获取与组件状态管理拆分，避免渲染逻辑耦合。',
        '通过路由级代码分割减少首包体积。'
      ],
      backendComparisons: [
        '类似富客户端架构：应用逻辑在客户端执行，服务端主要提供数据。',
        '类似 Java Swing/WPF：UI 渲染和交互完全在客户端。',
        '与服务端模板引擎相反，HTML 生成责任主要在浏览器。'
      ],
      codeSamples: [
        {
          id: '5.2-csr-bootstrap',
          title: 'CSR 启动流程',
          language: 'typescript',
          tone: 'modern',
          code: `// main.ts: 客户端启动入口
import { createApp } from 'vue'
import App from './App.vue'

// 在浏览器执行 f(States)
createApp(App).mount('#app')

// 页面组件内部按需获取 States
// onMounted(async () => {
//   const res = await fetch('/api/dashboard')
//   state.value = await res.json()
//   // State 变化 → f() 重新计算 → UI 更新
// })

// 执行时机和位置：
// - 时机：用户访问页面后，JS 下载完成
// - 位置：浏览器 (客户端)
// - f() 完全在客户端执行`
        }
      ]
    },
    {
      id: '5.3',
      title: '服务端渲染 (SSR)',
      subtitle: '服务端预执行 f(States)，客户端 Hydration 接管',
      what: [
        'SSR 在服务端先执行 f(initialStates) 生成完整 HTML。',
        '浏览器接收 HTML 后可立即展示首屏内容。',
        '随后客户端下载 JS，对已存在 DOM 执行 Hydration（注水）。',
        'Hydration 后，页面恢复为可交互应用，后续更新由客户端 f() 处理。'
      ],
      why: [
        '首屏可见速度更快，改善 FCP/LCP 指标。',
        'SEO 更友好，爬虫可以直接读取 HTML。',
        '适合首页、营销页、内容页等首屏敏感场景。'
      ],
      how: [
        '服务端使用同构渲染生成首屏 HTML（renderToString）。',
        '客户端使用 hydrate 逻辑接管事件绑定和状态同步。',
        '避免服务端与客户端渲染结果不一致，防止 hydration mismatch。'
      ],
      backendComparisons: [
        '类似 JSP/Thymeleaf：服务端先拼装 HTML 再返回。',
        '现代 SSR = 首屏模板渲染 + 后续 SPA 接管。',
        '对应后端渲染链路中的首包优化与可抓取性优化。'
      ],
      codeSamples: [
        {
          id: '5.2-ssr-hydration',
          title: 'SSR 注水（Hydration）语义',
          language: 'typescript',
          tone: 'modern',
          code: `// server-entry.ts: 服务端执行 f(States)
import { renderToString } from 'vue/server-renderer'
import { createApp } from './main'

export async function render(url: string) {
  const { app } = createApp(url)
  const html = await renderToString(app) // 服务端执行 f()
  return html
}

// client-entry.ts: 客户端 Hydration
import { createApp } from './main'

const { app, router } = createApp(window.location.pathname)
router.isReady().then(() => {
  app.mount('#app', true) // true 表示 hydration 模式
  // Hydration: 复用服务端渲染的 DOM，绑定事件和响应式
})

// 执行时机和位置：
// - 服务端: 请求时预执行 f(initialStates) → HTML
// - 客户端: JS 下载后 Hydration → f(States) 接管后续交互`
        }
      ]
    },
    {
      id: '5.4',
      title: '静态站点生成 (SSG)',
      subtitle: '构建时预执行 f(States)，部署后直接分发',
      what: [
        'SSG 在构建阶段为每个路由提前执行 f(staticStates) 输出静态 HTML。',
        '部署后无需应用服务器动态渲染即可返回页面。',
        '适合内容稳定、更新频率低的页面类型。',
        '在公式中，f() 在构建时执行一次，运行时只需要静态文件服务器。'
      ],
      why: [
        '首屏速度快且成本低，天然适配 CDN 缓存。',
        '部署简单，运维复杂度低。',
        'SEO 友好，且不需要每次请求都执行服务器渲染。'
      ],
      how: [
        '在构建流程中枚举需要预渲染的路由。',
        '将产物部署到静态托管或 CDN。',
        '内容更新时触发增量构建或全量构建。'
      ],
      backendComparisons: [
        '类似 CMS 预生成静态页并缓存。',
        '类似将页面当静态资源交给 Nginx/CDN 分发。',
        '避免了请求时模板拼装，换取构建时计算成本。'
      ],
      codeSamples: [
        {
          id: '5.4-ssg-generate',
          title: 'SSG 路由预渲染',
          language: 'typescript',
          tone: 'neutral',
          code: `const prerenderRoutes = ['/', '/docs', '/blog', '/about']

async function generateStaticPages() {
  for (const route of prerenderRoutes) {
    const html = await renderRouteToHtml(route) // 构建时执行 f()
    await writeFile(
      'dist' + (route === '/' ? '/index' : route) + '/index.html',
      html
    )
  }
}

generateStaticPages()

// 执行时机和位置：
// - 时机：构建阶段（npm run build）
// - 位置：构建服务器（开发机或 CI）
// - f() 只执行一次，输出静态 HTML
// - 运行时：静态文件服务器 (Nginx/CDN) 直接返回 HTML`
        }
      ]
    }
  ],
  renderModeCards: [
    {
      id: 'csr',
      title: 'CSR',
      subtitle: 'Client-Side Rendering',
      executionTiming: '用户访问后，JS 下载完成',
      executionLocation: '浏览器（客户端）',
      formulaMapping: 'f(States) 完全在客户端执行，States 来自客户端状态或 API',
      advantages: ['交互流畅，切页体验好', '服务端渲染压力低', '前后端职责分离清晰'],
      limitations: ['首屏依赖 JS 下载执行', 'SEO 需要额外方案（Prerender）']
    },
    {
      id: 'ssr',
      title: 'SSR',
      subtitle: 'Server-Side Rendering',
      executionTiming: '请求时服务端预执行 f()，客户端 JS 下载后 Hydration',
      executionLocation: '服务端 + 客户端（双端执行）',
      formulaMapping: '服务端: f(initialStates) → HTML；客户端: Hydration → f(States) 接管',
      advantages: ['首屏快，FCP/LCP 指标好', 'SEO 友好', '首屏内容可直接展示'],
      limitations: ['服务端开销更高', '同构一致性维护成本高', '需要 Node.js 服务器']
    },
    {
      id: 'ssg',
      title: 'SSG',
      subtitle: 'Static Site Generation',
      executionTiming: '构建阶段预执行 f()，运行时只需静态文件服务器',
      executionLocation: '构建服务器（开发机或 CI）',
      formulaMapping: 'f(staticStates) 在构建时执行一次，输出静态 HTML',
      advantages: ['性能稳定，成本低', '部署简单，缓存友好', 'SEO 最优'],
      limitations: ['动性弱', '内容更新依赖重新构建', '路由数量大时构建慢']
    }
  ],
  selectionStrategies: []
}
