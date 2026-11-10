<script setup lang="ts">
import { computed, ref } from "vue";
import { handleBackground } from "../layoutHelper";
import { useStaggeredMotion } from "../composables/useStaggeredMotion";
import logoInverseSrc from "../assets/logo-inverse.png";

const props = defineProps<{
  background?: string;
  date?: string;
}>();

const backgroundStyle = computed(() => handleBackground(props.background));

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
  <div class="slidev-layout plain-main-cover-1 plain-cover--photo">
    <div class="plain-main-cover-1__bg" :style="backgroundStyle" />
    <img :src="logoInverseSrc" alt="Plain Concepts" class="plain-main-cover-1__logo" />
    <div ref="contentRef" class="plain-main-cover-1__content">
      <slot />
      <p v-if="date" class="plain-main-cover-1__date">{{ date }}</p>
    </div>
  </div>
</template>

<style>
.slidev-layout.plain-main-cover-1 {
  position: relative;
  overflow: hidden;

  .plain-main-cover-1__logo {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    height: 2.5rem;
    width: auto;
    z-index: 20;
  }

  .plain-main-cover-1__bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    isolation: isolate;

    &::before {
      content: "";
      @apply absolute inset-0 pointer-events-none;
      background: linear-gradient(
        to top,
        rgba(15, 23, 41, 0.85) 0%,
        rgba(15, 23, 41, 0.4) 50%,
        rgba(15, 23, 41, 0.2) 100%
      );
    }
  }

  .plain-main-cover-1__content {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
    padding: 3rem 3.5rem;
    padding-bottom: 4rem;
  }

  h1 {
    @apply text-5xl font-bold tracking-tight text-white md:text-6xl;
    line-height: 1.1;
  }

  h2,
  p {
    @apply text-xl font-light text-white/70;
    margin-top: 0.5rem;
  }

  .plain-main-cover-1__date {
    @apply text-sm font-normal text-white/50;
    margin-top: 0.75rem;
  }
}
</style>
