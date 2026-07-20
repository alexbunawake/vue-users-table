export const ROUTES = {
  usersList: '/users',
  userCreate: '/users/new',
  userEdit: (id: string) => `/users/${id}`,
} as const
