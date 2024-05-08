'use client'

import { useEffect, useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import type { DirectMessage, Message } from '@prisma/client'
import {
  File, Plus, SendHorizontal, X,
} from 'lucide-react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Textarea } from '@/components/ui/textarea'
import { uuidv4 } from '@/helpers/helpers'
import { cn } from '@/lib/utils'
import { messageSchema, messageSchemaWithFile } from '@/schemas/message-schema'
import { checkTypes, filesSizeValidator } from '@/schemas/validator/files-validator'
import { uploadPhoto } from '@/services/upload-photo'

interface ChatInputProps {
  type: 'channel' | 'direct-message'
  channelName: string
  sendFn: (
    values: z.infer<typeof messageSchema>,
  ) => Promise<Message | DirectMessage | null>
}

const ChatInput = ({
  type,
  channelName,
  sendFn,
}: ChatInputProps) => {
  const [previewFiles, setPreviewFiles] = useState<FileList | null>(null)
  const [error, setError] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const form = useForm<z.infer<typeof messageSchemaWithFile>>({
    resolver: zodResolver(messageSchemaWithFile),
    defaultValues: {
      content: '',
      fileType: undefined,
      fileName: undefined,
      fileSize: undefined,
      files: undefined,
    },
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        setTimeout(() => {
          form.setFocus('content')
        }, 10)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    setTimeout(() => {
      form.setFocus('content')
    }, 10)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async (values: z.infer<typeof messageSchemaWithFile>) => {
    console.log(values)

    const files = form.getValues('files')
    const file = files ? files[0] : null
    const { fileName } = values

    setPreviewFiles(null)
    form.reset()
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
    setTimeout(() => {
      form.setFocus('content')
    }, 10)

    if (file && fileName) {
      await uploadPhoto(file, fileName)
      console.log('uploaded')
    }
    const message = await sendFn({
      content: values.content,
      fileName: values.fileName,
      fileType: values.fileType,
      fileSize: values.fileSize,
    })
    if (!message) {
      console.log('failed to send msg')
    }
  }

  const handleResetFile = () => {
    const content = form.getValues('content')
    form.reset()
    form.setValue('content', content)
    setPreviewFiles(null)
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const validatedFields = await z
      .object({ files: filesSizeValidator })
      .spa({ files: e.target.files })

    if (!validatedFields.success) {
      console.log(validatedFields)

      setError(validatedFields.error.errors[0].message)
      setTimeout(() => {
        setError(null)
      }, 3000)

      handleResetFile()
      return
    }

    let fileName = validatedFields.data.files[0].name
    fileName = `file-msg-${uuidv4()}_${fileName}`

    form.setValue('fileType', validatedFields.data.files[0].type)
    form.setValue('fileSize', validatedFields.data.files[0].size)
    form.setValue('fileName', fileName)
    setPreviewFiles(validatedFields.data.files)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {(previewFiles || error) && (
        <div className="bg-chat-input dark:bg-chat-input-dark rounded-t-md max-h-[200px] p-4 pb-2">
          {error && <p className="text-sm">{error}</p>}
          {previewFiles && (
            <div className="relative bg-server dark:bg-server-dark rounded-sm p-2 pt-4 w-fit max-w-[200px] h-fit space-y-2">
              {checkTypes(previewFiles)
                ? (
                  <Image
                    className="h-[100px] w-auto object-cover rounded-sm"
                    src={URL.createObjectURL(previewFiles[0])}
                    alt=""
                    height={512}
                    width={512}
                  />
                )
                : <File size={75} />}
              <p className="text-sm truncate">{previewFiles[0].name}</p>
              <button onClick={handleResetFile}>
                <X size={25} className="absolute top-0 right-0 rounded-full bg-rose-500 text-white p-1 m-1" />
              </button>
            </div>
          )}
        </div>
      )}
      <div className="relative pb-6">
        <label htmlFor="messageFileInput" className="cursor-pointer">
          <input
            {...form.register('files', {
              onChange: handleFileChange,
            })}
            id="messageFileInput"
            type="file"
            className="cursor-pointer opacity-0 absolute w-0 h-0"
          />
          <div
            className={cn(
              'absolute top-3 bottom-3 left-4 h-[24px] w-[24px]',
              'bg-zinc-500 dark:bg-zinc-300 hover:bg-zinc-600 dark:hover:bg-white',
              'transition rounded-full p-1 flex items-center justify-center',
            )}
          >
            <Plus className="text-white dark:text-page-dark" />
          </div>
        </label>
        <Textarea
          {...form.register('content', {
            onChange: (e) => {
              e.target.style.height = 'auto'
              e.target.style.height = `${e.target.scrollHeight}px`
            },
          })}
          ref={(e) => {
            form.register('content').ref(e)
            // @ts-ignore
            textareaRef.current = e
          }}
          className={cn(
            'px-14 py-[14px] bg-chat-input dark:bg-chat-input-dark',
            'border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            'min-h-[50px] max-h-[320px] overflow-y-auto resize-none',
            !previewFiles ? 'rounded-md' : 'rounded-b-md rounded-t-none',
          )}
          placeholder={`Message ${type === 'channel' ? '#' : '@'}${channelName}`}
          rows={1}
          id="chat-input"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              form.handleSubmit(onSubmit)()
            }
          }}
        />
        <button
          type="submit"
          className="absolute top-3 right-4"
          onClick={() => form.setFocus('content')}
        >
          <SendHorizontal />
        </button>
      </div>
    </form>
  )
}

export default ChatInput
