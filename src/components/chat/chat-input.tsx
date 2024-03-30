'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Smile } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface ChatInputProps {
  name: string
  type: 'channel' | 'conversation'
  id: string
}

const formSchema = z.object({
  content: z.string().min(1),
})

const ChatInput = ({
  name,
  type,
  id,
}: ChatInputProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    values.content = values.content.trim()
    try {
      console.log(id, values)
      form.reset()
      setTimeout(() => {
        form.setFocus('content')
      }, 10)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <button
                    type="button"
                    onClick={() => { }}
                    className="absolute top-7 left-8 h-[24px] w-[24px]
                    bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300
                    transition rounded-full p-1 flex items-center justify-center"
                  >
                    <Plus className="text-white dark:text-[var(--dark-page)]" />
                  </button>
                  <Input
                    disabled={isLoading}
                    className="px-14 py-6 bg-[var(--light-chat-input)] dark:bg-[var(--dark-chat-input)]
                    text-[#A1A1AA] dark:text-zinc-200 border-none border-0
                    focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder={`Message ${type === 'conversation' ? name : `#${name}`}`}
                    {...field}
                  />
                  <button className="absolute top-7 right-8">
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
