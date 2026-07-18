<script setup lang="ts">
import { useToast } from '@/shared/lib/toast/useToast'
import {
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

const { toasts, remove } = useToast()

const styles = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
}

const icons = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  info: InformationCircleIcon,
}
</script>

<template>
  <Teleport to="body">
    <div
      role="status"
      aria-live="polite"
      aria-relevant="additions"
      class="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-80 max-w-[calc(100vw-2rem)]"
    >
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="flex items-start gap-2 border rounded-lg shadow-lg p-3"
          :class="styles[toast.type]"
        >
          <component :is="icons[toast.type]" class="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
          <span class="text-sm flex-1">{{ toast.message }}</span>
          <button
            type="button"
            aria-label="Dismiss notification"
            @click="remove(toast.id)"
            class="shrink-0"
          >
            <XMarkIcon class="w-4 h-4 opacity-60 hover:opacity-100" aria-hidden="true" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
.toast-move {
  transition: transform 0.3s ease;
}
</style>
