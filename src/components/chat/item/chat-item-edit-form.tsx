'use client'

import {
  type Dispatch, type SetStateAction, useEffect, useTransition,
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
import { Input } from '@/components/ui/input'
import { messageSchema } from '@/schemas/message-schema'
import type { MessageWithUser } from '@/types'

interface ChatItemEditFormProps {
  message: MessageWithUser
  setIsEditing: Dispatch<SetStateAction<string | false>>
}

const ChatItemEditForm = ({
  message,
  setIsEditing,
}: ChatItemEditFormProps) => {
  const [isPending, setTransition] = useTransition()

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

  const onSubmit = async (values: z.infer<typeof messageSchema>) => {
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
  }

  return (
    <Form {...form}>
      <form
        className="flex items-center w-full pt-2 gap-x-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <div className="relative w-full">
                  <Input
                    disabled={isPending}
                    className="p-2 border-0 border-none bg-chat-input dark:bg-chat-input-dark
                    focus-visible:ring-0 focus-visible:ring-offset-0 text-text-dark dark:text-text"
                    placeholder="Edited message"
                    {...field}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <Button disabled={isPending} size="sm" variant="primary">
          Save
        </Button>
      </form>
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
    </Form>
  )
}

export default ChatItemEditForm
