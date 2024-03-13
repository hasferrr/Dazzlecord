'use server'

import { storage } from '@/app/lib/cloud-storage'

/**
 * Upload an object with HTML forms
 * https://cloud.google.com/storage/docs/xml-api/post-object-forms
 */
export const generateV4SignedPolicy = async (fileName: string) => {
  // TODO: separate process.env to centralized config file
  const GCS_BUCKET_NAME = process.env.GCS_BUCKET_NAME as string
  const ORIGIN_URL = process.env.ORIGIN_URL as string

  /**
   * Set up and view CORS configurations
   * https://cloud.google.com/storage/docs/using-cors#storage_cors_configuration-nodejs
   */
  await storage.bucket(GCS_BUCKET_NAME).setCorsConfiguration([
    {
      maxAgeSeconds: 3600,
      method: ['POST'],
      origin: [ORIGIN_URL],
    },
  ])

  const bucket = storage.bucket(GCS_BUCKET_NAME)
  const file = bucket.file(fileName)


  // NOTE: Not yet implemented only image uploads
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
