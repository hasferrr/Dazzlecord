import { Storage } from '@google-cloud/storage'

export const storage = new Storage({
  projectId: process.env.GCS_PROJECT_ID,
  keyFilename: process.env.GCS_SERVICE_ACCOUNT_KEY_FILE,
})
