<template>
  <section class="mt-4 rounded-2xl border border-amber-100 bg-amber-50/70 p-4">
    <h3 class="text-base font-semibold text-amber-900">事件循环调度图</h3>
    <p class="mt-2 text-sm leading-relaxed text-amber-900/80">
      单次循环中，主线程会先执行同步调用栈，再清空微任务队列，然后交给浏览器渲染，最后取出一个宏任务继续下一轮循环。
    </p>

    <div class="mt-4 hidden grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-2 md:grid">
      <article class="rounded-xl border border-sky-200 bg-white p-3 text-center">
        <p class="text-xs font-semibold text-sky-700">1. Call Stack</p>
        <p class="mt-1 text-xs text-slate-600">同步代码执行</p>
      </article>
      <p class="text-sm font-semibold text-slate-500">→</p>
      <article class="rounded-xl border border-emerald-200 bg-white p-3 text-center">
        <p class="text-xs font-semibold text-emerald-700">2. Microtasks</p>
        <p class="mt-1 text-xs text-slate-600">Promise.then</p>
      </article>
      <p class="text-sm font-semibold text-slate-500">→</p>
      <article class="rounded-xl border border-indigo-200 bg-white p-3 text-center">
        <p class="text-xs font-semibold text-indigo-700">3. Render</p>
        <p class="mt-1 text-xs text-slate-600">布局与绘制</p>
      </article>
      <p class="text-sm font-semibold text-slate-500">→</p>
      <article class="rounded-xl border border-rose-200 bg-white p-3 text-center">
        <p class="text-xs font-semibold text-rose-700">4. Macro Task</p>
        <p class="mt-1 text-xs text-slate-600">setTimeout / I/O</p>
      </article>
    </div>

    <div class="mt-4 space-y-2 md:hidden">
      <article class="rounded-xl border border-sky-200 bg-white p-3">
        <p class="text-xs font-semibold text-sky-700">1. Call Stack</p>
        <p class="mt-1 text-xs text-slate-600">同步代码执行</p>
      </article>
      <p class="text-center text-xs font-semibold text-slate-500">↓</p>
      <article class="rounded-xl border border-emerald-200 bg-white p-3">
        <p class="text-xs font-semibold text-emerald-700">2. Microtasks</p>
        <p class="mt-1 text-xs text-slate-600">Promise.then</p>
      </article>
      <p class="text-center text-xs font-semibold text-slate-500">↓</p>
      <article class="rounded-xl border border-indigo-200 bg-white p-3">
        <p class="text-xs font-semibold text-indigo-700">3. Render</p>
        <p class="mt-1 text-xs text-slate-600">布局与绘制</p>
      </article>
      <p class="text-center text-xs font-semibold text-slate-500">↓</p>
      <article class="rounded-xl border border-rose-200 bg-white p-3">
        <p class="text-xs font-semibold text-rose-700">4. Macro Task</p>
        <p class="mt-1 text-xs text-slate-600">setTimeout / I/O</p>
      </article>
    </div>

    <div class="mt-4 rounded-xl border border-slate-200 bg-white/90 p-3">
      <p class="text-sm font-semibold text-slate-900">关键结论</p>
      <ul class="mt-2 space-y-1 text-xs leading-relaxed text-slate-700">
        <li>微任务会在当前宏任务结束后、渲染前被清空。</li>
        <li>宏任务一次只取一个，避免单轮执行过长阻塞渲染。</li>
        <li>主线程阻塞会让输入响应、动画和渲染全部停滞。</li>
      </ul>
    </div>
  </section>
</template>
