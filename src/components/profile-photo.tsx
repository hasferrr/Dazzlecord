import Image from 'next/image'

import { cn } from '@/lib/utils'

export const ProfilePhoto = ({ username, image }: {
  username: string
  image?: string | null
}) => {
  const initials = username.charAt(0).toUpperCase()

  if (image) {
    return (
      <Image
        className="object-cover rounded-full overflow-hidden"
        src={`https://storage.googleapis.com/server-profile/${image}`}
        alt=""
        height={32}
        width={32}
      />
    )
  }

  return (
    <div className={cn(
      'w-8 h-8 flex items-center justify-center rounded-full',
      'bg-black text-white dark:bg-white dark:text-black',
    )}>
      <span className="text-xl font-bold select-none">{initials}</span>
    </div>
  )
}
