import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
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

  return (
    <Avatar className={cn(sizeClasses.get(width ?? height), className)}>
      <AvatarImage
        className="object-cover"
        src={src ?? `https://storage.googleapis.com/server-profile/${image}`}
      />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  )
}
