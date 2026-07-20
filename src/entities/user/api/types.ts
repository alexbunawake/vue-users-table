import type { User } from '../model/types'

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
  search?: SearchGroup[]
  visitedFrom?: number
}

export interface SearchGroup {
  fields: string[]
  value: string
}
