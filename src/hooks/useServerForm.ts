'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import type { Server } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  serverModalSchema,
  serverModalSchemaAllowNoFile,
} from '@/schemas/server-modal-schema'
import {
  checkLength,
  checkSize,
  checkTypes,
  failedLength,
  failedSize,
  failedTypes,
} from '@/schemas/validator/files-validator'
import { uploadPhoto } from '@/services/upload-photo'

export const useServerForm = (
  defaultValues?: { name?: string, files?: FileList },
  customSchema?: typeof serverModalSchema | typeof serverModalSchemaAllowNoFile,
) => {
  // TODO: remove `file` useState and use the form `files` field instead. See profile-form.tsx
  const [file, setFile] = useState<File | null>(null)
  const [fileErrorMsg, setFileErrorMsg] = useState<string | undefined>(undefined)

  const form = useForm<z.infer<typeof serverModalSchema>>({
    resolver: zodResolver(customSchema ?? serverModalSchema),
    defaultValues: defaultValues ?? {
      name: '',
      files: undefined,
    },
  })

  const filesRef = form.register('files')

  const handleOnSubmit = async (
    fn: () => Promise<Server | null>,
    isUploadFile: boolean,
    onSuccess?: (newServer: Server) => void,
  ) => {
    try {
      const newServer = await fn()
      if (!newServer) {
        console.log('create/update server is failed')
        return
      }
      if (isUploadFile && newServer.image && file) {
        await uploadPhoto(file, newServer.image)
      }
      console.log('success!!!')
      form.reset()
      setFile(null)
      setFileErrorMsg(undefined)
      if (onSuccess) {
        onSuccess(newServer)
      }
    } catch (error) {
      console.log('error:', error)
    }
  }

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    needToCheckLength: boolean = true,
  ) => {
    const inputElement = event.target
    const { files } = inputElement
    if (!files) {
      setFile(null)
      setFileErrorMsg(undefined)
      return
    }
    if (needToCheckLength && !checkLength(files)) {
      form.resetField('files')
      setFile(null)
      setFileErrorMsg(failedLength)
      return
    }
    if (!checkSize(files)) {
      form.resetField('files')
      setFile(null)
      setFileErrorMsg(failedSize)
      return
    }
    if (!checkTypes(files)) {
      form.resetField('files')
      setFile(null)
      setFileErrorMsg(failedTypes)
      return
    }
    setFileErrorMsg(undefined)
    setFile(files[0])
  }

  const handleResetAll = (delay?: number, newName?: string) => {
    setTimeout(() => {
      form.reset()
      setFile(null)
      setFileErrorMsg(undefined)
      if (newName) {
        form.setValue('name', newName)
      }
    }, delay ?? 0)
  }

  const handleResetImage = () => {
    form.resetField('files')
    setFile(null)
    setFileErrorMsg(undefined)
  }

  return {
    form,
    file,
    fileErrorMsg,
    filesRef,
    handleOnSubmit,
    handleImageChange,
    handleResetAll,
    handleResetImage,
  }
}
