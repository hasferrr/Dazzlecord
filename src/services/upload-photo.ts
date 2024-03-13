import axios from 'axios'

import { generateV4SignedPolicy } from '@/actions/generate-v4-url'

export const uploadPhoto = async (file: File, filename: string) => {
  const { url, fields } = await generateV4SignedPolicy(encodeURIComponent(filename))

  const formData = new FormData()
  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    formData.append(key, value)
  })

  return axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
