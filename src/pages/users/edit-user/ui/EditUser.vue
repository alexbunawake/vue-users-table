<template>
  <div class="flex flex-col gap-4">
    <RouterLink to="/users" class="flex items-center gap-2.5"
      ><ArrowLongLeftIcon class="w-6 text-gray-500" /> Back to users</RouterLink
    >
    <h1>Edit user</h1>
    <EditUserForm :user-id="userId" />
  </div>
</template>

<script lang="ts" setup>
import { ArrowLongLeftIcon } from '@heroicons/vue/24/outline'
import { EditUserForm } from '@/features/manage-users/edit-user'
import { useRoute } from 'vue-router'

const route = useRoute()
const userId = route.params.id as string
</script>

<style scoped></style>
