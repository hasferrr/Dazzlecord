import ServerFooter from '@/components/server/server-footer'
import { ScrollArea } from '@/components/ui/scroll-area'

import MeHeader from './me-header'
import MeSidebarSection from './me-sidebar-section'

const MeSidebar = () => (
  <div className="flex flex-col gap-2 h-full w-60 text-primary bg-server dark:bg-server-dark">
    <MeHeader />
    <ScrollArea className="w-full px-4 flex flex-col gap-y-2">
      <div>
        <MeSidebarSection />
        <div className="flex flex-col gap-[2px]">
          TODO: list of friends
        </div>
      </div>
    </ScrollArea>
    <div className="grow" />
    <ServerFooter />
  </div>
)

export default MeSidebar
