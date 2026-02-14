# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 Vue 3 + TypeScript + Vite + Tailwind CSS 的全栈开发分享网站项目，内容主题为"全栈思维跃迁"。项目采用章节式内容组织结构，涵盖前端开发的核心概念和架构设计。

## 开发命令

**包管理器**: 必须使用 `pnpm`

```bash
# 安装依赖
pnpm install

# 开发服务器 (不要在 Claude Code 中运行，建议用户手动运行)
pnpm dev

# 类型检查
pnpm type-check

# 生产构建 (包含类型检查)
pnpm build

# 仅构建 (不进行类型检查)
pnpm build-only

# 预览生产构建
pnpm preview

# 代码格式化
pnpm format
```

## 项目架构

### 核心技术栈
- **Vue 3.5+**: Composition API
- **TypeScript 5.9+**: 严格类型检查
- **Vite 7+**: 构建工具
- **Pinia 3+**: 状态管理
- **Vue Router 5+**: 路由管理
- **Tailwind CSS 4+**: 样式框架 (包含 typography 插件)

### 目录结构
```
src/
├── assets/styles/     # 全局样式 (Tailwind CSS 入口)
├── components/
│   ├── common/        # 通用组件 (如 ChapterCard)
│   └── layout/        # 布局组件 (如 AppHeader, AppFooter)
├── data/              # 静态数据配置 (章节内容)
├── router/            # 路由配置
├── stores/            # Pinia 状态管理
├── types/             # TypeScript 类型定义
└── views/             # 页面视图组件
```

### 路径别名
- `@` → `src/` (在 vite.config.ts 中配置)

### 关键架构模式

**1. 章节数据管理**
- 所有章节内容集中在 `src/data/chapters.ts`
- 使用 `Chapter` 和 `Section` 接口定义数据结构 (见 `src/types/chapter.ts`)
- 每个章节包含: id, number, title, subtitle, description, icon, color, sections, route

**2. 路由管理**
- 路由配置在 `src/router/index.ts`
- 使用 `beforeEach` 守卫自动更新页面标题 (基于 `meta.title`)
- 实现了 scrollBehavior 以保持滚动位置或重置到顶部
- 章节路由需要手动添加到路由配置中

**3. 状态管理**
- 使用 Pinia 进行状态管理
- Store 文件位于 `src/stores/`
- 当前有 counter.ts 示例 store

**4. 样式系统**
- Tailwind CSS 4.x (最新版本)
- 主入口: `src/assets/styles/main.css`
- 使用 `@tailwindcss/typography` 插件用于内容排版
- PostCSS 配置在 `postcss.config.js`

## 开发注意事项

### TypeScript 配置
- 项目使用严格的 TypeScript 配置
- `.vue` 文件的类型支持通过 `vue-tsc` 实现
- 三个 tsconfig 文件:
  - `tsconfig.json`: 基础配置
  - `tsconfig.app.json`: 应用代码配置
  - `tsconfig.node.json`: Node.js 环境配置 (Vite 配置文件)

### 添加新章节的流程
1. 在 `src/data/chapters.ts` 中添加章节数据
2. 在 `src/router/index.ts` 中添加对应路由
3. 在 `src/views/` 中创建对应的视图组件
4. 确保路由的 `meta.title` 与章节标题一致

### 组件开发规范
- 布局相关组件放在 `components/layout/`
- 可复用的通用组件放在 `components/common/`
- 页面级组件放在 `views/`
- 使用 TypeScript 定义 props 和 emits 类型

### Node.js 版本要求
- 需要 Node.js ^20.19.0 或 >=22.12.0

## IDE 推荐配置

- **VS Code** + **Vue (Official)** 扩展 (禁用 Vetur)
- 启用 Vue.js DevTools 浏览器扩展
- 在 Chrome/Firefox DevTools 中启用 Custom Object Formatter
