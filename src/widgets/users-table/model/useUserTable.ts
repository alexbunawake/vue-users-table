import { computed, watch } from 'vue'
import { useUsers, type UsersParams } from '@/entities/user'
import { useQueryState } from '@/shared/lib/useQueryState'
import { writeStorage } from '@/shared/lib/safeStorage'
import {
  DEFAULT_ORDER,
  PAGE_SIZE_STORAGE_KEY,
  SEARCHABLE_FIELDS,
  SEARCH_FIELD_MAP,
  SORTABLE_FIELDS,
  storedPageSize,
  tableQuerySchema,
  type Filters,
  type Order,
  type PageSize,
  type SearchField,
  type SortField,
  type TableQuery,
} from './tableQuery'
import { visitedSince, type VisitedPreset } from '@/features/user-table-controls'

function isSortField(field: string): field is SortField {
  return (SORTABLE_FIELDS as readonly string[]).includes(field)
}

export function useUsersTable() {
  const { state, set, has } = useQueryState(tableQuerySchema, { resetOnChange: ['page'] })

  if (!has('limit')) {
    set({ limit: storedPageSize() }, { replace: true })
  }

  const page = computed({
    get: () => state.value.page,
    set: (value: number) => set({ page: value }),
  })

  const limit = computed(() => state.value.limit)
  const sortBy = computed(() => state.value.sortBy)
  const order = computed(() => state.value.order)
  const visited = computed(() => state.value.visited)

  const activeSearchFields = computed(() => SEARCHABLE_FIELDS.filter((field) => state.value[field]))

  const filters = computed<Filters>(() =>
    Object.fromEntries(activeSearchFields.value.map((field) => [field, state.value[field]])),
  )

  function setSort(field: string, nextOrder: Order | null) {
    if (nextOrder === null || !isSortField(field)) {
      set({ sortBy: '', order: DEFAULT_ORDER }, { replace: true })
      return
    }

    set({ sortBy: field, order: nextOrder }, { replace: true })
  }

  function setFilter(field: SearchField, value: string) {
    set({ [field]: value } as Partial<TableQuery>, { replace: true })
  }

  function setVisited(value: VisitedPreset) {
    set({ visited: value }, { replace: true })
  }

  function setLimit(value: PageSize) {
    writeStorage('local', PAGE_SIZE_STORAGE_KEY, String(value))
    set({ limit: value }, { replace: true })
  }

  function clearFilters() {
    set({ id: '', name: '', email: '', visited: '' }, { replace: true })
  }

  const params = computed<UsersParams>(() => ({
    page: page.value,
    limit: limit.value,
    sortBy: sortBy.value,
    order: sortBy.value ? order.value : DEFAULT_ORDER,
    search: activeSearchFields.value.map((field) => ({
      fields: SEARCH_FIELD_MAP[field],
      value: state.value[field],
    })),
    visitedFrom: visitedSince(visited.value, Date.now()),
  }))

  const usersQuery = useUsers(params)

  watch(
    () => usersQuery.data.value?.pages,
    (totalPages) => {
      if (totalPages === undefined) return

      const lastPage = Math.max(totalPages, 1)

      if (page.value > lastPage) set({ page: lastPage }, { replace: true })
    },
  )

  return {
    ...usersQuery,
    page,
    limit,
    sortBy,
    order,
    visited,
    filters,
    setSort,
    setFilter,
    setVisited,
    setLimit,
    clearFilters,
  }
}
