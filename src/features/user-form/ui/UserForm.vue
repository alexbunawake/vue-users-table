<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { Button } from '@/shared/ui'
import { userFormSchema, type UserFormValues } from '@/entities/user'

const props = defineProps<{
  initialValues?: Partial<UserFormValues>
  submitLabel?: string
  isSubmitting?: boolean
  errorMessage?: string
}>()

const emit = defineEmits<{
  (e: 'submit', values: UserFormValues): void
}>()

const { handleSubmit, errors, defineField, meta } = useForm({
  validationSchema: toTypedSchema(userFormSchema),
  initialValues: props.initialValues,
})

const [firstName, firstNameAttrs] = defineField('firstName')
const [lastName, lastNameAttrs] = defineField('lastName')
const [email, emailAttrs] = defineField('email')

const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="flex flex-col gap-3 max-w-[400px]">
    <p
      v-if="errorMessage"
      role="alert"
      class="border border-red-200 bg-red-50 text-red-800 rounded px-3 py-2 text-sm"
    >
      {{ errorMessage }}
    </p>

    <div>
      <label for="user-first-name" class="sr-only">First name</label>
      <input
        id="user-first-name"
        v-model="firstName"
        v-bind="firstNameAttrs"
        placeholder="First name"
        class="border rounded px-2 py-1 w-full"
        :class="{ 'border-red-500': errors.firstName }"
        :aria-invalid="Boolean(errors.firstName)"
        :aria-describedby="errors.firstName ? 'user-first-name-error' : undefined"
      />
      <span
        v-if="errors.firstName"
        id="user-first-name-error"
        role="alert"
        class="text-red-500 text-sm"
      >
        {{ errors.firstName }}
      </span>
    </div>

    <div>
      <label for="user-last-name" class="sr-only">Last name</label>
      <input
        id="user-last-name"
        v-model="lastName"
        v-bind="lastNameAttrs"
        placeholder="Last name"
        class="border rounded px-2 py-1 w-full"
        :class="{ 'border-red-500': errors.lastName }"
        :aria-invalid="Boolean(errors.lastName)"
        :aria-describedby="errors.lastName ? 'user-last-name-error' : undefined"
      />
      <span
        v-if="errors.lastName"
        id="user-last-name-error"
        role="alert"
        class="text-red-500 text-sm"
      >
        {{ errors.lastName }}
      </span>
    </div>

    <div>
      <label for="user-email" class="sr-only">Email</label>
      <input
        id="user-email"
        v-model="email"
        v-bind="emailAttrs"
        type="email"
        placeholder="Email"
        class="border rounded px-2 py-1 w-full"
        :class="{ 'border-red-500': errors.email }"
        :aria-invalid="Boolean(errors.email)"
        :aria-describedby="errors.email ? 'user-email-error' : undefined"
      />
      <span v-if="errors.email" id="user-email-error" role="alert" class="text-red-500 text-sm">
        {{ errors.email }}
      </span>
    </div>

    <Button type="submit" :disabled="isSubmitting || !meta.dirty">
      {{ submitLabel ?? 'Save' }}
    </Button>
  </form>
</template>
