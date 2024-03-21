'use client'

import { useTransition } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createNewChannel } from '@/actions/channel/createNewChannel'
import ChannelModalRadio from '@/components/modals/channel-modal-radio'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  useCreateChannelClose,
  useCreateChannelValue,
} from '@/context/modalContext'
import { serverModalSchema } from '@/schemas'

const ChannelModal = () => {
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  const onCreateChannelClose = useCreateChannelClose()
  const isCreateChannelOpen = useCreateChannelValue()

  const form = useForm<z.infer<typeof serverModalSchema>>({
    resolver: zodResolver(serverModalSchema),
    defaultValues: {
      name: '',
    },
  })

  const handleOpenDialog = () => {
    onCreateChannelClose()
  }

  const onSubmit = async () => {
    startTransition(async () => {
      const res = await createNewChannel()
      if (res.error) {
        console.log(res)
        return
      }
      console.log(res.success)
      onCreateChannelClose()
      router.push('/app')
      router.refresh()
    })
  }

  return (
    <Dialog open={isCreateChannelOpen} onOpenChange={handleOpenDialog}>
      <DialogContent className="p-0 m-0 dark:bg-[var(--dark-page)] text-black dark:text-white w-[29rem]">

        <DialogHeader className="px-4 pt-5">
          <DialogTitle className="text-lg">Create Channel</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex flex-col justify-center"
          >

            <div className="flex flex-col px-4 gap-4">
              <FormField
                control={form.control}
                name="name" // TODO: change this
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase font-bold text-xs text-inherit">
                      Channel Type
                    </FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        <ChannelModalRadio
                          isPending={isPending}
                          textTop="Text"
                          textBot="Send messages, images, GIFs, emoji, opinions, and other."
                          id="text"
                          value="text"
                          className=""
                        />
                        <ChannelModalRadio
                          isPending={true}
                          textTop="Voice"
                          textBot="Hang out together with voice, video, and screen share."
                          id="voice"
                          value="voice"
                          className="cursor-not-allowed"
                        />
                        <ChannelModalRadio
                          isPending={true}
                          textTop="Video"
                          textBot="Hang out together with video channel."
                          id="video"
                          value="video"
                          className="cursor-not-allowed"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase font-bold text-xs text-inherit">
                      Channel Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        className="bg-zinc-300/50 dark:bg-[var(--dark-navigation)] border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Channel Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="p-4 bg-gray-100 dark:bg-[var(--dark-server)] rounded-b-lg">
              <Button variant="primary" disabled={isPending}>
                Create Channel
              </Button>
            </DialogFooter>
          </form>
        </Form>

      </DialogContent>
    </Dialog >
  )
}

export default ChannelModal
