import type { ProjectCase, ResponsibilityBoundary } from '@/types/chapter'

export interface EpilogueContent {
  pageTitle: string
  pageSubtitle: string
  summary: string
  formulaRelation: string
  responsibilityBoundary: ResponsibilityBoundary
  projectCases: ProjectCase[]
  nextSteps: string[]
}

export const epilogueContent: EpilogueContent = {
  pageTitle: '结语：全栈视角闭环',
  pageSubtitle: 'From Backend to Fullstack',
  summary:
    '到这里你已经完成从“接口思维”到“状态驱动界面思维”的迁移。全栈不是会更多技术，而是能够在边界清晰的前提下协同演进系统。',
  formulaRelation:
    'UI = f(States) 是前后端协作的共同语言：后端提供可演进状态，前端提供可预测映射，双方通过契约完成闭环。',
  responsibilityBoundary: {
    frontend: ['把业务状态可视化并保持可交互', '控制组件边界和体验一致性', '对用户反馈链路负责'],
    backend: ['对业务规则和数据一致性负责', '提供可演进 API 与观测能力', '保障权限和事务正确性'],
    contract: ['共同定义 DTO、错误模型和版本策略', '共同定义发布与回滚流程', '共同定义质量门禁']
  },
  projectCases: [
    {
      id: 'fullstack-collaboration',
      title: '案例：章节站点迭代',
      scenario: '新增章节时，前后端按契约并行开发，最终在同一模型下汇合。',
      frontendActions: ['新增 data + view + component', '保持单向数据流和状态驱动'],
      backendActions: ['提供章节内容接口与权限控制', '保证字段兼容和发布节奏'],
      boundaryNotes: ['并行开发以契约为中心', '验证以用户可见行为为准']
    }
  ],
  nextSteps: [
    '把当前静态数据替换为真实 API，验证状态建模是否稳定。',
    '为关键交互补充端到端测试，确保 UI = f(States) 在回归时不失真。',
    '建立 API 变更清单和前端类型回归策略，形成长期协作机制。'
  ]
}
