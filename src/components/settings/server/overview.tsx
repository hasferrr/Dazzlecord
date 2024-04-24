'use client'

import { useTransition } from 'react'

import type { Server } from '@prisma/client'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

import { updateServer } from '@/actions/server/update-server'
import ProfilePhoto from '@/components/profile-photo'
import { Button } from '@/components/ui/button'
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
import { useServerForm } from '@/hooks/useServerForm'
import { getFileURLFromGCS, trimString } from '@/lib/helpers'
import {
  serverModalSchema,
  serverModalSchemaAllowNoFile,
} from '@/schemas/server-modal-schema'
import SVGUploadIcon from '@/svg/SVG-upload-icon'

const Overview = ({ server }: {
  server: Server
}) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const {
    form,
    file,
    fileErrorMsg,
    filesRef,
    handleOnSubmit,
    handleImageChange,
    handleResetAll,
    handleResetImage,
  } = useServerForm(
    { name: server.name, files: undefined },
    serverModalSchemaAllowNoFile,
  )

  const onSubmit = (values: z.infer<typeof serverModalSchema>) => {
    if (trimString(values.name) === server.name && !file) {
      return
    }

    startTransition(() => {
      handleOnSubmit(() => updateServer(server.id, values.name, !!file), !!file, () => {
        handleResetAll(0, values.name)
        router.refresh()
      })
    })
  }

  return (
    <div>
      <h1 className="text-lg font-bold">Server Overview</h1>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="lg:grid block grid-cols-2 grid-flow-row"
          >
            <div className="flex items-center mt-4">
              <FormField
                control={form.control}
                name="files"
                render={() => (
                  <FormItem className="flex justify-center gap-5">
                    <div>
                      <FormControl>
                        <div className="relative h-[120px] w-[120px] flex justify-center items-center">
                          <label htmlFor="fileInput" className="cursor-pointer">
                            <input
                              disabled={isPending}
                              id="fileInput"
                              type="file"
                              {...filesRef}
                              className="cursor-pointer opacity-0 absolute w-0 h-0"
                              onChange={(e) => handleImageChange(e, false)}
                            />
                            {file ?? server.image
                              ? (
                                <ProfilePhoto
                                  src={file
                                      ? URL.createObjectURL(file)
                                      : getFileURLFromGCS(server.image)}
                                  width={96}
                                  height={96}
                                  username={form.getValues('name') ?? ''}
                                />
                              )
                              : <SVGUploadIcon width={96} height={96} />}
                          </label>
                          {file
                            ? (
                              <button onClick={handleResetImage} type="button" disabled={isPending}>
                                <X className="absolute z-50 top-3 right-3 rounded-full
                              bg-rose-500 text-white p-1"
                                />
                              </button>
                            )
                            : <></>}
                        </div>
                      </FormControl>
                      <FormMessage className="pt-1 text-center">
                        {fileErrorMsg ?? <span className="text-foreground">Required</span>}
                      </FormMessage>
                    </div>
                    <div className="flex flex-col gap-2">
                      <FormDescription className="text-[13px] w-[200px]">
                        We recommend an image of at least 512x512 for the server.
                      </FormDescription>
                      <label htmlFor="fileInput">
                        <div className="border-secondary-foreground/40 bg-transparent hover:bg-secondary-foreground/10
                          py-2 px-3 border-[1px] rounded-sm w-fit text-[13px] cursor-pointer"
                        >
                          Upload Image
                        </div>
                      </label>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className="lg:ml-4 pt-9">
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
                        className="bg-zinc-300/50 dark:bg-[var(--dark-navigation)] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 lg:max-w-[999px] max-w-[320px]"
                        placeholder="Server Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-2 pt-10 rounded-b-lg flex lg:justify-end">
              <Button variant="primary" type="submit" disabled={isPending}>
                Update
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Overview
