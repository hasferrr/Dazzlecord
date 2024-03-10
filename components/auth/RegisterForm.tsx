import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { register } from '@/actions/register'
import { ModeToggle } from '@/components/mode-toggle'
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
import { cn } from '@/lib/utils'
import { registerSchema } from '@/schemas'

import FormWrapper from './FormWrapper'

const RegisterForm = () => {
  const [usernameError, setUsernameError] = useState<string | undefined>()
  const [emailError, setEmailError] = useState<string | undefined>()

  const router = useRouter()
  const navigate = (path: string) => router.push(path)

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      username: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    const data = await register(values)
    if (data?.error) {
      setUsernameError(data.error.includes('username') ? 'Username is already exist' : undefined)
      setEmailError(data.error.includes('email') ? 'Email is already exist' : undefined)
      setTimeout(() => {
        setUsernameError(undefined)
        setEmailError(undefined)
      }, 3000)
    }
  }

  return (
    <FormWrapper title='register'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn(emailError ? 'text-destructive' : null)}>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{emailError}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn(usernameError ? 'text-destructive' : null)}>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john_doe"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{usernameError}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="******"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-wrap gap-3">
            <Button type="submit">Submit</Button>
            <div className="grow"></div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => navigate('/')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <ModeToggle />
          </div>
        </form>
      </Form>
    </FormWrapper>
  )
}

export default RegisterForm
