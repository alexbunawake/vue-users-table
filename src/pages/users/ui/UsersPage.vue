<script setup lang="ts">
import { UsersTable } from '@/widgets/users-table'
import { Button } from '@/shared/ui'
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h1>Users</h1>
      <RouterLink :to="`/users/new`">
        <Button>Create user</Button>
      </RouterLink>
    </div>
    <UsersTable />
  </div>
</template>

<style scoped></style>
