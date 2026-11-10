<script setup lang="ts">
import { computed, ref } from "vue";

import { useStaggeredMotion } from "../composables/useStaggeredMotion";

const props = defineProps<{
  timeline?: Array<{
    year: string;
    event: string;
    desc: string;
  }>;
}>();

const timelineItems = props.timeline ?? [];
const contentRef = ref<HTMLElement | null>(null);
const timelineRef = ref<HTMLElement | null>(null);

const isCompact = computed(() => timelineItems.length > 4);

const contentElements = computed(() => {
  const content = contentRef.value;
  if (!content) return null;
  return Array.from(content.children) as HTMLElement[];
});

const timelineDelayBase = computed(() => {
  const contentCount = contentElements.value?.length ?? 0;
  // After content animations (150ms base + 150ms stagger), add a 100ms gap.
  return 150 + contentCount * 150 + 100;
});

const timelineElements = computed(() => {
  const container = timelineRef.value;
  if (!container) return null;
  return Array.from(container.querySelectorAll<HTMLElement>(".plain-timeline__item"));
});

useStaggeredMotion(contentElements, {
  baseDelay: 100,
  step: 100,
});

useStaggeredMotion(timelineElements, () => ({
  baseDelay: timelineDelayBase.value,
  step: 120,
}));
</script>

<template>
  <div class="slidev-layout plain-timeline">
    <div
      class="mx-auto flex h-full w-full max-w-7xl flex-col justify-center items-center px-4 py-12 md:px-16"
    >
      <div ref="contentRef" class="plain-timeline__content text-center">
        <slot />
      </div>

      <div
        v-if="timelineItems.length"
        :class="[
          'relative flex items-end justify-center pt-4 pb-4',
          isCompact ? 'gap-3' : 'gap-8',
        ]"
        ref="timelineRef"
      >
        <div
          class="absolute right-[10%] bottom-[3px] left-[10%] z-0 h-1 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
        />

        <div
          v-for="(item, index) in timelineItems"
          :key="item.year"
          class="plain-timeline__item relative z-10 flex flex-col items-center"
        >
          <div
            class="flex flex-col rounded-xl border p-5"
            :class="[
              isCompact ? 'w-40 p-3' : 'w-60',
              index === timelineItems.length - 1
                ? 'scale-105 border-amber-400 bg-amber-50 shadow-lg shadow-amber-200/30'
                : 'border-gray-200 bg-white',
            ]"
          >
            <div
              class="mb-2 font-bold"
              :class="[
                isCompact ? 'text-base' : 'text-xl',
                index === timelineItems.length - 1 ? 'text-amber-600' : 'text-[#3D5AFE]',
              ]"
            >
              {{ item.year }}
            </div>
            <div
              class="mb-1.5 leading-snug font-medium text-[#0F1729]"
              :class="isCompact ? 'text-xs' : 'text-sm'"
            >
              {{ item.event }}
            </div>
            <div
              class="flex-1 leading-relaxed text-[#6B7280]"
              :class="isCompact ? 'text-[10px]' : 'text-xs'"
            >
              {{ item.desc }}
            </div>
          </div>
          <div
            class="mt-3 rounded-full"
            :class="[
              isCompact ? 'h-3 w-3 ring-3 ring-gray-100' : 'h-4 w-4 ring-4 ring-gray-100',
              index === timelineItems.length - 1 ? 'bg-amber-500' : 'bg-[#3D5AFE]',
            ]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.slidev-layout.plain-timeline {
  .plain-timeline__content {
    h1,
    h2 {
      @apply mb-4 text-4xl font-bold text-[#0F1729];
    }

    p {
      @apply mx-auto max-w-3xl text-center text-xl leading-relaxed text-[#6B7280];
    }

    p + p {
      @apply mt-6 text-2xl font-bold text-amber-600;
    }
  }
}
</style>
