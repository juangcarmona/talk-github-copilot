<script setup lang="ts">
import { computed, ref } from "vue";
import { useStaggeredMotion } from "../composables/useStaggeredMotion";

defineProps<{
  author?: string;
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
  <div class="slidev-layout plain-quote">
    <div class="flex h-full w-full flex-col items-center justify-center px-12 text-center">
      <div ref="contentRef" class="plain-quote__content">
        <slot />
        <p v-if="author" class="plain-quote__author">— {{ author }}</p>
      </div>
    </div>
  </div>
</template>

<style>
.slidev-layout.plain-quote {
  background: var(--plain-navy);

  .plain-quote__content {
    max-width: 52rem;
  }

  h1,
  blockquote,
  p:first-child {
    @apply text-3xl font-bold leading-snug text-white md:text-4xl;
  }

  blockquote {
    border: none;
    padding: 0;
    margin: 0;

    p {
      @apply text-3xl font-bold leading-snug text-white md:text-4xl;
    }
  }

  .plain-quote__author {
    @apply mt-6 text-base font-normal tracking-wide text-white/50;
  }
}
</style>
