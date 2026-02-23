import type { ProjectCase, ResponsibilityBoundary } from '@/types/chapter'

export interface Chapter2CodeSample {
  id: string
  title: string
  language: 'javascript' | 'typescript' | 'vue'
  code: string
  tone: 'legacy' | 'modern' | 'neutral'
}

export interface Chapter2TaxonomyCard {
  id: 'local' | 'global' | 'remote'
  title: string
  subtitle: string
  definition: string
  backendComparison: string
  examples: string[]
  implementationTips: string[]
}

export interface Chapter2Pattern {
  id: 'global-store'
  title: string
  subtitle: string
  backendComparison: string
  suitableScenarios: string[]
  tradeoffs: string[]
  implementationTips: string[]
}

export interface Chapter2ConceptSection {
  id: '2.0' | '2.1' | '2.2'
  title: string
  subtitle: string
  what: string[]
  why: string[]
  how: string[]
  backendComparisons: string[]
  codeSamples: Chapter2CodeSample[]
  demoComponent?: 'StateBasicDemo' | 'StateClassificationDemo'
  analogies?: string[]
}

export interface Chapter2Content {
  pageTitle: string
  pageSubtitle: string
  chapterSummary: string
  formulaRelation: string
  responsibilityBoundary: ResponsibilityBoundary
  projectCases: ProjectCase[]
  conceptSections: Chapter2ConceptSection[]
  taxonomyCards: Chapter2TaxonomyCard[]
  patterns: Chapter2Pattern[]
}

export const chapter2Content: Chapter2Content = {
  pageTitle: '第一章：States (状态层)',
  pageSubtitle: 'State Management',
  chapterSummary:
    '本章聚焦 UI = f(States) 公式中的 States：状态分类学 (Local/Global/Remote) 与状态管理模式（避免 Prop Drilling、使用 Pinia）。理解如何对状态进行分层治理。',
  formulaRelation:
    '在 UI = f(States) 中，本章聚焦输入端 States：先定义状态类型，再定义状态边界，最后定义状态迁移规则。',
  responsibilityBoundary: {
    frontend: ['拆分 Local/Global/Remote 三类状态', '控制状态只读/可写边界', '避免过度共享导致耦合扩散'],
    backend: ['提供可缓存、可分页、可追踪的资源接口', '输出统一错误结构和状态码', '保障业务状态迁移的幂等语义'],
    contract: ['约定资源标识与分页参数', '约定错误码和错误消息结构', '约定更新时间和并发版本字段']
  },
  projectCases: [
    {
      id: 'state-classification',
      title: '案例：章节站点状态分层',
      scenario: '本项目用 data 文件作为内容源，路由和复制交互作为运行时状态。',
      frontendActions: ['静态章节内容作为基础状态', '复制按钮用局部状态管理反馈', '路由切换由全局路由状态驱动'],
      backendActions: ['内容接口可替换静态数据源', '提供章节索引与详情接口'],
      boundaryNotes: ['页面瞬态状态属于前端', '业务主数据长期归后端维护']
    }
  ],
  conceptSections: [
    {
      id: '2.0',
      title: '什么是状态',
      subtitle: '理解"会随时间变化的数据"',
      what: [
        '状态就是会随时间变化的数据。比如你在网页上点了一个开关，它从"关"变成"开"，这个"开/关"就是状态。',
        '在 UI = f(States) 公式里，States 就是驱动界面变化的所有数据。',
        '生活中到处都是状态：电灯的开关状态（开/关）、购物车的商品数量（0, 1, 2...）、表单输入的内容（空、"张三"、"李四"...）。',
        '前端开发中，每当用户点击按钮、输入文字、选择选项时，都在改变某个状态，界面会根据新状态重新渲染。'
      ],
      why: [
        '理解状态是学习前端开发的第一步，因为所有界面交互都围绕状态展开。',
        '没有状态概念，就无法理解为什么点击按钮后界面会变化，也不知道如何控制这些变化。',
        '后端同学常把数据库的值和前端状态混淆，实际上前端状态是临时的、可变的、存在内存中的。'
      ],
      how: [
        '先从简单的布尔值开始理解：开关、显示/隐藏、选中/未选中。',
        '再理解数字状态：计数器、分页页码、进度百分比。',
        '最后理解复杂对象：用户信息、表单数据、列表数据。'
      ],
      backendComparisons: [
        '前端状态类似后端的内存变量，随页面刷新而重置（除非存到 LocalStorage）。',
        '数据库存的是持久化数据，前端状态是临时数据，二者职责不同。',
        '后端用变量保存请求上下文，前端用状态保存交互上下文。'
      ],
      codeSamples: [
        {
          id: '2.0-basic-state',
          title: '三种基础状态示例',
          language: 'typescript',
          tone: 'modern',
          code: `import { ref } from 'vue'

// 1. 布尔状态：开关
const isLightOn = ref(false)
const toggleLight = () => {
  isLightOn.value = !isLightOn.value
}

// 2. 数字状态：计数器
const count = ref(0)
const increment = () => {
  count.value += 1
}

// 3. 字符串状态：输入框
const username = ref('')
const handleInput = (value: string) => {
  username.value = value
}`
        }
      ],
      demoComponent: 'StateBasicDemo',
      analogies: [
        '电灯开关：你按一下，灯从"关"变成"开"，这个开/关就是布尔状态',
        '购物车徽章：每加一件商品，数字从 0 变成 1、2、3...，这个数字就是数字状态',
        '搜索框：你输入"Vue"，界面显示"Vue"，你输入的内容就是字符串状态',
        '登录信息：包含用户名、头像、权限等，这是对象状态'
      ]
    },
    {
      id: '2.1',
      title: '状态分类学',
      subtitle: 'Local State、Global State、Remote Data 三种类型',
      what: [
        'Local State（本地状态）：只在当前组件内使用的状态，就像便利贴贴在你自己桌上，别人看不到。',
        'Global State（全局状态）：多个组件都要用的状态，就像办公室的白板，所有人都能看到和修改。',
        'Remote Data（远程数据）：数据存在服务器上，需要发请求去获取，就像图书馆的书，你要去借才能看。',
        '在 UI = f(States) 公式中，这三种状态是 States 的全部分类，必须清楚区分。'
      ],
      why: [
        '如果把所有状态都放到全局，就像把便利贴都贴到办公室白板上，会非常混乱。',
        '如果把全局状态放在组件内部，就像把白板内容抄到每个人的便利贴上，数据会不一致。',
        '如果把远程数据当成普通状态，就像把图书馆的书搬回家，会导致数据过期、浪费空间。',
        '正确分类状态，是写出可维护代码的第一步。'
      ],
      how: [
        '问自己三个问题：这个数据是从哪来的？只有当前组件用吗？其他地方需要吗？',
        '如果数据来自服务器 → Remote Data',
        '如果数据需要跨组件共享 → Global State',
        '如果数据只在当前组件用 → Local State',
        '不确定时优先用 Local State，真正需要共享时再提升为 Global。'
      ],
      backendComparisons: [
        'Local State 对应方法内的局部变量，随方法调用结束而销毁。',
        'Global State 对应单例服务或静态变量，整个应用共享。',
        'Remote Data 对应外部 API 调用，需要处理网络延迟、错误和缓存。'
      ],
      codeSamples: [
        {
          id: '2.1-examples',
          title: '三种状态的实际例子',
          language: 'typescript',
          tone: 'neutral',
          code: `// Local State 例子（便利贴）
const isDialogOpen = ref(false)        // 弹窗是否显示
const activeTabIndex = ref(0)          // 当前选中的Tab
const formDraft = ref({ name: '' })    // 表单输入草稿

// Global State 例子（白板）
const currentUser = ref({ id: 1, name: 'Admin' })  // 当前登录用户
const themeMode = ref<'light' | 'dark'>('light')    // 应用主题
const cartItems = ref([])                           // 购物车内容

// Remote Data 例子（图书馆）
const products = ref([])               // 商品列表（从 /api/products 获取）
const orderDetail = ref(null)          // 订单详情（从 /api/orders/:id 获取）
const analytics = ref(null)            // 统计数据（从 /api/analytics 获取）`
        }
      ],
      analogies: [
        'Local State = 便利贴：只贴在你自己的桌子上，别人看不到',
        'Global State = 办公室白板：所有人都能看到和修改',
        'Remote Data = 图书馆：数据存在远处，需要去借/取'
      ]
    },
    {
      id: '2.2',
      title: '状态管理模式',
      subtitle: '从 Local State 到 Global Store 的演进',
      what: [
        '最简单的状态管理：直接用 ref/reactive 在组件内部管理 Local State。',
        '跨组件传递的问题：如果要把数据从爷爷组件传到孙子组件，需要一层层传 props，这叫"Prop Drilling"（属性钻取），非常麻烦。',
        '当 Prop Drilling 开始扩散时，优先重构组件边界与数据流，避免中间层承担无意义传递。',
        'Global Store（Pinia）：把全局共享的状态集中管理，就像办公室的白板，所有组件都能访问和修改。'
      ],
      why: [
        'Prop Drilling 会让中间组件充满不相关的 props，代码难以维护。',
        '在复杂业务里，跨层隐式传递会让依赖关系不透明，排查问题成本上升。',
        'Global Store 适合真正需要全局共享的状态，比如用户登录信息、主题设置等。',
        '不同的场景需要不同的方案，没有银弹。'
      ],
      how: [
        '优先使用 Local State（ref/reactive），保持状态局部化。',
        '遇到 Prop Drilling 问题时，先检查组件职责是否可以重构。',
        '真正需要全局共享时，才使用 Pinia Store。',
        '新项目用 Pinia，老项目维护 Vuex，不要混用。'
      ],
      backendComparisons: [
        'Local State 类似方法内的局部变量，作用域有限。',
        '组件树跨层传参若过深，类似后端控制器层层透传 DTO，维护成本会快速上升。',
        'Pinia Store 类似单例 Service，全局共享且可追踪变化。',
        'Vuex 类似带 mutation 层的 Redux，概念更重但适合复杂场景。'
      ],
      codeSamples: [
        {
          id: '2.2-local-state',
          title: 'Local State：最简单的状态管理',
          language: 'vue',
          tone: 'modern',
          code: `<script setup lang="ts">
import { ref } from 'vue'

// 在组件内部直接管理状态
const count = ref(0)
const increment = () => {
  count.value += 1
}
</script>

<template>
  <div>
    <p>计数：{{ count }}</p>
    <button @click="increment">增加</button>
  </div>
</template>`
        },
        {
          id: '2.2-pinia',
          title: 'Pinia：全局状态管理',
          language: 'typescript',
          tone: 'modern',
          code: `// stores/user.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref({ id: 1, name: 'Admin' })

  const updateUser = (name: string) => {
    currentUser.value.name = name
  }

  return { currentUser, updateUser }
})

// 任意组件中使用
// const userStore = useUserStore()
// userStore.updateUser('新名字')`
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
      implementationTips: ['把请求状态与数据本体分开建模', '为加载、成功、失败设计清晰的界面反馈']
    }
  ],
  patterns: [
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
