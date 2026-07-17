<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { Button } from '@/shared/ui'
import { userFormSchema, type UserFormValues } from '@/entities/user'

const props = defineProps<{
  initialValues?: Partial<UserFormValues>
  submitLabel?: string
  isSubmitting?: boolean
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
    <div>
      <input
        v-model="firstName"
        v-bind="firstNameAttrs"
        placeholder="First name"
        class="border rounded px-2 py-1 w-full"
        :class="{ 'border-red-500': errors.firstName }"
      />
      <span v-if="errors.firstName" class="text-red-500 text-sm">{{ errors.firstName }}</span>
    </div>
    <div>
      <input
        v-model="lastName"
        v-bind="lastNameAttrs"
        placeholder="Last name"
        class="border rounded px-2 py-1 w-full"
        :class="{ 'border-red-500': errors.lastName }"
      />
      <span v-if="errors.lastName" class="text-red-500 text-sm">{{ errors.lastName }}</span>
    </div>
    <div>
      <input
        v-model="email"
        v-bind="emailAttrs"
        placeholder="Email"
        class="border rounded px-2 py-1 w-full"
        :class="{ 'border-red-500': errors.email }"
      />
      <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
    </div>

    <Button type="submit" :disabled="isSubmitting || !meta.dirty">
      {{ submitLabel ?? 'Save' }}
    </Button>
  </form>
</template>
