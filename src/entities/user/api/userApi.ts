import type { User } from '../model/types'
import type { UserFormValues } from '../model/schema'
import { formatUsersParams } from './formatParams'
import type { UsersParams, UsersResponse } from './types'
import { http } from '@/shared/api'

interface UsersEnvelope {
  data?: User[]
  items?: number
  pages?: number
}

export async function getUsers(params: UsersParams, signal?: AbortSignal): Promise<UsersResponse> {
  const envelope = await http<UsersEnvelope>(`/api/users${formatUsersParams(params)}`, { signal })

  return {
    users: envelope.data ?? [],
    total: envelope.items ?? 0,
    pages: envelope.pages ?? 1,
  }
}

export function getUser(id: string, signal?: AbortSignal): Promise<User> {
  return http<User>(`/api/users/${id}`, { signal })
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
