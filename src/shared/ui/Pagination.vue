<script setup lang="ts">
import {
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
  PaginationRoot,
} from 'reka-ui'

withDefaults(
  defineProps<{
    total: number
    itemsPerPage: number
    siblings?: number
  }>(),
  { siblings: 1 },
)

const page = defineModel<number>('page', { required: true })

const navButtonClass =
  'px-2 sm:px-3 py-1 rounded cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100'
</script>

<template>
  <PaginationRoot
    v-if="total > itemsPerPage"
    v-model:page="page"
    :total="total"
    :items-per-page="itemsPerPage"
    :sibling-count="siblings"
    show-edges
    class="mt-4"
  >
    <PaginationList v-slot="{ items }" class="flex flex-wrap gap-1 items-center justify-center">
      <PaginationPrev :class="navButtonClass" aria-label="Previous page">
        <span aria-hidden="true">←</span>
      </PaginationPrev>

      <template v-for="(item, index) in items">
        <PaginationListItem
          v-if="item.type === 'page'"
          :key="`page-${item.value}`"
          :value="item.value"
          :aria-label="`Page ${item.value}`"
          class="px-2 sm:px-3 py-1 rounded min-w-[2rem] sm:min-w-[2.25rem] cursor-pointer hover:bg-gray-100 data-[selected]:bg-blue-500 data-[selected]:text-white"
        >
          {{ item.value }}
        </PaginationListItem>
        <PaginationEllipsis
          v-else
          :key="`ellipsis-${index}`"
          :index="index"
          class="px-1 sm:px-2 py-1 text-gray-400 select-none"
        >
          &#8230;
        </PaginationEllipsis>
      </template>

      <PaginationNext :class="navButtonClass" aria-label="Next page">
        <span aria-hidden="true">→</span>
      </PaginationNext>
    </PaginationList>
  </PaginationRoot>
</template>
