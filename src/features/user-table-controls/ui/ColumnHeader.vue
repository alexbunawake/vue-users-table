<script setup lang="ts">
import { ref, watch } from 'vue'
import { Popover } from '@/shared/ui'
import { useDebounceFn } from '@/shared/lib/useDebounceFn'
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

watch(search, (val) => {
  if (val !== local.value) local.value = val
})

const pushSearch = useDebounceFn((val: string) => {
  search.value = val
}, 700)
watch(local, pushSearch)

const isActive = () => props.activeField === props.field
const currentOrder = () => (isActive() ? props.order : null)

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
  <th class="p-2">
    <div class="inline-flex items-center gap-1.5">
      {{ label }}

      <button @click="cycleSort" class="inline-flex flex-col leading-none" :title="'Sort ' + label">
        <ChevronUpIcon
          class="w-3 h-3 -mb-0.5"
          :class="isActive() && order === 'asc' ? 'text-blue-500' : 'text-gray-300'"
        />
        <ChevronDownIcon
          class="w-3 h-3"
          :class="isActive() && order === 'desc' ? 'text-blue-500' : 'text-gray-300'"
        />
      </button>

      <Popover v-if="searchable">
        <template #trigger>
          <MagnifyingGlassIcon class="w-4 h-4" :class="local ? 'text-blue-500' : 'text-gray-400'" />
        </template>
        <template #content>
          <input
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
