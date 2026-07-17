<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'danger'
    size?: 'sm' | 'md' | 'lg'
    type?: 'button' | 'submit'
    disabled?: boolean
  }>(),
  { variant: 'primary', size: 'md', type: 'button', disabled: false },
)

const variantClass = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  danger: 'bg-red-500 text-white hover:bg-red-600',
}

const sizeClass = {
  sm: 'px-1.5 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="rounded font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    :class="[variantClass[variant], sizeClass[size]]"
  >
    <slot />
  </button>
</template>
