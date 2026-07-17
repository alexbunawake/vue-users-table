import type { User, UserFormValues, UsersParams } from '@/entities/user'
import { formatUsersParams } from '@/entities/user/api/formatParams.ts'
import type { UsersResponse } from '@/entities/user/api/types.ts'

export async function getUsers(params: UsersParams): Promise<UsersResponse> {
  const res = await fetch(`/api/users${formatUsersParams(params)}`)

  if (!res.ok) throw new Error(`Failed to fetch users: ${res.status}`)

  const json = await res.json()

  return {
    users: json.data,
    total: json.items,
    pages: json.pages,
  }
}

export async function createUser(values: UserFormValues): Promise<User> {
  const res = await fetch(`/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  })

  if (!res.ok) throw new Error(`Failed to create user: ${res.status}`)

  const json = await res.json()

  return json.data
}

export async function getUser(id: string): Promise<User> {
  const res = await fetch(`/api/users/${id}`)

  if (!res.ok) throw new Error(`Failed to get user: ${res.status}`)

  return await res.json()
}

export async function updateUser(id: string, values: UserFormValues): Promise<User> {
  const res = await fetch(`/api/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  })

  if (!res.ok) throw new Error(`Failed to update user: ${res.status}`)

  const json = await res.json()

  return json.data
}

export async function deleteUser(id: string): Promise<undefined> {
  const res = await fetch(`/api/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) throw new Error(`Failed to delete user: ${res.status}, id: ${id}`)

  const json = await res.json()

  return json.data
}
