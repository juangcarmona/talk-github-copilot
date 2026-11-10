<script setup lang="ts">
import { computed, ref } from "vue";
import { useStaggeredMotion } from "../composables/useStaggeredMotion";

const props = withDefaults(
  defineProps<{
    active?: number;
    tagline?: string;
    image?: string;
    agenda?: string;
  }>(),
  {
    active: -1,
    tagline: "",
    image: "",
    agenda: "",
  },
);

const items = computed(() =>
  props.agenda
    ? props.agenda
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [],
);

const rightRef = ref<HTMLElement | null>(null);
const rightElements = computed(() => {
  const el = rightRef.value;
  if (!el) return null;
  return Array.from(el.children) as HTMLElement[];
});

useStaggeredMotion(rightElements, { baseDelay: 200, step: 100 });
</script>

<template>
  <div class="slidev-layout plain-agenda">
    <div class="plain-agenda__left">
      <div class="plain-agenda__left-content">
        <slot name="left">
          <h1>Agenda</h1>
        </slot>
      </div>
      <div v-if="image" class="plain-agenda__image-strip">
        <img :src="image" alt="" />
      </div>
    </div>
    <div class="plain-agenda__right">
      <div ref="rightRef" class="plain-agenda__items">
        <!-- Prop-driven agenda -->
        <ol v-if="items.length" :class="{ 'plain-agenda__no-active': active < 1 }">
          <li
            v-for="(item, i) in items"
            :key="i"
            :class="{ 'plain-agenda__active': i + 1 === active }"
          >
            {{ item }}
          </li>
        </ol>
        <!-- Fallback: slot content -->
        <slot v-else />
      </div>
      <p v-if="tagline" class="plain-agenda__tagline">{{ tagline }}</p>
    </div>
  </div>
</template>

<style>
.slidev-layout.plain-agenda {
  display: grid;
  grid-template-columns: 1fr 1.8fr;
  height: 100%;
  padding: 0;
}

.plain-agenda__left {
  background: var(--plain-navy);
  display: flex;
  align-items: center;
  padding: 2.5rem 2rem;
  position: relative;

  .plain-agenda__left-content {
    position: relative;
    z-index: 1;

    h1 {
      @apply text-4xl font-bold text-white;
    }

    h2 {
      @apply text-2xl font-bold text-white;
    }
  }

  .plain-agenda__image-strip {
    position: absolute;
    right: 0;
    top: 0;
    width: 3.5rem;
    height: 100%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.plain-agenda__right {
  background: var(--plain-accent);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2.5rem 3rem;
  position: relative;

  .plain-agenda__items {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;

    ol {
      list-style: none;
      counter-reset: agenda;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      padding: 0;
      margin: 0;
    }

    li {
      counter-increment: agenda;
      display: flex;
      align-items: baseline;
      gap: 0.75rem;
      color: rgba(255, 255, 255, 0.5);
      font-size: 1.1rem;
      font-weight: 400;
      padding: 0;
      margin: 0;
      transition: all 0.3s ease;

      &::before {
        content: counter(agenda) ".";
        font-weight: 600;
        flex-shrink: 0;
      }
    }

    /* All items emphasized when no active selection */
    ol.plain-agenda__no-active li {
      color: rgba(255, 255, 255, 0.9);
      font-weight: 600;
    }

    /* Active item via prop */
    li.plain-agenda__active {
      color: white;
      font-weight: 700;
      font-size: 1.25rem;
    }

    /* Legacy: active item via **bold** in slot content */
    li:has(strong) {
      color: white;
      font-weight: 700;
      font-size: 1.25rem;

      strong {
        font-weight: 700;
        color: white;
      }
    }
  }

  .plain-agenda__tagline {
    @apply mt-auto text-right text-base font-semibold italic text-white/80;
    padding-top: 2rem;
  }
}
</style>
