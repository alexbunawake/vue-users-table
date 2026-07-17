import type { UsersParams } from '@/entities/user'

export function formatUsersParams(params: UsersParams): string {
  const query = new URLSearchParams()

  query.set('_page', String(params.page))
  query.set('_per_page', String(params.limit))

  if (params.search) {
    for (const [field, value] of Object.entries(params.search)) {
      if (value) {
        query.set(`${field}:contains`, value)
      }
    }
  }

  if (params.sortBy) {
    const prefix = params.order === 'desc' ? '-' : ''
    query.set('_sort', `${prefix}${params.sortBy}`)
  }

  return `?${query.toString()}`
}
