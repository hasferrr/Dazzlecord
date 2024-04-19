'use client'

import axios from 'axios'

import { generateV4SignedPolicy } from '@/actions/cloud-storage/generate-v4-url'

export const uploadPhoto = async (file: File, filename: string) => {
  const { url, fields } = await generateV4SignedPolicy(encodeURIComponent(filename))

  const formData = new FormData()
  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    formData.append(key, value)
  })

  console.log('uploading an image to gcs...')
  return axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
