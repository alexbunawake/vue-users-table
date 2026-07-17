<script setup lang="ts">
import { type UserFormValues, useUpdateUser, useUser } from '@/entities/user'
import { UserForm } from '@/features/user-form'
import { Spinner } from '@/shared/ui'

const props = defineProps<{ userId: string }>()

const { data, error, isPending: loading } = useUser(props.userId)

const { mutate, isPending } = useUpdateUser()

function handleSubmit(values: UserFormValues) {
  mutate({ id: props.userId, values })
}
</script>

<template>
  <div v-if="loading"><Spinner /></div>
  <div v-else-if="error">Not able to fetch current user</div>
  <div v-else>
    <UserForm
      :initial-values="data"
      :is-submitting="isPending"
      submit-label="Save user"
      @submit="handleSubmit"
    />
  </div>
</template>
