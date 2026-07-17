<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg'
    label?: string
  }>(),
  { size: 'md', label: 'Loading' },
)

const sizeClass = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-10 h-10 border-[3px]',
}
</script>

<template>
  <span
    role="status"
    :aria-label="label"
    class="inline-block animate-spin rounded-full border-current border-t-transparent text-blue-500"
    :class="sizeClass[size]"
  />
</template>
