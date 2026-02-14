import type { Component } from 'vue'
import {
  BarChart3,
  BookOpen,
  Compass,
  GraduationCap,
  Layers,
  Monitor,
  Puzzle,
  Repeat,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Wrench,
  Zap
} from 'lucide-vue-next'

export type ChapterIconKey =
  | 'target'
  | 'repeat'
  | 'zap'
  | 'puzzle'
  | 'chart'
  | 'monitor'
  | 'wrench'
  | 'shield'
  | 'graduation'

export const chapterIconMap: Record<ChapterIconKey, Component> = {
  target: Target,
  repeat: Repeat,
  zap: Zap,
  puzzle: Puzzle,
  chart: BarChart3,
  monitor: Monitor,
  wrench: Wrench,
  shield: ShieldCheck,
  graduation: GraduationCap
}

export type HomeIconKey =
  | 'logo'
  | 'hero'
  | 'intro'
  | 'core'
  | 'epilogue'
  | 'basicPath'
  | 'advancedPath'
  | 'architecturePath'
  | 'highlight'

export const homeIconMap: Record<HomeIconKey, Component> = {
  logo: Rocket,
  hero: Sparkles,
  intro: Compass,
  core: Layers,
  epilogue: GraduationCap,
  basicPath: BookOpen,
  advancedPath: Wrench,
  architecturePath: Target,
  highlight: Sparkles
}
