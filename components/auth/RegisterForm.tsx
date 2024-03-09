import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { ChevronLeft } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ModeToggle } from '@/components/mode-toggle'
import { registerSchema } from '@/schemas'
import FormWrapper from './FormWrapper'
import { register } from '@/actions/register'

const LoginForm = () => {
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
    console.log(data)
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john_doe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
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

export default LoginForm
