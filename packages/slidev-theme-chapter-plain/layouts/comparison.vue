<script setup lang="ts">
import { computed, ref } from "vue";
import { useStaggeredMotion } from "../composables/useStaggeredMotion";

defineProps<{
  section?: string;
  beforeTitle?: string;
  afterTitle?: string;
}>();

const headerRef = ref<HTMLElement | null>(null);
const beforeRef = ref<HTMLElement | null>(null);
const afterRef = ref<HTMLElement | null>(null);

const headerElements = computed(() => {
  const el = headerRef.value;
  if (!el) return null;
  return Array.from(el.children) as HTMLElement[];
});

const beforeElements = computed(() => {
  const el = beforeRef.value;
  if (!el) return null;
  return Array.from(el.children) as HTMLElement[];
});

const afterElements = computed(() => {
  const el = afterRef.value;
  if (!el) return null;
  return Array.from(el.children) as HTMLElement[];
});

useStaggeredMotion(headerElements, { baseDelay: 100, step: 100 });
useStaggeredMotion(beforeElements, { baseDelay: 300, step: 80 });
useStaggeredMotion(afterElements, { baseDelay: 400, step: 80 });
</script>

<template>
  <div class="slidev-layout plain-comparison">
    <div class="mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-8 py-8">
      <div ref="headerRef" class="plain-comparison__header">
        <div v-if="section" class="plain-section-label">{{ section }}</div>
        <slot />
      </div>

      <div class="plain-comparison__columns">
        <div class="plain-comparison__col plain-comparison__col--before">
          <div class="plain-comparison__col-title">{{ beforeTitle || "Before" }}</div>
          <div ref="beforeRef" class="plain-comparison__col-content">
            <slot name="before" />
          </div>
        </div>
        <div class="plain-comparison__col plain-comparison__col--after">
          <div class="plain-comparison__col-title">{{ afterTitle || "After" }}</div>
          <div ref="afterRef" class="plain-comparison__col-content">
            <slot name="after" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.slidev-layout.plain-comparison {
  .plain-comparison__header {
    margin-bottom: 1.5rem;

    h1 {
      @apply text-3xl font-bold text-[#0F1729] md:text-4xl;
      margin-top: 0.25rem;
    }

    p {
      @apply text-base text-[#6B7280];
    }
  }

  .plain-comparison__columns {
    @apply grid grid-cols-2 gap-4;
    flex: 1;
    min-height: 0;
  }

  .plain-comparison__col {
    @apply rounded-2xl px-6 py-5;
    display: flex;
    flex-direction: column;
  }

  .plain-comparison__col--before {
    background: var(--plain-bg-card);
  }

  .plain-comparison__col--after {
    background: var(--plain-gradient);
    color: white;

    .plain-comparison__col-title {
      color: white;
    }

    p,
    li {
      color: rgba(255, 255, 255, 0.9);
    }

    strong {
      color: white;
    }
  }

  .plain-comparison__col-title {
    @apply mb-4 text-center text-sm font-bold uppercase tracking-widest text-[#0F1729];
  }

  .plain-comparison__col-content {
    flex: 1;

    p {
      @apply mb-3 text-sm leading-relaxed;
    }

    li {
      @apply mb-2 text-sm leading-relaxed;
      margin-left: 0;
      padding-left: 0;
    }
  }
}
</style>
