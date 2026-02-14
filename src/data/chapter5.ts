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
  definition: string
  backendComparison: string
  advantages: string[]
  limitations: string[]
}

export interface Chapter5SelectionStrategy {
  id: 'admin' | 'portal' | 'docs'
  scenario: string
  recommendation: string
  reason: string
}

export interface Chapter5ConceptSection {
  id: '5.1' | '5.2' | '5.3'
  title: string
  subtitle: string
  what: string[]
  why: string[]
  how: string[]
  backendComparisons: string[]
  codeSamples: Chapter5CodeSample[]
}

export interface Chapter5Content {
  pageTitle: string
  pageSubtitle: string
  chapterSummary: string
  conceptSections: Chapter5ConceptSection[]
  renderModeCards: Chapter5RenderModeCard[]
  selectionStrategies: Chapter5SelectionStrategy[]
}

export const chapter5Content: Chapter5Content = {
  pageTitle: '第五章：渲染模式演进',
  pageSubtitle: 'Rendering Paradigms',
  chapterSummary:
    '本章聚焦 CSR、SSR、SSG 三种渲染模式的工程语义：先理解首屏性能与交互接管机制，再按业务场景做可解释的渲染策略选择。',
  conceptSections: [
    {
      id: '5.1',
      title: '客户端渲染 (CSR)',
      subtitle: '浏览器下载 JS 后在客户端构建 UI，交互体验强',
      what: [
        '浏览器先拿到 HTML 壳和 JS 资源，再由前端代码请求数据并渲染页面。',
        '页面切换主要在前端路由完成，用户感知接近原生应用。',
        '服务端通常只提供 JSON API，不承担页面拼装。'
      ],
      why: [
        '交互流畅，页面切换无需整页刷新。',
        '服务端渲染压力低，适合后台系统和高交互应用。',
        '前后端职责边界清晰，API 化协作效率高。'
      ],
      how: [
        '入口只挂载根组件，页面内容由前端路由按需加载。',
        '将数据获取与组件状态管理拆分，避免渲染逻辑耦合。',
        '通过路由级代码分割减少首包体积。'
      ],
      backendComparisons: [
        '类似 Java Swing / WPF 客户端：应用逻辑在客户端执行，服务端主要提供数据。',
        '类似富客户端架构：服务端做 API，客户端负责界面与交互。',
        '与服务端模板引擎相反，HTML 生成责任主要在浏览器。'
      ],
      codeSamples: [
        {
          id: '5.1-csr-bootstrap',
          title: 'CSR 启动流程：先挂载，再按需取数',
          language: 'typescript',
          tone: 'modern',
          code: `import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

// 页面组件内部
// onMounted(async () => {
//   const res = await fetch('/api/dashboard')
//   state.value = await res.json()
// })`
        }
      ]
    },
    {
      id: '5.2',
      title: '服务端渲染 (SSR)',
      subtitle: '服务端先返回可见 HTML，客户端再注水接管交互',
      what: [
        '服务端根据请求先生成完整 HTML，浏览器可立即展示首屏内容。',
        '随后客户端下载 JS，对已存在 DOM 执行 hydration。',
        'hydration 完成后，页面恢复为可交互应用。'
      ],
      why: [
        '首屏可见速度更快，改善 FCP/LCP。',
        'SEO 更友好，爬虫可以直接读取 HTML。',
        '适合首页、营销页、内容页等首屏敏感场景。'
      ],
      how: [
        '服务端使用同构渲染生成首屏 HTML。',
        '客户端使用 hydrate 逻辑接管事件绑定和状态同步。',
        '避免服务端与客户端渲染结果不一致，防止 hydration mismatch。'
      ],
      backendComparisons: [
        '类似 JSP/Thymeleaf：服务端先拼装 HTML 再返回。',
        '现代 SSR 等于“首屏模板渲染 + 后续 SPA 接管”。',
        '对应后端渲染链路中的首包优化与可抓取性优化。'
      ],
      codeSamples: [
        {
          id: '5.2-ssr-hydration',
          title: 'SSR 注水语义示例（Hydration）',
          language: 'typescript',
          tone: 'modern',
          code: `// server-entry.ts
import { renderToString } from 'vue/server-renderer'
import { createApp } from './main'

export async function render(url: string) {
  const { app } = createApp(url)
  const html = await renderToString(app)
  return html
}

// client-entry.ts
import { createApp } from './main'

const { app, router } = createApp(window.location.pathname)
router.isReady().then(() => {
  app.mount('#app', true) // true 表示 hydration 模式挂载
})`
        }
      ]
    },
    {
      id: '5.3',
      title: '静态站点生成 (SSG)',
      subtitle: '构建阶段预生成 HTML，部署到 CDN 直接分发',
      what: [
        '在 build 阶段为每个路由提前输出静态 HTML。',
        '部署后无需应用服务器动态渲染即可返回页面。',
        '适合内容稳定、更新频率低的页面类型。'
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
          id: '5.3-ssg-generate',
          title: 'SSG 路由预渲染示意',
          language: 'typescript',
          tone: 'neutral',
          code: `const prerenderRoutes = ['/', '/docs', '/blog', '/about']

async function generateStaticPages() {
  for (const route of prerenderRoutes) {
    const html = await renderRouteToHtml(route)
    await writeFile('dist' + (route === '/' ? '/index' : route) + '/index.html', html)
  }
}

generateStaticPages()`
        }
      ]
    }
  ],
  renderModeCards: [
    {
      id: 'csr',
      title: 'CSR',
      subtitle: 'Client-Side Rendering',
      definition: '客户端完成渲染与路由切换，服务端主要提供 API。',
      backendComparison: '对应富客户端系统，后端职责偏向数据接口层。',
      advantages: ['交互流畅，切页体验好', '服务端渲染压力低'],
      limitations: ['首屏依赖 JS 下载执行', 'SEO 需要额外方案']
    },
    {
      id: 'ssr',
      title: 'SSR',
      subtitle: 'Server-Side Rendering',
      definition: '服务端先渲染 HTML，客户端注水后接管交互。',
      backendComparison: '类似服务端模板引擎，但后续由前端框架接管。',
      advantages: ['首屏快，SEO 友好', '首屏内容可直接展示'],
      limitations: ['服务端开销更高', '同构一致性维护成本高']
    },
    {
      id: 'ssg',
      title: 'SSG',
      subtitle: 'Static Site Generation',
      definition: '构建时预渲染页面，部署后以静态资源形式分发。',
      backendComparison: '类似离线生成静态页面并通过 CDN 发布。',
      advantages: ['性能稳定，成本低', '部署简单，缓存友好'],
      limitations: ['动态性弱', '内容更新依赖重新构建']
    }
  ],
  selectionStrategies: [
    {
      id: 'admin',
      scenario: '后台管理系统',
      recommendation: 'CSR',
      reason: '强交互、登录后访问、SEO 诉求低，优先客户端路由体验。'
    },
    {
      id: 'portal',
      scenario: '门户站/电商首页',
      recommendation: 'SSR',
      reason: '首屏性能和搜索抓取要求高，需服务端首包直出。'
    },
    {
      id: 'docs',
      scenario: '文档站/博客',
      recommendation: 'SSG',
      reason: '内容稳定且可预生成，静态分发可获得更高性价比。'
    }
  ]
}
