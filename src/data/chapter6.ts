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
  conceptSections: Chapter6ConceptSection[]
  packageManagerCards: Chapter6PackageManagerCard[]
  ideCards: Chapter6IdeCard[]
  projectStructure: Chapter6ProjectStructure
}

export const chapter6Content: Chapter6Content = {
  pageTitle: '第六章：工程化体系',
  pageSubtitle: 'Engineering System',
  chapterSummary:
    '本章聚焦前端工程化的四条主线：依赖治理、开发环境、类型系统与构建优化。目标是把前端项目带入可扩展、可重构、可持续交付的工程状态。',
  conceptSections: [
    {
      id: '6.1',
      title: '包管理工具：依赖的治理',
      subtitle: 'npm / yarn / pnpm 的能力边界与选型语义',
      what: [
        '包管理工具负责安装依赖、解析版本、生成锁文件。',
        '它直接影响 node_modules 结构、安装速度和团队一致性。',
        '选型本质是依赖治理策略，而不是命令行偏好。'
      ],
      why: [
        '统一依赖版本可减少“我本地能跑”问题。',
        '更高效的依赖复用机制可降低 CI 和本地构建成本。',
        '严格的依赖隔离有助于提前暴露幽灵依赖。'
      ],
      how: [
        '团队统一锁文件策略，禁止混用多种包管理器。',
        '优先使用 pnpm 进行依赖复用和隔离。',
        '将安装命令写入脚本，减少手工执行差异。'
      ],
      backendComparisons: [
        '对应 Maven/Gradle Wrapper：统一构建入口与版本基线。',
        '对应本地仓库复用策略：避免重复下载相同依赖。',
        '对应依赖树治理：防止传递依赖污染主工程。'
      ],
      codeSamples: [
        {
          id: '6.1-pnpm-setup',
          title: '统一依赖治理脚本示例',
          language: 'javascript',
          tone: 'modern',
          code: `{
  "scripts": {
    "bootstrap": "pnpm install --frozen-lockfile",
    "dev": "pnpm run type-check && vite",
    "build": "pnpm run type-check && vite build"
  }
}`
        }
      ]
    },
    {
      id: '6.2',
      title: '开发环境：IDE 的选择',
      subtitle: 'VS Code 与 WebStorm 的协作效率对比',
      what: [
        'IDE 影响编码效率、重构质量和调试体验。',
        'VS Code 依赖插件生态，WebStorm 偏开箱即用。',
        '选型应基于团队协作与个人工作流。'
      ],
      why: [
        '稳定的语言服务与重构能力可降低改动风险。',
        '一致的 IDE 约定可减少环境差异导致的问题。',
        '调试与类型提示质量决定开发反馈速度。'
      ],
      how: [
        '明确团队推荐插件与快捷键约定。',
        '统一格式化与 lint 行为，避免“每人一套风格”。',
        '关键场景（重构、调试）优先使用 IDE 原生能力。'
      ],
      backendComparisons: [
        'VS Code 类似 Eclipse 插件化模式。',
        'WebStorm 类似 IntelliJ IDEA 的开箱重构体验。',
        'IDE 统一策略类似后端统一 JDK 与构建插件版本。'
      ],
      codeSamples: [
        {
          id: '6.2-vscode-settings',
          title: 'VS Code 项目级设置示意',
          language: 'javascript',
          tone: 'neutral',
          code: `{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}`
        }
      ]
    },
    {
      id: '6.3',
      title: 'TypeScript：类型安全的最后一道防线',
      subtitle: '编译期约束 + 结构化类型，提升重构信心',
      what: [
        'TypeScript 为 JavaScript 增加静态类型检查。',
        '类型定义可直接承载接口文档语义。',
        '结构化类型系统适配前端 JSON 数据处理场景。'
      ],
      why: [
        '在编译期暴露类型错误，减少运行时故障。',
        '重构时可借助类型系统快速定位影响面。',
        '接口定义统一后，前后端契约更清晰。'
      ],
      how: [
        '为 DTO、接口返回值和组件 props 建立精确类型。',
        '使用联合类型和泛型表达边界与复用关系。',
        '逐步消除 any，保持类型收敛。'
      ],
      backendComparisons: [
        '对应 Java/Go 的编译期类型检查。',
        'DTO 接口类似后端领域模型与传输对象定义。',
        '泛型约束能力对应 Java 泛型的类型参数语义。'
      ],
      codeSamples: [
        {
          id: '6.3-ts-dto',
          title: 'DTO + 泛型响应结构',
          language: 'typescript',
          tone: 'modern',
          code: `interface UserDTO {
  id: number
  name: string
  email?: string
  role: 'ADMIN' | 'USER'
}

interface ApiResponse<T> {
  code: number
  data: T
  message: string
}

function handleUser(response: ApiResponse<UserDTO>) {
  console.log(response.data.name)
}`
        }
      ]
    },
    {
      id: '6.4',
      title: '打包与构建',
      subtitle: '编译、压缩、按需加载与 Tree Shaking',
      what: [
        '构建工具把源代码转换为浏览器可执行资源。',
        'Tree Shaking 会剔除未使用代码，降低传输体积。',
        '代码分割通过按需加载减少首包负担。'
      ],
      why: [
        '前端产物通过网络传输，体积直接影响首屏性能。',
        '兼容性转换可保障旧环境可运行。',
        '合理切包可避免一次性加载全部页面代码。'
      ],
      how: [
        '保持 ESM 导入导出，利于 Tree Shaking 生效。',
        '对路由或重组件使用动态导入实现懒加载。',
        '通过构建报告观察产物变化并持续优化。'
      ],
      backendComparisons: [
        '对应 Maven/Gradle 的编译打包流水线。',
        '对应链接器/ProGuard 的死代码移除能力。',
        '对应按需加载策略：避免将全部模块一次性打入主包。'
      ],
      codeSamples: [
        {
          id: '6.4-async-component',
          title: '按需加载示例：defineAsyncComponent',
          language: 'typescript',
          tone: 'modern',
          code: `import { defineAsyncComponent } from 'vue'

const Dashboard = defineAsyncComponent(() => import('./Dashboard.vue'))

export default {
  components: {
    Dashboard
  }
}`
        }
      ]
    },
    {
      id: '6.5',
      title: '项目目录结构',
      subtitle: '基于当前项目的真实目录、文件与职责说明',
      what: [
        '目录结构是工程边界的外显，决定代码组织和协作效率。',
        '在本项目中，页面、章节组件、章节数据和基础设施已形成分层。',
        '目录约定统一后，新章节的扩展路径更稳定。'
      ],
      why: [
        '帮助新成员快速定位功能入口与依赖关系。',
        '减少“同类文件放在哪”的沟通成本与结构漂移。',
        '让重构和增量迭代基于稳定的文件边界进行。'
      ],
      how: [
        '按“根配置 + src 分层”理解职责，不混放不同类型文件。',
        '章节内容遵循“data + component + view”三层协作。',
        '新增功能优先复用现有目录语义，避免临时目录膨胀。'
      ],
      backendComparisons: [
        '类似后端分层工程：controller/service/repository 的职责边界。',
        '类似多模块项目中的包结构约束，减少跨层依赖。',
        '类似规范化 Maven 目录，提升可维护性和可交接性。'
      ],
      codeSamples: []
    }
  ],
  packageManagerCards: [
    {
      id: 'npm',
      title: 'npm',
      subtitle: '默认内置，生态广泛',
      strengths: ['开箱可用，无额外安装', '社区资料最丰富'],
      caveats: ['安装与依赖复用效率一般', '历史上更容易出现依赖树混乱'],
      backendComparison: '类似早期 Maven：通用稳定，但性能与治理能力有限。'
    },
    {
      id: 'yarn',
      title: 'yarn',
      subtitle: '引入锁文件后提升一致性',
      strengths: ['安装速度较 npm 改善', '锁文件机制成熟'],
      caveats: ['团队常见多管理器并存风险', '生态主流逐步向 pnpm 迁移'],
      backendComparison: '类似 Gradle 在 Maven 基础上的效率增强。'
    },
    {
      id: 'pnpm',
      title: 'pnpm（推荐）',
      subtitle: '内容寻址存储 + 严格依赖隔离',
      strengths: ['磁盘占用低，安装复用效率高', '严格依赖边界可减少幽灵依赖'],
      caveats: ['老项目迁移需要适配依赖路径习惯'],
      backendComparison: '类似本地仓库复用的 Maven Local Repo 模式。'
    }
  ],
  ideCards: [
    {
      id: 'vscode',
      title: 'VS Code',
      positioning: '轻量编辑器 + 插件生态',
      strengths: ['启动快，社区生态成熟', '前端插件支持全面'],
      caveats: ['能力依赖插件装配', '团队配置不统一时体验波动大'],
      recommendedFor: '追求轻量、偏好可配置工作流的团队。'
    },
    {
      id: 'webstorm',
      title: 'WebStorm',
      positioning: '开箱即用的重型 IDE',
      strengths: ['重构能力强，索引与导航稳定', '默认体验完整，配置成本低'],
      caveats: ['付费且资源占用更高'],
      recommendedFor: '习惯 IntelliJ 体系、重视重构体验的团队。'
    }
  ],
  projectStructure: {
    scopeNote:
      '根目录 + src 全量；排除 dist/node_modules/.git*；包含 .vscode 与点文件配置。',
    directories: [
      { path: '.', description: '项目根目录，承载构建配置、依赖清单与源码入口。' },
      { path: '.vscode', description: 'VS Code 工作区配置目录，统一插件与编辑器行为。' },
      { path: 'public', description: '静态资源目录，构建时原样拷贝到产物目录。' },
      { path: 'src', description: '应用源码主目录，按视图、组件、数据和基础设施分层。' },
      { path: 'src/assets', description: '样式与静态资源源码目录。' },
      { path: 'src/assets/styles', description: '全局样式目录，存放 Tailwind 与主题样式入口。' },
      { path: 'src/components', description: '可复用组件目录，包含章节组件、通用组件与布局组件。' },
      { path: 'src/components/chapter', description: '章节专属组件目录，按章节号分子目录管理。' },
      { path: 'src/components/chapter/chapter1', description: '第一章相关组件目录。' },
      { path: 'src/components/chapter/chapter2', description: '第二章相关组件目录。' },
      { path: 'src/components/chapter/chapter3', description: '第三章相关组件目录。' },
      { path: 'src/components/chapter/chapter4', description: '第四章相关组件目录。' },
      { path: 'src/components/chapter/chapter5', description: '第五章相关组件目录。' },
      { path: 'src/components/chapter/chapter6', description: '第六章相关组件目录。' },
      { path: 'src/components/common', description: '跨页面复用的通用业务组件目录。' },
      { path: 'src/components/layout', description: '应用级布局组件目录，如头部和底部。' },
      { path: 'src/constants', description: '常量配置目录，承载路由可见性与图标映射。' },
      { path: 'src/data', description: '章节内容与页面文案数据目录。' },
      { path: 'src/router', description: '路由配置目录，声明页面路径与标题。' },
      { path: 'src/stores', description: 'Pinia 状态管理目录。' },
      { path: 'src/types', description: '全局类型定义目录。' },
      { path: 'src/utils', description: '工具函数目录。' },
      { path: 'src/views', description: '路由页面目录，按章节和首页组织。' }
    ],
    files: [
      { path: '.gitignore', group: 'root-config', description: 'Git 忽略规则文件，负责过滤不纳入版本管理的产物与本地文件。' },
      { path: '.prettierrc.json', group: 'root-config', description: 'Prettier 配置文件，负责统一代码格式化规则。' },
      { path: '.vscode/extensions.json', group: 'ide-config', description: 'VS Code 推荐插件配置，负责团队开发环境提示。' },
      { path: '.vscode/settings.json', group: 'ide-config', description: 'VS Code 工作区设置，负责项目级编辑器行为统一。' },
      { path: 'AGENTS.md', group: 'root-config', description: 'Agent 协作说明链接文件（符号链接到 CLAUDE.md），负责统一智能体执行规范。' },
      { path: 'CLAUDE.md', group: 'root-config', description: '项目级智能体工作规范文件，负责定义约束、流程与交付标准。' },
      { path: 'README.md', group: 'root-config', description: '项目说明文档，负责记录启动与开发说明。' },
      { path: 'env.d.ts', group: 'entry', description: 'Vite 环境类型声明文件，负责补充全局 TS 类型。' },
      { path: 'index.html', group: 'entry', description: '应用 HTML 宿主模板，负责提供根挂载节点。' },
      { path: 'package.json', group: 'root-config', description: '依赖与脚本清单文件，负责定义工程命令与包信息。' },
      { path: 'pnpm-lock.yaml', group: 'root-config', description: 'pnpm 锁文件，负责固定依赖版本实现可复现安装。' },
      { path: 'postcss.config.js', group: 'root-config', description: 'PostCSS 配置文件，负责样式处理插件链配置。' },
      { path: 'public/favicon.ico', group: 'root-config', description: '站点图标文件，负责浏览器标签页图标展示。' },
      { path: 'src/App.vue', group: 'entry', description: '应用根组件，负责组装全局布局与路由视图。' },
      { path: 'src/assets/styles/main.css', group: 'style', description: '全局样式入口文件，负责主题变量与通用样式定义。' },
      { path: 'src/components/chapter/chapter1/CodeSnippetPanel.vue', group: 'component', description: '第一章代码片段面板组件，负责代码高亮与复制交互。' },
      { path: 'src/components/chapter/chapter1/ConceptSectionCard.vue', group: 'component', description: '第一章概念卡组件，负责小节内容结构化展示。' },
      { path: 'src/components/chapter/chapter3/MvvmArchitectureDiagram.vue', group: 'component', description: '第三章 MVVM 图示组件，负责 MVVM 架构关系可视化表达。' },
      { path: 'src/components/chapter/chapter2/AsyncRequestStateDemo.vue', group: 'component', description: '第二章异步状态演示组件，负责请求状态机交互展示。' },
      { path: 'src/components/chapter/chapter2/CodeSnippetPanel.vue', group: 'component', description: '第二章代码片段面板组件，负责代码高亮与复制交互。' },
      { path: 'src/components/chapter/chapter2/EventLoopTimelineDiagram.vue', group: 'component', description: '第二章事件循环时间线组件，负责流程顺序图示。' },
      { path: 'src/components/chapter/chapter2/RuntimeConceptSectionCard.vue', group: 'component', description: '第二章概念卡组件，负责运行时小节内容展示。' },
      { path: 'src/components/chapter/chapter3/CodeSnippetPanel.vue', group: 'component', description: '第三章代码片段面板组件，负责代码高亮与复制交互。' },
      { path: 'src/components/chapter/chapter3/ComponentConceptSectionCard.vue', group: 'component', description: '第三章概念卡组件，负责组件化小节内容展示。' },
      { path: 'src/components/chapter/chapter3/MvvmArchitectureDiagram.vue', group: 'component', description: '第三章 MVVM 图示组件，负责 MVVM 架构关系可视化表达。' },
      { path: 'src/components/chapter/chapter3/ReactiveSystemDiagram.vue', group: 'component', description: '第三章响应式系统原理图示组件，负责 Proxy 劫持与依赖收集流程可视化。' },
      { path: 'src/components/chapter/chapter3/UnidirectionalFlowDiagram.vue', group: 'component', description: '第三章单向数据流图示组件，负责数据流方向可视化。' },
      { path: 'src/components/chapter/chapter3/UpdatePipelineDiagram.vue', group: 'component', description: '第三章完整更新链路图示组件，负责从 State 变化到 UI 更新的完整流程可视化。' },
      { path: 'src/components/chapter/chapter4/AntiPatternCard.vue', group: 'component', description: '第四章反模式卡片组件，负责反模式问题、错误做法与正确做法展示。' },
      { path: 'src/components/chapter/chapter4/CodeSnippetPanel.vue', group: 'component', description: '第四章代码片段面板组件，负责代码高亮与复制交互。' },
      { path: 'src/components/chapter/chapter4/ProjectArchitectureDiagram.vue', group: 'component', description: '第四章项目架构图示组件，负责本项目 States-f()-UI 架构可视化。' },
      { path: 'src/components/chapter/chapter4/StateConceptSectionCard.vue', group: 'component', description: '第四章概念卡组件，负责状态分类与模式内容展示。' },
      { path: 'src/components/chapter/chapter5/CodeSnippetPanel.vue', group: 'component', description: '第五章代码片段面板组件，负责代码高亮与复制交互。' },
      { path: 'src/components/chapter/chapter5/RenderingConceptSectionCard.vue', group: 'component', description: '第五章概念卡组件，负责渲染模式与策略内容展示。' },
      { path: 'src/components/chapter/chapter6/CodeSnippetPanel.vue', group: 'component', description: '第六章代码片段面板组件，负责代码高亮与复制交互。' },
      { path: 'src/components/chapter/chapter6/EngineeringConceptSectionCard.vue', group: 'component', description: '第六章概念卡组件，负责工程化小节与目录说明展示。' },
      { path: 'src/components/common/ChapterCard.vue', group: 'component', description: '章节卡片通用组件，负责首页章节入口信息展示。' },
      { path: 'src/components/layout/AppFooter.vue', group: 'component', description: '全局页脚组件，负责站点底部信息展示。' },
      { path: 'src/components/layout/AppHeader.vue', group: 'component', description: '全局页头组件，负责导航菜单与章节跳转。' },
      { path: 'src/constants/icon-map.ts', group: 'constant', description: '图标映射常量文件，负责章节与首页图标统一绑定。' },
      { path: 'src/constants/implemented-routes.ts', group: 'constant', description: '已实现章节路由常量文件，负责导航可见范围控制。' },
      { path: 'src/data/chapter1.ts', group: 'data', description: '第一章数据模型与文案配置文件，负责章节内容驱动。' },
      { path: 'src/data/chapter2.ts', group: 'data', description: '第二章数据模型与文案配置文件，负责章节内容驱动。' },
      { path: 'src/data/chapter3.ts', group: 'data', description: '第三章数据模型与文案配置文件，负责章节内容驱动。' },
      { path: 'src/data/chapter4.ts', group: 'data', description: '第四章数据模型与文案配置文件，负责章节内容驱动。' },
      { path: 'src/data/chapter5.ts', group: 'data', description: '第五章数据模型与文案配置文件，负责章节内容驱动。' },
      { path: 'src/data/chapter6.ts', group: 'data', description: '第六章数据模型与文案配置文件，负责章节内容驱动。' },
      { path: 'src/data/chapters.ts', group: 'data', description: '章节目录数据文件，负责首页与导航章节元信息。' },
      { path: 'src/data/intro.ts', group: 'data', description: '前言页面数据文件，负责前言内容配置。' },
      { path: 'src/main.ts', group: 'entry', description: '应用启动入口文件，负责挂载 Vue、Pinia 与路由。' },
      { path: 'src/router/index.ts', group: 'router', description: '路由定义文件，负责路径到页面组件的映射与标题守卫。' },
      { path: 'src/stores/counter.ts', group: 'store', description: 'Pinia 示例状态文件，负责共享计数状态示例。' },
      { path: 'src/types/chapter.ts', group: 'type', description: '章节类型定义文件，负责章节结构类型约束。' },
      { path: 'src/utils/clipboard.ts', group: 'utility', description: '剪贴板工具文件，负责代码复制能力封装。' },
      { path: 'src/views/Chapter1View.vue', group: 'view', description: '第一章路由视图文件，负责挂载第一章页面结构与内容。' },
      { path: 'src/views/Chapter2View.vue', group: 'view', description: '第二章路由视图文件，负责挂载第二章页面结构与内容。' },
      { path: 'src/views/Chapter3View.vue', group: 'view', description: '第三章路由视图文件，负责挂载第三章页面结构与内容。' },
      { path: 'src/views/Chapter4View.vue', group: 'view', description: '第四章路由视图文件，负责挂载第四章页面结构与内容。' },
      { path: 'src/views/Chapter5View.vue', group: 'view', description: '第五章路由视图文件，负责挂载第五章页面结构与内容。' },
      { path: 'src/views/Chapter6View.vue', group: 'view', description: '第六章路由视图文件，负责挂载第六章页面结构与内容。' },
      { path: 'src/views/HomeView.vue', group: 'view', description: '首页路由视图文件，负责章节导航入口与学习路径展示。' },
      { path: 'src/views/IntroView.vue', group: 'view', description: '前言路由视图文件，负责全书导入内容展示。' },
      { path: 'tailwind.config.js', group: 'root-config', description: 'Tailwind 配置文件，负责原子类扫描与主题扩展策略。' },
      { path: 'tsconfig.app.json', group: 'root-config', description: '应用端 TS 配置文件，负责浏览器端编译约束。' },
      { path: 'tsconfig.json', group: 'root-config', description: 'TypeScript 根配置文件，负责多配置引用聚合。' },
      { path: 'tsconfig.node.json', group: 'root-config', description: 'Node 侧 TS 配置文件，负责构建工具脚本类型约束。' },
      { path: 'vite.config.ts', group: 'root-config', description: 'Vite 配置文件，负责构建行为与开发服务器配置。' }
    ]
  }
}
