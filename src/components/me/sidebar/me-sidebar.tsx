import Section from '@/components/section'
import ServerFooter from '@/components/server/server-footer'
import { ScrollArea } from '@/components/ui/scroll-area'

import MeHeader from './me-header'

const MeSidebar = () => (
  <div className="flex flex-col gap-2 h-full w-60 text-primary bg-server dark:bg-server-dark">
    <MeHeader />
    <ScrollArea className="w-full px-4 flex flex-col gap-y-2">
      <div>
        <Section title="Direct Message" />
        <div className="flex flex-col gap-[2px]">
          TODO: List of recent direct chats
        </div>
      </div>
    </ScrollArea>
    <div className="grow" />
    <ServerFooter />
  </div>
)

export default MeSidebar
