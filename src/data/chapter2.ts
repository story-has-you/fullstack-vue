export interface Chapter2CodeSample {
  id: string
  title: string
  language: 'javascript' | 'typescript' | 'vue'
  code: string
  tone: 'legacy' | 'modern' | 'neutral'
}

export interface Chapter2ConceptSection {
  id: '2.1' | '2.2' | '2.3'
  title: string
  subtitle: string
  what: string[]
  why: string[]
  how: string[]
  backendComparisons: string[]
  codeSamples: Chapter2CodeSample[]
}

export interface Chapter2ExampleSection {
  id: '2.4'
  title: string
  scenario: string
  codeSample: Chapter2CodeSample
  runGuide: string
  antiPatterns: string[]
}

export interface Chapter2Content {
  pageTitle: string
  pageSubtitle: string
  chapterSummary: string
  conceptSections: Chapter2ConceptSection[]
  exampleSection: Chapter2ExampleSection
}

export const chapter2Content: Chapter2Content = {
  pageTitle: '第二章：运行时环境与异步机制',
  pageSubtitle: 'Runtime Environment',
  chapterSummary:
    '本章聚焦 JavaScript 运行时的底层规律：单线程事件循环、Promise 异步编排，以及虚拟 DOM Diff 的性能语义，帮助后端同学建立“前端并发与渲染”的系统认知。',
  conceptSections: [
    {
      id: '2.1',
      title: 'JavaScript 单线程模型与事件循环',
      subtitle: '主线程串行执行 + 事件循环调度微任务/宏任务',
      what: [
        'JavaScript 主线程同一时刻只执行一段代码，用户脚本逻辑是单线程串行。',
        '浏览器运行时是多线程协作：网络线程、定时器线程、渲染线程与主线程配合。',
        '事件循环负责在“同步代码、微任务、渲染、宏任务”之间进行有序调度。'
      ],
      why: [
        '避免 DOM 多线程并发修改导致的竞态、死锁和一致性问题。',
        '让开发者不必直接处理锁与线程同步，降低复杂度。',
        '理解调度顺序有助于解释“为什么 UI 没刷新”“为什么 then 先于 setTimeout”。'
      ],
      how: [
        '建立固定心智模型：同步代码 -> 清空微任务 -> 浏览器渲染 -> 取一个宏任务。',
        '严禁主线程阻塞（死循环、大规模 CPU 计算），必要时使用 Web Worker。',
        '异步任务优先使用 Promise 微任务链，减少宏任务打断导致的抖动。'
      ],
      backendComparisons: [
        'Redis 单线程命令执行：避免锁竞争与上下文切换，强调快速串行处理。',
        'Nginx Worker 事件驱动：IO 多路复用 + 回调触发，前端事件循环与其调度思路同构。',
        '早期 Servlet BIO 模型：每请求一线程，阻塞导致资源耗尽；前端主线程阻塞同样会“服务不可用”。'
      ],
      codeSamples: [
        {
          id: '2.1-micro-macro',
          title: '事件循环顺序示例：同步 -> 微任务 -> 宏任务',
          language: 'javascript',
          tone: 'modern',
          code: `console.log('A: sync start')

setTimeout(() => {
  console.log('D: macro task (setTimeout)')
}, 0)

Promise.resolve()
  .then(() => {
    console.log('C: micro task #1')
  })
  .then(() => {
    console.log('E: micro task #2')
  })

console.log('B: sync end')

// 输出顺序：A -> B -> C -> E -> D`
        },
        {
          id: '2.1-worker',
          title: 'CPU 密集任务下放 Web Worker（主线程不阻塞）',
          language: 'typescript',
          tone: 'neutral',
          code: `// main.ts
const worker = new Worker(new URL('./hash-worker.ts', import.meta.url), { type: 'module' })
worker.postMessage({ payload: 'large-file-content' })
worker.onmessage = (event: MessageEvent<{ digest: string }>) => {
  console.log('hash done', event.data.digest)
}

// hash-worker.ts
self.onmessage = async (event: MessageEvent<{ payload: string }>) => {
  const digest = event.data.payload.length.toString(16)
  self.postMessage({ digest })
}`
        }
      ]
    },
    {
      id: '2.2',
      title: 'Promise 与异步编程',
      subtitle: '用状态机表达异步结果，用链式和 await 组织流程',
      what: [
        'Promise 是异步结果容器，也是一个三态状态机：pending/fulfilled/rejected。',
        '主线程发起异步任务时立即返回 Promise，本体工作由运行时后台线程执行。',
        '任务完成后回调进入微任务队列，由事件循环在合适时机触发。'
      ],
      why: [
        '消除回调地狱，避免向右漂移和多层嵌套。',
        '统一异常传播路径，链路末端集中捕获错误。',
        'async/await 提升可读性，使复杂依赖调用可线性表达。'
      ],
      how: [
        '把“请求成功、请求失败、请求中”明确建模，不要只用单个布尔值。',
        '在 async 函数中用 try/catch 包裹网络与业务错误，必要时继续抛出。',
        '并发请求使用 Promise.all 或 allSettled，避免串行等待拖慢链路。'
      ],
      backendComparisons: [
        'Java CompletableFuture：supplyAsync/thenApply/exceptionally 与 Promise 语义一一对应。',
        'Future 非阻塞化：await 看似“暂停”但不会阻塞线程，类似把控制权交回调度器。',
        '异常聚合：类似后端统一异常处理中间件，把多点失败收敛在单个出口。'
      ],
      codeSamples: [
        {
          id: '2.2-callback-hell',
          title: '反例：回调地狱（难维护）',
          language: 'javascript',
          tone: 'legacy',
          code: `api.getUser(function (userError, user) {
  if (userError) {
    handleError(userError)
    return
  }

  api.getOrders(user.id, function (orderError, orders) {
    if (orderError) {
      handleError(orderError)
      return
    }

    api.getInvoice(orders[0].id, function (invoiceError, invoice) {
      if (invoiceError) {
        handleError(invoiceError)
        return
      }

      renderInvoice(invoice)
    })
  })
})`
        },
        {
          id: '2.2-async-await',
          title: '推荐：Async/Await + 统一错误处理',
          language: 'typescript',
          tone: 'modern',
          code: `interface UserDTO { id: number; name: string }
interface OrderDTO { id: number; userId: number }

async function getUserOrders(): Promise<OrderDTO[]> {
  try {
    const user = await api.getUser() as UserDTO
    console.log('user found', user.name)

    const orders = await api.getOrders(user.id) as OrderDTO[]
    return orders
  } catch (error) {
    console.error('failed to fetch data', error)
    throw error
  }
}`
        }
      ]
    },
    {
      id: '2.3',
      title: '虚拟 DOM 与 Diff 算法',
      subtitle: '内存中比较，输出最小补丁，减少真实 DOM 开销',
      what: [
        '虚拟 DOM 是真实 DOM 的轻量对象映射，用树结构描述 UI。',
        '渲染更新时，框架先比较新旧虚拟树，再生成最小变更集 Patch。',
        'Diff 采用同层比较的启发式策略，追求工程上的 O(n) 性能。'
      ],
      why: [
        '真实 DOM 变更会触发布局与重绘，频繁操作成本高。',
        '在内存中批量比较可减少不必要操作，提升更新稳定性。',
        '抽象渲染层后，同一 UI 描述可迁移到多平台渲染目标。'
      ],
      how: [
        '列表渲染必须提供稳定 key，避免错误复用或无效重建。',
        '不要使用 index 作为 key，尤其在排序、插入、删除场景。',
        '优先保持节点结构稳定，把变化聚焦在内容和属性层。'
      ],
      backendComparisons: [
        '数据库 Buffer Pool：先在内存页修改，再批量刷盘，避免每次都做昂贵 IO。',
        '主键语义映射：前端 key 就像数据库主键，用来标识实体身份而非位置。',
        '最小变更集类似事务日志：只提交必要差量，避免全量重建。'
      ],
      codeSamples: [
        {
          id: '2.3-vnode',
          title: '虚拟 DOM 节点（轻量对象）',
          language: 'typescript',
          tone: 'neutral',
          code: `type VNode = {
  tag: string
  props?: Record<string, string>
  children?: Array<VNode | string>
}

const vNode: VNode = {
  tag: 'section',
  props: { class: 'card' },
  children: [
    { tag: 'h2', children: ['Runtime Chapter'] },
    { tag: 'p', children: ['Virtual DOM is an in-memory representation.'] }
  ]
}`
        },
        {
          id: '2.3-key',
          title: '列表渲染：稳定 key 映射实体身份',
          language: 'vue',
          tone: 'modern',
          code: `<script setup lang="ts">
interface Task {
  id: string
  title: string
}

defineProps<{ tasks: Task[] }>()
</script>

<template>
  <li v-for="task in tasks" :key="task.id">
    {{ task.title }}
  </li>
</template>`
        }
      ]
    }
  ],
  exampleSection: {
    id: '2.4',
    title: '最小示例 3：异步请求状态标准化',
    scenario:
      '后端同学初学前端时，常把异步请求状态简化为单一布尔值，导致错误态与重试流程难以维护。这里将请求建模为标准状态机，并提供可交互演示。',
    codeSample: {
      id: '2.4-example',
      title: 'useAsyncRequestState.ts（状态机建模示意）',
      language: 'typescript',
      tone: 'neutral',
      code: `type AsyncStatus = 'idle' | 'loading' | 'success' | 'error'

interface AsyncState<T> {
  status: AsyncStatus
  data: T | null
  error: string | null
}

const state: AsyncState<string> = {
  status: 'idle',
  data: null,
  error: null
}

async function runRequest(request: () => Promise<string>): Promise<void> {
  if (state.status === 'loading') return

  state.status = 'loading'
  state.error = null

  try {
    state.data = await request()
    state.status = 'success'
  } catch (error) {
    state.error = error instanceof Error ? error.message : 'unknown error'
    state.status = 'error'
  }
}`
    },
    runGuide:
      '进入第二章页面后，在 2.4 区域点击“发起请求”，可观察 idle -> loading -> success/error 迁移；失败后点击“重试请求”验证错误恢复链路。',
    antiPatterns: [
      '只维护 isLoading，不维护 error/data 导致状态语义不完整。',
      '请求失败后不重置错误，造成脏状态残留。',
      'loading 中允许重复触发，导致并发竞态和结果覆盖。'
    ]
  }
}
