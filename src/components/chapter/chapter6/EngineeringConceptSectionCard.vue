<script setup lang="ts">
import { computed } from 'vue'
import type {
  Chapter6ConceptSection,
  Chapter6IdeCard,
  Chapter6PackageManagerCard,
  Chapter6ProjectStructure
} from '@/data/chapter6'
import CodeSnippetPanel from '@/components/chapter/chapter6/CodeSnippetPanel.vue'

interface Props {
  section: Chapter6ConceptSection
  packageManagerCards: Chapter6PackageManagerCard[]
  ideCards: Chapter6IdeCard[]
  projectStructure: Chapter6ProjectStructure
}

interface ProjectTreeNode {
  name: string
  path: string
  type: 'dir' | 'file'
  description: string
  children: ProjectTreeNode[]
}

interface ProjectTreeLine {
  id: string
  rawTree: string
  description: string
  displayLine: string
  nodeType: 'dir' | 'file' | 'summary'
}

const props = defineProps<Props>()

const codeGridClass = computed(() =>
  props.section.codeSamples.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1'
)

const showCodeSamples = computed(() => props.section.codeSamples.length > 0)
const showPackageManagerCards = computed(() => props.section.id === '6.1')
const showIdeCards = computed(() => props.section.id === '6.2')
const showProjectStructure = computed(() => props.section.id === '6.5')

const packageManagerColorClassMap: Record<Chapter6PackageManagerCard['id'], string> = {
  npm: 'border-slate-200 bg-slate-50/80',
  yarn: 'border-cyan-100 bg-cyan-50/70',
  pnpm: 'border-emerald-100 bg-emerald-50/70'
}

const packageManagerTitleClassMap: Record<Chapter6PackageManagerCard['id'], string> = {
  npm: 'text-slate-900',
  yarn: 'text-cyan-900',
  pnpm: 'text-emerald-900'
}

const packageManagerDotClassMap: Record<Chapter6PackageManagerCard['id'], string> = {
  npm: 'bg-slate-500',
  yarn: 'bg-cyan-500',
  pnpm: 'bg-emerald-500'
}

const ideColorClassMap: Record<Chapter6IdeCard['id'], string> = {
  vscode: 'border-sky-100 bg-sky-50/70',
  webstorm: 'border-indigo-100 bg-indigo-50/70'
}

const ideTitleClassMap: Record<Chapter6IdeCard['id'], string> = {
  vscode: 'text-sky-900',
  webstorm: 'text-indigo-900'
}

const ideDotClassMap: Record<Chapter6IdeCard['id'], string> = {
  vscode: 'bg-sky-500',
  webstorm: 'bg-indigo-500'
}

const getPackageManagerColorClass = (id: Chapter6PackageManagerCard['id']) =>
  packageManagerColorClassMap[id]
const getPackageManagerTitleClass = (id: Chapter6PackageManagerCard['id']) =>
  packageManagerTitleClassMap[id]
const getPackageManagerDotClass = (id: Chapter6PackageManagerCard['id']) => packageManagerDotClassMap[id]

const getIdeColorClass = (id: Chapter6IdeCard['id']) => ideColorClassMap[id]
const getIdeTitleClass = (id: Chapter6IdeCard['id']) => ideTitleClassMap[id]
const getIdeDotClass = (id: Chapter6IdeCard['id']) => ideDotClassMap[id]

const normalizeSegments = (path: string): string[] => {
  if (path === '.') {
    return []
  }
  return path.split('/').filter(Boolean)
}

const sortTreeNodes = (nodes: ProjectTreeNode[]): void => {
  nodes.sort((a, b) => a.name.localeCompare(b.name))

  for (const node of nodes) {
    if (node.type === 'dir' && node.children.length > 0) {
      sortTreeNodes(node.children)
    }
  }
}

const formatTreeLine = (rawTree: string, description: string, commentColumn: number): string => {
  if (!description) {
    return rawTree
  }

  return `${rawTree.padEnd(commentColumn, ' ')}# ${description}`
}

const projectTreeLines = computed<ProjectTreeLine[]>(() => {
  const dirDescriptionMap = new Map(
    props.projectStructure.directories.map((item) => [item.path, item.description])
  )

  const root: ProjectTreeNode = {
    name: '.',
    path: '.',
    type: 'dir',
    description: dirDescriptionMap.get('.') ?? '项目根目录',
    children: []
  }

  const ensureDirectory = (segments: string[]): ProjectTreeNode => {
    let currentNode = root
    let currentPath = '.'

    for (const segment of segments) {
      currentPath = currentPath === '.' ? segment : `${currentPath}/${segment}`

      let nextNode = currentNode.children.find(
        (child) => child.type === 'dir' && child.name === segment
      )

      if (!nextNode) {
        nextNode = {
          name: segment,
          path: currentPath,
          type: 'dir',
          description: dirDescriptionMap.get(currentPath) ?? '',
          children: []
        }
        currentNode.children.push(nextNode)
      } else if (!nextNode.description && dirDescriptionMap.has(currentPath)) {
        nextNode.description = dirDescriptionMap.get(currentPath) ?? ''
      }

      currentNode = nextNode
    }

    return currentNode
  }

  const sortedDirectories = props.projectStructure.directories
    .filter((item) => item.path !== '.')
    .sort((a, b) => {
      const depthDiff = normalizeSegments(a.path).length - normalizeSegments(b.path).length
      if (depthDiff !== 0) {
        return depthDiff
      }
      return a.path.localeCompare(b.path)
    })

  for (const directory of sortedDirectories) {
    const node = ensureDirectory(normalizeSegments(directory.path))
    node.description = directory.description
  }

  const sortedFiles = [...props.projectStructure.files].sort((a, b) => a.path.localeCompare(b.path))

  for (const file of sortedFiles) {
    const segments = normalizeSegments(file.path)
    if (segments.length === 0) {
      continue
    }

    const fileName = segments[segments.length - 1]
    if (!fileName) {
      continue
    }
    const parentNode = ensureDirectory(segments.slice(0, -1))
    const filePath = file.path

    const existedFile = parentNode.children.find(
      (child) => child.type === 'file' && child.name === fileName
    )

    if (existedFile) {
      existedFile.description = file.description
      continue
    }

    parentNode.children.push({
      name: fileName,
      path: filePath,
      type: 'file',
      description: file.description,
      children: []
    })
  }

  sortTreeNodes(root.children)

  const lines: ProjectTreeLine[] = [
    {
      id: root.path,
      rawTree: root.name,
      description: root.description,
      displayLine: '',
      nodeType: 'dir'
    }
  ]
  let directoryCount = 0
  let fileCount = 0

  const walkTree = (nodes: ProjectTreeNode[], parentPrefixFlags: boolean[]): void => {
    nodes.forEach((node, index) => {
      const isLast = index === nodes.length - 1
      const prefix = parentPrefixFlags.map((hasNext) => (hasNext ? '|   ' : '    ')).join('')
      const connector = isLast ? '`-- ' : '|-- '
      const rawTree = `${prefix}${connector}${node.name}`

      lines.push({
        id: node.path,
        rawTree,
        description: node.description,
        displayLine: '',
        nodeType: node.type
      })

      if (node.type === 'dir') {
        directoryCount += 1
      } else {
        fileCount += 1
      }

      if (node.type === 'dir' && node.children.length > 0) {
        walkTree(node.children, [...parentPrefixFlags, !isLast])
      }
    })
  }

  walkTree(root.children, [])
  const summaryLine = `${directoryCount} directories, ${fileCount} files`
  lines.push({
    id: '__tree-summary__',
    rawTree: summaryLine,
    description: '',
    displayLine: '',
    nodeType: 'summary'
  })

  const commentColumn = lines.reduce((maxLength, line) => {
    if (!line.description) {
      return maxLength
    }
    return Math.max(maxLength, line.rawTree.length + 4)
  }, 56)

  return lines.map((line) => ({
    ...line,
    displayLine: formatTreeLine(line.rawTree, line.description, commentColumn)
  }))
})

const projectTreeOutput = computed(() => projectTreeLines.value.map((line) => line.displayLine).join('\n'))
</script>

<template>
  <article class="glass-panel rounded-3xl border border-sky-100 p-7 md:p-9">
    <header class="mb-6">
      <p class="text-sm font-semibold text-sky-700">{{ section.id }}</p>
      <h2 class="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">{{ section.title }}</h2>
      <p class="mt-2 text-sm text-slate-600 md:text-base">{{ section.subtitle }}</p>
    </header>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <section class="rounded-2xl border border-sky-100 bg-white/80 p-4">
        <h3 class="text-base font-semibold text-slate-900">是什么</h3>
        <ul class="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
          <li v-for="item in section.what" :key="item" class="flex items-start gap-2">
            <span class="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500" />
            <span>{{ item }}</span>
          </li>
        </ul>
      </section>

      <section class="rounded-2xl border border-sky-100 bg-white/80 p-4">
        <h3 class="text-base font-semibold text-slate-900">为什么</h3>
        <ul class="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
          <li v-for="item in section.why" :key="item" class="flex items-start gap-2">
            <span class="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-500" />
            <span>{{ item }}</span>
          </li>
        </ul>
      </section>
    </div>

    <section class="mt-4 rounded-2xl border border-sky-100 bg-white/80 p-4">
      <h3 class="text-base font-semibold text-slate-900">怎么做</h3>
      <ul class="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
        <li v-for="item in section.how" :key="item" class="flex items-start gap-2">
          <span class="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>{{ item }}</span>
        </li>
      </ul>
    </section>

    <section class="mt-4 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4">
      <h3 class="text-base font-semibold text-indigo-900">后端对比映射</h3>
      <ul class="mt-3 space-y-2 text-sm leading-relaxed text-indigo-900/85">
        <li v-for="item in section.backendComparisons" :key="item" class="flex items-start gap-2">
          <span class="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-500" />
          <span>{{ item }}</span>
        </li>
      </ul>
    </section>

    <section v-if="showPackageManagerCards" class="mt-4">
      <h3 class="mb-3 text-base font-semibold text-slate-900">包管理选型对比</h3>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article
          v-for="card in packageManagerCards"
          :key="card.id"
          class="rounded-2xl border p-4"
          :class="getPackageManagerColorClass(card.id)"
        >
          <h4 class="text-base font-semibold" :class="getPackageManagerTitleClass(card.id)">{{ card.title }}</h4>
          <p class="mt-1 text-xs font-medium text-slate-600">{{ card.subtitle }}</p>
          <p class="mt-3 text-xs leading-relaxed text-slate-600">{{ card.backendComparison }}</p>

          <div class="mt-3 border-t border-white/80 pt-3">
            <p class="text-xs font-semibold text-slate-500">优势</p>
            <ul class="mt-2 space-y-1 text-sm text-slate-700">
              <li v-for="item in card.strengths" :key="item" class="flex items-start gap-2">
                <span class="mt-2 h-1.5 w-1.5 rounded-full" :class="getPackageManagerDotClass(card.id)" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <div class="mt-3 border-t border-white/80 pt-3">
            <p class="text-xs font-semibold text-slate-500">注意点</p>
            <ul class="mt-2 space-y-1 text-sm text-slate-700">
              <li v-for="item in card.caveats" :key="item" class="flex items-start gap-2">
                <span class="mt-2 h-1.5 w-1.5 rounded-full" :class="getPackageManagerDotClass(card.id)" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </section>

    <section v-if="showIdeCards" class="mt-4">
      <h3 class="mb-3 text-base font-semibold text-slate-900">IDE 选型对比</h3>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <article
          v-for="card in ideCards"
          :key="card.id"
          class="rounded-2xl border p-4"
          :class="getIdeColorClass(card.id)"
        >
          <h4 class="text-base font-semibold" :class="getIdeTitleClass(card.id)">{{ card.title }}</h4>
          <p class="mt-1 text-xs font-medium text-slate-600">{{ card.positioning }}</p>
          <p class="mt-2 text-xs font-semibold text-slate-600">{{ card.recommendedFor }}</p>

          <div class="mt-3 border-t border-white/80 pt-3">
            <p class="text-xs font-semibold text-slate-500">优势</p>
            <ul class="mt-2 space-y-1 text-sm text-slate-700">
              <li v-for="item in card.strengths" :key="item" class="flex items-start gap-2">
                <span class="mt-2 h-1.5 w-1.5 rounded-full" :class="getIdeDotClass(card.id)" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <div class="mt-3 border-t border-white/80 pt-3">
            <p class="text-xs font-semibold text-slate-500">注意点</p>
            <ul class="mt-2 space-y-1 text-sm text-slate-700">
              <li v-for="item in card.caveats" :key="item" class="flex items-start gap-2">
                <span class="mt-2 h-1.5 w-1.5 rounded-full" :class="getIdeDotClass(card.id)" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </section>

    <section v-if="showProjectStructure" class="mt-4 rounded-2xl border border-sky-100 bg-white/80 p-4">
      <header class="flex flex-col gap-3 border-b border-sky-100 pb-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">06.5 Engineering Snapshot</p>
          <h3 class="mt-1 text-base font-semibold text-slate-900">项目目录与文件树</h3>
          <p class="mt-2 text-sm leading-relaxed text-slate-600">基于当前仓库快照的静态文件树，统一教学与协作语境。</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <span class="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
            Exclude: dist, node_modules
          </span>
          <span class="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
            Static snapshot
          </span>
        </div>
      </header>

      <div class="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
        <section class="rounded-xl border border-sky-100 bg-white p-4 lg:col-span-4">
          <h4 class="text-sm font-semibold text-slate-900">范围说明</h4>
          <p class="mt-3 rounded-lg border border-sky-100 bg-slate-50 px-3 py-2 text-sm leading-relaxed text-slate-700">
            {{ projectStructure.scopeNote }}
          </p>
          <ul class="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
            <li class="flex items-start gap-2">
              <span class="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500" />
              <span>
                <code class="rounded border border-sky-200 bg-sky-50 px-1 py-0.5 text-sky-700">#</code>
                后文本用于描述该路径职责。
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-500" />
              <span>目录树由数据清单驱动，避免环境差异导致的展示偏移。</span>
            </li>
          </ul>
        </section>

        <section class="rounded-xl border border-slate-200 bg-slate-50/70 p-4 lg:col-span-8">
          <h4 class="text-sm font-semibold text-slate-900">文件树（tree 风格）</h4>
          <pre
            tabindex="0"
            class="mt-2 overflow-x-auto rounded-lg border border-slate-200 bg-slate-900 p-3 font-mono text-xs leading-6 text-emerald-200 whitespace-pre focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
          >{{ projectTreeOutput }}</pre>
        </section>
      </div>
    </section>

    <section v-if="showCodeSamples" class="mt-6 grid grid-cols-1 gap-4" :class="codeGridClass">
      <CodeSnippetPanel
        v-for="sample in section.codeSamples"
        :key="sample.id"
        :title="sample.title"
        :language="sample.language"
        :code="sample.code"
        :tone="sample.tone"
      />
    </section>
  </article>
</template>
