<script setup lang="ts">
import { computed } from "vue";
import { useNav } from "@slidev/client";

const { currentLayout } = useNav();

const hiddenLayouts = ["cover", "main-cover-1", "main-cover-2", "quote", "section-divider"];
const showBar = computed(() => !hiddenLayouts.includes(currentLayout.value));
</script>

<template>
  <div v-if="showBar" class="plain-accent-bar" />
</template>

<style>
.plain-accent-bar {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  width: 40px;
  height: 4px;
  background: var(--plain-accent);
  border-radius: 2px;
  z-index: 50;
  pointer-events: none;
}
</style>
