<script setup lang="ts">
import { computed } from "vue";
import { useNav } from "@slidev/client";
import logoSrc from "./assets/logo.png";

const { currentSlideNo, currentLayout } = useNav();

const hiddenLayouts = ["cover", "main-cover-1", "main-cover-2"];
const showFooter = computed(() => !hiddenLayouts.includes(currentLayout.value));
</script>

<template>
  <div v-if="showFooter" class="plain-footer">
    <span class="plain-footer__page">{{ currentSlideNo }}</span>
    <img :src="logoSrc" alt="Plain Concepts" class="plain-footer__logo" />
  </div>
</template>

<style>
.plain-footer {
  position: absolute;
  bottom: 1.25rem;
  right: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.625rem;
  z-index: 50;
  pointer-events: none;
}

.plain-footer__page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 0.375rem;
  background: var(--plain-navy);
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  line-height: 1;
  font-family: "Open Sans", sans-serif;
}

.plain-footer__logo {
  height: 1.75rem;
  width: auto;
}

/* Dark layouts: invert footer colors */
.plain-quote .plain-footer {
  .plain-footer__page {
    background: white;
    color: var(--plain-navy);
  }

  .plain-footer__logo {
    filter: brightness(0) invert(1);
  }
}
</style>
