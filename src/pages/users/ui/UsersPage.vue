<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { UsersTable } from '@/widgets/users-table'
import { Button } from '@/shared/ui'
import { ROUTES, USERS_RETURN_PATH_KEY } from '@/shared/config'
import { useReturnPath } from '@/shared/lib/useReturnPath'

const route = useRoute()
const { save } = useReturnPath(USERS_RETURN_PATH_KEY, ROUTES.usersList)

watch(
  () => route.fullPath,
  (path) => save(path),
  { immediate: true },
)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h1>Users</h1>
      <Button :to="ROUTES.userCreate">Create user</Button>
    </div>
    <UsersTable />
  </div>
</template>

<style scoped></style>
