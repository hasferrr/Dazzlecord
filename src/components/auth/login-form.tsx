import { useState, useTransition } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { login } from '@/actions/login'
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
import { loginSchema } from '@/schemas/loginSchema'

import FormWrapper from './form-wrapper'

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition()

  const router = useRouter()
  const navigate = (path: string) => router.push(path)

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    startTransition(async () => {
      const data = await login(values)
      if (data?.error) {
        setError(data.error)
        setTimeout(() => {
          setError(undefined)
        }, 3000)
      } else {
        console.log(data.success)
      }
    })
  }

  return (
    <FormWrapper title="login">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn(error ? 'text-destructive' : null)}>Username</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    className="input-primary dark:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="john_doe"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{error}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn(error ? 'text-destructive' : null)}>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    className="input-primary dark:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    type="password"
                    placeholder="******"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{error}</FormMessage>
              </FormItem>
            )}
          />
          <div className="flex flex-wrap gap-3">
            <Button type="submit" disabled={isPending}>Submit</Button>
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

export default LoginForm
