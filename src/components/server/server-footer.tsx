import { ModeToggle } from '@/components/mode-toggle'
import { ProfilePhoto } from '@/components/profile-photo'

const ServerFooter = async ({ username, desc, image }: {
  username: string
  desc: string
  image?: string | null
}) => {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-2
    h-[53px] w-full p-2
    bg-[var(--light-server-footer)]
    dark:bg-[var(--dark-server-footer)]">
      <button className="grid grid-cols-[auto_1fr] grid-rows-1 gap-x-2 items-center
        group rounded-md transition text-left px-1
        hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50">
        <div className="row-span-2 my-auto">
          <ProfilePhoto username={username} image={image} />
        </div>
        <div className="grid">
          <p className="text-sm truncate">{username}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {desc}
          </p>
        </div>
      </button>
      <ModeToggle />
    </div>
  )
}

export default ServerFooter
