/**
 * 前言三要素模型
 */
export interface IntroPillar {
  readonly id: string
  readonly title: string
  readonly definition: string
  readonly carrier: string
  readonly nature: string
}

export interface BindingEvolution {
  readonly legacy: readonly string[]
  readonly modern: readonly string[]
  readonly legacyCode: string
  readonly modernCode: string
  readonly conclusion: string
}

export interface FormulaRationale {
  readonly title: string
  readonly why: readonly string[]
  readonly backendAnalogy: readonly string[]
  readonly implications: readonly string[]
}

/**
 * 前言页面内容模型
 */
export interface IntroContent {
  readonly pageTitle: string
  readonly pageSubtitle: string
  readonly lead: string
  readonly formula: string
  readonly formulaExplanation: string
  readonly formulaRationale?: FormulaRationale
  readonly pillars: readonly IntroPillar[]
  readonly bindingEvolution: BindingEvolution
}

/**
 * 前言页面结构化内容
 */
export const introContent = {
  pageTitle: '前言：前端开发的本质',
  pageSubtitle: 'The Essence',
  lead: '抛开所有框架和工具的噪音，现代前端开发的核心仅包含三个要素：UI、数据、以及两者的绑定。',
  formula: 'UI = f(states)',
  formulaExplanation: '现代化前端可以用一个公式说明：界面是状态的纯函数投影。',
  formulaRationale: {
    title: '为什么是公式，而不是模式？',
    why: [
      '公式具有数学的确定性：同样的 states 输入，必然产生同样的 UI 输出（幂等性）。',
      '公式强调函数式思维：f() 应该是纯函数，不产生副作用，可预测、可测试。',
      '公式揭示本质规律：UI 的任何变化都源于 states 的变化，单一数据源是唯一真相。',
      '模式是经验总结，公式是理论抽象：掌握公式后，各种框架和模式都是具体实现。'
    ],
    backendAnalogy: [
      '类似后端的 Response = Controller(Request)：请求决定响应，中间是确定的映射关系。',
      '类似数据库的 Result = Query(Data)：查询语句和数据集决定结果集，关系是确定的。',
      '类似函数式编程的 Output = f(Input)：强调不可变性和纯函数，避免隐式状态。',
      '后端同学理解了"请求-响应"模型，就能类比理解"状态-界面"模型。'
    ],
    implications: [
      '组件幂等性：同样的 props（状态输入）总能渲染出同样的 UI（输出）。',
      '单向数据流：States 变化驱动 UI 更新，UI 不能反向修改 States（除非通过事件上抛）。',
      '副作用隔离：f() 应该是纯函数，副作用（请求、订阅）要放在生命周期钩子中管理。',
      '可测试性：给定 states，断言 UI 输出，无需关心 f() 内部实现细节。'
    ]
  },
  pillars: [
    {
      id: 'ui',
      title: 'UI (User Interface)',
      definition: '用户所见的可视化界面。',
      carrier: 'HTML 决定骨架，CSS 决定皮肤。',
      nature: '它是一个静态的投影，等待被数据填充。'
    },
    {
      id: 'data',
      title: '数据 (Data / State)',
      definition: '驱动应用运行的业务逻辑与状态。',
      carrier: 'JavaScript 对象 (Object) 或数组 (Array)。',
      nature: '它是应用的灵魂，是唯一的真理来源 (Single Source of Truth)。'
    },
    {
      id: 'binding',
      title: '绑定 (Binding)',
      definition: '将数据映射到 UI 的规则与机制。',
      carrier: '框架层的声明式模板与响应式更新机制。',
      nature: '开发者关注数据变化，渲染更新由框架自动完成。'
    }
  ],
  bindingEvolution: {
    legacy: [
      '手动绑定 (Old)：使用 jQuery 手动查找 DOM 节点并修改。',
      '代码中充满 DOM 操作逻辑，状态路径复杂且难以维护。'
    ],
    modern: [
      '自动绑定 (Modern)：使用 Vue/React 框架进行声明式绑定。',
      '开发者只需修改数据，框架负责自动更新 UI。'
    ],
    legacyCode: `const btn = document.getElementById('btn');
const text = document.getElementById('status');

function updateUI(isLoading) {
  if (isLoading) {
    btn.setAttribute('disabled', 'true');
    text.textContent = 'Loading...';
  } else {
    btn.removeAttribute('disabled');
    text.textContent = 'Ready';
  }
}`,
    modernCode: `<script setup>
import { ref } from 'vue'

const isLoading = ref(false)
</script>

<template>
  <button :disabled="isLoading">Submit</button>
  <p>{{ isLoading ? 'Loading...' : 'Ready' }}</p>
</template>`,
    conclusion: '全栈转型的关键在于掌握这种“数据驱动 UI 自动同步”的自动化思维。'
  }
} as const satisfies IntroContent
