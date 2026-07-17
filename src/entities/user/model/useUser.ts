import { useQuery } from '@tanstack/vue-query'
import { getUser } from '@/entities/user/api/userApi.ts'

export function useUser(id: string) {
  return useQuery({
    queryKey: [`user:${id}`],
    queryFn: () => getUser(id),
    retry: 1,
  })
}
