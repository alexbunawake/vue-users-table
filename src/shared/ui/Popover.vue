<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, useId } from 'vue'
import { useThrottleFn } from '@/shared/lib/useThrottleFn.ts'

const props = defineProps<{
  label?: string
}>()

const open = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const popoverRef = ref<HTMLElement | null>(null)
const pos = ref({ top: 0, left: 0 })
const popoverId = useId()

const POPOVER_WIDTH = 240
const MARGIN = 8

const FOCUSABLE = 'input, select, textarea, button, a[href], [tabindex]:not([tabindex="-1"])'

function updatePosition() {
  if (!triggerRef.value) {
    return
  }

  const rect = triggerRef.value.getBoundingClientRect()
  const top = rect.bottom + 4

  let left = rect.left

  if (left + POPOVER_WIDTH > window.innerWidth - MARGIN) {
    left = window.innerWidth - POPOVER_WIDTH - MARGIN
  }

  if (left < MARGIN) {
    left = MARGIN
  }

  pos.value = { top, left }
}

function close(returnFocus = true) {
  if (!open.value) return

  open.value = false

  if (returnFocus) {
    triggerRef.value?.querySelector<HTMLElement>('button')?.focus()
  }
}

async function toggle() {
  if (open.value) {
    close()
    return
  }

  updatePosition()
  open.value = true

  await nextTick()
  popoverRef.value?.querySelector<HTMLElement>(FOCUSABLE)?.focus()
}

function onClickOutside(e: MouseEvent) {
  const t = e.target as Node
  if (
    triggerRef.value &&
    !triggerRef.value.contains(t) &&
    popoverRef.value &&
    !popoverRef.value.contains(t)
  ) {
    close(false)
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

const throttledUpdate = useThrottleFn(updatePosition, 16)

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  document.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', throttledUpdate)
  window.addEventListener('scroll', throttledUpdate, true)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  document.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', throttledUpdate)
  window.removeEventListener('scroll', throttledUpdate, true)
})
</script>

<template>
  <div ref="triggerRef" class="inline-flex items-center">
    <button
      type="button"
      :aria-label="props.label"
      :aria-expanded="open"
      :aria-controls="open ? popoverId : undefined"
      aria-haspopup="dialog"
      @click.stop="toggle"
    >
      <slot name="trigger" />
    </button>
  </div>

  <Teleport to="body">
    <div
      v-if="open"
      :id="popoverId"
      ref="popoverRef"
      role="dialog"
      :aria-label="props.label"
      class="fixed z-50 bg-white border rounded shadow-lg p-3"
      :style="{
        top: pos.top + 'px',
        left: pos.left + 'px',
        width: POPOVER_WIDTH + 'px',
      }"
      @click.stop
    >
      <slot name="content" />
    </div>
  </Teleport>
</template>
