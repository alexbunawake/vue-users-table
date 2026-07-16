<script setup lang="ts">
import { formatLastVisited, useUsers } from '@/entities/user'

const { data: users, isLoading, isError } = useUsers({
  page: 1,
  limit: 10
})


</script>

<template>
  <div>
    <p v-if="isLoading">Loading</p>
    <p v-else-if="isError" class="text-red-500">Couldn't fetch users. Please reload the page</p>

    <table v-else class="w-full border-collapse">
      <thead>
        <tr class="border-b text-left">
          <th class="p-2">ID</th>
          <th class="p-2">Name</th>
          <th class="p-2">Email</th>
          <th class="p-2">Last Visited</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="border-b hover:bg-gray-50">
          <td class="p-2">{{ user.id }}</td>
          <td class="p-2">{{ user.firstName }} {{ user.secondName }}</td>
          <td class="p-2">{{ user.email }}</td>
          <td class="p-2">{{ formatLastVisited(user.lastVisitedAt) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
