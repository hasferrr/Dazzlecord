/* eslint-disable no-process-env */

const throwError = (envName: string): never => {
  const envs = {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env['DATABASE_URL'],
    AUTH_SECRET: process.env['AUTH_SECRET'],
    GCS_PROJECT_ID: process.env['GCS_PROJECT_ID'],
    GCS_BUCKET_NAME: process.env['GCS_BUCKET_NAME'],
    ORIGIN_URL: process.env['ORIGIN_URL'],
    NEXT_PUBLIC_SOCKET_IO_URL: process.env['NEXT_PUBLIC_SOCKET_IO_URL'],
    GCS_SERVICE_ACCOUNT_KEY_FILE: process.env['GCS_SERVICE_ACCOUNT_KEY_FILE'],
    GCS_CRED_PRIVATE_KEY: `${process.env['GCS_CRED_PRIVATE_KEY']?.slice(0, 100)}...`,
    GCS_CRED_CLIENT_EMAIL: process.env['GCS_CRED_CLIENT_EMAIL'],
  }
  console.error(envs)
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
export const GCS_BUCKET_NAME = getProcessEnv('GCS_BUCKET_NAME')
export const ORIGIN_URL = parseUrl(getProcessEnv('ORIGIN_URL'))
export const NEXT_PUBLIC_SOCKET_IO_URL = parseUrl(getProcessEnv('NEXT_PUBLIC_SOCKET_IO_URL'))

export const { GCS_SERVICE_ACCOUNT_KEY_FILE } = process.env
export const { GCS_CRED_PRIVATE_KEY } = process.env
export const { GCS_CRED_CLIENT_EMAIL } = process.env

if (!GCS_SERVICE_ACCOUNT_KEY_FILE && !(GCS_CRED_PRIVATE_KEY && GCS_CRED_CLIENT_EMAIL)) {
  throwError('GCS Service Account Key')
}
