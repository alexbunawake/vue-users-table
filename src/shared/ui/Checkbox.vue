<script setup lang="ts">
import { computed } from 'vue'
import { CheckboxIndicator, CheckboxRoot } from 'reka-ui'
import { CheckIcon, MinusIcon } from '@heroicons/vue/24/outline'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    label: string
    indeterminate?: boolean
  }>(),
  { indeterminate: false },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const state = computed(() => (props.indeterminate ? 'indeterminate' : props.modelValue))

function onUpdate(value: boolean | 'indeterminate') {
  emit('update:modelValue', value === true)
}
</script>

<template>
  <CheckboxRoot
    :model-value="state"
    :aria-label="label"
    class="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-gray-300 bg-white cursor-pointer outline-none focus-visible:ring focus-visible:ring-blue-400 data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 data-[state=indeterminate]:border-blue-500 data-[state=indeterminate]:bg-blue-500"
    @update:model-value="onUpdate"
  >
    <CheckboxIndicator class="flex items-center justify-center text-white">
      <MinusIcon v-if="indeterminate" class="h-3.5 w-3.5" aria-hidden="true" />
      <CheckIcon v-else class="h-3.5 w-3.5" aria-hidden="true" />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
