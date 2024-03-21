'use client'

import { useTransition } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createNewChannel } from '@/actions/channel/createNewChannel'
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

        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-lg">Create Channel</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex flex-col justify-center"
          >

            <div className="mx-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase font-bold text-xs text-inherit">
                      Channel Type
                    </FormLabel>
                    <FormControl>
                      <div>
                        <Input
                          type="radio"
                          id="hosting-small"
                          value="hosting-small"
                          name="hosting"
                          className="hidden peer/one"
                          disabled={isPending}
                        />
                        <Label
                          htmlFor="hosting-small"
                          className="inline-flex items-center justify-between w-full p-5
                          border rounded-lg cursor-pointer
                          bg-white
                          dark:bg-gray-800
                          dark:hover:bg-gray-700
                          hover:bg-gray-100

                          border-gray-200
                          dark:border-gray-700

                          text-gray-500
                          dark:text-gray-400
                          hover:text-gray-600
                          dark:hover:text-gray-300

                          peer-checked/one:border-blue-600
                          peer-checked/one:text-blue-600
                          dark:peer-checked/one:text-blue-500
                        ">
                          <div>
                            <div className="w-full text-lg font-semibold">
                              0-50 MB
                            </div>
                            <div className="w-full">
                              Good for small websites
                            </div>
                          </div>
                          {/* svg here */}
                        </Label>

                        <Input
                          type="radio"
                          id="hosting-big"
                          value="hosting-big"
                          name="hosting"
                          className="hidden peer/two"
                          disabled={isPending}
                        />
                        <Label
                          htmlFor="hosting-big"
                          className="inline-flex items-center justify-between w-full p-5
                          border rounded-lg cursor-pointer
                          bg-white
                          dark:bg-gray-800
                          dark:hover:bg-gray-700
                          hover:bg-gray-100

                          border-gray-200
                          dark:border-gray-700

                          text-gray-500
                          dark:text-gray-400
                          hover:text-gray-600
                          dark:hover:text-gray-300

                          peer-checked/two:border-blue-600
                          peer-checked/two:text-blue-600
                          dark:peer-checked/two:text-blue-500
                        ">
                          <div>
                            <div className="w-full text-lg font-semibold">
                              500-1000 MB
                            </div>
                            <div className="w-full">
                              Good for large websites
                            </div>
                          </div>
                          {/* svg here */}
                        </Label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mx-4">
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
