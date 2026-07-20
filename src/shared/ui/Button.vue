<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { RouterLink, type RouteLocationRaw } from 'vue-router'

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'danger'
    size?: 'sm' | 'md' | 'lg'
    type?: 'button' | 'submit'
    disabled?: boolean
    to?: RouteLocationRaw
  }>(),
  { variant: 'primary', size: 'md', type: 'button', disabled: false, to: undefined },
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

const baseClass =
  'inline-flex items-center justify-center rounded font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'

const isLink = computed(() => props.to !== undefined)
</script>

<template>
  <Primitive
    :as="isLink ? RouterLink : 'button'"
    :to="to"
    :type="isLink ? undefined : type"
    :disabled="isLink ? undefined : disabled"
    :class="[baseClass, variantClass[variant], sizeClass[size]]"
  >
    <slot />
  </Primitive>
</template>
