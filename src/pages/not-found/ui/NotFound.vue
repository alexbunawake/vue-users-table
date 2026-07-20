<template>
  <div class="flex flex-col items-start gap-4">
    <h1>Page not found</h1>
    <p class="text-gray-600">The page you are looking for does not exist.</p>
    <Button :to="ROUTES.usersList">Back to users</Button>
  </div>
</template>

<script lang="ts" setup>
import { Button } from '@/shared/ui'
import { ROUTES } from '@/shared/config'
</script>
