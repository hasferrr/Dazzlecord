import { redirect } from 'next/navigation'

import { sendDirectMessage } from '@/actions/direct-message/send-direct-message'
import { getFriendByUsersId } from '@/actions/prisma/friends'
import { auth } from '@/auth'
import ChatHeader from '@/components/chat/chat-header'
import ChatInput from '@/components/chat/chat-input'
import ChatWrapper from '@/components/chat/chat-wrapper'
import BigScreen from '@/components/media-query/big-screen'

interface FriendUserIdProps {
  params: {
    friendsUserId: string;
  }
}

const FriendUserId = async ({
  params,
}: FriendUserIdProps) => {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const userId = session.user.id

  let friendsUser
  try {
    const res = await getFriendByUsersId(userId, params.friendsUserId)
    friendsUser = res.friendsUser
  } catch (error) {
    return redirect('/app')
  }

  return (
    <div className="bg-page dark:bg-page-dark h-full w-full
    max-h-screen min-h-screen
    grid grid-cols-[1fr_auto] grid-rows-[3rem_1fr_auto]"
    >
      <div className="col-span-2 h-12">
        <ChatHeader
          title={friendsUser.name}
          iconType="TEXT"
          left={null}
          right={null}
        />
      </div>
      <ChatWrapper
        type="direct-message"
        userId={userId}
        channelId={params.friendsUserId} // TODO: check chat-item-edit-form.tsx
      />
      <div className="row-span-2">
        <BigScreen width={992}>
          {/* <MemberSidebar serverId={params.serverId} /> // TODO: show friend's profile */}
          <div />
        </BigScreen>
      </div>
      <div className="px-5">
        <ChatInput
          type="direct-message"
          channelName={friendsUser.username}
          sendFn={async (values, files) => {
            'use server'

            return sendDirectMessage(
              values,
              files,
              friendsUser.id,
            )
          }}
        />
      </div>
    </div>
  )
}

export default FriendUserId
