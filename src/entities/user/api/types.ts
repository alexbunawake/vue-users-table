export interface UsersParams {
  search?: string
  sortBy?: 'firstName' | 'lastVisitedAt'
  order?: 'asc' | 'desc'
  page?: number
  limit?: number
}
