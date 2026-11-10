<script setup lang="ts">
import { computed, ref } from "vue";
import { useStaggeredMotion } from "../composables/useStaggeredMotion";

// NOTE: Layout output is not covered by automated tests; verify in slide preview.
const contentRef = ref<HTMLElement | null>(null);
const tableRef = ref<HTMLElement | null>(null);

const contentElements = computed(() => {
  const content = contentRef.value;
  if (!content) return null;
  return Array.from(content.children) as HTMLElement[];
});

const rowElements = computed(() => {
  const container = tableRef.value;
  if (!container) return null;
  return Array.from(container.querySelectorAll<HTMLElement>("tbody tr"));
});

useStaggeredMotion(contentElements, {
  step: 100,
});

useStaggeredMotion(rowElements, () => {
  const contentCount = contentElements.value?.length ?? 0;
  return {
    baseDelay: contentCount * 100 + 100,
    step: 80,
  };
});
</script>

<template>
  <div class="slidev-layout plain-table">
    <div ref="contentRef" class="mx-auto flex h-full w-full max-w-6xl flex-col justify-center">
      <div ref="tableRef">
        <slot />
      </div>
    </div>
  </div>
</template>

<style>
.slidev-layout.plain-table {
  table {
    @apply w-full overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg;
    border-collapse: separate;
    border-spacing: 0;
  }

  thead {
    @apply bg-[#F0F1F5];
  }

  th {
    @apply px-6 py-4 text-[11px] font-bold tracking-[0.3em] uppercase text-[#1A1A2E] md:text-xs;
  }

  th:nth-child(2) {
    @apply text-[#3D5AFE];
  }

  th:nth-child(3) {
    @apply text-amber-600;
  }

  tr:not(:last-child) td {
    @apply border-b border-gray-100;
  }

  td {
    @apply px-6 py-4 text-sm font-medium text-[#1A1A2E];
  }

  tbody tr {
    @apply transition-colors hover:bg-gray-50;
  }

  td:nth-child(2) {
    @apply text-center;
  }

  td:nth-child(3) {
    @apply text-center;
  }

  td:nth-child(2) code,
  td:nth-child(3) code,
  td:nth-child(2) span,
  td:nth-child(3) span {
    @apply inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide;
  }

  td:nth-child(2) code,
  td:nth-child(2) span {
    @apply border border-[#C5CAE9] bg-[#C5CAE9]/20 text-[#3D5AFE];
  }

  td:nth-child(3) code,
  td:nth-child(3) span {
    @apply border border-amber-200 bg-amber-50 text-amber-700;
  }
}
</style>
