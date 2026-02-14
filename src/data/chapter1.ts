export interface Chapter1CodeSample {
  id: string
  title: string
  language: 'javascript' | 'xml' | 'typescript' | 'vue'
  code: string
  tone: 'legacy' | 'modern' | 'neutral'
}

export interface Chapter1ConceptSection {
  id: '1.1' | '1.2'
  title: string
  subtitle: string
  what: string[]
  why: string[]
  how: string[]
  backendComparisons: string[]
  codeSamples: Chapter1CodeSample[]
}

export interface Chapter1ExampleSection {
  id: '1.3' | '1.4'
  title: string
  scenario: string
  codeSample: Chapter1CodeSample
  runGuide: string
  antiPatterns: string[]
}

export interface Chapter1Content {
  pageTitle: string
  pageSubtitle: string
  chapterSummary: string
  conceptSections: Chapter1ConceptSection[]
  exampleSections: Chapter1ExampleSection[]
}

export const chapter1Content: Chapter1Content = {
  pageTitle: '第一章：范式转移',
  pageSubtitle: 'The Paradigm Shift',
  chapterSummary:
    '本章聚焦后端到前端的首个认知跃迁：从“手动操作 DOM 的脚本思维”，转向“状态驱动渲染的架构思维”，并通过最小示例理解声明式 UI 与 MVVM 双向绑定。',
  conceptSections: [
    {
      id: '1.1',
      title: '声明式 UI (Declarative UI)',
      subtitle: '描述目标状态，而非编排 UI 变更步骤',
      what: [
        '声明式编程关注“界面在当前状态下应该是什么样”，而不是“如何一步步把界面改成目标样子”。',
        '开发者只维护状态，框架负责将状态映射到 DOM。'
      ],
      why: [
        '可预测性与幂等性：同一 State 总能渲染出同一 UI。',
        '复杂交互时，复杂度被限制在数据层，不再扩散到 DOM 操作细节。',
        '底层渲染优化（批量更新、调度）可由框架演进，不影响业务代码。'
      ],
      how: [
        '把“加载态、权限态、空态”表达为状态分支，而不是 DOM 增删改脚本。',
        '遵循“数据是唯一真相”，避免并行维护状态与 DOM。'
      ],
      backendComparisons: [
        'SQL 查询（声明式）：例如 SELECT * FROM users WHERE age > 18，你只声明目标结果，不写索引选择、扫描顺序和连接细节。',
        'K8s YAML（期望状态）：spec.replicas: 3 只描述目标副本数；Controller 持续 Reconcile，把 Current State 收敛到 Desired State。',
        'Vue 模板同构思维：<button :disabled="isLoading"> 只声明期望 UI 状态，框架在响应式更新时自动 patch DOM。',
        '在两者里都应避免“手工补丁”：后端避免手动改 etcd 状态，前端避免直接 querySelector 改节点。'
      ],
      codeSamples: [
        {
          id: '1.1-legacy',
          title: '指令式 (jQuery/原生 JS) - 脚本思维',
          language: 'javascript',
          tone: 'legacy',
          code: `const btn = document.getElementById('btn');
const spinner = document.getElementById('spinner');

// 必须手动管理所有状态的迁移路径
function updateUI(user, isLoading) {
  if (isLoading) {
    spinner.style.display = 'block';
    btn.style.display = 'none';
  } else {
    spinner.style.display = 'none';
    if (user.isAdmin) {
      btn.style.display = 'block';
      btn.innerText = 'Delete User';
      btn.onclick = function() { /* ... */ };
    } else {
      btn.style.display = 'none';
    }
  }
}`
        },
        {
          id: '1.1-modern',
          title: '声明式 (Vue) - 架构思维',
          language: 'vue',
          tone: 'modern',
          code: `<script setup>
defineProps(['user', 'isLoading'])
</script>

<template>
  <Spinner v-if="isLoading" />
  <button v-else-if="user.isAdmin" @click="handleDelete">
    Delete User
  </button>
</template>`
        }
      ]
    },
    {
      id: '1.2',
      title: 'MVVM 架构与双向绑定',
      subtitle: '用绑定器解耦视图与业务状态',
      what: [
        'MVVM 将 UI 分为 Model、View、ViewModel 三层。',
        'ViewModel 作为中间层，把业务状态变化自动同步给 View。'
      ],
      why: [
        '减少 document.querySelector 与 addEventListener 等胶水代码。',
        'HTML 结构调整时，只要绑定语义不变，业务逻辑可保持稳定。',
        '观察者式同步机制让 UI 状态更新更一致。'
      ],
      how: [
        'Vue 3 使用 Proxy 劫持数据读写，实现响应式追踪。',
        '通过 v-model 建立输入控件与响应式状态的双向同步。',
        '在 TypeScript 下为表单状态建模，避免 any 带来的失控。'
      ],
      backendComparisons: [
        'Spring MVC 常见流程是 Request -> Controller -> Model -> View，一次请求完成一次渲染；MVVM 则是状态持续变化、视图持续同步。',
        '可把 ViewModel 理解为“可观察的领域对象”：类似 Java Bean + PropertyChangeListener，属性变更会通知订阅者刷新 UI。',
        'Observer / Pub-Sub 映射：Model 变更触发事件，View 订阅并重渲染；对应消息队列里 producer 发布、consumer 消费。',
        '双向绑定补充：输入框修改会反向更新 Model，再由响应式系统正向刷新其余依赖视图，形成受控闭环。',
        '工程约束对应后端 DTO 校验：前端表单状态需强类型（如 nickname/email），等价于后端避免 Map<String, Object> 泛型失控。'
      ],
      codeSamples: [
        {
          id: '1.2-mvvm-vue',
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
    }
  ],
  exampleSections: [
    {
      id: '1.3',
      title: '最小示例 1：声明式 UI + 单向命令事件',
      scenario: '后端同学常见写法是手动操作 DOM。状态一多，UI 与数据容易分裂。',
      codeSample: {
        id: '1.3-example',
        title: 'DeclarativePermissionButton.vue',
        language: 'vue',
        tone: 'neutral',
        code: `<script setup lang="ts">
import { computed } from 'vue'

interface UserDTO {
  id: number
  name: string
  role: 'ADMIN' | 'USER'
}

const props = defineProps<{
  user: UserDTO
  isLoading: boolean
}>()

const emit = defineEmits<{
  (e: 'delete-user', userId: number): void
}>()

const canDelete = computed(() => !props.isLoading && props.user.role === 'ADMIN')
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <button v-else-if="canDelete" @click="emit('delete-user', user.id)">
    Delete User
  </button>
  <span v-else>No Permission</span>
</template>`
      },
      runGuide:
        '将组件挂到任意页面并传入 user、isLoading，监听 delete-user 事件即可验证声明式状态分支与单向命令上抛。',
      antiPatterns: [
        '在 template 中直接调用副作用函数。',
        '在组件内部使用 querySelector 手动修改 DOM。'
      ]
    },
    {
      id: '1.4',
      title: '最小示例 2：MVVM 表单双向绑定',
      scenario: '输入框变化需要实时同步到状态，同时保留类型约束。',
      codeSample: {
        id: '1.4-example',
        title: 'MvvmForm.vue',
        language: 'vue',
        tone: 'neutral',
        code: `<script setup lang="ts">
import { ref, watch } from 'vue'

interface ProfileForm {
  nickname: string
  email: string
}

const form = ref<ProfileForm>({
  nickname: '',
  email: ''
})

watch(form, (value) => {
  console.log('sync draft', value)
}, { deep: true })
</script>

<template>
  <input v-model.trim="form.nickname" placeholder="nickname" />
  <input v-model.trim="form.email" placeholder="email" />
  <pre>{{ form }}</pre>
</template>`
      },
      runGuide: '将组件接入路由页面，输入内容即可观察 View 与 Model 的双向同步。',
      antiPatterns: [
        'v-model 绑定到未初始化字段。',
        '使用 any 放弃表单结构约束。',
        '直接替换深层对象导致响应式链路不稳定。'
      ]
    }
  ]
}
