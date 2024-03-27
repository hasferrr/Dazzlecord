import { MemberItem } from '@/components/member-item'
import { ModeToggle } from '@/components/mode-toggle'

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
      <MemberItem
        username={username}
        image={image}
        desc={desc}
        className="px-1"
      />
      <ModeToggle />
    </div>
  )
}

export default ServerFooter
