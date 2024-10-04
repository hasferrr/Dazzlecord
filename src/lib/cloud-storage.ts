import { Storage } from '@google-cloud/storage'

import {
  GCS_CRED_CLIENT_EMAIL,
  GCS_CRED_PRIVATE_KEY,
  GCS_PROJECT_ID,
  GCS_SERVICE_ACCOUNT_KEY_FILE,
} from '@/utils/config'

const confFile = {
  projectId: GCS_PROJECT_ID,
  keyFilename: GCS_SERVICE_ACCOUNT_KEY_FILE,
}

const confEnv = {
  projectId: GCS_PROJECT_ID,
  credentials: {
    type: 'service_account',
    project_id: GCS_PROJECT_ID,
    private_key: GCS_CRED_PRIVATE_KEY,
    client_email: GCS_CRED_CLIENT_EMAIL,
  },
}

export const storage = new Storage(GCS_SERVICE_ACCOUNT_KEY_FILE ? confFile : confEnv)
