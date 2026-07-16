import type { UsersParams } from '@/entities/user'

export function formatUsersParams(params: UsersParams): string {
  const query = new URLSearchParams()

  if (params.search) {
    query.set('firstName_like', params.search)
  }

  if (params.sortBy) {
    query.set('_sort', params.sortBy)
    query.set('_order', params.order ?? 'asc')
  }

  if (params.page) {
    query.set('_page', String(params.page))
    query.set('_per_page', String(params.limit ?? 10))
  }

  const str = query.toString()
  return str ? `?${str}` : ''
}
