<script setup lang="ts">
import { computed, ref } from "vue";
import { useStaggeredMotion } from "../composables/useStaggeredMotion";

defineProps<{
  section?: string;
}>();

const contentRef = ref<HTMLElement | null>(null);
const contentElements = computed(() => {
  const content = contentRef.value;
  if (!content) return null;
  return Array.from(content.children) as HTMLElement[];
});

useStaggeredMotion(contentElements, {
  baseDelay: 100,
  step: 120,
});
</script>

<template>
  <div class="slidev-layout plain-statement">
    <div class="mx-auto flex h-full w-full max-w-5xl flex-col justify-center px-10">
      <div ref="contentRef" class="plain-statement__content">
        <div v-if="section" class="plain-section-label">{{ section }}</div>
        <slot />
      </div>
    </div>
  </div>
</template>

<style>
.slidev-layout.plain-statement {
  h1 {
    @apply text-4xl font-bold leading-tight text-[#0F1729] md:text-5xl;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }

  p {
    @apply max-w-3xl text-lg leading-relaxed text-[#6B7280];
  }
}
</style>
