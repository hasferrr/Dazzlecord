'use server'

import { storage } from '@/lib/cloud-storage'
import { DEPLOYMENT_URL, GCS_BUCKET_NAME } from '@/utils/config'

/**
 * Upload an object with HTML forms
 * https://cloud.google.com/storage/docs/xml-api/post-object-forms
 */
export const generateV4SignedPolicy = async (fileName: string) => {
  /**
   * Set up and view CORS configurations
   * https://cloud.google.com/storage/docs/using-cors#storage_cors_configuration-nodejs
   */
  await storage.bucket(GCS_BUCKET_NAME).setCorsConfiguration([
    {
      maxAgeSeconds: 3600,
      method: ['POST'],
      origin: [DEPLOYMENT_URL],
    },
  ])

  const bucket = storage.bucket(GCS_BUCKET_NAME)
  const file = bucket.file(fileName)

  /**
   * NOTE: Not yet implemented: image uploads restriction
   * That requires sending the image to the server first in order to check the file.
   * Which possibly leads to server overload(?), that why i dont.
   * This v4 url only can retrieve the form-data, not the content-type image.
   */
  const options = {
    expires: Date.now() + 1 * 60 * 1000, // 1 minute,
    fields: { 'x-goog-meta-test': 'data' },
    conditions: [
      ['content-length-range', 0, 2 * 1024 * 1024], // 2 MB maximum file size
    ],
  }

  const [response] = await file.generateSignedPostPolicyV4(options)
  return response
}
