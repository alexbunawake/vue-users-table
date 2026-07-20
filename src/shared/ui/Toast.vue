<script setup lang="ts">
import { ToastClose, ToastDescription, ToastProvider, ToastRoot, ToastViewport } from 'reka-ui'
import { useToast } from '../lib/toast'
import {
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

const { toasts, remove } = useToast()

function onAnimationEnd(event: AnimationEvent, id: number) {
  const element = event.currentTarget as HTMLElement

  if (element.dataset.state === 'closed') remove(id)
}

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
  <ToastProvider :duration="3000" swipe-direction="right">
    <ToastRoot
      v-for="toast in toasts"
      :key="toast.id"
      type="foreground"
      class="toast flex items-start gap-2 border rounded-lg shadow-lg p-3"
      :class="styles[toast.type]"
      @animationend="onAnimationEnd($event, toast.id)"
    >
      <component :is="icons[toast.type]" class="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
      <ToastDescription class="text-sm flex-1">{{ toast.message }}</ToastDescription>
      <ToastClose aria-label="Dismiss notification" class="shrink-0 cursor-pointer">
        <XMarkIcon class="w-4 h-4 opacity-60 hover:opacity-100" aria-hidden="true" />
      </ToastClose>
    </ToastRoot>

    <ToastViewport
      class="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-80 max-w-[calc(100vw-2rem)] outline-none"
    />
  </ToastProvider>
</template>

<style>
.toast[data-state='open'] {
  animation: toast-in 0.3s ease;
}
.toast[data-state='closed'] {
  animation: toast-out 0.3s ease;
}
.toast[data-swipe='move'] {
  transform: translateX(var(--reka-toast-swipe-move-x));
}
.toast[data-swipe='cancel'] {
  transform: translateX(0);
  transition: transform 200ms ease-out;
}
.toast[data-swipe='end'] {
  animation: toast-out 0.2s ease;
}

@keyframes toast-in {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
}

@keyframes toast-out {
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}
</style>
