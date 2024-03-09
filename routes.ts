/**
 * Routes that are accessible to the public
 * These routes do not require authentication
 */
export const publicRoutes: string[] = [
  '/'
]

/**
 * Routes that are used for authentication
 */
export const authRoutes: string[] = [
  '/login',
  '/register',
]

/**
 * Prefix routes that are used for API authentication
 */
export const apiAuthPrefix = '/api/auth'

/**
 * The default redirect path after logging in
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings'
