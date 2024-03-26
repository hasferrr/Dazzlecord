import Image from 'next/image'

import { ModeToggle } from '@/components/mode-toggle'

import ProfilePhoto from '../profile-photo'

const ServerFooter = async ({ username, desc, image }: {
  username: string
  desc: string
  image: string | null | undefined
}) => {
  return (
    <div className="h-[53px] w-full px-2 pb-[1px]
    bg-[var(--light-server-footer)] dark:bg-[var(--dark-server-footer)]
    flex items-center gap-2">
      <div className="h-8 w-8">
        {image
          ? <Image
            className="object-cover rounded-full overflow-hidden"
            src={`https://storage.googleapis.com/server-profile/${image}`}
            alt=""
            height={32}
            width={32}
          />
          : <div className="h-8 w-8 flex items-center justify-center
          border-black dark:border-white">
            <ProfilePhoto username={username} />
          </div>
        }
      </div>
      <div className="grid w-[130px]">
        <p className="text-sm truncate">{username}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {desc}
        </p>
      </div>
      <div className="grow" />
      <ModeToggle />
    </div>
  )
}

export default ServerFooter
