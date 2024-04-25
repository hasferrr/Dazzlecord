'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

const FormWrapper = ({ title, children }: {
  title: 'login' | 'register'
  children: React.ReactNode
}) => {
  const router = useRouter()

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Image
        className="absolute z-10 select-none pointer-events-none"
        src="/wallpaper/auth-wp.svg"
        alt=""
        height={0}
        width={0}
        sizes="100vh"
        style={{ width: '100%', height: '100%' }}
      />
      <div
        className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg gap-4 border-none
        translate-x-[-50%] translate-y-[-50%] p-6 sm:rounded-lg"
      >
        <div
          className="bg-page dark:bg-page-dark w-[29rem] p-8 rounded-md shadow-xl transition-all
          flex flex-col justify-center gap-4-auto"
        >
          <div>
            <h1 className="text-2xl font-bold text-center">
              {title.startsWith('l') ? 'Welcome back!' : 'Create an account'}
            </h1>
            <p className="text-sm text-center text-zinc-600 dark:text-zinc-400 mt-2">
              {title.startsWith('l') && 'We\'re so excited to see you again!'}
            </p>
          </div>
          {children}
          <Button
            variant="ghost"
            className="mx-auto mt-3"
            onClick={() => (title === 'login' ? router.push('/register') : router.push('/login'))}
          >
            {title === 'login'
              ? 'Don\'t have an account? Register here.'
              : 'Click here to login instead.'}
          </Button>
        </div>
      </div>
    </div>

  )
}

export default FormWrapper
