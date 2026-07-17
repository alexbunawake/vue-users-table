<script setup lang="ts">
import { UserForm } from '@/features/user-form'
import { useCreateUser } from '@/entities/user'

const { isPending, mutate } = useCreateUser()
</script>

<template>
  <UserForm submit-label="Create user" :is-submitting="isPending" @submit="mutate" />
</template>
