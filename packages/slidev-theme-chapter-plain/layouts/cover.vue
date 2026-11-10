<script setup lang="ts">
import MainCover2 from "./main-cover-2.vue";

defineProps<{
  year?: string;
  tagline?: string;
}>();
</script>

<template>
  <MainCover2 :year="year" :tagline="tagline">
    <slot />
  </MainCover2>
</template>
