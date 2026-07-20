<script setup lang="ts">
import { type UserFormValues, UserForm, useUpdateUser, useUser } from '@/entities/user'
import { Spinner } from '@/shared/ui'

const props = defineProps<{ userId: string }>()

const { data, error, isPending: loading } = useUser(props.userId)

const { mutate, isPending, error: updateError } = useUpdateUser()

function handleSubmit(values: UserFormValues) {
  mutate({ id: props.userId, values })
}
</script>

<template>
  <div v-if="loading"><Spinner /></div>
  <div v-else-if="error" role="alert">Not able to fetch current user</div>
  <div v-else>
    <UserForm
      :initial-values="data"
      :is-submitting="isPending"
      :error-message="updateError?.message"
      submit-label="Save user"
      @submit="handleSubmit"
    />
  </div>
</template>
