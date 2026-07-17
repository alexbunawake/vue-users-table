<template>
  <div class="flex flex-col gap-4">
    <RouterLink to="/users" class="flex items-center gap-2.5"
      ><ArrowLongLeftIcon class="w-6 text-gray-500" /> Back to users</RouterLink
    >
    <h1>Create user</h1>
    <CreateUserForm />
  </div>
</template>

<script lang="ts" setup>
import { CreateUserForm } from '@/features/manage-users/create-user'
import { ArrowLongLeftIcon } from '@heroicons/vue/24/outline'
</script>

<style scoped></style>
