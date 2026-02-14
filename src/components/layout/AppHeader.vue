<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BookOpen, Layers, Menu, Rocket, X } from 'lucide-vue-next'
import { implementedChapterNumbers } from '@/constants/implemented-routes'

const router = useRouter()
const isMobileMenuOpen = ref(false)
const chapterIndexes = [...implementedChapterNumbers]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const navigateTo = (path: string) => {
  router.push(path)
  isMobileMenuOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-sky-100 bg-white/85 backdrop-blur-md shadow-(--shadow-soft)">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo 和标题 -->
        <div
          class="flex items-center space-x-3 cursor-pointer"
          @click="navigateTo('/')"
        >
          <div class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
            <Rocket class="h-5 w-5" :stroke-width="2.2" />
          </div>
          <div class="flex flex-col">
            <h1 class="text-xl font-bold text-gray-900">全栈思维跃迁</h1>
            <p class="text-xs text-gray-600 hidden sm:block">后端视角的现代前端架构</p>
          </div>
        </div>

        <!-- 桌面端导航 -->
        <div class="hidden md:flex items-center space-x-6">
          <button
            @click="navigateTo('/')"
            class="inline-flex items-center gap-2 font-medium text-gray-700 transition-colors hover:text-sky-600"
          >
            <Layers class="h-4 w-4" />
            首页
          </button>
          <button
            @click="navigateTo('/intro')"
            class="inline-flex items-center gap-2 font-medium text-gray-700 transition-colors hover:text-sky-600"
          >
            <BookOpen class="h-4 w-4" />
            前言
          </button>
          <div class="relative group">
            <button class="font-medium text-gray-700 transition-colors hover:text-sky-600">
              章节
            </button>
            <div class="absolute hidden group-hover:block pt-2 w-48">
              <div class="rounded-xl border border-sky-100 bg-white py-2 shadow-(--shadow-soft)">
                <button
                  v-for="i in chapterIndexes"
                  :key="i"
                  @click="navigateTo(`/chapter/${i}`)"
                  class="block w-full px-4 py-2 text-left text-gray-700 transition-colors hover:bg-sky-50 hover:text-sky-700"
                >
                  第{{ i }}章
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 移动端菜单按钮 -->
        <button
          @click="toggleMobileMenu"
          class="rounded-lg p-2 transition-colors hover:bg-sky-50 md:hidden"
        >
          <Menu v-if="!isMobileMenuOpen" class="h-6 w-6 text-gray-700" />
          <X v-else class="h-6 w-6 text-gray-700" />
        </button>
      </div>

      <!-- 移动端菜单 -->
      <div
        v-if="isMobileMenuOpen"
        class="mt-4 border-t border-sky-100 pb-4 pt-4 md:hidden"
      >
        <div class="flex flex-col space-y-3">
          <button
            @click="navigateTo('/')"
            class="rounded-lg px-4 py-2 text-left text-gray-700 transition-colors hover:bg-sky-50 hover:text-sky-700"
          >
            首页
          </button>
          <button
            @click="navigateTo('/intro')"
            class="rounded-lg px-4 py-2 text-left text-gray-700 transition-colors hover:bg-sky-50 hover:text-sky-700"
          >
            前言
          </button>
          <div class="px-4 py-2 text-sm font-semibold text-gray-500">章节</div>
          <button
            v-for="i in chapterIndexes"
            :key="i"
            @click="navigateTo(`/chapter/${i}`)"
            class="rounded-lg px-8 py-2 text-left text-gray-700 transition-colors hover:bg-sky-50 hover:text-sky-700"
          >
            第{{ i }}章
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>
