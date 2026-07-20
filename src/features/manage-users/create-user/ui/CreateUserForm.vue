<script setup lang="ts">
import { useRouter } from 'vue-router'
import { UserForm, useCreateUser, type UserFormValues } from '@/entities/user'
import { ROUTES, USERS_RETURN_PATH_KEY } from '@/shared/config'
import { useReturnPath } from '@/shared/lib/useReturnPath'

const router = useRouter()
const { resolve } = useReturnPath(USERS_RETURN_PATH_KEY, ROUTES.usersList)
const { isPending, mutate, error } = useCreateUser()

function handleSubmit(values: UserFormValues) {
  mutate(values, {
    onSuccess: () => {
      router.push(resolve())
    },
  })
}
</script>

<template>
  <UserForm
    submit-label="Create user"
    :is-submitting="isPending"
    :error-message="error?.message"
    @submit="handleSubmit"
  />
</template>
