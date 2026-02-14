<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-gray-900 text-gray-300 py-8 mt-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- 关于 -->
        <div>
          <h3 class="text-white font-semibold mb-4">关于本分享</h3>
          <p class="text-sm leading-relaxed">
            通过计算机科学通识原理，帮助后端开发者建立基于状态机和数据流的严谨前端开发思维。
          </p>
        </div>

        <!-- 快速链接 -->
        <div>
          <h3 class="text-white font-semibold mb-4">快速链接</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <router-link to="/" class="hover:text-white transition-colors">
                首页
              </router-link>
            </li>
            <li>
              <router-link to="/intro" class="hover:text-white transition-colors">
                前言
              </router-link>
            </li>
            <li>
              <router-link to="/epilogue" class="hover:text-white transition-colors">
                结语
              </router-link>
            </li>
          </ul>
        </div>

        <!-- 技术栈 -->
        <div>
          <h3 class="text-white font-semibold mb-4">技术栈</h3>
          <ul class="space-y-2 text-sm">
            <li>Vue 3 + TypeScript</li>
            <li>Vite + Tailwind CSS</li>
            <li>Vue Router + Pinia</li>
          </ul>
        </div>
      </div>

      <!-- 版权信息 -->
      <div class="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
        <p>&copy; {{ currentYear }} 全栈思维跃迁. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
