'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


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

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Please provide your display name.',
  }),
  about: z.string().max(255, {
    message: 'Maximum is 255 characters.',
  }),
})

const ProfilesForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      about: '',
    },
  })

  // TODO: onsubmit edit profile, add change photo
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
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
                  className="bg-navigation dark:bg-navigation-dark border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="What is your name?"
                  {...field}
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
                  className="bg-navigation dark:bg-navigation-dark border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="Type your bio here."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button
            variant="ghost"
            type="button"
            onClick={() => form.reset()}
            className="hover:bg-transparent hover:underline"
          >
            Reset
          </Button>
          <Button variant="primary" type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  )
}

export default ProfilesForm
