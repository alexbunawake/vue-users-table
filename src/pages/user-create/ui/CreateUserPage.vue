<template>
  <div class="flex flex-col gap-4">
    <RouterLink :to="backPath" class="flex items-center gap-2.5"
      ><ArrowLongLeftIcon class="w-6 text-gray-500" aria-hidden="true" /> Back to users</RouterLink
    >
    <h1>Create user</h1>
    <CreateUserForm />
  </div>
</template>

<script lang="ts" setup>
import { CreateUserForm } from '@/features/manage-users/create-user'
import { ArrowLongLeftIcon } from '@heroicons/vue/24/outline'
import { ROUTES, USERS_RETURN_PATH_KEY } from '@/shared/config'
import { useReturnPath } from '@/shared/lib/storage'

const backPath = useReturnPath(USERS_RETURN_PATH_KEY, ROUTES.usersList).resolve()
</script>

<style scoped></style>
