<script setup lang="ts">
import { computed, ref } from "vue";
import { useStaggeredMotion } from "../composables/useStaggeredMotion";
import logoInverseSrc from "../assets/logo-inverse.png";

defineProps<{
  year?: string;
  tagline?: string;
}>();

const contentRef = ref<HTMLElement | null>(null);
const contentElements = computed(() => {
  const content = contentRef.value;
  if (!content) return null;
  return Array.from(content.children) as HTMLElement[];
});

useStaggeredMotion(contentElements, {
  baseDelay: 200,
  step: 120,
});
</script>

<template>
  <div class="slidev-layout plain-main-cover-2 plain-cover--dark">
    <!-- Subtle geometric pattern decoration -->
    <div class="plain-main-cover-2__pattern" />
    <img :src="logoInverseSrc" alt="Plain Concepts" class="plain-main-cover-2__logo" />
    <div ref="contentRef" class="plain-main-cover-2__content">
      <span v-if="year" class="plain-main-cover-2__year">{{ year }}</span>
      <slot />
      <p v-if="tagline" class="plain-main-cover-2__tagline">{{ tagline }}</p>
    </div>
  </div>
</template>

<style>
.slidev-layout.plain-main-cover-2 {
  position: relative;
  overflow: hidden;
  background: var(--plain-navy);

  .plain-main-cover-2__logo {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    height: 2.5rem;
    width: auto;
    z-index: 20;
  }

  .plain-main-cover-2__pattern {
    position: absolute;
    right: 0;
    top: 0;
    width: 45%;
    height: 100%;
    opacity: 0.08;
    background-image: radial-gradient(circle, var(--plain-accent) 1.5px, transparent 1.5px);
    background-size: 24px 24px;
    mask-image: linear-gradient(to left, rgba(0, 0, 0, 0.6) 0%, transparent 100%);
    -webkit-mask-image: linear-gradient(to left, rgba(0, 0, 0, 0.6) 0%, transparent 100%);
  }

  .plain-main-cover-2__content {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
    padding: 3rem 3.5rem;
    padding-bottom: 4rem;
  }

  .plain-main-cover-2__year {
    @apply text-sm font-semibold uppercase tracking-[0.15em] text-white/50;
    margin-bottom: 0.5rem;
  }

  h1 {
    @apply text-5xl font-bold tracking-tight text-white md:text-6xl;
    line-height: 1.1;
  }

  h2 {
    @apply text-2xl font-light text-white/70;
    margin-top: 0.25rem;
  }

  p {
    @apply text-lg font-light text-white/60;
    margin-top: 0.25rem;
  }

  .plain-main-cover-2__tagline {
    @apply text-sm font-semibold uppercase tracking-[0.15em] text-[#3D5AFE];
    margin-top: 1.25rem;
  }
}
</style>
