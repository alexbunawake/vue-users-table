<script setup lang="ts">
import { ref, watch, useId } from 'vue'
import { Popover } from '@/shared/ui'
import { useDebounceFn } from '@/shared/lib/debounce'
import { ChevronUpIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'

type Order = 'asc' | 'desc'

const props = defineProps<{
  field: string
  label: string
  activeField: string
  order: Order
  searchable?: boolean
}>()

const emit = defineEmits<{
  (e: 'sort', field: string, order: Order | null): void
}>()

const search = defineModel<string>('search', { default: '' })
const local = ref(search.value)
const searchInputId = useId()

watch(search, (val) => {
  if (val !== local.value) local.value = val
})

const pushSearch = useDebounceFn((val: string) => {
  search.value = val
}, 700)
watch(local, pushSearch)

const isActive = () => props.activeField === props.field
const currentOrder = () => (isActive() ? props.order : null)

const ariaSort = () => {
  const curr = currentOrder()
  if (curr === 'asc') return 'ascending'
  if (curr === 'desc') return 'descending'
  return 'none'
}

function cycleSort() {
  const curr = currentOrder()

  if (curr === null) {
    emit('sort', props.field, 'asc')
  } else if (curr === 'asc') {
    emit('sort', props.field, 'desc')
  } else {
    emit('sort', props.field, null)
  }
}
</script>

<template>
  <th scope="col" class="p-2" :aria-sort="ariaSort()">
    <div class="flex items-center gap-1.5">
      <button
        type="button"
        @click="cycleSort"
        class="flex items-center gap-1.5 cursor-pointer"
        :aria-label="`Sort by ${label}`"
      >
        {{ label }}
        <span class="inline-flex flex-col leading-none" aria-hidden="true">
          <ChevronUpIcon
            class="w-3 h-3 -mb-1"
            :class="isActive() && order === 'asc' ? 'text-blue-500' : 'text-gray-400'"
          />
          <ChevronDownIcon
            class="w-3 h-3"
            :class="isActive() && order === 'desc' ? 'text-blue-500' : 'text-gray-400'"
          />
        </span>
      </button>

      <Popover v-if="searchable" :label="`Search ${label}`">
        <template #trigger>
          <MagnifyingGlassIcon
            class="w-4 h-4 cursor-pointer"
            :class="local ? 'text-blue-500' : 'text-gray-400'"
            aria-hidden="true"
          />
        </template>
        <template #content>
          <label :for="searchInputId" class="sr-only">Search {{ label }}</label>
          <input
            :id="searchInputId"
            v-model="local"
            type="text"
            :placeholder="`Search ${label}`"
            class="border rounded px-2 py-1 outline-none focus:ring text-sm w-full"
            @click.stop
          />
        </template>
      </Popover>
    </div>
  </th>
</template>
