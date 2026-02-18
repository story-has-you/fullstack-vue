<template>
  <section class="mt-4 rounded-2xl border border-purple-100 bg-purple-50/70 p-4">
    <h3 class="text-base font-semibold text-purple-900">响应式系统原理图解</h3>
    <p class="mt-2 text-sm leading-relaxed text-purple-900/80">
      Proxy 劫持 get/set 操作，在读取时收集依赖，在修改时触发更新。依赖收集建立 States 与组件的订阅关系，调度器批量处理更新避免重复渲染。
    </p>

    <!-- 桌面端布局 -->
    <div class="mt-4 hidden grid-cols-3 gap-4 md:grid">
      <!-- 第一步: Proxy 劫持 -->
      <article class="rounded-xl border border-purple-200 bg-white p-4">
        <div class="mb-2 flex items-center justify-between">
          <p class="text-xs font-semibold tracking-wide text-purple-700">1. Proxy 劫持</p>
          <span class="rounded-full bg-purple-100 px-2 py-0.5 text-xs text-purple-700">get/set</span>
        </div>
        <div class="rounded-lg bg-slate-50 p-2">
          <code class="text-xs text-slate-700">state.count</code>
        </div>
        <p class="mt-2 text-xs text-slate-600">
          访问属性时触发 get 拦截器
        </p>
      </article>

      <!-- 第二步: 依赖收集 -->
      <article class="rounded-xl border border-indigo-200 bg-white p-4">
        <div class="mb-2 flex items-center justify-between">
          <p class="text-xs font-semibold tracking-wide text-indigo-700">2. 依赖收集</p>
          <span class="rounded-full bg-indigo-100 px-2 py-0.5 text-xs text-indigo-700">track</span>
        </div>
        <div class="rounded-lg bg-slate-50 p-2">
          <code class="text-xs text-slate-700">dep.add(effect)</code>
        </div>
        <p class="mt-2 text-xs text-slate-600">
          记录当前组件依赖这个属性
        </p>
      </article>

      <!-- 第三步: 触发更新 -->
      <article class="rounded-xl border border-pink-200 bg-white p-4">
        <div class="mb-2 flex items-center justify-between">
          <p class="text-xs font-semibold tracking-wide text-pink-700">3. 触发更新</p>
          <span class="rounded-full bg-pink-100 px-2 py-0.5 text-xs text-pink-700">trigger</span>
        </div>
        <div class="rounded-lg bg-slate-50 p-2">
          <code class="text-xs text-slate-700">state.count++</code>
        </div>
        <p class="mt-2 text-xs text-slate-600">
          修改属性时通知所有依赖的组件
        </p>
      </article>
    </div>

    <!-- 移动端布局 -->
    <div class="mt-4 space-y-3 md:hidden">
      <article class="rounded-xl border border-purple-200 bg-white p-3">
        <p class="text-xs font-semibold text-purple-700">1. Proxy 劫持 (get)</p>
        <div class="mt-2 rounded-lg bg-slate-50 p-2">
          <code class="text-xs text-slate-700">state.count</code>
        </div>
        <p class="mt-2 text-xs text-slate-600">访问属性 → 触发 get 拦截器</p>
      </article>

      <div class="text-center">
        <p class="text-xs font-semibold text-slate-500">↓ track</p>
      </div>

      <article class="rounded-xl border border-indigo-200 bg-white p-3">
        <p class="text-xs font-semibold text-indigo-700">2. 依赖收集 (Dep)</p>
        <div class="mt-2 rounded-lg bg-slate-50 p-2">
          <code class="text-xs text-slate-700">dep.add(effect)</code>
        </div>
        <p class="mt-2 text-xs text-slate-600">记录组件依赖关系</p>
      </article>

      <div class="text-center">
        <p class="text-xs font-semibold text-slate-500">↓ 修改 State</p>
      </div>

      <article class="rounded-xl border border-pink-200 bg-white p-3">
        <p class="text-xs font-semibold text-pink-700">3. 触发更新 (trigger)</p>
        <div class="mt-2 rounded-lg bg-slate-50 p-2">
          <code class="text-xs text-slate-700">state.count++</code>
        </div>
        <p class="mt-2 text-xs text-slate-600">通知所有依赖的组件重渲染</p>
      </article>
    </div>

    <!-- 核心数据结构说明 -->
    <div class="mt-4 rounded-xl border border-slate-200 bg-white/90 p-3">
      <p class="text-sm font-semibold text-slate-900">核心数据结构</p>
      <div class="mt-2 space-y-2 text-xs leading-relaxed text-slate-700">
        <div class="rounded-lg bg-slate-50 p-2">
          <code class="text-slate-800">targetMap: WeakMap&lt;object, Map&lt;key, Set&lt;effect&gt;&gt;&gt;</code>
        </div>
        <ul class="ml-4 space-y-1">
          <li><strong>targetMap</strong>: 存储所有响应式对象的依赖关系</li>
          <li><strong>depsMap</strong>: 存储单个对象的所有属性依赖</li>
          <li><strong>dep</strong>: 存储单个属性的所有 effect 订阅者</li>
        </ul>
      </div>
    </div>

    <!-- 后端类比 -->
    <div class="mt-4 rounded-xl border border-amber-200 bg-amber-50/70 p-3">
      <p class="text-sm font-semibold text-amber-900">后端类比</p>
      <ul class="mt-2 space-y-1 text-xs leading-relaxed text-amber-900/80">
        <li><strong>Proxy 劫持</strong> → AOP 切面拦截：在不修改原对象的前提下增强行为</li>
        <li><strong>依赖收集</strong> → 观察者模式：数据变化自动通知订阅者</li>
        <li><strong>Scheduler</strong> → 消息队列批量消费：合并重复任务减少开销</li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
// 纯展示组件，无需响应式状态
</script>
