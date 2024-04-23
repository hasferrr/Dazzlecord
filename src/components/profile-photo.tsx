import Image from 'next/image'

import { cn } from '@/lib/utils'

type size = 32 | 40 | 48 | 80 | 92 | 96

interface ProfilePhotoProps {
  username: string
  image?: string | null
  src?: string
  width?: size
  height?: size
  className?: string
}

export const ProfilePhoto = ({
  username,
  image,
  src,
  width = 32,
  height = 32,
  className,
}: ProfilePhotoProps) => {
  const initials = username.slice(0, 2).toUpperCase()
  const sizeClasses = new Map([
    [32, 'w-[32px] h-[32px]'],
    [40, 'w-[40px] h-[40px]'],
    [48, 'w-[48px] h-[48px]'],
    [80, 'w-[80px] h-[80px]'],
    [92, 'w-[92px] h-[92px]'],
    [96, 'w-[96px] h-[96px]'],
  ])

  if (src || image) {
    return (
      <Image
        className={cn(
          'object-cover rounded-full overflow-hidden',
          sizeClasses.get(width),
          className
        )}
        src={src ?? `https://storage.googleapis.com/server-profile/${image}`}
        alt=""
        height={height}
        width={width}
      />
    )
  }

  return (
    <div className={cn(
      sizeClasses.get(width),
      'flex items-center justify-center rounded-full',
      'bg-black text-white dark:bg-white dark:text-black',
      className,
    )}>
      <span className="text-xl font-bold select-none">{initials}</span>
    </div>
  )
}
