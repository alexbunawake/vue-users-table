<script setup lang="ts">
import { Button } from '@/shared/ui'
import { useDeleteUsers } from '@/entities/user'

const props = defineProps<{ ids: string[] }>()

const emit = defineEmits<{
  (e: 'deleted'): void
  (e: 'cancel'): void
}>()

const { mutate, isPending } = useDeleteUsers()

function confirmRemove() {
  const count = props.ids.length
  const isConfirmed = confirm(
    `Are you sure you want to delete ${count} ${count === 1 ? 'user' : 'users'}?`,
  )

  if (!isConfirmed) return

  mutate([...props.ids], {
    onSuccess: () => emit('deleted'),
  })
}
</script>

<template>
  <div
    v-if="ids.length"
    role="region"
    aria-label="Bulk actions"
    class="flex flex-wrap items-center gap-3 mb-3 border border-blue-200 bg-blue-50 rounded px-3 py-2"
  >
    <p aria-live="polite" class="text-sm text-blue-900">
      {{ ids.length }} {{ ids.length === 1 ? 'user' : 'users' }} selected
    </p>

    <Button variant="danger" size="sm" :disabled="isPending" @click="confirmRemove">
      {{ isPending ? 'Deleting…' : 'Delete selected' }}
    </Button>

    <button
      type="button"
      class="text-sm text-gray-600 underline hover:text-gray-900 cursor-pointer"
      @click="emit('cancel')"
    >
      Clear selection
    </button>
  </div>
</template>
