import { useQuery } from '@tanstack/vue-query'
import { fetchUsers } from '../api/userApi'
import { type MaybeRefOrGetter, toValue } from 'vue'
import type { UsersParams } from '@/entities/user'

export function useUsers(params: MaybeRefOrGetter<UsersParams>) {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => fetchUsers(toValue(params)),
    retry: 1
  })
}
