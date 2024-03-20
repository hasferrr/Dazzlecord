'use server'

import { storage } from '@/lib/cloud-storage'
import { GCS_BUCKET_NAME } from '@/utils/config'

export const deleteImage = async (
  imageName: string,
) => {
  console.log('[GCS] Deleting image...')
  try {
    await storage.bucket(GCS_BUCKET_NAME).file(imageName).delete()
    console.log(`[GCS] gs://${GCS_BUCKET_NAME}/${imageName} deleted`)
  } catch (error) {
    console.error(error)
  }
}
