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
    subtitle: '范式转移',
    description: '声明式 UI 与 MVVM 架构。从指令式到声明式的思维转变，理解双向绑定的本质。',
    icon: 'repeat',
    color: 'purple',
    sections: [
      { id: '1.1', title: '声明式 UI (Declarative UI)' },
      { id: '1.2', title: 'MVVM 架构与双向绑定' },
      { id: '1.3', title: '最小示例 1：声明式 UI + 单向命令事件' },
      { id: '1.4', title: '最小示例 2：MVVM 表单双向绑定' }
    ],
    route: '/chapter/1'
  },
  {
    id: 'chapter2',
    number: 2,
    title: '第二章',
    subtitle: '运行时环境与异步机制',
    description: 'JavaScript 单线程模型、事件循环、Promise 与虚拟 DOM。理解前端异步编程的核心机制。',
    icon: 'zap',
    color: 'indigo',
    sections: [
      { id: '2.1', title: 'JavaScript 单线程模型与事件循环' },
      { id: '2.2', title: 'Promise 与异步编程' },
      { id: '2.3', title: '虚拟 DOM 与 Diff 算法' },
      { id: '2.4', title: '最小示例 3：异步请求状态标准化' }
    ],
    route: '/chapter/2'
  },
  {
    id: 'chapter3',
    number: 3,
    title: '第三章',
    subtitle: '组件化架构',
    description: '纯函数组件、单向数据流与副作用管理。构建可维护的组件化系统。',
    icon: 'puzzle',
    color: 'cyan',
    sections: [
      { id: '3.1', title: '纯函数组件与幂等性' },
      { id: '3.2', title: '单向数据流' },
      { id: '3.3', title: '副作用管理与生命周期' }
    ],
    route: '/chapter/3'
  },
  {
    id: 'chapter4',
    number: 4,
    title: '第四章',
    subtitle: '状态管理设计',
    description: '状态管理分类学与实现模式。从局部状态到全局状态的架构设计。',
    icon: 'chart',
    color: 'teal',
    sections: [
      { id: '4.1', title: '状态管理分类学' },
      { id: '4.2', title: '详细实现模式' },
    ],
    route: '/chapter/4'
  },
  {
    id: 'chapter5',
    number: 5,
    title: '第五章',
    subtitle: '渲染模式演进',
    description: 'CSR、SSR、SSG 三种渲染模式的对比与选择。理解不同渲染模式的适用场景。',
    icon: 'monitor',
    color: 'emerald',
    sections: [
      { id: '5.1', title: '客户端渲染 (CSR)' },
      { id: '5.2', title: '服务端渲染 (SSR)' },
      { id: '5.3', title: '静态站点生成 (SSG)' }
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
