<script setup lang="ts">
import { computed, ref, onMounted, nextTick } from "vue";
import { useStaggeredMotion } from "../composables/useStaggeredMotion";

const props = withDefaults(
  defineProps<{
    title?: string;
  }>(),
  {
    title: "~/project",
  },
);

const slideTitle = ref("");
const wrapperRef = ref<HTMLElement | null>(null);
const bodyRef = ref<HTMLElement | null>(null);

const wrapperElements = computed(() => {
  const el = wrapperRef.value;
  if (!el) return null;
  return Array.from(el.children) as HTMLElement[];
});

const bodyElements = computed(() => {
  const el = bodyRef.value;
  if (!el) return null;
  return Array.from(el.children) as HTMLElement[];
});

useStaggeredMotion(wrapperElements, { baseDelay: 0, step: 100 });
useStaggeredMotion(bodyElements, { baseDelay: 200, step: 100 });

onMounted(async () => {
  await nextTick();
  const body = bodyRef.value;
  if (!body) return;
  const h1 = body.querySelector("h1");
  if (h1) {
    slideTitle.value = h1.textContent || "";
    h1.remove();
  }
});
</script>

<template>
  <div class="slidev-layout plain-console">
    <div ref="wrapperRef" class="mx-auto flex h-full w-full max-w-5xl flex-col px-8 py-8">
      <h1 v-if="slideTitle" class="plain-console__slide-title">{{ slideTitle }}</h1>
      <div class="plain-console__frame">
        <div class="plain-console__titlebar">
          <span class="plain-console__dot plain-console__dot--red" />
          <span class="plain-console__dot plain-console__dot--yellow" />
          <span class="plain-console__dot plain-console__dot--green" />
          <span class="plain-console__title">{{ title }}</span>
        </div>
        <div ref="bodyRef" class="plain-console__body">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.slidev-layout.plain-console {
  .plain-console__slide-title {
    @apply mb-4 text-3xl font-bold;
    color: var(--plain-text);
  }

  .plain-console__frame {
    @apply overflow-hidden rounded-xl border border-gray-700 flex flex-col;
    background: #0d1117;
    flex: 1;
    min-height: 0;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.3),
      0 2px 4px -2px rgba(0, 0, 0, 0.2);
  }

  .plain-console__titlebar {
    @apply flex items-center gap-2 border-b border-gray-700 px-4 py-2;
    background: #161b22;
  }

  .plain-console__dot {
    @apply inline-block h-3 w-3 rounded-full;
  }

  .plain-console__dot--red {
    background: #f85149;
  }

  .plain-console__dot--yellow {
    background: #d29922;
  }

  .plain-console__dot--green {
    background: #3fb950;
  }

  .plain-console__title {
    @apply ml-2 font-mono text-xs;
    color: #8b949e;
  }

  .plain-console__body {
    @apply px-6 py-5;
    font-family: "IBM Plex Mono", "Fira Code", "JetBrains Mono", monospace;
    color: #e6edf3;
    font-size: 0.9rem;
    line-height: 1.7;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
  }

  /* Override Shiki code block styles to blend with terminal */
  .plain-console__body pre {
    @apply my-2 rounded-none border-none p-0 !important;
    background: transparent !important;
  }

  .plain-console__body code {
    background: transparent !important;
    font-size: inherit;
  }

  /* Headings inside console */
  .plain-console__body h1,
  .plain-console__body h2,
  .plain-console__body h3 {
    @apply mb-3 font-bold;
    color: #e6edf3;
  }

  .plain-console__body h3 {
    @apply text-base;
    color: #7dd3fc;
  }

  /* Lists inside console */
  .plain-console__body ul {
    @apply my-2 space-y-1 pl-4;
    list-style-type: "▸ ";
    color: #c9d1d9;
  }

  .plain-console__body li {
    @apply text-sm;
  }

  /* Blockquote */
  .plain-console__body blockquote {
    @apply my-3 border-l-2 pl-4 italic;
    border-color: #3fb950;
    color: #8b949e;
  }

  /* Inline code */
  .plain-console__body :not(pre) > code {
    @apply rounded px-1.5 py-0.5 text-sm;
    background: rgba(110, 118, 129, 0.2) !important;
    color: #7dd3fc;
  }

  /* Paragraph */
  .plain-console__body p {
    @apply my-2;
    color: #8b949e;
  }

  /* Scrollbar */
  .plain-console__body::-webkit-scrollbar {
    width: 8px;
  }

  .plain-console__body::-webkit-scrollbar-track {
    background: transparent;
  }

  .plain-console__body::-webkit-scrollbar-thumb {
    background: #30363d;
    border-radius: 4px;
  }

  .plain-console__body::-webkit-scrollbar-thumb:hover {
    background: #484f58;
  }
}
</style>
