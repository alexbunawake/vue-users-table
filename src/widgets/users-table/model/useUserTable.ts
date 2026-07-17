import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUsers } from '@/entities/user'
import type { UsersParams } from '@/entities/user'

export function useUsersTable(limit = 5) {
  const route = useRoute()
  const router = useRouter()

  function patchQuery(patch: Record<string, string | undefined>) {
    const next = { ...route.query, ...patch }

    Object.keys(next).forEach((key) => {
      if (next[key] === undefined || next[key] === '') delete next[key]
    })

    router.push({ query: next })
  }

  const page = computed({
    get: () => Number(route.query.page) || 1,
    set: (val) => patchQuery({ page: String(val) }),
  })

  const sortBy = computed({
    get: () => (route.query.sortBy as string) || 'lastVisitedAt',
    set: (val) => patchQuery({ sortBy: val, page: undefined }),
  })

  const order = computed({
    get: () => (route.query.order as 'asc' | 'desc') || 'desc',
    set: (val) => patchQuery({ order: val, page: undefined }),
  })

  const searchField = computed(() => (route.query.searchField as string) || '')
  const searchValue = computed(() => (route.query.searchValue as string) || '')

  function setSort(field: string, order: 'asc' | 'desc' | null) {
    if (order === null) {
      patchQuery({ sortBy: undefined, order: undefined, page: undefined })
    } else {
      patchQuery({ sortBy: field, order, page: undefined })
    }
  }

  function setSearch(field: string, value: string) {
    patchQuery({
      searchField: value ? field : undefined,
      searchValue: value || undefined,
      page: undefined,
    })
  }

  const params = computed<UsersParams>(() => ({
    page: page.value,
    limit,
    sortBy: sortBy.value,
    order: order.value,
    search: searchValue.value ? { [searchField.value]: searchValue.value } : undefined,
  }))

  const query = useUsers(params)

  return {
    ...query,
    page,
    sortBy,
    order,
    searchField,
    searchValue,
    setSort,
    setSearch,
  }
}
