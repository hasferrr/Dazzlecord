import { redirect } from 'next/navigation'

import { getUserById } from '@/actions/prisma/user'
import { auth } from '@/auth'
import ChatHeader from '@/components/chat/chat-header'
import MeWrapper from '@/components/me/me-wrapper'
import MeNotificationSidebar from '@/components/me/sidebar/me-notification-sidebar'
import MeSidebar from '@/components/me/sidebar/me-sidebar'
import BigScreen from '@/components/media-query/big-screen'

const MePage = async () => {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const userId = session.user.id

  const user = await getUserById(userId)
  if (!user) {
    return redirect('/')
  }

  return (
    <div className="bg-page dark:bg-page-dark h-full w-full
    max-h-screen min-h-screen
    grid grid-cols-[1fr_auto] grid-rows-[3rem_1fr_auto]"
    >
      <div className="col-span-2 h-12">
        <ChatHeader
          title="Friends"
          iconType="PERSON"
          right={<MeNotificationSidebar />}
          left={<MeSidebar />}
        />
      </div>
      <MeWrapper />
      <div className="row-span-2">
        <BigScreen width={992}>
          <MeNotificationSidebar />
        </BigScreen>
      </div>
      <div className="px-5">
        {/* <div>Bottom</div> */}
      </div>
    </div>
  )
}

export default MePage
