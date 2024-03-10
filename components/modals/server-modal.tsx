'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Server name is required.',
  }),
})

const ServerModal = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    alert(JSON.stringify(values))
  }

  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className='p-0 m-0 dark:bg-[#313338] text-black dark:text-white w-[29rem]'>

        <DialogHeader className='px-6 pt-6'>
          <DialogTitle className='text-center text-2xl font-bold'>Customize Your Server</DialogTitle>
          <DialogDescription className='text-center mt-8 text-zinc-500 dark:text-white/70'>
            Give your new server a personality with a name and an icon.
            You can always change it later.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex flex-col justify-center"
          >
            <div className="flex justify-center items-center">
              TODO: Upload Image
            </div>

            <div className='mx-4'>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase font-bold text-xs text-inherit'>
                      Server Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='bg-zinc-300/50 dark:bg-[#1e1f22] border-0
                        focus-visible:ring-0 focus-visible:ring-offset-0'
                        placeholder='Server Name'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className='text-xs'>
                      <span>By creating a server, you agree to Discord&apos;s </span>
                      <strong className='text-blue-500'>
                        <a href="//discord.com/guidelines" rel="noreferrer noopener" target="_blank">
                          Community Guidelines
                        </a>
                      </strong>.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className='p-4 bg-gray-100 dark:bg-[#2b2d31] rounded-b-lg'>
              <Button variant='primary' type="submit">
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>

      </DialogContent>
    </Dialog >
  )
}

export default ServerModal
