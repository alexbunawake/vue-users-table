<script setup lang="ts">
import { computed } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { visitedLabel, type VisitedPreset } from '../model/visited'

type Chip =
  | { kind: 'field'; key: string; field: string; label: string; value: string }
  | { kind: 'visited'; key: string; label: string; value: string }

const props = defineProps<{
  filters: Record<string, string>
  fieldLabels: Record<string, string>
  visited: VisitedPreset
}>()

const emit = defineEmits<{
  (e: 'remove-field', field: string): void
  (e: 'remove-visited'): void
  (e: 'clear'): void
}>()

const chips = computed<Chip[]>(() => {
  const list: Chip[] = Object.entries(props.filters).map(([field, value]) => ({
    kind: 'field',
    key: `field-${field}`,
    field,
    label: props.fieldLabels[field] ?? field,
    value,
  }))

  if (props.visited) {
    list.push({
      kind: 'visited',
      key: 'visited',
      label: 'Last visited',
      value: visitedLabel(props.visited),
    })
  }

  return list
})
</script>

<template>
  <div
    v-if="chips.length"
    class="flex flex-wrap items-center gap-2 mb-3"
    role="region"
    aria-label="Active filters"
  >
    <span class="text-sm text-gray-600">Filters:</span>

    <span
      v-for="chip in chips"
      :key="chip.key"
      class="inline-flex items-center gap-1 bg-blue-50 border border-blue-200 text-blue-800 rounded-full pl-2.5 pr-1 py-0.5 text-sm"
    >
      <span>{{ chip.label }}: {{ chip.value }}</span>
      <button
        type="button"
        :aria-label="`Remove filter ${chip.label}`"
        class="rounded-full p-0.5 hover:bg-blue-100 cursor-pointer"
        @click="chip.kind === 'visited' ? emit('remove-visited') : emit('remove-field', chip.field)"
      >
        <XMarkIcon class="w-3.5 h-3.5" aria-hidden="true" />
      </button>
    </span>

    <button
      type="button"
      class="text-sm text-gray-600 underline hover:text-gray-900 cursor-pointer"
      @click="emit('clear')"
    >
      Clear all
    </button>
  </div>
</template>
