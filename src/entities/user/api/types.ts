import type { User } from '@/entities/user'

export interface UsersResponse {
  users: User[]
  total: number
  pages: number
}

export interface UsersParams {
  page: number
  limit: number
  sortBy?: string
  order?: 'asc' | 'desc'
  search?: Record<string, string>
}
