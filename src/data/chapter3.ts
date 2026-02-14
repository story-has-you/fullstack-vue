export interface Chapter3CodeSample {
  id: string
  title: string
  language: 'javascript' | 'typescript' | 'vue'
  code: string
  tone: 'legacy' | 'modern' | 'neutral'
}

export interface Chapter3ConceptSection {
  id: '3.1' | '3.2' | '3.3'
  title: string
  subtitle: string
  what: string[]
  why: string[]
  how: string[]
  backendComparisons: string[]
  codeSamples: Chapter3CodeSample[]
}

export interface Chapter3Content {
  pageTitle: string
  pageSubtitle: string
  chapterSummary: string
  conceptSections: Chapter3ConceptSection[]
}

export const chapter3Content: Chapter3Content = {
  pageTitle: '第三章：组件化架构',
  pageSubtitle: 'Component Architecture',
  chapterSummary:
    '本章聚焦可维护组件系统的三条主线：纯函数组件确保幂等、单向数据流保证可追溯、副作用生命周期管理避免隐性状态污染。',
  conceptSections: [
    {
      id: '3.1',
      title: '纯函数组件 (Pure Components) 与幂等性',
      subtitle: '同样输入得到同样输出，组件行为可预测、可测试',
      what: [
        '在概念上，组件可被理解为输入 Props、输出 UI 的函数。',
        '当组件只依赖输入且不改写外部状态时，就具备纯函数特征。',
        '幂等渲染要求同样输入下输出结果稳定，不受历史调用影响。'
      ],
      why: [
        '可测试性更强：只需要构造输入并断言输出。',
        '更容易定位问题：同一输入得到不同输出就意味着存在隐式副作用。',
        '响应式系统更容易优化：依赖不变时可跳过不必要更新。'
      ],
      how: [
        '只读使用 Props，禁止在子组件中直接修改 Props 或全局变量。',
        '将派生值放入 computed，避免渲染阶段夹杂副作用逻辑。',
        '把 I/O、订阅、定时器等副作用迁移到生命周期钩子。'
      ],
      backendComparisons: [
        '类似 Spring 无状态 Service：实例长期复用但不持有请求态数据。',
        '类似 Java 工具方法：输入参数决定输出，方法外部状态不被篡改。',
        '类似幂等接口设计：重复调用不应让系统状态漂移。'
      ],
      codeSamples: [
        {
          id: '3.1-legacy',
          title: '反例：组件内部依赖可变全局状态',
          language: 'javascript',
          tone: 'legacy',
          code: `const cache = { role: 'USER' }

export function renderBadge(name) {
  // 每次调用都在悄悄改写外部状态
  cache.role = cache.role === 'USER' ? 'ADMIN' : 'USER'

  return \`<span>\${name} - \${cache.role}</span>\`
}`
        },
        {
          id: '3.1-modern',
          title: '正例：Props + Computed 保持纯净渲染',
          language: 'vue',
          tone: 'modern',
          code: `<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  name: string
  role: 'ADMIN' | 'USER'
}>()

const displayRole = computed(() => props.role.toUpperCase())
</script>

<template>
  <div class="badge">
    <span>{{ props.name }}</span>
    <span>{{ displayRole }}</span>
  </div>
</template>`
        }
      ]
    },
    {
      id: '3.2',
      title: '单向数据流 (Unidirectional Data Flow)',
      subtitle: 'Props 下行，Emits 上行，状态只在拥有者处修改',
      what: [
        '父组件通过 Props 向下分发数据，子组件只消费数据。',
        '子组件通过 Emit 抛出事件请求变更，父组件决定是否更新状态。',
        '兄弟组件共享状态时，需将状态提升到最近公共父组件。'
      ],
      why: [
        '数据血缘清晰，状态来源可追溯，调试路径更短。',
        '避免双向隐式修改带来的“谁改了值”定位困难。',
        '组件职责更清晰：展示组件不负责业务写操作。'
      ],
      how: [
        '在子组件中定义精确 emit 事件签名，避免宽泛事件语义。',
        '父组件集中处理状态变更和校验规则。',
        '共享状态优先状态提升，其次再考虑 store。'
      ],
      backendComparisons: [
        '对应 CQRS：Props 更像 Query，Emits 更像 Command。',
        '类似 Java 方法值传递：子方法不能直接改调用者变量。',
        '类似分层架构：控制层收命令，服务层决定状态迁移。'
      ],
      codeSamples: [
        {
          id: '3.2-parent',
          title: '父组件：持有状态并处理命令',
          language: 'vue',
          tone: 'modern',
          code: `<script setup lang="ts">
import { ref } from 'vue'
import CounterChild from './CounterChild.vue'

const count = ref(0)
const handleIncrement = () => {
  count.value += 1
}
</script>

<template>
  <CounterChild :count="count" @increment="handleIncrement" />
</template>`
        },
        {
          id: '3.2-child',
          title: '子组件：只读 props + emit 事件',
          language: 'vue',
          tone: 'neutral',
          code: `<script setup lang="ts">
const props = defineProps<{ count: number }>()
const emit = defineEmits<{ (e: 'increment'): void }>()
</script>

<template>
  <p>Value: {{ props.count }}</p>
  <button @click="emit('increment')">+1</button>
</template>`
        }
      ]
    },
    {
      id: '3.3',
      title: '副作用管理 (Side Effects) 与生命周期',
      subtitle: '把副作用放到正确生命周期，避免重渲染污染',
      what: [
        '副作用是渲染之外的操作，例如请求、订阅、定时器、DOM API。',
        'Vue 通过 onMounted、watch、onUnmounted 管理副作用时机。',
        '副作用必须可建立、可更新、可清理，形成完整闭环。'
      ],
      why: [
        '避免在渲染路径中反复执行副作用导致性能和逻辑问题。',
        '防止组件销毁后仍持有定时器或监听器造成内存泄漏。',
        '让组件行为与生命周期阶段严格对齐，降低隐式耦合。'
      ],
      how: [
        '初始化逻辑放在 onMounted 中。',
        '依赖变化引发的副作用放在 watch 中并处理竞态。',
        '释放资源统一放在 onUnmounted 中执行。'
      ],
      backendComparisons: [
        '等价于 Spring 的 @PostConstruct 和 @PreDestroy。',
        '类似 AOP 在业务前后织入日志、事务、审计等横切逻辑。',
        '类似连接池借还语义：获取资源后必须归还。'
      ],
      codeSamples: [
        {
          id: '3.3-lifecycle',
          title: '生命周期中的副作用闭环',
          language: 'vue',
          tone: 'modern',
          code: `<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'

const props = defineProps<{ userId: string }>()

const connect = (id: string) => {
  console.log('connect', id)
}

const disconnect = () => {
  console.log('disconnect')
}

onMounted(() => {
  connect(props.userId)
})

watch(
  () => props.userId,
  (newId) => {
    connect(newId)
  }
)

onUnmounted(() => {
  disconnect()
})
</script>`
        }
      ]
    }
  ]
}
