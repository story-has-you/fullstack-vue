import type { ProjectCase, ResponsibilityBoundary } from '@/types/chapter'

export interface Chapter1CodeSample {
  id: string
  title: string
  language: 'javascript' | 'xml' | 'typescript' | 'vue'
  code: string
  tone: 'legacy' | 'modern' | 'neutral'
}

export interface Chapter1ConceptSection {
  id: '1.1' | '1.2' | '1.3'
  title: string
  subtitle: string
  what: string[]
  why: string[]
  how: string[]
  backendComparisons: string[]
  codeSamples: Chapter1CodeSample[]
}

export interface Chapter1ExampleSection {
  id: '1.4' | '1.5'
  title: string
  scenario: string
  codeSample: Chapter1CodeSample
  runGuide: string
  antiPatterns: string[]
}

export interface Chapter1Content {
  pageTitle: string
  pageSubtitle: string
  chapterSummary: string
  formulaRelation: string
  responsibilityBoundary: ResponsibilityBoundary
  projectCases: ProjectCase[]
  conceptSections: Chapter1ConceptSection[]
  exampleSections: Chapter1ExampleSection[]
}

export const chapter1Content: Chapter1Content = {
  pageTitle: '第三章：UI (用户界面层)',
  pageSubtitle: 'User Interface Layer',
  chapterSummary:
    '本章只讲 UI 层：怎么用声明式写法描述界面、怎么用组件拆分页面、以及虚拟 DOM 如何高效更新。目标是用“看状态写界面”替代手动改 DOM。',
  formulaRelation:
    '在 UI = f(States) 中，第一章关注左侧的 UI。你负责描述“状态对应什么界面”，框架负责计算和更新。声明式 UI 管表达，组件化管组织，虚拟 DOM 管高效落地。',
  responsibilityBoundary: {
    frontend: ['定义组件结构与交互反馈', '基于状态分支渲染加载态/空态/权限态', '通过事件上抛触发业务命令'],
    backend: ['提供稳定 DTO 字段和权限语义', '确保接口错误码可区分业务场景', '保证字段兼容和版本演进'],
    contract: ['约定字段可空性与默认值', '约定列表项唯一标识 id', '约定命令接口副作用与幂等性']
  },
  projectCases: [
    {
      id: 'ui-card-render',
      title: '案例：章节卡片渲染',
      scenario: '首页通过章节元数据渲染卡片，保持 UI 幂等输出。',
      frontendActions: ['基于 Chapter 对象渲染 ChapterCard', '使用稳定 key 保证节点复用正确', '点击卡片仅发出导航意图'],
      backendActions: ['保障章节字段结构稳定', '提供可扩展图标与颜色枚举'],
      boundaryNotes: ['UI 结构归前端，业务真相归状态', '后端不关心样式细节，前端不拼业务规则']
    },
    {
      id: 'ui-permission-button',
      title: '案例：权限按钮分支',
      scenario: 'Delete 按钮根据 role 与 loading 状态切换。',
      frontendActions: ['计算 canDelete 派生状态', '模板声明三种分支', '通过 emit 上抛 delete-user 命令'],
      backendActions: ['返回准确角色信息', '删除接口执行权限校验'],
      boundaryNotes: ['权限判定展示在前端，权限裁决必须在后端']
    }
  ],
  conceptSections: [
    {
      id: '1.1',
      title: '声明式 UI (Declarative UI)',
      subtitle: '描述目标状态，而非编排 UI 变更步骤',
      what: [
        '声明式写法只关心“现在应该显示什么界面”。',
        '你改状态，框架自动把结果同步到 DOM。'
      ],
      why: [
        '同一份状态会得到同一份界面，结果更可预测。',
        '状态分支比手写 DOM 增删改更容易维护。',
        '底层更新策略可以升级，不影响业务代码写法。'
      ],
      how: [
        '把加载态、空态、权限态写成明确的状态分支。',
        '避免在业务代码里直接 querySelector 改节点。'
      ],
      backendComparisons: [
        '像 SQL 一样，你声明目标结果，不手写执行细节。',
        '像 K8s 声明副本数一样，你写期望状态，系统负责收敛。'
      ],
      codeSamples: [
        {
          id: '1.1-legacy',
          title: '指令式 (jQuery/原生 JS) - 脚本思维',
          language: 'javascript',
          tone: 'legacy',
          code: `const btn = document.getElementById('btn');
const spinner = document.getElementById('spinner');

// 必须手动管理所有状态的迁移路径
function updateUI(user, isLoading) {
  if (isLoading) {
    spinner.style.display = 'block';
    btn.style.display = 'none';
  } else {
    spinner.style.display = 'none';
    if (user.isAdmin) {
      btn.style.display = 'block';
      btn.innerText = 'Delete User';
      btn.onclick = function() { /* ... */ };
    } else {
      btn.style.display = 'none';
    }
  }
}`
        },
        {
          id: '1.1-modern',
          title: '声明式 (Vue) - 架构思维',
          language: 'vue',
          tone: 'modern',
          code: `<script setup>
defineProps(['user', 'isLoading'])
</script>

<template>
  <Spinner v-if="isLoading" />
  <button v-else-if="user.isAdmin" @click="handleDelete">
    Delete User
  </button>
</template>`
        }
      ]
    },
    {
      id: '1.2',
      title: '虚拟 DOM 与 Diff 算法',
      subtitle: '内存中比较，输出最小补丁，减少真实 DOM 开销',
      what: [
        '虚拟 DOM 是 UI 的内存快照，用对象树描述界面。',
        '更新时先比较新旧快照，再计算最小改动。',
        'Diff 主要做同层比较，兼顾效果和性能。'
      ],
      why: [
        '直接频繁改真实 DOM 成本高，容易触发布局和重绘。',
        '先在内存里比较，可以减少不必要的真实操作。',
        '你只管写“新界面长什么样”，框架负责最小更新。'
      ],
      how: [
        '列表必须使用稳定 key，优先用业务 id。',
        '不要用 index 当 key，排序后容易状态错位。',
        '尽量保持结构稳定，把变化集中在文本和属性。'
      ],
      backendComparisons: [
        '像数据库 Buffer Pool：先在内存处理，再批量落盘。',
        '前端 key 像数据库主键，用来标识“谁是谁”。'
      ],
      codeSamples: [
        {
          id: '1.2-vnode',
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
    { tag: 'h2', children: ['UI Chapter'] },
    { tag: 'p', children: ['Virtual DOM is an in-memory representation.'] }
  ]
}`
        },
        {
          id: '1.2-key',
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
    },
    {
      id: '1.3',
      title: '组件化架构',
      subtitle: 'UI 的模块化拆分与复用',
      what: [
        '组件是可复用的 UI 模块，封装结构、样式和交互。',
        '大页面可以拆成小组件，职责更清晰。',
        '组件接收输入（props）后输出对应界面。'
      ],
      why: [
        '重复 UI 能复用，减少重复代码。',
        '组件边界清楚后，协作和修改都更安全。',
        '每个组件可单独测试和调试，排错更快。'
      ],
      how: [
        '按单一职责拆分，一个组件只做一件事。',
        '用 props 下发数据，用 emits 上抛事件。',
        '复杂场景可分展示组件和容器组件。'
      ],
      backendComparisons: [
        '像后端分层：Controller、Service 各自负责一块。',
        'props 像方法参数，emits 像回调或事件通知。'
      ],
      codeSamples: [
        {
          id: '1.3-component',
          title: '组件拆分：展示组件与容器组件',
          language: 'vue',
          tone: 'modern',
          code: `<!-- UserCard.vue (展示组件) -->
<script setup lang="ts">
interface User {
  id: number
  name: string
  email: string
}

defineProps<{ user: User }>()
const emit = defineEmits<{ (e: 'edit', userId: number): void }>()
</script>

<template>
  <article class="user-card">
    <h3>{{ user.name }}</h3>
    <p>{{ user.email }}</p>
    <button @click="emit('edit', user.id)">Edit</button>
  </article>
</template>

<!-- UserListContainer.vue (容器组件) -->
<script setup lang="ts">
import { ref } from 'vue'
import UserCard from './UserCard.vue'

const users = ref([
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
])

const handleEdit = (userId: number) => {
  console.log('编辑用户', userId)
}
</script>

<template>
  <section>
    <UserCard
      v-for="user in users"
      :key="user.id"
      :user="user"
      @edit="handleEdit"
    />
  </section>
</template>`
        }
      ]
    }
  ],
  exampleSections: []
}
