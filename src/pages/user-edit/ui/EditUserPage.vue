<template>
  <div class="flex flex-col gap-4">
    <RouterLink :to="backPath" class="flex items-center gap-2.5"
      ><ArrowLongLeftIcon class="w-6 text-gray-500" aria-hidden="true" /> Back to users</RouterLink
    >
    <h1>Edit user</h1>
    <EditUserForm :user-id="userId" />
  </div>
</template>

<script lang="ts" setup>
import { ArrowLongLeftIcon } from '@heroicons/vue/24/outline'
import { EditUserForm } from '@/features/manage-users/edit-user'
import { useRoute } from 'vue-router'
import { ROUTES, USERS_RETURN_PATH_KEY } from '@/shared/config'
import { useReturnPath } from '@/shared/lib/useReturnPath'

const route = useRoute()
const userId = route.params.id as string
const backPath = useReturnPath(USERS_RETURN_PATH_KEY, ROUTES.usersList).resolve()
</script>

<style scoped></style>
