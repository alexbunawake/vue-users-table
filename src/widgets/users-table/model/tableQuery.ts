import { z } from 'zod'
import { readStorage } from '@/shared/lib/safeStorage'
import { visitedSchema } from '@/features/user-table-controls'

export const SORTABLE_FIELDS = ['id', 'firstName', 'email', 'lastVisitedAt'] as const
export const SEARCHABLE_FIELDS = ['id', 'name', 'email'] as const
export const ORDERS = ['asc', 'desc'] as const
export const PAGE_SIZES = [5, 10, 25, 50, 100] as const

export type SortField = (typeof SORTABLE_FIELDS)[number]
export type SearchField = (typeof SEARCHABLE_FIELDS)[number]
export type Order = (typeof ORDERS)[number]
export type PageSize = (typeof PAGE_SIZES)[number]
export type Filters = Partial<Record<SearchField, string>>

export const SEARCH_FIELD_MAP: Record<SearchField, string[]> = {
  id: ['id'],
  name: ['firstName', 'lastName'],
  email: ['email'],
}

export const FIELD_LABELS: Record<SearchField, string> = {
  id: 'ID',
  name: 'Name',
  email: 'Email',
}

export interface TableColumn {
  sortField: SortField
  label: string
  filterField?: SearchField
}

export const COLUMNS: readonly TableColumn[] = [
  { sortField: 'id', label: 'ID', filterField: 'id' },
  { sortField: 'firstName', label: 'Name', filterField: 'name' },
  { sortField: 'email', label: 'Email', filterField: 'email' },
  { sortField: 'lastVisitedAt', label: 'Last Visited' },
]

export const DEFAULT_ORDER: Order = 'desc'
export const DEFAULT_PAGE_SIZE: PageSize = 5
export const PAGE_SIZE_STORAGE_KEY = 'usersTablePageSize'

function isPageSize(value: number): value is PageSize {
  return PAGE_SIZES.includes(value as PageSize)
}

export function storedPageSize(): PageSize {
  const stored = Number(readStorage('local', PAGE_SIZE_STORAGE_KEY))

  return isPageSize(stored) ? stored : DEFAULT_PAGE_SIZE
}

const searchSchema = z.string().catch('')

export const tableQuerySchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  limit: z.coerce.number().refine(isPageSize).catch(DEFAULT_PAGE_SIZE),
  sortBy: z.enum(SORTABLE_FIELDS).or(z.literal('')).catch(''),
  order: z.enum(ORDERS).catch(DEFAULT_ORDER),
  visited: visitedSchema,
  id: searchSchema,
  name: searchSchema,
  email: searchSchema,
})

export type TableQuery = z.infer<typeof tableQuerySchema>
