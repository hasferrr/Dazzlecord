import type { Message, User } from '@prisma/client'

import { db } from '@/lib/db'

import ChatItem from './chat-item'

const ChatMessages = async () => {
  const dummyMsg = await db.message.findUnique({
    where: { id: '660e18b33b8850463bb711ab' },
    include: { user: true },
  }) as Message & { user: User }

  const dummy = (n: number) =>
    <ChatItem
      key={n}
      message={dummyMsg}
      currentUserId="65ebf43ce4715d18fd760fa0"
      currentUserRole="OWNER"
    />

  return (
    <div className="overflow-hidden">
      {
        (() => {
          const chats = []
          let i = 0
          while (i < 10) {
            chats.push(dummy(i))
            i++
          }
          return chats
        })()
      }
    </div>
  )
}

export default ChatMessages
