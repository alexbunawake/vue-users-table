import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { createUser, updateUser, deleteUser } from './userApi.ts'
import type { UserFormValues } from '../model/schema.ts'
import { useToast } from '@/shared/lib/useToast'

export function useCreateUser() {
  const client = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (values: UserFormValues) =>
      createUser({ ...values, lastVisitedAt: Date.now() / 1000 }),
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ['users'] })
      toast.success('User created successfully')
    },
  })
}

export function useUpdateUser() {
  const client = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: ({ id, values }: { id: string; values: UserFormValues }) => updateUser(id, values),
    onSuccess: async (data, variables) => {
      await client.invalidateQueries({ queryKey: ['users'] })
      await client.invalidateQueries({ queryKey: ['user', variables.id] })

      toast.success('User updated successfully')
    },
  })
}

export function useDeleteUsers() {
  const client = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: async (ids: string[]) => {
      const results = await Promise.allSettled(ids.map((id) => deleteUser(id)))
      const failed = results.filter((result) => result.status === 'rejected').length

      return { requested: ids.length, failed }
    },
    onSuccess: async ({ requested, failed }) => {
      await client.invalidateQueries({ queryKey: ['users'] })

      if (failed > 0) {
        toast.error(`Deleted ${requested - failed} of ${requested} users`)
        return
      }

      toast.success(`Deleted ${requested} ${requested === 1 ? 'user' : 'users'}`)
    },
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
    },
  })
}
