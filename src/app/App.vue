<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Toast } from '@/shared/ui'

const route = useRoute()
const mainRef = ref<HTMLElement | null>(null)
const routeAnnouncement = ref('')

watch(
  () => route.path,
  async () => {
    await nextTick()
    mainRef.value?.focus()
    routeAnnouncement.value = document.title
  },
)
</script>

<template>
  <a
    href="#main-content"
    class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[200] focus:bg-white focus:border focus:rounded focus:px-3 focus:py-2"
  >
    Skip to main content
  </a>

  <main id="main-content" ref="mainRef" tabindex="-1" class="outline-none">
    <RouterView />
  </main>

  <p aria-live="polite" class="sr-only">{{ routeAnnouncement }}</p>

  <Toast />
</template>
