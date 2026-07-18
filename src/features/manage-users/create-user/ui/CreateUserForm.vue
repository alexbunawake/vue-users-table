<script setup lang="ts">
import { UserForm } from '@/features/user-form'
import { useCreateUser } from '@/entities/user'

const { isPending, mutate, error } = useCreateUser()
</script>

<template>
  <UserForm
    submit-label="Create user"
    :is-submitting="isPending"
    :error-message="error?.message"
    @submit="mutate"
  />
</template>
