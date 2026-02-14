<template>
  <section class="mt-4 rounded-2xl border border-cyan-100 bg-cyan-50/70 p-4">
    <h3 class="text-base font-semibold text-cyan-900">单向数据流图解</h3>
    <p class="mt-2 text-sm leading-relaxed text-cyan-900/80">
      数据只沿一个方向流动：父组件通过 Props 下发只读数据，子组件通过 Emit 上抛事件，父组件接收后更新状态并触发重渲染。
    </p>

    <div class="mt-4 hidden grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-3 md:grid">
      <article class="rounded-xl border border-sky-200 bg-white p-4 text-center">
        <p class="text-xs font-semibold tracking-wide text-sky-700">Parent State</p>
        <p class="mt-1 text-xs text-slate-600">count / user / form</p>
      </article>
      <p class="text-sm font-semibold text-slate-500">props ↓</p>
      <article class="rounded-xl border border-emerald-200 bg-white p-4 text-center">
        <p class="text-xs font-semibold tracking-wide text-emerald-700">Child View</p>
        <p class="mt-1 text-xs text-slate-600">只读展示 + 触发意图</p>
      </article>
      <p class="text-sm font-semibold text-slate-500">emit ↑</p>
      <article class="rounded-xl border border-indigo-200 bg-white p-4 text-center">
        <p class="text-xs font-semibold tracking-wide text-indigo-700">Parent Handler</p>
        <p class="mt-1 text-xs text-slate-600">校验并更新状态</p>
      </article>
    </div>

    <div class="mt-4 space-y-2 md:hidden">
      <article class="rounded-xl border border-sky-200 bg-white p-3">
        <p class="text-xs font-semibold text-sky-700">Parent State</p>
        <p class="mt-1 text-xs text-slate-600">拥有状态写权限</p>
      </article>
      <p class="text-center text-xs font-semibold text-slate-500">props ↓</p>
      <article class="rounded-xl border border-emerald-200 bg-white p-3">
        <p class="text-xs font-semibold text-emerald-700">Child View</p>
        <p class="mt-1 text-xs text-slate-600">读取数据并触发事件</p>
      </article>
      <p class="text-center text-xs font-semibold text-slate-500">emit ↑</p>
      <article class="rounded-xl border border-indigo-200 bg-white p-3">
        <p class="text-xs font-semibold text-indigo-700">Parent Handler</p>
        <p class="mt-1 text-xs text-slate-600">决定状态迁移</p>
      </article>
    </div>

    <div class="mt-4 rounded-xl border border-slate-200 bg-white/90 p-3">
      <p class="text-sm font-semibold text-slate-900">关键约束</p>
      <ul class="mt-2 space-y-1 text-xs leading-relaxed text-slate-700">
        <li>子组件禁止直接修改 props。</li>
        <li>写操作必须通过 emit 事件上抛。</li>
        <li>共享状态优先提升到最近公共父组件。</li>
      </ul>
    </div>
  </section>
</template>
