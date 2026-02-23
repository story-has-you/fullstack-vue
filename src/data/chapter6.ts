import type { ProjectCase, ResponsibilityBoundary } from '@/types/chapter'

export interface Chapter6CodeSample {
  id: string
  title: string
  language: 'javascript' | 'typescript' | 'vue'
  code: string
  tone: 'legacy' | 'modern' | 'neutral'
}

export interface Chapter6PackageManagerCard {
  id: 'npm' | 'yarn' | 'pnpm'
  title: string
  subtitle: string
  strengths: string[]
  caveats: string[]
  backendComparison: string
}

export interface Chapter6IdeCard {
  id: 'vscode' | 'webstorm'
  title: string
  positioning: string
  strengths: string[]
  caveats: string[]
  recommendedFor: string
}

export interface Chapter6ProjectDirectoryItem {
  path: string
  description: string
}

export type Chapter6ProjectFileGroup =
  | 'root-config'
  | 'ide-config'
  | 'entry'
  | 'view'
  | 'component'
  | 'data'
  | 'router'
  | 'store'
  | 'constant'
  | 'type'
  | 'style'
  | 'utility'

export interface Chapter6ProjectFileItem {
  path: string
  group: Chapter6ProjectFileGroup
  description: string
}

export interface Chapter6ProjectStructure {
  scopeNote: string
  directories: Chapter6ProjectDirectoryItem[]
  files: Chapter6ProjectFileItem[]
}

export interface Chapter6ConceptSection {
  id: '6.1' | '6.2' | '6.3' | '6.4' | '6.5'
  title: string
  subtitle: string
  what: string[]
  why: string[]
  how: string[]
  backendComparisons: string[]
  codeSamples: Chapter6CodeSample[]
}

export interface Chapter6Content {
  pageTitle: string
  pageSubtitle: string
  chapterSummary: string
  formulaRelation: string
  responsibilityBoundary: ResponsibilityBoundary
  projectCases: ProjectCase[]
  conceptSections: Chapter6ConceptSection[]
  packageManagerCards: Chapter6PackageManagerCard[]
  ideCards: Chapter6IdeCard[]
  projectStructure: Chapter6ProjectStructure
}

export const chapter6Content: Chapter6Content = {
  pageTitle: '第六章：工程化体系',
  pageSubtitle: 'Engineering System',
  chapterSummary:
    '本章把 UI = f(States) 放进持续交付体系：依赖治理、开发环境、类型约束、构建链路和目录边界。',
  formulaRelation:
    '公式本身不变，但工程化决定公式能否稳定、持续、低风险地落地。',
  responsibilityBoundary: {
    frontend: ['维护构建链路、类型系统和前端工程规范', '保障页面质量与可演进性', '建立组件、数据、视图的清晰边界'],
    backend: ['提供稳定契约和版本策略', '提供环境配置与发布流程支撑', '保障生产可观测与回滚机制'],
    contract: ['约定 API 版本与弃用策略', '约定错误码和监控指标', '约定发布窗口与回滚流程']
  },
  projectCases: [
    {
      id: 'typed-contract',
      title: '案例：类型驱动接口契约',
      scenario: '通过 DTO 类型让前后端契约显式化。',
      frontendActions: ['组件 props 与 API 返回值强类型化', '构建阶段发现契约破坏'],
      backendActions: ['接口字段变更提前发布版本说明', '保持兼容窗口'],
      boundaryNotes: ['类型约束在前端编译期生效', '字段真相在后端协议定义']
    },
    {
      id: 'build-pipeline',
      title: '案例：统一构建与发布',
      scenario: 'pnpm + type-check + build 构成稳定流水线。',
      frontendActions: ['统一脚本与锁文件', '按路由做代码拆分'],
      backendActions: ['配合静态资源发布与缓存策略', '回滚时提供版本对齐能力'],
      boundaryNotes: ['前端负责产物质量', '后端/平台负责发布可靠性']
    }
  ],
  conceptSections: [
    {
      id: '6.1',
      title: '包管理：依赖治理',
      subtitle: 'npm / yarn / pnpm 的工程语义',
      what: ['包管理决定依赖解析、锁文件和安装一致性。'],
      why: ['统一依赖版本可降低“本地可跑，线上失败”的风险。'],
      how: ['团队统一 pnpm 与 lockfile 策略。'],
      backendComparisons: ['对应 Maven/Gradle 的依赖治理。'],
      codeSamples: [
        {
          id: '6.1-script',
          title: '统一脚本入口',
          language: 'javascript',
          tone: 'modern',
          code: `{
  "scripts": {
    "bootstrap": "pnpm install --frozen-lockfile",
    "type-check": "vue-tsc --noEmit",
    "build": "pnpm run type-check && vite build"
  }
}`
        }
      ]
    },
    {
      id: '6.2',
      title: '开发环境：IDE 协同',
      subtitle: 'VS Code 与 WebStorm 选型',
      what: ['IDE 直接影响重构效率和调试质量。'],
      why: ['统一开发环境能减少行为差异。'],
      how: ['约定插件、格式化与代码动作。'],
      backendComparisons: ['类似后端统一 JDK/插件版本。'],
      codeSamples: [
        {
          id: '6.2-settings',
          title: 'VS Code 工作区设置',
          language: 'javascript',
          tone: 'neutral',
          code: `{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}`
        }
      ]
    },
    {
      id: '6.3',
      title: 'TypeScript：契约防线',
      subtitle: '编译期发现问题',
      what: ['类型系统让接口契约可验证。'],
      why: ['重构时更容易定位影响面。'],
      how: ['DTO、props、store 状态统一类型定义。'],
      backendComparisons: ['对应强类型语言的编译期校验。'],
      codeSamples: [
        {
          id: '6.3-api-type',
          title: '泛型响应结构',
          language: 'typescript',
          tone: 'modern',
          code: `interface ApiResponse<T> {
  code: number
  data: T
  message: string
}`
        }
      ]
    },
    {
      id: '6.4',
      title: '构建与发布',
      subtitle: '打包、拆包、可回滚',
      what: ['构建产物体积和结构决定线上性能。'],
      why: ['控制首包和缓存命中率。'],
      how: ['按路由动态导入与分析产物。'],
      backendComparisons: ['对应后端发布流水线与回滚机制。'],
      codeSamples: [
        {
          id: '6.4-async',
          title: '异步组件拆分',
          language: 'typescript',
          tone: 'neutral',
          code: `import { defineAsyncComponent } from 'vue'

const Dashboard = defineAsyncComponent(() => import('./Dashboard.vue'))`
        }
      ]
    },
    {
      id: '6.5',
      title: '目录边界与职责',
      subtitle: '基于当前项目目录快照',
      what: ['目录结构是工程边界的外化表达。'],
      why: ['边界清晰可降低协作成本。'],
      how: ['按 data / components / views / router 分层组织。'],
      backendComparisons: ['类似 controller/service/repository 分层。'],
      codeSamples: []
    }
  ],
  packageManagerCards: [
    {
      id: 'npm',
      title: 'npm',
      subtitle: '默认生态入口',
      strengths: ['开箱可用', '生态资料丰富'],
      caveats: ['依赖复用效率一般'],
      backendComparison: '类似通用 Maven 方案。'
    },
    {
      id: 'yarn',
      title: 'yarn',
      subtitle: '锁文件一致性更强',
      strengths: ['安装速度改善', '锁文件成熟'],
      caveats: ['团队混用成本高'],
      backendComparison: '类似 Gradle 在效率上的增强。'
    },
    {
      id: 'pnpm',
      title: 'pnpm（推荐）',
      subtitle: '高复用 + 严格隔离',
      strengths: ['磁盘占用低', '依赖边界清晰'],
      caveats: ['老项目迁移需适配'],
      backendComparison: '类似本地仓库复用策略。'
    }
  ],
  ideCards: [
    {
      id: 'vscode',
      title: 'VS Code',
      positioning: '轻量 + 插件生态',
      strengths: ['启动快', '插件生态成熟'],
      caveats: ['能力依赖插件组合'],
      recommendedFor: '偏好轻量、可定制团队。'
    },
    {
      id: 'webstorm',
      title: 'WebStorm',
      positioning: '重型 IDE 开箱即用',
      strengths: ['重构能力强', '索引稳定'],
      caveats: ['资源占用更高'],
      recommendedFor: '重视大型重构体验团队。'
    }
  ],
  projectStructure: {
    scopeNote: '根目录 + src 主干，排除 dist/node_modules。',
    directories: [
      { path: '.', description: '项目根目录。' },
      { path: '.vscode', description: '编辑器配置。' },
      { path: 'public', description: '静态资源目录。' },
      { path: 'src', description: '应用源码主目录。' },
      { path: 'src/components', description: '组件目录。' },
      { path: 'src/components/common', description: '通用组件。' },
      { path: 'src/components/chapter', description: '章节组件。' },
      { path: 'src/data', description: '章节数据。' },
      { path: 'src/router', description: '路由配置。' },
      { path: 'src/views', description: '页面视图。' },
      { path: 'src/types', description: '类型定义。' },
      { path: 'src/utils', description: '工具函数。' },
      { path: 'src/constants', description: '常量配置。' }
    ],
    files: [
      { path: 'package.json', group: 'root-config', description: '脚本与依赖清单。' },
      { path: 'pnpm-lock.yaml', group: 'root-config', description: '依赖版本锁定。' },
      { path: 'vite.config.ts', group: 'root-config', description: '构建配置。' },
      { path: 'src/main.ts', group: 'entry', description: '应用入口。' },
      { path: 'src/router/index.ts', group: 'router', description: '路由映射。' },
      { path: 'src/data/chapters.ts', group: 'data', description: '章节目录数据。' },
      { path: 'src/data/chapter1.ts', group: 'data', description: '第三章 UI 内容数据。' },
      { path: 'src/data/chapter2.ts', group: 'data', description: '第一章 States 内容数据。' },
      { path: 'src/data/chapter3.ts', group: 'data', description: '第二章 f() 内容数据。' },
      { path: 'src/data/chapter4.ts', group: 'data', description: '第四章实践内容数据。' },
      { path: 'src/data/chapter5.ts', group: 'data', description: '第五章渲染策略内容数据。' },
      { path: 'src/data/chapter6.ts', group: 'data', description: '第六章工程化内容数据。' },
      { path: 'src/components/common/ChapterCard.vue', group: 'component', description: '章节卡片组件。' },
      { path: 'src/components/common/FormulaRelationPanel.vue', group: 'component', description: '公式关系面板。' },
      { path: 'src/components/common/ProjectCaseCard.vue', group: 'component', description: '项目案例面板。' },
      { path: 'src/views/HomeView.vue', group: 'view', description: '首页。' },
      { path: 'src/views/IntroView.vue', group: 'view', description: '前言页。' }
    ]
  }
}
