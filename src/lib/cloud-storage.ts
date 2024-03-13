import { Storage } from '@google-cloud/storage'

import { GCS_PROJECT_ID, GCS_SERVICE_ACCOUNT_KEY_FILE } from '@/utils/config'

export const storage = new Storage({
  projectId: GCS_PROJECT_ID,
  keyFilename: GCS_SERVICE_ACCOUNT_KEY_FILE,
})
