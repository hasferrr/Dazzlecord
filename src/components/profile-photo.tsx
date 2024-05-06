import { forwardRef } from 'react'

import Image from 'next/image'

import { cn } from '@/lib/utils'

interface ProfilePhotoProps {
  username: string
  src?: string | null
  width: number
  height: number
  className?: string
  handleImageLoad?: () => void
  style?: React.CSSProperties
}

const ProfilePhoto = forwardRef<HTMLImageElement, ProfilePhotoProps>(({
  username,
  src,
  width,
  height,
  className,
  handleImageLoad,
  style,
}, ref) => {
  const initials = username.slice(0, 2).toUpperCase()

  if (src) {
    return (
      <Image
        ref={ref}
        className={cn('object-cover rounded-full overflow-hidden', className)}
        src={src}
        alt=""
        height={512}
        width={512}
        style={{ height: `${height}px`, width: `${width}px`, ...style }}
        onLoad={handleImageLoad}
        quality={100}
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
      style={{ height: `${height}px`, width: `${width}px`, ...style }}
    >
      <span
        className="select-none"
        style={{ fontSize: `${(width + height) / 2 / 2}px` }}
      >
        {initials}
      </span>
    </div>
  )
})

ProfilePhoto.displayName = 'ProfilePhoto'

export default ProfilePhoto
