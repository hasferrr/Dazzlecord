import { ProfilePhoto } from '@/components/profile-photo'
import { ScrollArea } from '@/components/ui/scroll-area'

import MemberSection from './member-section'

const MemberSidebar = () => {
  return (
    <div className="flex flex-col gap-2
    h-full w-60 text-primary py-2
    bg-[var(--light-server)] dark:bg-[var(--dark-server)]">
      <ScrollArea className="w-full px-4 flex flex-col gap-y-2">
        <div>
          <MemberSection />
          {/* TODO: loop */}
          <button className="flex items-center gap-x-2
          group px-2 py-2 mb-1 w-full rounded-md transition
          hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50">
            <div className="h-8 w-8 flex items-center justify-center
            border-black dark:border-white">
              <ProfilePhoto username="hasferrr" />
            </div>
            <div className="w-[152px]">
              <p className="text-left text-sm truncate">
                TODO: hasferrr__the_se_sdf_djfwND1239+d-dfj2
              </p>
            </div>
          </button>
        </div>
      </ScrollArea>
    </div>
  )
}

export default MemberSidebar
