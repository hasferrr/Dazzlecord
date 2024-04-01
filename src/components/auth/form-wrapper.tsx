'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

const FormWrapper = ({ title, children }: {
  title: 'login' | 'register'
  children: React.ReactNode
}) => {
  const router = useRouter()
  const navigate = (path: string) => router.push(path)

  return (
    <div className="flex flex-col justify-center gap-4 max-w-sm min-h-screen mx-auto px-8">
      <h1 className="text-2xl font-bold">{title[0].toUpperCase() + title.slice(1)}</h1>
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
    </div>
  )
}

export default FormWrapper
