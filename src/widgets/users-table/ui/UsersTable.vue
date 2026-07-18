<script setup lang="ts">
import { formatLastVisited } from '@/entities/user'
import { PencilIcon } from '@heroicons/vue/24/outline'
import { Pagination, Spinner } from '@/shared/ui'
import { useUsersTable } from '../model/useUserTable'
import { ColumnHeader } from '@/features/user-table-controls'
import { DeleteUserButton } from '@/features/manage-users/delete-user'

const {
  data,
  isLoading,
  isError,
  page,
  sortBy,
  order,
  setSort,
  setSearch,
  searchField,
  searchValue,
} = useUsersTable()
</script>

<template>
  <div class="overflow-x-auto min-h-[200px] md:min-h-[235px]">
    <table class="w-full border-collapse">
      <caption class="sr-only">
        Users
      </caption>
      <thead>
        <tr class="border-b text-left">
          <th scope="col" class="w-20"><span class="sr-only">Edit</span></th>
          <ColumnHeader
            field="id"
            label="ID"
            searchable
            :active-field="sortBy"
            :order="order"
            :search="searchField === 'id' ? searchValue : ''"
            @update:search="(value) => setSearch('id', value)"
            @sort="setSort"
          />
          <ColumnHeader
            field="firstName"
            label="Name"
            searchable
            :active-field="sortBy"
            :order="order"
            :search="searchField === 'firstName' ? searchValue : ''"
            @update:search="(value) => setSearch('firstName', value)"
            @sort="setSort"
          />
          <ColumnHeader
            field="email"
            label="Email"
            searchable
            :active-field="sortBy"
            :order="order"
            @sort="setSort"
            :search="searchField === 'email' ? searchValue : ''"
            @update:search="(value) => setSearch('email', value)"
          />
          <ColumnHeader
            field="lastVisitedAt"
            label="Last Visited"
            :active-field="sortBy"
            :order="order"
            @sort="setSort"
          />
          <th scope="col" class="w-20">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="isLoading">
          <td colspan="6" class="text-center">
            <span class="flex justify-center items-center min-h-[200px] md:min-h-[235px]">
              <Spinner />
            </span>
          </td>
        </tr>

        <tr v-else-if="isError">
          <td colspan="6">
            <p role="alert" class="text-red-500">Couldn't fetch users. Please reload the page</p>
          </td>
        </tr>

        <tr v-else-if="!data || !data.users || data.users.length === 0">
          <td colspan="6" class="text-center">
            <span class="flex justify-center items-center min-h-[200px] md:min-h-[235px]">
              No data available
            </span>
          </td>
        </tr>

        <tr v-else v-for="user in data?.users" :key="user.id" class="border-b hover:bg-gray-50">
          <td class="p-2 w-20">
            <RouterLink
              :to="`/users/${user.id}`"
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
  <Pagination :page="page" :total-pages="data?.pages ?? 1" @update:page="page = $event" />
</template>
