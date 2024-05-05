/* eslint-disable no-process-env */

const throwError = (envName: string): never => {
  throw new Error(`please specify all required environment variables! (missing: ${envName})`)
}

const getProcessEnv = (envName: string): string => {
  const env = process.env[envName]
  return env || throwError(envName)
}

const parseUrl = (url: string) => (url.endsWith('/') ? url.slice(0, -1) : url)

export const NODE_ENV = getProcessEnv('NODE_ENV')
export const DATABASE_URL = getProcessEnv('DATABASE_URL')
export const AUTH_SECRET = getProcessEnv('AUTH_SECRET')
export const GCS_PROJECT_ID = getProcessEnv('GCS_PROJECT_ID')
export const GCS_SERVICE_ACCOUNT_KEY_FILE = getProcessEnv('GCS_SERVICE_ACCOUNT_KEY_FILE')
export const GCS_BUCKET_NAME = getProcessEnv('GCS_BUCKET_NAME')
export const ORIGIN_URL = parseUrl(getProcessEnv('ORIGIN_URL'))
export const NEXT_PUBLIC_SOCKET_IO_URL = parseUrl(getProcessEnv('NEXT_PUBLIC_SOCKET_IO_URL'))

console.log(NODE_ENV)
