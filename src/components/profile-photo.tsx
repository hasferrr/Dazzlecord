import Image from 'next/image'

import { cn } from '@/lib/utils'

interface ProfilePhotoProps {
  username: string
  image?: string | null
  src?: string
  width: number
  height: number
  className?: string
}

export const ProfilePhoto = ({
  username,
  image,
  src,
  width,
  height,
  className,
}: ProfilePhotoProps) => {
  const initials = username.slice(0, 2).toUpperCase()

  if (src || image) {
    return (
      <Image
        className={cn('object-cover rounded-full overflow-hidden', className)}
        src={src ?? `https://storage.googleapis.com/server-profile/${image}`}
        alt=""
        height={height}
        width={width}
        style={{ height: `${height}px`, width: `${width}px` }}
      />
    )
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full',
        'bg-alt-profile-photo dark:bg-alt-profile-photo-dark',
        className,
      )}
      style={{ height: `${height}px`, width: `${width}px` }}
    >
      <span
        className="select-none"
        style={{ fontSize: `${(width + height) / 2 / 2}px` }}
      >
        {initials}
      </span>
    </div>
  )
}
