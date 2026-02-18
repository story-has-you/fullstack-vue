<script setup lang="ts">
import { ref } from 'vue'

/**
 * 状态基础概念演示组件
 * 通过三个简单示例帮助小白理解"什么是状态"
 */

// 1. 布尔状态：电灯开关
const isLightOn = ref(false)
const toggleLight = () => {
  isLightOn.value = !isLightOn.value
}

// 2. 数字状态：计数器
const count = ref(0)
const increment = () => {
  count.value += 1
}
const decrement = () => {
  if (count.value > 0) {
    count.value -= 1
  }
}

// 3. 字符串状态：输入框
const username = ref('')
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  username.value = target.value
}
</script>

<template>
  <section class="mt-6 rounded-2xl border border-purple-100 bg-purple-50/60 p-6">
    <div class="mb-4">
      <h3 class="text-lg font-semibold text-purple-900">交互演示：三种基础状态</h3>
      <p class="mt-1 text-sm text-purple-900/80">动手试试，看看状态如何随你的操作而变化</p>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <!-- 1. 布尔状态：电灯开关 -->
      <article class="rounded-xl border border-white/70 bg-white p-4">
        <div class="mb-3 flex items-center justify-between">
          <h4 class="text-sm font-semibold text-slate-900">1. 布尔状态（开/关）</h4>
          <span class="rounded-full px-2 py-1 text-xs font-semibold" :class="isLightOn ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'">
            {{ isLightOn ? 'true' : 'false' }}
          </span>
        </div>

        <div class="mb-4 flex h-24 items-center justify-center rounded-lg" :class="isLightOn ? 'bg-amber-100' : 'bg-slate-100'">
          <div class="text-center">
            <div class="text-4xl">{{ isLightOn ? '💡' : '🌑' }}</div>
            <p class="mt-2 text-sm font-medium" :class="isLightOn ? 'text-amber-900' : 'text-slate-600'">
              {{ isLightOn ? '灯亮了' : '灯关了' }}
            </p>
          </div>
        </div>

        <button type="button" class="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700" @click="toggleLight">
          切换开关
        </button>

        <p class="mt-3 text-xs text-slate-600">
          就像电灯开关，只有"开"和"关"两种状态
        </p>
      </article>

      <!-- 2. 数字状态：计数器 -->
      <article class="rounded-xl border border-white/70 bg-white p-4">
        <div class="mb-3 flex items-center justify-between">
          <h4 class="text-sm font-semibold text-slate-900">2. 数字状态（计数）</h4>
          <span class="rounded-full bg-sky-100 px-2 py-1 text-xs font-semibold text-sky-800">
            {{ count }}
          </span>
        </div>

        <div class="mb-4 flex h-24 items-center justify-center rounded-lg bg-sky-50">
          <div class="text-center">
            <div class="text-5xl font-bold text-sky-600">{{ count }}</div>
            <p class="mt-2 text-sm font-medium text-sky-900">
              {{ count === 0 ? '还没开始计数' : `已计数 ${count} 次` }}
            </p>
          </div>
        </div>

        <div class="flex gap-2">
          <button type="button" class="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50" :disabled="count === 0" @click="decrement">
            -
          </button>
          <button type="button" class="flex-1 rounded-lg bg-purple-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-purple-700" @click="increment">
            +
          </button>
        </div>

        <p class="mt-3 text-xs text-slate-600">
          就像购物车的商品数量，可以是 0、1、2、3...
        </p>
      </article>

      <!-- 3. 字符串状态：输入框 -->
      <article class="rounded-xl border border-white/70 bg-white p-4">
        <div class="mb-3 flex items-center justify-between">
          <h4 class="text-sm font-semibold text-slate-900">3. 字符串状态（文本）</h4>
          <span class="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-800">
            {{ username.length }} 字符
          </span>
        </div>

        <div class="mb-4 flex h-24 items-center justify-center rounded-lg bg-emerald-50">
          <div class="text-center">
            <div class="min-h-[40px] text-2xl font-semibold text-emerald-600">
              {{ username || '(空)' }}
            </div>
            <p class="mt-2 text-sm font-medium text-emerald-900">
              {{ username ? '你输入的内容' : '还没输入' }}
            </p>
          </div>
        </div>

        <input type="text" :value="username" placeholder="输入你的名字..." class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm transition focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20" @input="handleInput" />

        <p class="mt-3 text-xs text-slate-600">
          就像表单输入框，可以是任意文字
        </p>
      </article>
    </div>

    <div class="mt-4 rounded-xl border border-purple-200 bg-white p-4">
      <h4 class="text-sm font-semibold text-purple-900">💡 理解状态</h4>
      <p class="mt-2 text-sm leading-relaxed text-slate-700">
        <span class="font-semibold text-purple-600">状态就是会随时间变化的数据。</span>当你点击按钮、输入文字时，这些数据就在变化。在 <code class="rounded bg-purple-100 px-1 py-0.5 text-xs text-purple-700">UI = f(States)</code> 公式中，States 就是这些会变化的数据，UI 会根据它们自动更新。
      </p>
    </div>
  </section>
</template>
