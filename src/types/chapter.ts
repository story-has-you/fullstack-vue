import type { ChapterIconKey } from '@/constants/icon-map'

/**
 * 章节小节接口
 */
export interface Section {
  id: string
  title: string
}

/**
 * 公式聚焦点：说明本章在 UI = f(States) 中的位置
 */
export interface FormulaFocus {
  role: string
  keyQuestion: string
  takeaways: string[]
}

/**
 * 前后端职责边界
 */
export interface ResponsibilityBoundary {
  frontend: string[]
  backend: string[]
  contract: string[]
}

/**
 * 项目案例卡片
 */
export interface ProjectCase {
  id: string
  title: string
  scenario: string
  frontendActions: string[]
  backendActions: string[]
  boundaryNotes: string[]
}

/**
 * 章节接口
 */
export interface Chapter {
  id: string
  number: number
  title: string
  subtitle: string
  description: string
  icon: ChapterIconKey
  color: string
  sections: Section[]
  route: string
}
