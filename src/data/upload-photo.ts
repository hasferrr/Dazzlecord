import axios from 'axios'

import { generateV4SignedPolicy } from '@/actions/generate-v4-url'

export const uploadPhoto = async (file: File, serverName: string) => {
  const filename = encodeURIComponent(`${serverName}-${file.name}`)
  const { url, fields } = await generateV4SignedPolicy(filename)

  const formData = new FormData()
  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    formData.append(key, value)
  })

  try {
    const res = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return res
  } catch (error) {
    console.log(error)
  }
}
