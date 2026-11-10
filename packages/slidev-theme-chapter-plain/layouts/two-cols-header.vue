<script setup lang="ts">
import StaggeredGroup from "../components/StaggeredGroup.vue";
</script>

<template>
  <div class="slidev-layout two-cols-header plain-two-cols-header">
    <div class="plain-two-cols-header__inner">
      <StaggeredGroup class="plain-two-cols-header__header" :base-delay="200">
        <slot />
      </StaggeredGroup>

      <div class="plain-two-cols-header__columns">
        <StaggeredGroup class="plain-two-cols-header__col" :base-delay="500">
          <slot name="left" />
        </StaggeredGroup>
        <StaggeredGroup class="plain-two-cols-header__col" :base-delay="650">
          <slot name="right" />
        </StaggeredGroup>
      </div>
    </div>
  </div>
</template>

<style>
.slidev-layout.plain-two-cols-header,
.slidev-layout.two-cols-header {
  .plain-two-cols-header__inner {
    @apply mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-6 py-10;
  }

  .plain-two-cols-header__header {
    @apply text-center;

    h1,
    h2 {
      @apply text-4xl font-bold text-[#0F1729] md:text-5xl;
    }

    p {
      @apply mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-[#6B7280];
    }
  }

  .plain-two-cols-header__columns {
    @apply grid items-start gap-8 md:grid-cols-2;
  }

  .plain-two-cols-header__col {
    @apply text-base leading-relaxed text-[#1A1A2E];

    h3 {
      @apply mb-3 text-xl font-semibold text-[#0F1729];

      code {
        @apply rounded-md px-2 py-1 text-lg font-semibold;
        background: rgba(61, 90, 254, 0.1);
        color: #3d5afe;
      }
    }

    :not(pre) > code {
      @apply rounded-md px-1.5 py-0.5 text-sm font-medium;
      background: rgba(61, 90, 254, 0.1);
      color: #3d5afe;
    }

    p {
      @apply mb-3 text-base leading-relaxed text-[#6B7280];
    }

    strong {
      @apply font-bold text-[#3d5afe];
    }

    img {
      @apply w-full rounded-2xl border border-gray-200 shadow-lg;
    }
  }
}
</style>
