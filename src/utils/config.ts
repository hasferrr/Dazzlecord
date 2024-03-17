/* eslint-disable no-process-env */

const throwError = () => {
  throw new Error('please specify all required environment variables in the `.env` file')
}

const passOrError = (arg: string | undefined) => {
  return arg || throwError()
}

export const NODE_ENV = passOrError(process.env.NODE_ENV)
export const DATABASE_URL = passOrError(process.env.DATABASE_URL)
export const AUTH_SECRET = passOrError(process.env.AUTH_SECRET)
export const GCS_PROJECT_ID = passOrError(process.env.GCS_PROJECT_ID)
export const GCS_SERVICE_ACCOUNT_KEY_FILE = passOrError(process.env.GCS_SERVICE_ACCOUNT_KEY_FILE)
export const GCS_BUCKET_NAME = passOrError(process.env.GCS_BUCKET_NAME)
export const DEPLOYMENT_URL = passOrError(process.env.DEPLOYMENT_URL)
