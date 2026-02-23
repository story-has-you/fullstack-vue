<script setup lang="ts">
interface Props {
  relation: string
}

defineProps<Props>()
</script>

<template>
  <section class="mb-6 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5">
    <p class="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">UI = f(States)</p>
    <p class="mt-2 text-sm leading-relaxed text-emerald-900/85 md:text-base">
      {{ relation }}
    </p>
  </section>
</template>
