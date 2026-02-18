<template>
  <section class="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
    <h3 class="text-base font-semibold text-emerald-900">完整更新链路图解</h3>
    <p class="mt-2 text-sm leading-relaxed text-emerald-900/80">
      从用户操作到 UI 更新的完整链路：State 变更 → Proxy 拦截 → Trigger 触发 → Scheduler 调度 → 组件 render → VNode Diff → DOM Patch → UI 更新。
    </p>

    <!-- 桌面端布局 -->
    <div class="mt-4 hidden space-y-3 md:block">
      <!-- 第一行: 用户操作 → State 变更 -->
      <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <article class="rounded-xl border border-blue-200 bg-white p-3 text-center">
          <p class="text-xs font-semibold tracking-wide text-blue-700">用户操作</p>
          <p class="mt-1 text-xs text-slate-600">click / input / submit</p>
        </article>
        <p class="text-sm font-semibold text-slate-500">→</p>
        <article class="rounded-xl border border-purple-200 bg-white p-3 text-center">
          <p class="text-xs font-semibold tracking-wide text-purple-700">State 变更</p>
          <p class="mt-1 text-xs text-slate-600">count++ / user.name = 'x'</p>
        </article>
      </div>

      <div class="text-center">
        <p class="text-sm font-semibold text-slate-500">↓ Proxy set 拦截</p>
      </div>

      <!-- 第二行: Trigger → Scheduler -->
      <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <article class="rounded-xl border border-pink-200 bg-white p-3 text-center">
          <p class="text-xs font-semibold tracking-wide text-pink-700">Trigger 触发</p>
          <p class="mt-1 text-xs text-slate-600">dep.notify()</p>
        </article>
        <p class="text-sm font-semibold text-slate-500">→</p>
        <article class="rounded-xl border border-orange-200 bg-white p-3 text-center">
          <p class="text-xs font-semibold tracking-wide text-orange-700">Scheduler 调度</p>
          <p class="mt-1 text-xs text-slate-600">queueJob() + nextTick</p>
        </article>
      </div>

      <div class="text-center">
        <p class="text-sm font-semibold text-slate-500">↓ 微任务队列</p>
      </div>

      <!-- 第三行: 组件 render → VNode -->
      <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <article class="rounded-xl border border-indigo-200 bg-white p-3 text-center">
          <p class="text-xs font-semibold tracking-wide text-indigo-700">组件 render</p>
          <p class="mt-1 text-xs text-slate-600">执行 f(States)</p>
        </article>
        <p class="text-sm font-semibold text-slate-500">→</p>
        <article class="rounded-xl border border-cyan-200 bg-white p-3 text-center">
          <p class="text-xs font-semibold tracking-wide text-cyan-700">生成新 VNode</p>
          <p class="mt-1 text-xs text-slate-600">虚拟 DOM 树</p>
        </article>
      </div>

      <div class="text-center">
        <p class="text-sm font-semibold text-slate-500">↓ Diff 算法</p>
      </div>

      <!-- 第四行: Diff → Patch → UI 更新 -->
      <div class="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-3">
        <article class="rounded-xl border border-teal-200 bg-white p-3 text-center">
          <p class="text-xs font-semibold tracking-wide text-teal-700">比较新旧树</p>
          <p class="mt-1 text-xs text-slate-600">找出最小变更</p>
        </article>
        <p class="text-sm font-semibold text-slate-500">→</p>
        <article class="rounded-xl border border-green-200 bg-white p-3 text-center">
          <p class="text-xs font-semibold tracking-wide text-green-700">生成 Patch</p>
          <p class="mt-1 text-xs text-slate-600">DOM 操作集</p>
        </article>
        <p class="text-sm font-semibold text-slate-500">→</p>
        <article class="rounded-xl border border-emerald-200 bg-white p-3 text-center">
          <p class="text-xs font-semibold tracking-wide text-emerald-700">UI 更新完成</p>
          <p class="mt-1 text-xs text-slate-600">用户可见变化</p>
        </article>
      </div>
    </div>

    <!-- 移动端布局 -->
    <div class="mt-4 space-y-2 md:hidden">
      <article class="rounded-xl border border-blue-200 bg-white p-3">
        <p class="text-xs font-semibold text-blue-700">1. 用户操作</p>
        <p class="mt-1 text-xs text-slate-600">点击按钮 / 输入文字</p>
      </article>
      <div class="text-center"><p class="text-xs font-semibold text-slate-500">↓</p></div>

      <article class="rounded-xl border border-purple-200 bg-white p-3">
        <p class="text-xs font-semibold text-purple-700">2. State 变更</p>
        <p class="mt-1 text-xs text-slate-600">count++ / user.name = 'Alice'</p>
      </article>
      <div class="text-center"><p class="text-xs font-semibold text-slate-500">↓ Proxy set</p></div>

      <article class="rounded-xl border border-pink-200 bg-white p-3">
        <p class="text-xs font-semibold text-pink-700">3. Trigger 触发</p>
        <p class="mt-1 text-xs text-slate-600">通知所有依赖的 effect</p>
      </article>
      <div class="text-center"><p class="text-xs font-semibold text-slate-500">↓</p></div>

      <article class="rounded-xl border border-orange-200 bg-white p-3">
        <p class="text-xs font-semibold text-orange-700">4. Scheduler 调度</p>
        <p class="mt-1 text-xs text-slate-600">加入微任务队列批量更新</p>
      </article>
      <div class="text-center"><p class="text-xs font-semibold text-slate-500">↓</p></div>

      <article class="rounded-xl border border-indigo-200 bg-white p-3">
        <p class="text-xs font-semibold text-indigo-700">5. 组件 render</p>
        <p class="mt-1 text-xs text-slate-600">执行 f(States) 重新计算</p>
      </article>
      <div class="text-center"><p class="text-xs font-semibold text-slate-500">↓</p></div>

      <article class="rounded-xl border border-cyan-200 bg-white p-3">
        <p class="text-xs font-semibold text-cyan-700">6. 生成新 VNode</p>
        <p class="mt-1 text-xs text-slate-600">创建虚拟 DOM 树</p>
      </article>
      <div class="text-center"><p class="text-xs font-semibold text-slate-500">↓ Diff</p></div>

      <article class="rounded-xl border border-teal-200 bg-white p-3">
        <p class="text-xs font-semibold text-teal-700">7. 比较新旧树</p>
        <p class="mt-1 text-xs text-slate-600">找出最小变更集</p>
      </article>
      <div class="text-center"><p class="text-xs font-semibold text-slate-500">↓</p></div>

      <article class="rounded-xl border border-green-200 bg-white p-3">
        <p class="text-xs font-semibold text-green-700">8. 应用 Patch</p>
        <p class="mt-1 text-xs text-slate-600">更新真实 DOM</p>
      </article>
      <div class="text-center"><p class="text-xs font-semibold text-slate-500">↓</p></div>

      <article class="rounded-xl border border-emerald-200 bg-white p-3">
        <p class="text-xs font-semibold text-emerald-700">9. UI 更新完成</p>
        <p class="mt-1 text-xs text-slate-600">用户看到最新界面</p>
      </article>
    </div>

    <!-- 性能优化要点 -->
    <div class="mt-4 rounded-xl border border-slate-200 bg-white/90 p-3">
      <p class="text-sm font-semibold text-slate-900">性能优化要点</p>
      <ul class="mt-2 space-y-1 text-xs leading-relaxed text-slate-700">
        <li><strong>批量更新</strong>: Scheduler 合并同一帧内的多次 State 变更，只触发一次渲染</li>
        <li><strong>异步调度</strong>: 使用微任务队列（Promise）确保 UI 更新在下一帧前完成</li>
        <li><strong>最小 Patch</strong>: Diff 算法只更新变化的 DOM 节点，避免全量重建</li>
        <li><strong>细粒度追踪</strong>: 只有真正依赖变化数据的组件会重渲染</li>
      </ul>
    </div>

    <!-- 与 UI = f(States) 的关系 -->
    <div class="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/70 p-3">
      <p class="text-sm font-semibold text-emerald-900">与 UI = f(States) 的关系</p>
      <p class="mt-2 text-xs leading-relaxed text-emerald-900/80">
        完整链路体现了公式的自动化实现：States 变化时，响应式系统自动执行 f()（组件 render），生成新的 UI（VNode），并通过 Diff + Patch 高效应用到真实 DOM。开发者只需关心"States 应该是什么"，框架负责将其自动映射到"UI 是什么"。
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
// 纯展示组件，无需响应式状态
</script>
