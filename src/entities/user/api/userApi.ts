import type { User, UserFormValues, UsersParams } from '@/entities/user'
import { formatUsersParams } from '@/entities/user/api/formatParams.ts'
import type { UsersResponse } from '@/entities/user/api/types.ts'
import { http } from '@/shared/api'

interface UsersEnvelope {
  data: User[]
  items: number
  pages: number
}

export async function getUsers(params: UsersParams): Promise<UsersResponse> {
  const envelope = await http<UsersEnvelope>(`/api/users${formatUsersParams(params)}`)

  return {
    users: envelope.data ?? [],
    total: envelope.items ?? 0,
    pages: envelope.pages ?? 1,
  }
}

export function getUser(id: string): Promise<User> {
  return http<User>(`/api/users/${id}`)
}

export function createUser(values: UserFormValues): Promise<User> {
  return http<User>('/api/users', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

export function updateUser(id: string, values: UserFormValues): Promise<User> {
  return http<User>(`/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(values),
  })
}

export function deleteUser(id: string): Promise<void> {
  return http<void>(`/api/users/${id}`, { method: 'DELETE' })
}
