<script setup lang="ts">
import { computed, ref } from "vue";
import { useStaggeredMotion } from "../composables/useStaggeredMotion";

type CardItem = {
  title: string;
  desc: string;
  tags?: string[];
};

const props = defineProps<{
  cards?: CardItem[];
}>();

const cards = computed(() => props.cards ?? []);
const contentRef = ref<HTMLElement | null>(null);
const cardsRef = ref<HTMLElement | null>(null);
const contentElements = computed(() => {
  const content = contentRef.value;
  if (!content) return null;
  return Array.from(content.children) as HTMLElement[];
});
const cardElements = computed(() => {
  const container = cardsRef.value;
  if (!container) return null;
  return Array.from(container.querySelectorAll<HTMLElement>(".plain-cards__item"));
});
const cardColors = [
  {
    iconBg: "bg-[#3D5AFE]/20",
    iconText: "text-[#3D5AFE]",
    borderHover: "hover:border-[#3D5AFE]/50",
    toolBadge: "bg-[#C5CAE9]/20 text-[#3D5AFE] border border-[#C5CAE9]",
  },
  {
    iconBg: "bg-purple-500/20",
    iconText: "text-purple-600",
    borderHover: "hover:border-purple-500/50",
    toolBadge: "bg-purple-50 text-purple-700 border border-purple-200",
  },
  {
    iconBg: "bg-[#3ABAAF]/20",
    iconText: "text-[#3ABAAF]",
    borderHover: "hover:border-[#3ABAAF]/50",
    toolBadge: "bg-green-50 text-[#3ABAAF] border border-green-200",
  },
];

const getCardColors = (index: number) => cardColors[index] ?? cardColors[0];

useStaggeredMotion(contentElements, {
  step: 100,
});

useStaggeredMotion(cardElements, () => {
  const contentCount = contentElements.value?.length ?? 0;
  return {
    baseDelay: contentCount * 100,
    step: 120,
  };
});
</script>

<template>
  <div class="slidev-layout plain-cards">
    <div class="mx-auto flex h-full w-full flex-col justify-center">
      <div ref="contentRef" class="plain-cards__content mb-6 text-center">
        <slot />
      </div>
      <div
        v-if="cards.length"
        ref="cardsRef"
        class="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]"
      >
        <div
          v-for="(card, index) in cards"
          :key="`${card.title}-${index}`"
          class="plain-cards__item group rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
          :class="getCardColors(index).borderHover"
        >
          <h3 class="mb-3 text-lg font-bold text-[#0F1729]">
            {{ card.title }}
          </h3>
          <p class="text-sm leading-relaxed text-[#6B7280]">
            {{ card.desc }}
          </p>
          <div v-if="card.tags?.length" class="mt-6 flex flex-wrap gap-2">
            <span
              v-for="(tag, tagIndex) in card.tags"
              :key="`${tag}-${tagIndex}`"
              class="rounded-full px-3 py-1.5 text-[9px] font-medium"
              :class="getCardColors(index).toolBadge"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.slidev-layout.plain-cards {
  .plain-cards__content {
    h1,
    h2 {
      @apply text-3xl font-bold text-[#0F1729] md:text-4xl;
    }

    p {
      @apply text-lg text-[#6B7280];
    }
  }
}
</style>
