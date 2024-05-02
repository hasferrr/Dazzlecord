'use client'

import { useEffect, useRef } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import type { DirectMessage, Message } from '@prisma/client'
import { Plus, Smile } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { messageSchema } from '@/schemas/message-schema'

interface ChatInputProps {
  type: 'channel' | 'direct-message'
  channelName: string
  sendFn: (
    values: z.infer<typeof messageSchema>,
    files: string | null
  ) => Promise<Message | DirectMessage | null>
}

const ChatInput = ({
  type,
  channelName,
  sendFn,
}: ChatInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: '',
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

  const onSubmit = async (values: z.infer<typeof messageSchema>) => {
    if (values.content === '') {
      return
    }
    form.reset()
    if (textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
    setTimeout(() => {
      form.setFocus('content')
    }, 10)
    const message = await sendFn(values, null)
    if (!message) {
      console.log('failed to send msg')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={() => (
            <FormItem>
              <FormControl>
                <div className="relative pb-6">
                  <button
                    type="button"
                    onClick={() => { }}
                    className="absolute top-3 bottom-3 left-4 h-[24px] w-[24px]
                    bg-zinc-500 dark:bg-zinc-300 hover:bg-zinc-600 dark:hover:bg-white
                    transition rounded-full p-1 flex items-center justify-center"
                  >
                    <Plus className="text-white dark:text-[var(--dark-page)]" />
                  </button>
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
                    className="px-14 py-[14px] bg-chat-input dark:bg-chat-input-dark
                    border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0
                    min-h-[50px] max-h-[320px] overflow-y-auto resize-none"
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
                  <button className="absolute top-3 right-4">
                    <Smile />
                  </button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default ChatInput
