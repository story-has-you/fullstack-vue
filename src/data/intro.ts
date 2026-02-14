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

/**
 * 前言页面内容模型
 */
export interface IntroContent {
  readonly pageTitle: string
  readonly pageSubtitle: string
  readonly lead: string
  readonly formula: string
  readonly formulaExplanation: string
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
