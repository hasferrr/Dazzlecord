import { redirect } from 'next/navigation'

import { getUserById } from '@/actions/prisma/user'
import { auth } from '@/auth'
import ChatHeader from '@/components/chat/chat-header'

const Me = async () => {
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
          name="Friends"
          channelType="TEXT"
        />
      </div>
      <div>
        TODO: List of recent direct chats
      </div>
      <div className="row-span-2">
        {/* <BigScreen width={992}>
          Sidebar
        </BigScreen> */}
      </div>
      <div className="px-5">
        {/* <div>Bottom</div> */}
      </div>
    </div>
  )
}

export default Me
