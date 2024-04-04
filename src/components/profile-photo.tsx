import Image from 'next/image'

import { cn } from '@/lib/utils'

export const ProfilePhoto = ({ username, image, width = 32, height = 32 }: {
  username: string
  image?: string | null
  width?: 32 | 40
  height?: 32 | 40
}) => {
  const initials = username.charAt(0).toUpperCase()
  const wpx = new Map([
    [32, 'w-[32px]'],
    [40, 'w-[40px]'],
  ])
  const hpx = new Map([
    [32, 'h-[32px]'],
    [40, 'h-[40px]'],
  ])

  if (image) {
    return (
      <Image
        className="object-cover rounded-full overflow-hidden"
        src={`https://storage.googleapis.com/server-profile/${image}`}
        alt=""
        height={height}
        width={width}
      />
    )
  }

  return (
    <div className={cn(
      wpx.get(width), hpx.get(height),
      'flex items-center justify-center rounded-full',
      'bg-black text-white dark:bg-white dark:text-black',
    )}>
      <span className="text-xl font-bold select-none">{initials}</span>
    </div>
  )
}
