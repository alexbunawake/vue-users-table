<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useThrottleFn } from '@/shared/lib/useThrottleFn.ts'

const open = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const popoverRef = ref<HTMLElement | null>(null)
const pos = ref({ top: 0, left: 0 })

const POPOVER_WIDTH = 240
const MARGIN = 8

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

function toggle() {
  if (!open.value) updatePosition()
  open.value = !open.value
}

function onClickOutside(e: MouseEvent) {
  const t = e.target as Node
  if (
    triggerRef.value &&
    !triggerRef.value.contains(t) &&
    popoverRef.value &&
    !popoverRef.value.contains(t)
  ) {
    open.value = false
  }
}

const throttledUpdate = useThrottleFn(updatePosition, 16)

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  window.addEventListener('resize', throttledUpdate)
  window.addEventListener('scroll', throttledUpdate, true)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  window.removeEventListener('resize', throttledUpdate)
  window.removeEventListener('scroll', throttledUpdate, true)
})
</script>

<template>
  <div ref="triggerRef" class="inline-block">
    <button @click.stop="toggle"><slot name="trigger" /></button>
  </div>

  <Teleport to="body">
    <div
      v-if="open"
      ref="popoverRef"
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
