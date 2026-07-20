<script setup lang="ts">
import { useId } from 'vue'
import { VISITED_PRESETS, type VisitedPreset } from '../model/visited'

defineProps<{
  modelValue: VisitedPreset
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: VisitedPreset): void
}>()

const selectId = useId()

function onChange(event: Event) {
  emit('update:modelValue', (event.target as HTMLSelectElement).value as VisitedPreset)
}
</script>

<template>
  <div class="flex items-center gap-2 text-sm">
    <label :for="selectId" class="text-gray-600">Last visited</label>
    <select
      :id="selectId"
      :value="modelValue"
      @change="onChange"
      class="border rounded px-2 py-1 outline-none focus:ring"
    >
      <option v-for="preset in VISITED_PRESETS" :key="preset.value" :value="preset.value">
        {{ preset.label }}
      </option>
    </select>
  </div>
</template>
