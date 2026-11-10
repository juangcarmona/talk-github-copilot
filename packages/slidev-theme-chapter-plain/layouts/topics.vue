<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { onSlideEnter } from "@slidev/client";
import { useStaggeredMotion } from "../composables/useStaggeredMotion";

type TopicItem = {
  title: string;
  desc: string;
  audience: string;
  hot?: boolean;
  hotLabel?: string;
  icon?: string;
};

const props = defineProps<{
  topics?: TopicItem[];
}>();

const topics = props.topics ?? [];
const revealed = ref(true);
const topicsRef = ref<HTMLElement | null>(null);
const topicElements = computed(() => {
  const container = topicsRef.value;
  if (!container) return null;
  return Array.from(container.querySelectorAll<HTMLElement>(".plain-topics__item"));
});

const iconMap: Record<string, string> = {
  brain: "🧠",
  sparkles: "✨",
  terminal: "⌨️",
  code: "💻",
};

const resolveIcon = (name?: string) => iconMap[name ?? ""] ?? "⚡";

const onReveal = () => {
  if (!revealed.value) revealed.value = true;
};

useStaggeredMotion(topicElements, {
  step: 100,
});
</script>

<template>
  <div class="slidev-layout plain-topics">
    <div
      class="mx-auto flex h-full w-full max-w-6xl cursor-pointer flex-col justify-center px-4 md:px-8"
      @click="onReveal"
    >
      <div class="plain-topics__content mb-4 text-center">
        <slot />
      </div>

      <div v-if="topics.length" ref="topicsRef" class="grid grid-cols-1 gap-2.5 md:grid-cols-2">
        <div
          v-for="(topic, index) in topics"
          :key="`${topic.title}-${index}`"
          class="plain-topics__item group relative rounded-lg border p-2.5 shadow-md transition-all duration-500"
          :class="
            revealed
              ? topic.hot
                ? 'border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 hover:border-amber-400'
                : 'border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:border-gray-300'
              : 'border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 hover:border-gray-300'
          "
        >
          <transition name="plain-topics-reveal">
            <div
              v-if="revealed && topic.hotLabel"
              class="absolute top-2.5 right-2.5 flex items-center gap-2 rounded-full border px-2 py-0.5 text-[10px] font-bold"
              :class="
                topic.hot
                  ? 'border-amber-300 bg-amber-100 text-amber-700'
                  : 'border-gray-200 bg-gray-100 text-gray-500'
              "
            >
              {{ topic.hotLabel }}
            </div>
          </transition>

          <div
            class="mb-2 inline-flex items-center justify-center rounded-md p-2 transition-colors duration-500"
            :class="
              revealed
                ? topic.hot
                  ? 'bg-amber-100 text-amber-600'
                  : 'bg-gray-100 text-gray-500'
                : 'bg-gray-100 text-gray-400'
            "
          >
            <span class="text-base">{{ resolveIcon(topic.icon) }}</span>
          </div>
          <h3
            class="mb-2 text-[13px] font-semibold transition-colors duration-500"
            :class="revealed ? (topic.hot ? 'text-[#0F1729]' : 'text-[#1A1A2E]') : 'text-[#0F1729]'"
          >
            {{ topic.title }}
          </h3>
          <p class="mb-2 text-[11px] leading-relaxed text-[#6B7280]">
            {{ topic.desc }}
          </p>
          <div
            class="inline-block rounded-full px-2 py-0.5 font-mono text-[10px] transition-colors duration-500"
            :class="
              revealed
                ? topic.hot
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-gray-100 text-gray-500'
                : 'bg-gray-100 text-gray-500'
            "
          >
            👤 {{ topic.audience }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.slidev-layout.plain-topics {
  .plain-topics__content {
    h1,
    h2 {
      @apply mb-2 text-2xl font-bold text-[#0F1729] md:text-3xl;
    }
  }
}

.plain-topics-reveal-enter-active,
.plain-topics-reveal-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.plain-topics-reveal-enter-from,
.plain-topics-reveal-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(-6px);
}
</style>
