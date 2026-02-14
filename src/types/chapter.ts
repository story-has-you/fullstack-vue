import type { ChapterIconKey } from '@/constants/icon-map'

/**
 * 章节小节接口
 */
export interface Section {
  id: string
  title: string
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
