import type { Chapter } from '@/types/chapter'

/**
 * 全栈开发分享章节数据配置
 */
export const chapters: Chapter[] = [
  {
    id: 'intro',
    number: 0,
    title: '前言',
    subtitle: '前端开发的本质',
    description: '抛开框架噪音，聚焦 UI、数据、绑定三要素，建立 UI = f(states) 的数据驱动认知。',
    icon: 'target',
    color: 'blue',
    sections: [
      { id: 'formula', title: '核心公式：UI = f(states)' },
      { id: 'ui', title: 'UI (User Interface)' },
      { id: 'data', title: '数据 (Data / State)' },
      { id: 'binding-evolution', title: '绑定演进：手动绑定 vs 自动绑定' }
    ],
    route: '/intro'
  },
  {
    id: 'chapter1',
    number: 1,
    title: '第一章',
    subtitle: 'UI (用户界面层)',
    description: '声明式 UI、虚拟 DOM、组件化架构。理解 UI = f(States) 公式中的 UI 层如何从数据驱动渲染。',
    icon: 'monitor',
    color: 'purple',
    sections: [
      { id: '1.1', title: '声明式 UI' },
      { id: '1.2', title: '虚拟 DOM 与 Diff 算法' },
      { id: '1.3', title: '组件化架构' },
      { id: '1.4', title: '示例 1：声明式 UI + 单向命令事件' },
      { id: '1.5', title: '示例 2：列表渲染的 key 策略' }
    ],
    route: '/chapter/1'
  },
  {
    id: 'chapter2',
    number: 2,
    title: '第二章',
    subtitle: 'States (状态层)',
    description: '状态分类学、状态管理模式、异步状态管理。理解 UI = f(States) 公式中的 States 如何分层治理。',
    icon: 'zap',
    color: 'indigo',
    sections: [
      { id: '2.1', title: '状态分类学' },
      { id: '2.2', title: '状态管理模式' },
      { id: '2.3', title: '异步状态管理' },
      { id: '2.4', title: '示例：异步请求状态标准化' }
    ],
    route: '/chapter/2'
  },
  {
    id: 'chapter3',
    number: 3,
    title: '第三章',
    subtitle: 'f() - 响应式绑定机制',
    description: '响应式系统原理、MVVM 双向绑定、纯函数组件、副作用管理。理解 UI = f(States) 公式中的 f() 实现。',
    icon: 'repeat',
    color: 'cyan',
    sections: [
      { id: '3.1', title: '响应式系统原理' },
      { id: '3.2', title: 'MVVM 架构与双向绑定' },
      { id: '3.3', title: '纯函数组件与单向数据流' },
      { id: '3.4', title: '副作用管理与生命周期' }
    ],
    route: '/chapter/3'
  },
  {
    id: 'chapter4',
    number: 4,
    title: '第四章',
    subtitle: '完整应用实践',
    description: '以本项目为例，展示 States 设计、UI 组件拆分、响应式绑定、交互流程，以及反模式与最佳实践。',
    icon: 'shield',
    color: 'teal',
    sections: [
      { id: '4.1', title: '本项目的 UI = f(States) 实践' },
      { id: '4.2', title: '常见反模式与解决方案' },
      { id: '4.3', title: '最佳实践总结' }
    ],
    route: '/chapter/4'
  },
  {
    id: 'chapter5',
    number: 5,
    title: '第五章',
    subtitle: '执行环境与渲染模式',
    description: '响应式更新调度、CSR、SSR、SSG。理解"何时何地执行 f(States)"在不同环境下的表现。',
    icon: 'puzzle',
    color: 'emerald',
    sections: [
      { id: '5.1', title: '响应式更新调度机制' },
      { id: '5.2', title: '客户端渲染 (CSR)' },
      { id: '5.3', title: '服务端渲染 (SSR)' },
      { id: '5.4', title: '静态站点生成 (SSG)' }
    ],
    route: '/chapter/5'
  },
  {
    id: 'chapter6',
    number: 6,
    title: '第六章',
    subtitle: '工程化体系',
    description: '包管理、TypeScript、打包构建。现代前端工程化的完整体系。',
    icon: 'wrench',
    color: 'green',
    sections: [
      { id: '6.1', title: '包管理工具：依赖的治理' },
      { id: '6.2', title: '开发环境：IDE 的选择' },
      { id: '6.3', title: 'TypeScript：类型安全的最后一道防线' },
      { id: '6.4', title: '打包与构建' },
      { id: '6.5', title: '项目目录结构（基于当前项目）' },
    ],
    route: '/chapter/6'
  },
  {
    id: 'epilogue',
    number: 8,
    title: '结语',
    subtitle: '全栈的终局',
    description: '全栈思维的本质与未来展望。从后端到全栈的思维跃迁总结。',
    icon: 'graduation',
    color: 'green',
    sections: [],
    route: '/epilogue'
  }
]
