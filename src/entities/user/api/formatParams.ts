import type { UsersParams } from './types'

type WhereClause = Record<string, unknown>

function buildWhere(params: UsersParams): WhereClause | undefined {
  const where: WhereClause = {}

  for (const group of params.search ?? []) {
    const [firstField] = group.fields

    if (!group.value || !firstField) continue

    if (group.fields.length === 1) {
      where[firstField] = { contains: group.value }
      continue
    }

    where.or = group.fields.map((field) => ({ [field]: { contains: group.value } }))
  }

  if (params.visitedFrom !== undefined) {
    where.lastVisitedAt = { gte: params.visitedFrom }
  }

  return Object.keys(where).length ? where : undefined
}

export function formatUsersParams(params: UsersParams): string {
  const query = new URLSearchParams()

  query.set('_page', String(params.page))
  query.set('_per_page', String(params.limit))

  const where = buildWhere(params)

  if (where) {
    query.set('_where', JSON.stringify(where))
  }

  if (params.sortBy) {
    const prefix = params.order === 'desc' ? '-' : ''
    query.set('_sort', `${prefix}${params.sortBy}`)
  }

  return `?${query.toString()}`
}
