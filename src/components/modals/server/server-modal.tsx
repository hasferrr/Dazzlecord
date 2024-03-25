'use client'

import { useState, useTransition } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createNewServer } from '@/actions/server/createNewServer'
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  useServerClose,
  useServerValue,
} from '@/context/modalContext'
import {
  checkLength,
  checkSize,
  checkTypes,
  failedLength,
  failedSize,
  failedTypes,
  serverModalSchema,
} from '@/schemas/serverModalSchema'
import { uploadPhoto } from '@/services/upload-photo'
import SVGUploadIcon from '@/svg/SVGUploadIcon'

const ServerModal = () => {
  const [file, setFile] = useState<File | null>(null)
  const [fileErrorMsg, setFileErrorMsg] = useState<string | undefined>(undefined)
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  const onClose = useServerClose()
  const isModalOpen = useServerValue()

  const form = useForm<z.infer<typeof serverModalSchema>>({
    resolver: zodResolver(serverModalSchema),
    defaultValues: {
      name: '',
    },
  })

  const filesRef = form.register('files')

  const onSubmit = async (values: z.infer<typeof serverModalSchema>) => {
    console.log('uploading...')
    startTransition(async () => {
      try {
        const newServer = await createNewServer(values.name)
        if (newServer.image) {
          await uploadPhoto(values.files[0], newServer.image)
        }
        console.log('success!!!')
        form.reset()
        setFile(null)
        setFileErrorMsg(undefined)
        onClose()
        router.push(`/servers/${newServer.id}`)
        router.refresh()
      } catch (error) {
        console.log('error:', error)
      }
    })
  }

  const handleOpenDialog = () => {
    setTimeout(() => {
      form.reset()
      setFile(null)
      setFileErrorMsg(undefined)
    }, 100)
    onClose()
  }

  const handleImageChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputElement = event.target as HTMLInputElement
    const files = inputElement.files
    if (!files) {
      setFile(null)
      setFileErrorMsg(undefined)
      return
    }
    if (!checkLength(files)) {
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

  const handleResetImage = () => {
    form.resetField('files')
    setFile(null)
    setFileErrorMsg(undefined)
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleOpenDialog}>
      <DialogContent className="p-0 m-0 dark:bg-[#313338] text-black dark:text-white w-[29rem]">

        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-center text-2xl font-bold">Customize Your Server</DialogTitle>
          <DialogDescription className="text-center mt-8 text-zinc-500 dark:text-white/70">
            Give your new server a personality with a name and an icon.
            You can always change it later.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex flex-col justify-center"
          >
            <div className="flex justify-center items-center mt-4">
              <FormField
                control={form.control}
                name="files"
                render={() => {
                  return (
                    <FormItem className="flex flex-col justify-center items-center">
                      <FormControl>
                        <div className="relative h-20 w-20">
                          <label htmlFor="fileInput" className="cursor-pointer">
                            <Input
                              disabled={isPending}
                              id="fileInput"
                              type="file"
                              {...filesRef}
                              className="cursor-pointer opacity-0 absolute w-0 h-0 top-[10000px]"
                              onChange={handleImageChange}
                            />
                            {file
                              ? <Image
                                className="h-20 w-20 rounded-full object-cover"
                                src={URL.createObjectURL(file)}
                                alt=""
                                width={80}
                                height={80}
                              />
                              : <SVGUploadIcon />
                            }
                          </label>
                          {file
                            ? <button onClick={handleResetImage} type="button" disabled={isPending}>
                              <X className="absolute z-50 top-0 right-0 rounded-full
                              bg-rose-500 text-white p-1" />
                            </button>
                            : <></>
                          }
                        </div>
                      </FormControl>
                      <FormMessage>{fileErrorMsg}</FormMessage>
                    </FormItem>
                  )
                }}
              />
            </div>

            <div className="mx-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase font-bold text-xs text-inherit">
                      Server Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        className="bg-zinc-300/50 dark:bg-[var(--dark-navigation)] border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Server Name"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      <span>By creating a server, you agree to Discord&apos;s </span>
                      <strong className="text-blue-500">
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

            <DialogFooter className="p-4 bg-gray-100 dark:bg-[var(--dark-server)] rounded-b-lg">
              <Button variant="primary" type="submit" disabled={isPending}>
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
