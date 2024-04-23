'use client'

import { useTransition } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import type { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { editProfile } from '@/actions/user/edit-profile'
import { Button } from '@/components/ui/button'
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
import { useSetPreviewProfiles } from '@/context/settings/user/preview-profiles-context'
import { trimString } from '@/lib/helpers'

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Please provide your display name.',
  }),
  about: z.string().max(255, {
    message: 'Maximum is 255 characters.',
  }),
})

interface ProfilesFormProps {
  user: User
}

const ProfilesForm = ({
  user,
}: ProfilesFormProps) => {
  const setPreviewProfiles = useSetPreviewProfiles()
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      about: user.about ?? '',
    },
  })

  // TODO: onsubmit edit profile, add change photo
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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
                    setPreviewProfiles({
                      name: e.target.value,
                      about: form.getValues('about') ?? '',
                    })
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
                    setPreviewProfiles({
                      name: form.getValues('name'),
                      about: e.target.value,
                    })
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
            variant="ghost"
            type="button"
            onClick={() => {
              setPreviewProfiles({
                name: user.name,
                about: user.about ?? '',
              })
              form.setValue('name', user.name)
              form.setValue('about', user.about ?? '')
            }}
            className="hover:bg-transparent hover:underline"
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
