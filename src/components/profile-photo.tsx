import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'

type size = 32 | 40 | 48 | 80 | 96

interface ProfilePhotoProps {
  username: string
  image?: string | null
  src?: string
  width?: size
  height?: size
}

export const ProfilePhoto = ({
  username,
  image,
  src,
  width = 32,
  height = 32,
}: ProfilePhotoProps) => {
  const initials = username.slice(0, 2).toUpperCase()
  const sizeClasses = new Map([
    [32, 'w-[32px] h-[32px]'],
    [40, 'w-[40px] h-[40px]'],
    [48, 'w-[48px] h-[48px]'],
    [80, 'w-[80px] h-[80px]'],
    [96, 'w-[96px] h-[96px]'],
  ])

  return (
    <Avatar className={sizeClasses.get(width ?? height)}>
      <AvatarImage
        className="object-cover"
        src={src ?? `https://storage.googleapis.com/server-profile/${image}`}
      />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  )
}
