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
import { filesValidator } from '@/schemas/validator/files-validator'
import { uploadPhoto } from '@/services/upload-photo'

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

  const onSubmit = async (values: z.infer<typeof editProfileSchema>) => {
    const file = form.getValues('files')
      ? form.getValues('files')[0]
      : null

    if (trimString(values.name) === user.name
      && trimString(values.about) === user.about
      && !file) {
      return
    }

    startTransition(async () => {
      const updatedUser = await editProfile({
        name: values.name,
        about: values.about,
      }, !!file)

      if (!updatedUser) {
        console.log('failed to update profile')
        return
      }

      if (file && updatedUser.image && updatedUser.image !== user.image) {
        await uploadPhoto(file, updatedUser.image)
      }

      console.log('successfully updated')
      setAllStatePreviewProfiles({
        name: updatedUser.name,
        about: updatedUser.about,
        image: updatedUser.image,
      })
      form.reset()
      form.setValue('name', updatedUser.name)
      form.setValue('about', updatedUser.about ?? '')
      router.refresh()
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
                        onChange: async (e) => {
                          const validatedFields = await z
                            .object({ files: filesValidator })
                            .spa({ files: e.target.files })
                          if (validatedFields.success) {
                            const objBlobUrl = URL.createObjectURL(validatedFields.data.files[0])
                            setPreviewProfiles('image', objBlobUrl)
                          }
                        },
                      })}
                      disabled={isPending}
                      id="userFileInput"
                      type="file"
                      className="cursor-pointer opacity-0 absolute w-0 h-0"
                    />
                    <div className={cn(
                      isPending
                        ? buttonVariants({ variant: 'primary', disabledStyle: 'disabled' })
                        : buttonVariants({ variant: 'primary' }),
                    )}
                    >
                      Change Avatar
                    </div>
                  </label>
                  <Button
                    disabled={isPending}
                    variant="underline"
                    type="button"
                    onClick={() => {
                      setPreviewProfiles('image', null)
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
