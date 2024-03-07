import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { ChevronLeft } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { cn } from '@/lib/utils'
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
// import { ModeToggle } from '@/components/mode-toggle'

/**
 * Abstract function component for Register and Login
 */
const AuthForm = ({
  title,
  submitHandler,
}: {
  title: 'register' | 'login'
  submitHandler: () => void
}) => {
  const router = useRouter()
  const navigate = (path: string) => router.push(path)

  const formSchema = z.object({
    name: z.string().min(1, {
      message: 'Please provide your display name.',
    }),
    email: z.string()
      .min(1, {
        message: 'Please provide your email.',
      })
      .email('This is not a valid email.'),
    username: z.string().min(3, {
      message: 'Username must be at least 3 characters.',
    }),
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters.',
    }),
  })

  const formSchemaLogin = z.object({
    username: z.string().min(3, {
      message: 'Username must be at least 3 characters.',
    }),
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters.',
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(title === 'register' ? formSchema : formSchemaLogin),
    defaultValues: {
      name: '',
      email: '',
      username: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  return (
    <div
      className={cn(
        'flex',
        'flex-col',
        'justify-center',
        'gap-4',
        'max-w-sm',
        'min-h-screen',
        'mx-auto',
        'px-8',
      )}
    >
      <h1 className="text-2xl font-bold">{title[0].toUpperCase() + title.slice(1)}</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {title === 'register'
            ?
            <>
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
            </>
            : <></>}
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
            {/* <ModeToggle /> */}
          </div>
        </form>
      </Form>
      <Button
        variant="ghost"
        className="mx-auto mt-3"
        onClick={() =>
          title === 'login' ? navigate('/register') : navigate('/login')
        }
      >
        {title === 'login'
          ? 'Don\'t have an account? Register here.'
          : 'Click here to login instead.'}
      </Button>
    </div>
  )
}

export default AuthForm
