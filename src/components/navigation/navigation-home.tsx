'use client'

import Image from 'next/image'
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
          pathname === '/channels/@me' && 'rounded-[16px] bg-indigo-500 dark:bg-indigo-500'
        )}>
          <div className={cn('absolute left-0 bg-primary rounded-r-[24px] transition-all w-[4px]',
            pathname !== '/channels/@me' && 'group-hover:h-[20px]',
            pathname === '/channels/@me' ? 'h-[36px]' : 'h-0',
          )} />
          <Image
            className={cn('group-hover:text-white transition dark:invert group-hover:invert',
              pathname === '/channels/@me' && 'invert',
            )}
            src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/653714c17467993e7b389c83_636e0a6918e57475a843f59f_icon_clyde_black_RGB.svg"
            alt=""
            height={29}
            width={29}
          />
        </div>
      </button>
    </div>
  )
}

export default NavigationHome
