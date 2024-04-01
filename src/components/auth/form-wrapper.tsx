'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'

const FormWrapper = ({ title, children }: {
  title: 'login' | 'register'
  children: React.ReactNode
}) => {
  const router = useRouter()
  const navigate = (path: string) => router.push(path)

  return (
    <Dialog open>
      <DialogContent
        className="dark:bg-[#313338] text-black dark:text-white w-[29rem]
        flex flex-col justify-center gap-4-auto p-8"
        enableX={false}
      >
        <div>
          <h1 className="text-2xl font-bold text-center">
            {title.startsWith('l') ? 'Welcome back!' : 'Create an account'}
          </h1>
          {title.startsWith('l') &&
            <p className="text-sm text-center text-zinc-600 dark:text-zinc-400 mt-2">
              We{'\''}re so excited to see you again!
            </p>
          }
        </div>
        {children}
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
      </DialogContent>
    </Dialog>
  )
}

export default FormWrapper
