import type { User, UsersParams } from '@/entities/user'
import { formatUsersParams } from '@/entities/user/api/formatParams.ts'

export async function fetchUsers(params: UsersParams): Promise<User[]> {
  const res = await fetch('/api/users' + formatUsersParams(params))

  if (!res.ok) {
    throw new Error(`Failed to fetch users: ${res.status}`)
  }

  const data: {data: User[]} = await res.json();

  return data.data
}
