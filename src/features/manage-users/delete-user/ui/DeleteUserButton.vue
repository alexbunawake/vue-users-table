<template>
  <Button @click="confirmRemove" variant="danger" size="sm">
    <TrashIcon class="w-5 h-5" />
  </Button>
</template>

<script setup lang="ts">
import { TrashIcon } from '@heroicons/vue/24/outline'
import { Button } from '@/shared/ui'
import { useDeleteUser } from '@/entities/user'

const props = defineProps<{ userId: string }>()

const { mutate } = useDeleteUser()

const confirmRemove = () => {
  const isConfirm = confirm('Are you sure you want to delete this user?')

  if (isConfirm) {
    mutate(props.userId)
  }
}
</script>
