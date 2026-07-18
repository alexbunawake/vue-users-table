<script setup lang="ts">
const props = defineProps<{
  page: number
  totalPages: number
}>()

const emit = defineEmits<{
  (e: 'update:page', value: number): void
}>()

function go(target: number) {
  if (target < 1 || target > props.totalPages || target === props.page) return
  emit('update:page', target)
}
</script>

<template>
  <nav
    v-if="totalPages > 1"
    aria-label="Pagination"
    class="flex gap-1 items-center justify-center mt-4"
  >
    <button
      type="button"
      :disabled="page === 1"
      aria-label="Previous page"
      @click="go(page - 1)"
      class="px-3 py-1 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
    >
      <span aria-hidden="true">←</span>
    </button>

    <button
      v-for="pageNum in totalPages"
      :key="pageNum"
      type="button"
      :aria-label="`Page ${pageNum}`"
      :aria-current="pageNum === page ? 'page' : undefined"
      @click="go(pageNum)"
      :class="[
        'px-3 py-1 rounded min-w-[2.25rem]',
        pageNum === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-100',
      ]"
    >
      {{ pageNum }}
    </button>

    <button
      type="button"
      :disabled="page === totalPages"
      aria-label="Next page"
      @click="go(page + 1)"
      class="px-3 py-1 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
    >
      <span aria-hidden="true">→</span>
    </button>
  </nav>
</template>
