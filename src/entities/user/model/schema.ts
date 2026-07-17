import { z } from 'zod'

export const userFormSchema = z.object({
  firstName: z.string().min(1, 'Required field'),
  lastName: z.string().min(1, 'Required field'),
  email: z.string().email('Email is not valid'),
  lastVisitedAt: z.number().optional(),
})

export type UserFormValues = z.infer<typeof userFormSchema>
