import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { createUser, updateUser, deleteUser } from '../api/userApi'
import type { UserFormValues } from './schema'
import { useRouter } from 'vue-router'
import { useToast } from '@/shared/lib/toast/useToast.ts'

export function useCreateUser() {
  const client = useQueryClient()
  const router = useRouter()
  const toast = useToast()

  return useMutation({
    mutationFn: (values: UserFormValues) =>
      createUser({ ...values, lastVisitedAt: Date.now() / 1000 }),
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ['users'] })
      toast.success('User created successfully')
      router.push('/users')
    }
  })
}

export function useUpdateUser() {
  const client = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: ({ id, values }: { id: string; values: UserFormValues }) => updateUser(id, values),
    onSuccess: async (data, variables) => {
      await client.invalidateQueries({ queryKey: ['users'] })
      await client.invalidateQueries({ queryKey: [`user:${variables.id}`] })

      toast.success('User updated successfully')
    }
  })
}

export function useDeleteUser() {
  const client = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ['users'] })
      toast.success('User deleted successfully')
    }
  })
}
