<script setup lang="ts">
import { computed, ref } from 'vue'
import { formatLastVisited } from '@/entities/user'
import { useScrollOnChange } from '@/shared/lib/useScrollOnChange'
import { PencilIcon } from '@heroicons/vue/24/outline'
import { Checkbox, PageSizeSelect, Pagination, Spinner } from '@/shared/ui'
import { ROUTES } from '@/shared/config'
import { useUsersTable } from '../model/useUserTable'
import { useUsersSelection } from '../model/useUsersSelection'
import { COLUMNS, FIELD_LABELS, PAGE_SIZES } from '../model/tableQuery'
import { ActiveFilters, ColumnHeader, VisitedFilter } from '@/features/user-table-controls'
import { DeleteUserButton } from '@/features/manage-users/delete-user'
import { BulkDeleteBar } from '@/features/manage-users/bulk-delete-users'

const {
  data,
  isLoading,
  isFetching,
  isError,
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
} = useUsersTable()

const filtersRef = ref<HTMLElement | null>(null)

useScrollOnChange(page, filtersRef)

const users = computed(() => data.value?.users ?? [])

const NON_SORTABLE_COLUMNS = ['select', 'edit', 'actions'] as const
const columnCount = COLUMNS.length + NON_SORTABLE_COLUMNS.length

const selection = useUsersSelection(users, [page, limit, sortBy, order, visited, filters])
</script>

<template>
  <div ref="filtersRef" class="flex flex-wrap items-center gap-4 mb-3 scroll-mt-4">
    <VisitedFilter :model-value="visited" @update:model-value="setVisited" />
  </div>

  <ActiveFilters
    :filters="filters"
    :field-labels="FIELD_LABELS"
    :visited="visited"
    @remove-field="(field) => setFilter(field as keyof typeof FIELD_LABELS, '')"
    @remove-visited="setVisited('')"
    @clear="clearFilters"
  />

  <BulkDeleteBar
    :ids="selection.ids.value"
    @deleted="selection.clear()"
    @cancel="selection.clear()"
  />

  <div
    class="overflow-x-auto min-h-[200px] md:min-h-[235px] transition-opacity scroll-mt-4"
    :class="{ 'opacity-60': isFetching && !isLoading }"
    :aria-busy="isFetching"
  >
    <table class="w-full border-collapse">
      <caption class="sr-only">
        Users
      </caption>
      <thead>
        <tr class="border-b text-left">
          <th scope="col" class="w-10 p-2">
            <span class="flex items-center justify-center">
              <Checkbox
                :model-value="selection.allOnPageSelected.value"
                :indeterminate="selection.someOnPageSelected.value"
                label="Select all users on this page"
                @update:model-value="selection.toggleAllOnPage"
              />
            </span>
          </th>
          <th scope="col" class="w-20"><span class="sr-only">Edit</span></th>

          <ColumnHeader
            v-for="column in COLUMNS"
            :key="column.sortField"
            :field="column.sortField"
            :label="column.label"
            :searchable="Boolean(column.filterField)"
            :active-field="sortBy"
            :order="order"
            :search="column.filterField ? (filters[column.filterField] ?? '') : ''"
            @update:search="(value) => column.filterField && setFilter(column.filterField, value)"
            @sort="setSort"
          />

          <th scope="col" class="w-20">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="isLoading">
          <td :colspan="columnCount" class="text-center">
            <span class="flex justify-center items-center min-h-[200px] md:min-h-[235px]">
              <Spinner />
            </span>
          </td>
        </tr>

        <tr v-else-if="isError">
          <td :colspan="columnCount">
            <span
              role="alert"
              class="flex justify-center items-center min-h-[200px] md:min-h-[235px] text-red-500"
            >
              Couldn't fetch users. Please reload the page
            </span>
          </td>
        </tr>

        <tr v-else-if="users.length === 0">
          <td :colspan="columnCount" class="text-center">
            <span class="flex justify-center items-center min-h-[200px] md:min-h-[235px]">
              No data available
            </span>
          </td>
        </tr>

        <tr
          v-else
          v-for="user in users"
          :key="user.id"
          class="border-b hover:bg-gray-50"
          :class="{ 'bg-blue-50': selection.isSelected(user.id) }"
        >
          <td class="p-2 w-10">
            <span class="flex items-center justify-center">
              <Checkbox
                :model-value="selection.isSelected(user.id)"
                :label="`Select ${user.firstName} ${user.lastName}`"
                @update:model-value="selection.toggle(user.id)"
              />
            </span>
          </td>
          <td class="p-2 w-20">
            <RouterLink
              :to="ROUTES.userEdit(user.id)"
              :aria-label="`Edit ${user.firstName} ${user.lastName}`"
            >
              <PencilIcon :class="['w-5 h-5']" aria-hidden="true" />
            </RouterLink>
          </td>
          <td class="p-2">{{ user.id }}</td>
          <td class="p-2">{{ user.firstName }} {{ user.lastName }}</td>
          <td class="p-2">{{ user.email }}</td>
          <td class="p-2 whitespace-nowrap">{{ formatLastVisited(user.lastVisitedAt) }}</td>
          <td class="p-2 w-20">
            <DeleteUserButton :user-id="user.id" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="flex flex-wrap items-center justify-between gap-3 mt-4">
    <PageSizeSelect
      :model-value="limit"
      :options="PAGE_SIZES"
      @update:model-value="setLimit($event as (typeof PAGE_SIZES)[number])"
    />
    <p class="text-sm text-gray-600">{{ data?.total ?? 0 }} users</p>
  </div>

  <Pagination v-model:page="page" :total="data?.total ?? 0" :items-per-page="limit" />
</template>
