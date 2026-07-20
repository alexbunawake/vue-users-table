import { useQuery } from '@tanstack/vue-query'
import { getUser } from './userApi'

export function useUser(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: ({ signal }) => getUser(id, signal),
    retry: 1,
  })
}
