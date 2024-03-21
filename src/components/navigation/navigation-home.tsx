'use client'

import { Bot } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'

const NavigationHome = () => {
  const pathname = usePathname()
  const router = useRouter()

  const handleClick = () => {
    router.push('/app')
  }

  return (
    <div>
      <button className="group flex items-center justify-center" onClick={handleClick}>
        <div className={cn('flex items-center justify-center h-12 w-12 transition-all',
          'rounded-[24px]',
          'bg-[var(--light-page)]',
          'dark:bg-[var(--dark-page)]',
          'group-hover:rounded-[16px]',
          'group-hover:bg-indigo-500',
          pathname === '/app' && 'rounded-[16px] bg-indigo-500 dark:bg-indigo-500'
        )}>
          <div className={cn('absolute left-0 bg-primary rounded-r-[24px] transition-all w-[4px]',
            pathname !== '/app' && 'group-hover:h-[20px]',
            pathname === '/app' ? 'h-[36px]' : 'h-0',
          )} />
          <Bot
            className="group-hover:text-white transition"
            size={30}
          />
        </div>
      </button>
    </div>
  )
}

export default NavigationHome
