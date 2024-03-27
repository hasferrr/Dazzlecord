import { MemberItem } from '@/components/member-item'
import { ScrollArea } from '@/components/ui/scroll-area'

import MemberSection from './member-section'

const MemberSidebar = () => {
  const username = 'hasferrr'
  const image = null
  const desc = 'Hello World'

  return (
    <div className="flex flex-col gap-2
    h-full w-60 text-primary py-2
    bg-[var(--light-server)] dark:bg-[var(--dark-server)]">
      <ScrollArea className="w-full px-4 flex flex-col gap-y-2">
        <div>
          <MemberSection />
          {/* TODO: loop */}
          <MemberItem
            username={username}
            image={image}
            desc={desc}
            className="w-full px-2 py-1"
          />
        </div>
      </ScrollArea>
    </div>
  )
}

export default MemberSidebar
