/* eslint-disable no-process-env */

const throwError = () => {
  throw new Error('please specify all required environment variables in the `.env` file')
}

const passOrError = (arg: string | undefined) => arg || throwError()

const parseUrl = (url: string) => (url.endsWith('/') ? url.slice(0, -1) : url)

export const NODE_ENV = passOrError(process.env.NODE_ENV)
export const DATABASE_URL = passOrError(process.env['DATABASE_URL'])
export const AUTH_SECRET = passOrError(process.env['AUTH_SECRET'])
export const GCS_PROJECT_ID = passOrError(process.env['GCS_PROJECT_ID'])
export const GCS_SERVICE_ACCOUNT_KEY_FILE = passOrError(process.env['GCS_SERVICE_ACCOUNT_KEY_FILE'])
export const GCS_BUCKET_NAME = passOrError(process.env['GCS_BUCKET_NAME'])
export const ORIGIN_URL = parseUrl(passOrError(process.env['ORIGIN_URL']))
export const NEXT_PUBLIC_SOCKET_IO_URL = parseUrl(passOrError(process.env['NEXT_PUBLIC_SOCKET_IO_URL']))
