import { ProfilePhoto } from '@/components/profile-photo'
import { cn } from '@/lib/utils'

export const MemberItem = ({ username, image, desc, className }: {
  username: string
  image?: string | null
  desc?: string
  className?: string
}) => {
  return (
    <button className={cn(
      'grid grid-cols-[auto_1fr] grid-rows-1 gap-x-2 items-center',
      'group rounded-md transition text-left',
      'hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50',
      className
    )}>
      <div className="row-span-2 my-auto">
        <ProfilePhoto username={username} image={image} />
      </div>
      <div className="grid">
        <p className="text-sm truncate">{username}</p>
        {desc &&
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {desc}
          </p>
        }
      </div>
    </button>
  )
}
