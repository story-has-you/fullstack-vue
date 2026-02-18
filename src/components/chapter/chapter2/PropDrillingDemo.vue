<script setup lang="ts">
import { ref, provide, inject, type Ref } from 'vue'

/**
 * Prop Drilling 问题演示组件
 * 左右对比展示 Prop Drilling 的问题和 Provide/Inject 的解决方案
 */

// 共享的用户数据
const userName = ref('张三')
const userRole = ref('管理员')

// Provide/Inject 示例
provide('userName', userName)
provide('userRole', userRole)

const updateUserName = (newName: string) => {
  userName.value = newName
}

// Prop Drilling 组件层级
// Level 1 (祖父组件)
const PropDrillingGrandparent = {
  name: 'PropDrillingGrandparent',
  props: {
    userName: String,
    userRole: String
  },
  template: `
    <div class="rounded-lg border-2 border-rose-300 bg-rose-50 p-3">
      <p class="text-xs font-semibold text-rose-900">Level 1: 祖父组件</p>
      <p class="mt-1 text-xs text-rose-700">我不需要用户数据，但必须接收并传递...</p>
      <PropDrillingParent :userName="userName" :userRole="userRole" />
    </div>
  `
}

// Level 2 (父组件)
const PropDrillingParent = {
  name: 'PropDrillingParent',
  props: {
    userName: String,
    userRole: String
  },
  template: `
    <div class="mt-2 rounded-lg border-2 border-orange-300 bg-orange-50 p-3">
      <p class="text-xs font-semibold text-orange-900">Level 2: 父组件</p>
      <p class="mt-1 text-xs text-orange-700">我也不需要，但还是要传...</p>
      <PropDrillingChild :userName="userName" :userRole="userRole" />
    </div>
  `
}

// Level 3 (子组件)
const PropDrillingChild = {
  name: 'PropDrillingChild',
  props: {
    userName: String,
    userRole: String
  },
  template: `
    <div class="mt-2 rounded-lg border-2 border-amber-300 bg-amber-50 p-3">
      <p class="text-xs font-semibold text-amber-900">Level 3: 子组件</p>
      <p class="mt-1 text-xs text-amber-700">我终于可以用了！</p>
      <div class="mt-2 rounded bg-white p-2 text-xs">
        <p class="font-semibold text-slate-900">{{ userName }}</p>
        <p class="text-slate-600">角色：{{ userRole }}</p>
      </div>
    </div>
  `
}

// Provide/Inject 组件层级
// Level 1 (祖父组件) - 提供数据
const ProvideGrandparent = {
  name: 'ProvideGrandparent',
  template: `
    <div class="rounded-lg border-2 border-emerald-300 bg-emerald-50 p-3">
      <p class="text-xs font-semibold text-emerald-900">Level 1: 祖父组件</p>
      <p class="mt-1 text-xs text-emerald-700">我用 provide 提供数据，不需要传 props</p>
      <ProvideParent />
    </div>
  `
}

// 代码示例
const propDrillingCodeExample = `<!-- 祖父组件 -->
<Parent :user="user" :role="role" />

<!-- 父组件（不需要但必须传） -->
<Child :user="user" :role="role" />

<!-- 子组件 -->
<div>{{ user }}</div>`

const provideInjectCodeExample = `<!-- 祖父组件 -->
provide('user', user)

<!-- 父组件（什么都不用做） -->
<Child />

<!-- 子组件 -->
const user = inject('user')`

// Level 2 (父组件) - 不需要接收数据
const ProvideParent = {
  name: 'ProvideParent',
  template: `
    <div class="mt-2 rounded-lg border-2 border-teal-300 bg-teal-50 p-3">
      <p class="text-xs font-semibold text-teal-900">Level 2: 父组件</p>
      <p class="mt-1 text-xs text-teal-700">我不需要这些数据，所以不用管</p>
      <ProvideChild />
    </div>
  `
}

// Level 3 (子组件) - 直接注入数据
const ProvideChild = {
  name: 'ProvideChild',
  setup() {
    const injectedUserName = inject<Ref<string>>('userName')
    const injectedUserRole = inject<Ref<string>>('userRole')
    return { injectedUserName, injectedUserRole }
  },
  template: `
    <div class="mt-2 rounded-lg border-2 border-cyan-300 bg-cyan-50 p-3">
      <p class="text-xs font-semibold text-cyan-900">Level 3: 子组件</p>
      <p class="mt-1 text-xs text-cyan-700">我用 inject 直接获取数据</p>
      <div class="mt-2 rounded bg-white p-2 text-xs">
        <p class="font-semibold text-slate-900">{{ injectedUserName }}</p>
        <p class="text-slate-600">角色：{{ injectedUserRole }}</p>
      </div>
    </div>
  `
}
</script>

<template>
  <section class="mt-6 rounded-2xl border border-fuchsia-100 bg-fuchsia-50/60 p-6">
    <div class="mb-4">
      <h3 class="text-lg font-semibold text-fuchsia-900">交互演示：Prop Drilling 问题对比</h3>
      <p class="mt-1 text-sm text-fuchsia-900/80">左边是问题，右边是解决方案</p>
    </div>

    <!-- 用户数据控制 -->
    <div class="mb-4 rounded-xl border border-white/70 bg-white p-4">
      <p class="text-sm font-semibold text-slate-900">修改用户数据（两边都会同步更新）</p>
      <div class="mt-2 flex gap-2">
        <input v-model="userName" type="text" placeholder="用户名" class="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm transition focus:border-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20" />
        <input v-model="userRole" type="text" placeholder="角色" class="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm transition focus:border-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20" />
      </div>
    </div>

    <!-- 左右对比 -->
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <!-- 左侧：Prop Drilling 问题 -->
      <div class="rounded-xl border border-white/70 bg-white p-4">
        <div class="mb-3 flex items-center gap-2">
          <span class="text-xl">❌</span>
          <div>
            <h4 class="text-sm font-semibold text-slate-900">Prop Drilling（层层传递）</h4>
            <p class="text-xs text-slate-600">中间组件被迫传递不需要的 props</p>
          </div>
        </div>

        <PropDrillingGrandparent :userName="userName" :userRole="userRole" />

        <div class="mt-3 rounded-lg border border-rose-200 bg-rose-50 p-3">
          <p class="text-xs font-semibold text-rose-900">问题：</p>
          <ul class="mt-1 space-y-1 text-xs text-rose-800">
            <li class="flex items-start gap-1">
              <span>•</span>
              <span>中间组件充满不需要的 props</span>
            </li>
            <li class="flex items-start gap-1">
              <span>•</span>
              <span>添加新属性要修改多个组件</span>
            </li>
            <li class="flex items-start gap-1">
              <span>•</span>
              <span>代码耦合严重，难以维护</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- 右侧：Provide/Inject 解决方案 -->
      <div class="rounded-xl border border-white/70 bg-white p-4">
        <div class="mb-3 flex items-center gap-2">
          <span class="text-xl">✅</span>
          <div>
            <h4 class="text-sm font-semibold text-slate-900">Provide / Inject（依赖注入）</h4>
            <p class="text-xs text-slate-600">中间组件不需要关心数据传递</p>
          </div>
        </div>

        <ProvideGrandparent />

        <div class="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
          <p class="text-xs font-semibold text-emerald-900">优势：</p>
          <ul class="mt-1 space-y-1 text-xs text-emerald-800">
            <li class="flex items-start gap-1">
              <span>•</span>
              <span>中间组件不需要传递 props</span>
            </li>
            <li class="flex items-start gap-1">
              <span>•</span>
              <span>只有需要的组件才注入数据</span>
            </li>
            <li class="flex items-start gap-1">
              <span>•</span>
              <span>代码简洁，易于维护</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 代码对比 -->
    <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
      <!-- Prop Drilling 代码 -->
      <div class="rounded-xl border border-white/70 bg-white p-4">
        <p class="text-xs font-semibold text-slate-900">Prop Drilling 代码</p>
        <pre class="mt-2 overflow-x-auto rounded bg-slate-50 p-3 text-xs text-slate-700"><code>{{ propDrillingCodeExample }}</code></pre>
      </div>

      <!-- Provide/Inject 代码 -->
      <div class="rounded-xl border border-white/70 bg-white p-4">
        <p class="text-xs font-semibold text-slate-900">Provide/Inject 代码</p>
        <pre class="mt-2 overflow-x-auto rounded bg-slate-50 p-3 text-xs text-slate-700"><code>{{ provideInjectCodeExample }}</code></pre>
      </div>
    </div>

    <div class="mt-4 rounded-xl border border-fuchsia-200 bg-white p-4">
      <h4 class="text-sm font-semibold text-fuchsia-900">💡 什么时候用 Provide/Inject</h4>
      <p class="mt-2 text-xs leading-relaxed text-slate-700">
        当你发现需要把数据从爷爷组件传到孙子组件，中间要经过 3 层以上不需要这些数据的组件时，就应该考虑使用 Provide/Inject。典型场景：用户信息、主题设置、语言配置等上下文数据。
      </p>
    </div>
  </section>
</template>
