<script setup lang="ts">
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui'

withDefaults(
  defineProps<{
    label: string
    width?: number
    side?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
    disabled?: boolean
  }>(),
  { width: 240, side: 'bottom', align: 'start', disabled: false },
)

const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <PopoverRoot v-model:open="open">
    <PopoverTrigger
      :aria-label="label"
      :disabled="disabled"
      class="inline-flex items-center cursor-pointer outline-none focus-visible:ring focus-visible:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <slot name="trigger" :open="open" />
    </PopoverTrigger>

    <PopoverPortal>
      <PopoverContent
        :side="side"
        :align="align"
        :side-offset="6"
        :collision-padding="8"
        :aria-label="label"
        :style="{ width: `${width}px` }"
        class="z-50 rounded-md border border-gray-200 bg-white p-3 shadow-lg outline-none"
      >
        <slot name="content" :close="() => (open = false)" />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
