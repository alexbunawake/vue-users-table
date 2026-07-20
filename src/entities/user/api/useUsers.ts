import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { getUsers } from './userApi'
import { type MaybeRefOrGetter, toValue } from 'vue'
import type { UsersParams } from './types'

export function useUsers(params: MaybeRefOrGetter<UsersParams>) {
  return useQuery({
    queryKey: ['users', params],
    queryFn: ({ signal }) => getUsers(toValue(params), signal),
    placeholderData: keepPreviousData,
  })
}
