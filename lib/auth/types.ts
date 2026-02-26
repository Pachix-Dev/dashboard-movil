export type Role = 'admin' | 'sales' | 'exhibitor'

export type AuthSession = {
  isSignedIn: boolean
  userId?: string
  role?: Role
  organizationId?: string
  loading: boolean
}
