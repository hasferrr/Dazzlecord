'use client'

import {
  type Dispatch, type SetStateAction, useEffect, useRef, useTransition,
} from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { editMessage } from '@/actions/message/edit-message'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { messageSchema } from '@/schemas/message-schema'
import type { DirectMessageWithUser, MessageWithUser } from '@/types'

type ChatItemEditFormProps = {
  type: 'channel'
  message: MessageWithUser
  setIsEditing: Dispatch<SetStateAction<string | false>>
} | {
  type: 'direct-message'
  message: DirectMessageWithUser
  setIsEditing: Dispatch<SetStateAction<string | false>>
}

const ChatItemEditForm = ({
  type,
  message,
  setIsEditing,
}: ChatItemEditFormProps) => {
  const [isPending, setTransition] = useTransition()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: message.content,
    },
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        setIsEditing(false)
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

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [])

  const onSubmit = async (values: z.infer<typeof messageSchema>) => {
    if (message.content === values.content) {
      setIsEditing(false)
      return
    }

    if (type === 'channel') {
      setTransition(async () => {
        const updatedMessage = await editMessage(
          values,
          message.channelId,
          message.serverId,
          message.memberId,
          message.id,
        )
        if (!updatedMessage) {
          console.log('failed to update the msg')
          return
        }
        setIsEditing(false)
      })
    } else {
      // TODO: EDIT MESSAGE FOR DIRECT MESSAGE
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center w-full pt-2 gap-x-2">
          <FormField
            control={form.control}
            name="content"
            render={() => (
              <FormItem className="flex-1">
                <FormControl>
                  <div className="relative w-full">
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
                      disabled={isPending}
                      className="p-2 border-0 border-none bg-chat-input dark:bg-chat-input-dark
                      focus-visible:ring-0 focus-visible:ring-offset-0
                      min-h-[35px] max-h-[320px] overflow-y-auto resize-none"
                      placeholder="Edited message"
                      id="chat-item-edit-form"
                      rows={1}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          form.handleSubmit(onSubmit)()
                        }
                      }}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button disabled={isPending} size="sm" variant="primary">
            Save
          </Button>
        </div>
        <div className="text-[11px] mt-1">
          Press escape to
          {' '}
          <button
            disabled={isPending}
            className="text-[#006ce7] dark:text-[#00a8fc] hover:underline"
            onClick={() => setIsEditing(false)}
          >
            cancel
          </button>
          , enter to
          {' '}
          <button
            disabled={isPending}
            className="text-[#006ce7] dark:text-[#00a8fc] hover:underline"
            type="submit"
          >
            save
          </button>
        </div>
      </form>
    </Form>
  )
}

export default ChatItemEditForm
