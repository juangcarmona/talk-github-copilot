<script setup lang="ts">
import { computed, ref } from "vue";
import { useStaggeredMotion } from "../composables/useStaggeredMotion";

const props = defineProps<{
  section?: string;
  subtitle?: string;
  description?: string;
  tags?: string;
}>();

const parsedTags = computed(() => {
  if (!props.tags) return [];
  return props.tags.split(",").map((t) => t.trim());
});

const leftRef = ref<HTMLElement | null>(null);
const rightRef = ref<HTMLElement | null>(null);

const leftElements = computed(() => {
  const el = leftRef.value;
  if (!el) return null;
  return Array.from(el.children) as HTMLElement[];
});

const rightElements = computed(() => {
  const el = rightRef.value;
  if (!el) return null;
  return Array.from(el.children) as HTMLElement[];
});

useStaggeredMotion(leftElements, { baseDelay: 100, step: 120 });
useStaggeredMotion(rightElements, { baseDelay: 300, step: 100 });
</script>

<template>
  <div class="slidev-layout plain-section-divider">
    <div class="plain-section-divider__left">
      <div ref="leftRef" class="plain-section-divider__left-content">
        <p v-if="section" class="plain-section-divider__label">{{ section }}</p>
        <slot />
        <p v-if="subtitle" class="plain-section-divider__subtitle">{{ subtitle }}</p>
        <p v-if="description" class="plain-section-divider__desc">{{ description }}</p>
        <div v-if="parsedTags.length" class="plain-section-divider__tags">
          <span v-for="tag in parsedTags" :key="tag" class="plain-section-divider__tag">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
    <div class="plain-section-divider__right">
      <div ref="rightRef" class="plain-section-divider__right-content">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<style>
.slidev-layout.plain-section-divider {
  display: grid;
  grid-template-columns: 2fr 3fr;
  height: 100%;
  padding: 0;
}

.plain-section-divider__left {
  background: var(--plain-accent);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2.5rem 2rem;
}

.plain-section-divider__left-content {
  .plain-section-divider__label {
    @apply mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/70;
  }

  h1 {
    @apply text-4xl font-bold leading-tight text-white;
    margin-bottom: 0.5rem;
  }

  h2 {
    @apply text-2xl font-bold leading-tight text-white;
    margin-bottom: 0.5rem;
  }
}

.plain-section-divider__subtitle {
  @apply text-xl font-light leading-snug text-white/70;
  margin-top: 0.25rem;
}

.plain-section-divider__desc {
  @apply mt-4 text-sm leading-relaxed text-white/80;
}

.plain-section-divider__tags {
  @apply mt-6 flex flex-wrap gap-2;
}

.plain-section-divider__tag {
  @apply rounded-full border border-white/40 px-4 py-1.5 text-xs font-semibold text-white;
}

.plain-section-divider__right {
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2.5rem 2rem;
}

.plain-section-divider__right-content {
  h2,
  h3 {
    @apply mb-4 text-xl font-bold text-[#0F1729];
  }

  p {
    @apply mb-2 text-sm leading-relaxed text-[#6B7280];
  }

  li {
    @apply mb-2 text-sm leading-relaxed text-[#1A1A2E];
    margin-left: 0;
    padding-left: 0;
  }
}
</style>
