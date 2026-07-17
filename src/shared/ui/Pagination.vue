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
  <div v-if="totalPages > 1" class="flex gap-1 items-center justify-center mt-4">
    <button
      :disabled="page === 1"
      @click="go(page - 1)"
      class="px-3 py-1 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
    >
      ←
    </button>

    <button
      v-for="pageNum in totalPages"
      :key="pageNum"
      @click="go(pageNum)"
      :class="[
        'px-3 py-1 rounded min-w-[2.25rem]',
        pageNum === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-100',
      ]"
    >
      {{ pageNum }}
    </button>

    <button
      :disabled="page === totalPages"
      @click="go(page + 1)"
      class="px-3 py-1 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
    >
      →
    </button>
  </div>
</template>
