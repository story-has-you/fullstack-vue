<template>
  <section class="mt-4 rounded-2xl border border-sky-100 bg-sky-50/70 p-4">
    <h3 class="text-base font-semibold text-sky-900">本项目架构图解</h3>
    <p class="mt-2 text-sm leading-relaxed text-sky-900/80">
      本项目自身就是 UI = f(States) 的完整实践案例：章节数据（States）→ 组件渲染（f）→ 页面展示（UI）。
    </p>

    <!-- 桌面端布局 -->
    <div class="mt-4 hidden space-y-4 md:block">
      <!-- States 层 -->
      <div>
        <p class="mb-2 text-xs font-semibold text-slate-700">States（数据层）- 唯一数据源</p>
        <div class="grid grid-cols-3 gap-3">
          <article class="rounded-xl border border-purple-200 bg-white p-3">
            <p class="text-xs font-semibold text-purple-700">chapters.ts</p>
            <p class="mt-1 text-xs text-slate-600">章节元数据数组</p>
            <div class="mt-2 rounded bg-slate-50 p-2">
              <code class="text-xs text-slate-700">Chapter[]</code>
            </div>
          </article>

          <article class="rounded-xl border border-indigo-200 bg-white p-3">
            <p class="text-xs font-semibold text-indigo-700">chapter1-6.ts</p>
            <p class="mt-1 text-xs text-slate-600">详细内容数据</p>
            <div class="mt-2 rounded bg-slate-50 p-2">
              <code class="text-xs text-slate-700">ChapterContent</code>
            </div>
          </article>

          <article class="rounded-xl border border-violet-200 bg-white p-3">
            <p class="text-xs font-semibold text-violet-700">intro.ts</p>
            <p class="mt-1 text-xs text-slate-600">前言内容数据</p>
            <div class="mt-2 rounded bg-slate-50 p-2">
              <code class="text-xs text-slate-700">IntroContent</code>
            </div>
          </article>
        </div>
      </div>

      <div class="text-center">
        <p class="text-sm font-semibold text-slate-500">↓ f() - 响应式绑定与组件渲染</p>
      </div>

      <!-- f() 层 -->
      <div>
        <p class="mb-2 text-xs font-semibold text-slate-700">f()（绑定层）- v-for + props + computed</p>
        <div class="grid grid-cols-3 gap-3">
          <article class="rounded-xl border border-cyan-200 bg-white p-3">
            <p class="text-xs font-semibold text-cyan-700">v-for 遍历</p>
            <p class="mt-1 text-xs text-slate-600">HomeView.vue</p>
            <div class="mt-2 rounded bg-slate-50 p-2">
              <code class="text-xs text-slate-700">v-for="ch in chapters"</code>
            </div>
          </article>

          <article class="rounded-xl border border-teal-200 bg-white p-3">
            <p class="text-xs font-semibold text-teal-700">props 传递</p>
            <p class="mt-1 text-xs text-slate-600">父 → 子数据流</p>
            <div class="mt-2 rounded bg-slate-50 p-2">
              <code class="text-xs text-slate-700">:chapter="ch"</code>
            </div>
          </article>

          <article class="rounded-xl border border-sky-200 bg-white p-3">
            <p class="text-xs font-semibold text-sky-700">computed 计算</p>
            <p class="mt-1 text-xs text-slate-600">派生状态</p>
            <div class="mt-2 rounded bg-slate-50 p-2">
              <code class="text-xs text-slate-700">canDelete</code>
            </div>
          </article>
        </div>
      </div>

      <div class="text-center">
        <p class="text-sm font-semibold text-slate-500">↓ 自动渲染</p>
      </div>

      <!-- UI 层 -->
      <div>
        <p class="mb-2 text-xs font-semibold text-slate-700">UI（界面层）- 组件输出</p>
        <div class="grid grid-cols-3 gap-3">
          <article class="rounded-xl border border-emerald-200 bg-white p-3">
            <p class="text-xs font-semibold text-emerald-700">ChapterCard</p>
            <p class="mt-1 text-xs text-slate-600">章节卡片组件</p>
            <div class="mt-2 rounded bg-slate-50 p-2">
              <code class="text-xs text-slate-700">title + icon + desc</code>
            </div>
          </article>

          <article class="rounded-xl border border-green-200 bg-white p-3">
            <p class="text-xs font-semibold text-green-700">ConceptSectionCard</p>
            <p class="mt-1 text-xs text-slate-600">概念小节卡片</p>
            <div class="mt-2 rounded bg-slate-50 p-2">
              <code class="text-xs text-slate-700">what/why/how</code>
            </div>
          </article>

          <article class="rounded-xl border border-lime-200 bg-white p-3">
            <p class="text-xs font-semibold text-lime-700">CodeSnippetPanel</p>
            <p class="mt-1 text-xs text-slate-600">代码面板组件</p>
            <div class="mt-2 rounded bg-slate-50 p-2">
              <code class="text-xs text-slate-700">语法高亮 + 复制</code>
            </div>
          </article>
        </div>
      </div>
    </div>

    <!-- 移动端布局 -->
    <div class="mt-4 space-y-3 md:hidden">
      <div>
        <p class="mb-2 text-xs font-semibold text-slate-700">States（数据层）</p>
        <article class="rounded-xl border border-purple-200 bg-white p-3">
          <p class="text-xs font-semibold text-purple-700">src/data/</p>
          <p class="mt-1 text-xs text-slate-600">chapters.ts, chapter1-6.ts, intro.ts</p>
        </article>
      </div>

      <div class="text-center">
        <p class="text-xs font-semibold text-slate-500">↓ f() 绑定</p>
      </div>

      <div>
        <p class="mb-2 text-xs font-semibold text-slate-700">f()（绑定层）</p>
        <article class="rounded-xl border border-cyan-200 bg-white p-3">
          <p class="text-xs font-semibold text-cyan-700">响应式机制</p>
          <p class="mt-1 text-xs text-slate-600">v-for 遍历 + props 传递 + computed 计算</p>
        </article>
      </div>

      <div class="text-center">
        <p class="text-xs font-semibold text-slate-500">↓ 渲染</p>
      </div>

      <div>
        <p class="mb-2 text-xs font-semibold text-slate-700">UI（界面层）</p>
        <article class="rounded-xl border border-emerald-200 bg-white p-3">
          <p class="text-xs font-semibold text-emerald-700">组件输出</p>
          <p class="mt-1 text-xs text-slate-600">ChapterCard / ConceptSectionCard / CodeSnippetPanel</p>
        </article>
      </div>
    </div>

    <!-- 关键设计原则 -->
    <div class="mt-4 rounded-xl border border-slate-200 bg-white/90 p-3">
      <p class="text-sm font-semibold text-slate-900">关键设计原则</p>
      <ul class="mt-2 space-y-1 text-xs leading-relaxed text-slate-700">
        <li><strong>单一数据源</strong>: 所有章节内容来自 src/data/，不存在第二份数据</li>
        <li><strong>声明式 UI</strong>: 组件通过 v-for/v-if 声明渲染逻辑，不手动操作 DOM</li>
        <li><strong>状态驱动</strong>: 复制按钮、路由导航等交互完全由 State 变化驱动</li>
        <li><strong>组件幂等性</strong>: 同样的 chapter 对象总能渲染出同样的卡片</li>
      </ul>
    </div>

    <!-- 自举式设计 -->
    <div class="mt-4 rounded-xl border border-amber-200 bg-amber-50/70 p-3">
      <p class="text-sm font-semibold text-amber-900">自举式设计</p>
      <p class="mt-2 text-xs leading-relaxed text-amber-900/80">
        本项目采用"教学内容本身就是教学案例"的设计：讲解 UI = f(States) 的网站，自身架构就完整遵循这个公式。学习者可以通过阅读项目源码，理解公式在真实应用中的落地方式。
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
// 纯展示组件，无需响应式状态
</script>
