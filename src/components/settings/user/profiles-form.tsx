'use client'

import { useTransition } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import type { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { editProfile } from '@/actions/user/edit-profile'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useSetAllStatePreviewProfiles, useSetPreviewProfiles } from '@/context/settings/user/preview-profiles-context'
import { trimString } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import { editProfileSchema } from '@/schemas/edit-profile-schema'
import { filesValidator } from '@/schemas/server-modal-schema'

interface ProfilesFormProps {
  user: User
}

const ProfilesForm = ({
  user,
}: ProfilesFormProps) => {
  const setPreviewProfiles = useSetPreviewProfiles()
  const setAllStatePreviewProfiles = useSetAllStatePreviewProfiles()
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    mode: 'onChange',
    defaultValues: {
      name: user.name,
      about: user.about ?? '',
      files: undefined,
    },
  })

  // TODO: send photo (files) to context, and upload photo handler
  const onSubmit = async (values: z.infer<typeof editProfileSchema>) => {
    if (trimString(values.name) === user.name
      && trimString(values.about) === user.about) {
      return
    }
    startTransition(async () => {
      const updatedUser = await editProfile(values.name, values.about)
      if (updatedUser) {
        console.log('successfully updated')
        form.setValue('name', updatedUser.name)
        form.setValue('about', updatedUser.about ?? '')
        router.refresh()
        return
      }
      console.log('failed to update profile')
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase font-bold text-xs">
                Display Name
              </FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  className="bg-navigation dark:bg-navigation-dark border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="What is your name?"
                  {...field}
                  onChange={(e) => {
                    setPreviewProfiles('name', e.target.value)
                    field.onChange(e)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="files"
          render={() => (
            <FormItem>
              <FormLabel className="uppercase font-bold text-xs">
                Avatar
              </FormLabel>
              <FormControl>
                <div>
                  <label htmlFor="userFileInput" className="cursor-pointer">
                    <input
                      {...form.register('files', {
                        onChange: (e) => {
                          const validatedFields = z
                            .object({ files: filesValidator })
                            .safeParse({ files: e.target.files })
                          if (validatedFields.success) {
                            setPreviewProfiles('image', URL.createObjectURL(e.target.files[0]))
                          }
                        },
                      })}
                      disabled={isPending}
                      id="userFileInput"
                      type="file"
                    // className="cursor-pointer opacity-0 absolute w-0 h-0"
                    />
                    <div className={cn(buttonVariants({ variant: 'primary' }))}>
                      Change Avatar
                    </div>
                  </label>
                  <Button
                    disabled={isPending}
                    variant="underline"
                    type="button"
                    onClick={() => {
                      form.resetField('files')
                    }}
                  >
                    Undo
                  </Button>
                </div>
              </FormControl>
              <FormMessage>{form.formState.errors?.files?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase font-bold text-xs">
                About Me
              </FormLabel>
              <FormControl>
                <Textarea
                  disabled={isPending}
                  className="bg-navigation dark:bg-navigation-dark border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="Type your bio here."
                  {...field}
                  onChange={(e) => {
                    setPreviewProfiles('about', e.target.value)
                    field.onChange(e)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button
            disabled={isPending}
            variant="underline"
            type="button"
            onClick={() => {
              setAllStatePreviewProfiles({
                name: user.name,
                about: user.about,
                image: user.image,
              })
              form.reset()
              form.setValue('name', user.name)
              form.setValue('about', user.about ?? '')
            }}
          >
            Reset
          </Button>
          <Button
            disabled={isPending}
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ProfilesForm
