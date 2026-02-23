import type { ProjectCase, ResponsibilityBoundary } from '@/types/chapter'

export interface Chapter3CodeSample {
  id: string
  title: string
  language: 'javascript' | 'typescript' | 'vue'
  code: string
  tone: 'legacy' | 'modern' | 'neutral'
}

export interface Chapter3ConceptSection {
  id: '3.1' | '3.2' | '3.3' | '3.4'
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
  formulaRelation: string
  responsibilityBoundary: ResponsibilityBoundary
  projectCases: ProjectCase[]
  conceptSections: Chapter3ConceptSection[]
}

export const chapter3Content: Chapter3Content = {
  pageTitle: '第二章：f() - 响应式绑定机制',
  pageSubtitle: 'Reactive Binding Mechanism',
  chapterSummary:
    '本章讲 UI = f(States) 里的 f()：状态变了，界面为什么会自动更新。会用通俗方式讲清 Proxy、依赖收集、调度、v-model 和副作用管理。',
  formulaRelation:
    '可以把 f() 理解成“把状态翻译成界面”的函数。状态变化后，Proxy 先感知变更，依赖收集找到受影响组件，调度器合并更新任务，再重算并更新 UI。',
  responsibilityBoundary: {
    frontend: ['实现状态到 UI 的映射函数', '保持单向数据流和副作用隔离', '处理渲染调度与组件生命周期'],
    backend: ['保持 API 语义稳定，减少前端映射分支', '提供可预测字段和值域', '明确幂等接口与事务边界'],
    contract: ['字段命名与类型一致', '错误模型统一', '时间字段与时区语义明确']
  },
  projectCases: [
    {
      id: 'reactive-pipeline',
      title: '案例：复制按钮更新链路',
      scenario: '点击复制后按钮文案从“复制代码”切换为“已复制”。',
      frontendActions: ['修改 copied 状态', '调度组件重渲染', '定时恢复状态并清理副作用'],
      backendActions: ['无直接参与，保持纯前端交互', '如接埋点则提供轻量上报接口'],
      boundaryNotes: ['UI 反馈链路在前端闭环', '业务审计与追踪可由后端接收事件']
    },
    {
      id: 'props-emits-boundary',
      title: '案例：Props 下行 / Emits 上行',
      scenario: '子组件不直接改父状态，只通过事件上抛命令。',
      frontendActions: ['props 只读', 'emit 事件触发父组件写状态'],
      backendActions: ['命令接口执行业务校验与持久化'],
      boundaryNotes: ['前端负责交互流', '后端负责最终业务真相']
    }
  ],
  conceptSections: [
    {
      id: '3.1',
      title: '响应式系统原理',
      subtitle: 'Proxy 劫持、依赖收集与触发更新调度',
      what: [
        'Proxy 会拦截数据的读取和写入。',
        '读取时做依赖收集（track），记录“谁用过这份数据”。',
        '写入时触发更新（trigger），并交给调度器批量执行。'
      ],
      why: [
        '不用手写订阅和取消订阅，代码更省心。',
        '只有依赖了该数据的组件才会更新，范围更准。',
        '调度会合并同一轮更新，避免重复渲染。'
      ],
      how: [
        '用 `ref` / `reactive` 定义响应式状态。',
        '在 `computed` 或模板里读取状态时，框架会自动依赖收集。',
        '多次修改会进入调度队列，统一在下一轮更新。'
      ],
      backendComparisons: [
        'Proxy 拦截很像 AOP：不改原代码也能加行为。',
        '调度器像消息队列批处理：先合并，再统一消费。'
      ],
      codeSamples: [
        {
          id: '3.1-proxy-basic',
          title: 'Proxy 劫持基础：get/set 拦截',
          language: 'typescript',
          tone: 'modern',
          code: `// 简化版响应式实现
let activeEffect: (() => void) | null = null

function reactive<T extends object>(target: T): T {
  return new Proxy(target, {
    get(obj, key) {
      // 依赖收集：记录当前 effect 依赖这个属性
      if (activeEffect) {
        track(obj, key)
      }
      return Reflect.get(obj, key)
    },
    set(obj, key, value) {
      const result = Reflect.set(obj, key, value)
      // 触发更新：通知所有依赖这个属性的 effect
      trigger(obj, key)
      return result
    }
  })
}

const state = reactive({ count: 0 })

// 访问 count 时会触发 get，记录依赖
console.log(state.count)
// 修改 count 时会触发 set，执行更新
state.count++ `
        },
        {
          id: '3.1-vue-reactive',
          title: 'Vue 3 响应式 API 使用',
          language: 'vue',
          tone: 'modern',
          code: `<script setup lang="ts">
import { reactive, ref, computed, watch } from 'vue'

// ref: 包装基本类型
const count = ref(0)

// reactive: 包装对象
const state = reactive({
  message: 'Hello',
  items: [1, 2, 3]
})

// computed: 计算属性，自动追踪依赖
const doubleCount = computed(() => count.value * 2)

// watch: 监听数据变化
watch(count, (newValue, oldValue) => {
  console.log(\`count changed from \${oldValue} to \${newValue}\`)
})

// 修改数据会自动触发 UI 更新
const increment = () => {
  count.value++ // 触发 set → trigger → 调度更新 → 重渲染
}
</script>

<template>
  <p>Count: {{ count }}</p>
  <p>Double: {{ doubleCount }}</p>
  <button @click="increment">+1</button>
</template>`
        }
      ]
    },
    {
      id: '3.2',
      title: 'MVVM 架构与双向绑定',
      subtitle: '用绑定器解耦视图与业务状态',
      what: [
        'MVVM 把页面分成 Model、View、ViewModel 三层。',
        'ViewModel 负责把状态和界面连接起来。',
        '输入变化可通过 v-model 回写状态，再触发界面同步。'
      ],
      why: [
        '能减少手写 DOM 事件绑定等胶水代码。',
        '模板结构调整时，业务逻辑通常不用跟着大改。',
        '状态更新路径更统一，排查问题更直接。'
      ],
      how: [
        '给表单状态定义明确的 TypeScript 类型。',
        '用 `computed` 的 get/set 封装输入规则。',
        '通过 `v-model` 绑定输入，保持状态和视图同步。'
      ],
      backendComparisons: [
        'Spring MVC 通常是一次请求一次渲染，MVVM 是状态持续变化、视图持续同步。',
        'ViewModel 可类比带校验规则的 DTO 适配层。'
      ],
      codeSamples: [
        {
          id: '3.2-mvvm-vue',
          title: 'Vue 示例：响应式状态与 v-model',
          language: 'vue',
          tone: 'modern',
          code: `<script setup lang="ts">
import { computed, ref } from 'vue'

// Model: 领域数据
const model = ref({
  message: ''
})

// ViewModel: 暴露给 View 的绑定层
const viewModel = computed({
  get: () => model.value.message,
  set: (value: string) => {
    model.value.message = value.trim()
  }
})
</script>

<template>
  <!-- View: 输入与展示 -->
  <section>
    <label>View: Input</label>
    <input v-model="viewModel" placeholder="Edit me" />
    <p>ViewModel: {{ viewModel }}</p>
    <pre>Model: {{ model }}</pre>
  </section>
</template>`
        }
      ]
    },
    {
      id: '3.3',
      title: '纯函数组件与单向数据流',
      subtitle: '同样输入得到同样输出，Props 下行 Emits 上行',
      what: [
        '组件可以理解为：输入 props，输出界面。',
        '单向数据流是“数据向下走，事件向上抛”。',
        '子组件只读 props，不直接改父状态。'
      ],
      why: [
        '输入和输出关系清楚，测试更容易写。',
        '状态来源单一，出问题时更容易定位。',
        '可以减少隐式副作用带来的不确定行为。'
      ],
      how: [
        '子组件中把 props 当只读数据使用。',
        '写操作通过 `emit` 通知父组件处理。',
        '派生显示值优先放在 `computed`。'
      ],
      backendComparisons: [
        '像无状态 Service：输入相同，请求结果稳定。',
        '可类比 CQRS：props 像 Query，emit 像 Command。'
      ],
      codeSamples: [
        {
          id: '3.3-unidirectional-flow',
          title: '单向数据流：Props 下行，Emits 上行',
          language: 'vue',
          tone: 'modern',
          code: `<!-- 父组件：持有状态并处理命令 -->
<script setup lang="ts">
import { ref } from 'vue'
import CounterChild from './CounterChild.vue'

const count = ref(0)
const handleIncrement = () => {
  count.value += 1
}
</script>

<template>
  <CounterChild :count="count" @increment="handleIncrement" />
</template>

<!-- 子组件：只读 props + emit 事件 -->
<script setup lang="ts">
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
      id: '3.4',
      title: '副作用管理与生命周期',
      subtitle: '把副作用放到正确生命周期，避免重渲染污染',
      what: [
        '副作用是渲染外的操作，比如请求、订阅、定时器。',
        '生命周期钩子决定副作用该在何时开始和结束。',
        '一个完整副作用要有“创建、更新、清理”三个阶段。'
      ],
      why: [
        '避免在渲染过程中反复执行副作用造成性能问题。',
        '及时清理监听和定时器，防止内存泄漏。',
        '副作用时机固定后，行为更可预测。'
      ],
      how: [
        '初始化放在 `onMounted`。',
        '依赖变化的处理放在 `watch`。',
        '释放资源放在 `onUnmounted`。'
      ],
      backendComparisons: [
        '可类比 Spring 的 `@PostConstruct` 与 `@PreDestroy`。',
        '像连接池借还：拿到资源后必须归还。'
      ],
      codeSamples: [
        {
          id: '3.4-lifecycle',
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
