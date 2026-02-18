<template>
  <section class="mt-4 rounded-2xl border border-violet-100 bg-violet-50/70 p-4">
    <h3 class="text-base font-semibold text-violet-900">MVVM 图例</h3>
    <p class="mt-2 text-sm leading-relaxed text-violet-900/80">
      该图展示 View、ViewModel、Model 之间的数据流和交互流：状态由 ViewModel 统一协调，View
      与 Model 不直接耦合。
    </p>

    <div class="mt-4 hidden grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-3 md:grid">
      <article class="rounded-xl border border-sky-200 bg-white p-4">
        <p class="text-xs font-semibold tracking-wide text-sky-700">Model</p>
        <p class="mt-2 text-sm text-slate-700">领域数据 / DTO / 响应式状态源</p>
      </article>
      <div class="text-center text-sm font-semibold text-slate-500">状态同步</div>
      <article class="rounded-xl border border-emerald-200 bg-white p-4">
        <p class="text-xs font-semibold tracking-wide text-emerald-700">ViewModel</p>
        <p class="mt-2 text-sm text-slate-700">组合业务规则，驱动渲染与输入回写</p>
      </article>
      <div class="text-center text-sm font-semibold text-slate-500">数据绑定</div>
      <article class="rounded-xl border border-indigo-200 bg-white p-4">
        <p class="text-xs font-semibold tracking-wide text-indigo-700">View</p>
        <p class="mt-2 text-sm text-slate-700">Template / DOM 展示层</p>
      </article>
    </div>

    <div class="mt-4 space-y-3 md:hidden">
      <article class="rounded-xl border border-sky-200 bg-white p-4">
        <p class="text-xs font-semibold tracking-wide text-sky-700">Model</p>
        <p class="mt-2 text-sm text-slate-700">领域数据 / DTO / 响应式状态源</p>
      </article>
      <p class="text-center text-sm font-semibold text-slate-500">↓ 状态同步</p>
      <article class="rounded-xl border border-emerald-200 bg-white p-4">
        <p class="text-xs font-semibold tracking-wide text-emerald-700">ViewModel</p>
        <p class="mt-2 text-sm text-slate-700">组合业务规则，驱动渲染与输入回写</p>
      </article>
      <p class="text-center text-sm font-semibold text-slate-500">↓ 数据绑定</p>
      <article class="rounded-xl border border-indigo-200 bg-white p-4">
        <p class="text-xs font-semibold tracking-wide text-indigo-700">View</p>
        <p class="mt-2 text-sm text-slate-700">Template / DOM 展示层</p>
      </article>
    </div>

    <div class="mt-4 rounded-xl border border-slate-200 bg-white/90 p-4">
      <p class="text-sm font-semibold text-slate-900">双向绑定闭环</p>
      <div class="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-700">
        <span class="rounded-md bg-sky-100 px-2 py-1 text-sky-800">View 输入事件</span>
        <span>→</span>
        <span class="rounded-md bg-emerald-100 px-2 py-1 text-emerald-800">ViewModel 更新状态</span>
        <span>→</span>
        <span class="rounded-md bg-sky-100 px-2 py-1 text-sky-800">Model 变更</span>
        <span>→</span>
        <span class="rounded-md bg-indigo-100 px-2 py-1 text-indigo-800">View 自动重渲染</span>
      </div>
    </div>

    <ul class="mt-4 grid grid-cols-1 gap-2 text-sm text-slate-700 md:grid-cols-3">
      <li class="rounded-lg border border-sky-200 bg-white px-3 py-2">
        <span class="font-semibold text-sky-700">蓝色:</span>
        数据实体与状态源
      </li>
      <li class="rounded-lg border border-emerald-200 bg-white px-3 py-2">
        <span class="font-semibold text-emerald-700">绿色:</span>
        协调层（规则、绑定、变更分发）
      </li>
      <li class="rounded-lg border border-indigo-200 bg-white px-3 py-2">
        <span class="font-semibold text-indigo-700">靛色:</span>
        视图呈现与用户交互
      </li>
    </ul>
  </section>
</template>
