import type { Chapter } from '@/types/chapter'

/**
 * 全栈开发分享章节数据配置（按 UI = f(States) 主线重排）
 */
export const chapters: Chapter[] = [
  {
    id: 'intro',
    number: 0,
    title: '前言',
    subtitle: '公式与认知基线',
    description: '先统一认知：UI = f(States) 不是口号，而是可验证、可协作的工程模型。',
    icon: 'target',
    color: 'blue',
    sections: [
      { id: 'formula', title: '核心公式：UI = f(States)' },
      { id: 'formula-rationale', title: '为什么是公式' },
      { id: 'binding-evolution', title: '绑定演进：手动到自动' }
    ],
    route: '/intro'
  },
  {
    id: 'chapter1',
    number: 1,
    title: '第一章',
    subtitle: 'States (输入建模)',
    description: '先定义状态分类、作用域和状态迁移，再谈渲染与交互。',
    icon: 'zap',
    color: 'indigo',
    sections: [
      { id: '2.0', title: '什么是状态' },
      { id: '2.1', title: '状态分类学' },
      { id: '2.2', title: '状态管理模式' }
    ],
    route: '/chapter/1'
  },
  {
    id: 'chapter2',
    number: 2,
    title: '第二章',
    subtitle: 'f() (响应式绑定机制)',
    description: '理解状态变化如何被感知、调度并映射为最小化 UI 更新。',
    icon: 'repeat',
    color: 'cyan',
    sections: [
      { id: '3.1', title: '响应式系统原理' },
      { id: '3.2', title: 'MVVM 与双向绑定' },
      { id: '3.3', title: '单向数据流' },
      { id: '3.4', title: '副作用生命周期' }
    ],
    route: '/chapter/2'
  },
  {
    id: 'chapter3',
    number: 3,
    title: '第三章',
    subtitle: 'UI (声明式表达与组件化)',
    description: '将状态映射成可维护 UI：声明式分支、组件边界和列表身份。',
    icon: 'monitor',
    color: 'purple',
    sections: [
      { id: '1.1', title: '声明式 UI' },
      { id: '1.2', title: '虚拟 DOM 与 Diff' },
      { id: '1.3', title: '组件化架构' },
      { id: '1.4', title: '示例：命令事件上抛' },
      { id: '1.5', title: '示例：key 策略' }
    ],
    route: '/chapter/3'
  },
  {
    id: 'chapter4',
    number: 4,
    title: '第四章',
    subtitle: '端到端项目实践',
    description: '基于当前仓库真实链路，串起数据源、路由、组件渲染与交互反馈，完成 UI = f(States) 工程闭环。',
    icon: 'shield',
    color: 'teal',
    sections: [
      { id: '4.1', title: '链路建立：从数据源到页面' },
      { id: '4.2', title: '反模式修正：从不可追踪到可维护' },
      { id: '4.3', title: '实践清单：验收、回归与演进' }
    ],
    route: '/chapter/4'
  },
  {
    id: 'chapter5',
    number: 5,
    title: '第五章',
    subtitle: '执行环境与渲染策略',
    description: '同一个公式在 CSR / SSR / SSG 下的执行时机与执行位置差异。',
    icon: 'puzzle',
    color: 'emerald',
    sections: [
      { id: '5.1', title: '执行环境总览（CSR/SSR）' },
      { id: '5.2', title: 'CSR：客户端渲染' },
      { id: '5.3', title: 'SSR：服务端渲染与 Hydration' },
      { id: '5.4', title: 'CSR vs SSR 选型清单' }
    ],
    route: '/chapter/5'
  },
  {
    id: 'chapter6',
    number: 6,
    title: '第六章',
    subtitle: '工程化体系',
    description: '把公式放入可持续交付的工程系统：类型、构建、目录、规范。',
    icon: 'wrench',
    color: 'green',
    sections: [
      { id: '6.1', title: '依赖治理' },
      { id: '6.2', title: '开发环境' },
      { id: '6.3', title: '类型系统' },
      { id: '6.4', title: '构建发布' },
      { id: '6.5', title: '目录职责边界' }
    ],
    route: '/chapter/6'
  },
  {
    id: 'epilogue',
    number: 7,
    title: '结语',
    subtitle: '全栈视角闭环',
    description: '从后端思维到全栈协作，形成可迁移的状态驱动工程方法。',
    icon: 'graduation',
    color: 'green',
    sections: [{ id: '7.1', title: '认知闭环与下一步' }],
    route: '/epilogue'
  }
]
