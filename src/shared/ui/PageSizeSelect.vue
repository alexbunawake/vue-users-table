<script setup lang="ts">
import { useId } from 'vue'
import {
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectTrigger,
  SelectRoot,
  SelectValue,
  SelectViewport,
} from 'reka-ui'
import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'

defineProps<{
  options: readonly number[]
}>()

const modelValue = defineModel<number>({ required: true })

const labelId = useId()
</script>

<template>
  <div class="flex items-center gap-2 text-sm">
    <span :id="labelId" class="text-gray-600">Rows per page</span>
    <SelectRoot v-model="modelValue">
      <SelectTrigger
        :aria-labelledby="labelId"
        class="flex items-center gap-1 border rounded px-2 py-1 cursor-pointer outline-none focus:ring"
      >
        <SelectValue />
        <ChevronDownIcon class="w-4 h-4 text-gray-500" aria-hidden="true" />
      </SelectTrigger>

      <SelectPortal>
        <SelectContent
          position="popper"
          :side-offset="4"
          class="z-50 rounded-md border border-gray-200 bg-white shadow-lg outline-none"
        >
          <SelectViewport class="p-1">
            <SelectItem
              v-for="option in options"
              :key="option"
              :value="option"
              class="flex items-center gap-2 px-2 py-1 rounded cursor-pointer outline-none data-[highlighted]:bg-blue-50 data-[state=checked]:text-blue-600"
            >
              <SelectItemText>{{ option }}</SelectItemText>
              <SelectItemIndicator class="ml-auto">
                <CheckIcon class="w-4 h-4" aria-hidden="true" />
              </SelectItemIndicator>
            </SelectItem>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  </div>
</template>
