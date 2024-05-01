'use client'

import { Fragment, useEffect } from 'react'

import { MemberRole } from '@prisma/client'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'

import { queryMessages } from '@/actions/message/query-message'
import { generateToken } from '@/actions/socket-io/generate-token'
import ChatWelcome from '@/components/chat/chat-welcome'
import { useSocket } from '@/context/socket-context'
import { useChatSocket } from '@/hooks/use-chat-socket'

import ChatItem from './chat-item'
import SkeletonMessage from './skeleton-message'

interface ChatMessagesProps {
  userId: string
  channelId: string
  currentRole?: MemberRole
  chatWelcomeName?: string
}

const ChatMessages = ({
  userId,
  channelId,
  currentRole,
  chatWelcomeName,
}: ChatMessagesProps) => {
  const socket = useSocket()
  const { ref, inView } = useInView()

  useEffect(() => {
    if (!socket) {
      return
    }
    const join = async () => {
      const { token } = await generateToken(channelId, userId)
      socket.emit('joinChannelRoom', { channelId, userId }, token)
    }
    join()
  }, [channelId, userId, socket])

  const {
    status,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [`message:channel:${channelId}`],
    queryFn: async ({ pageParam }) => {
      const res = await queryMessages(pageParam, channelId)
      return res
    },
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  })

  useChatSocket({ id: channelId, type: 'channel' })

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  if (status === 'pending') {
    return <SkeletonMessage />
  }

  if (status === 'error') {
    return (
      <div>
        Error:
        {error.message}
      </div>
    )
  }

  return (
    <div className="overflow-hidden">
      {chatWelcomeName && !hasNextPage && <ChatWelcome name={chatWelcomeName} />}
      {isFetchingNextPage && <SkeletonMessage />}
      {!isFetchingNextPage && (
        <button
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage}
          className="cursor-default"
        >
          {hasNextPage && <SkeletonMessage />}
        </button>
      )}
      <div className="flex flex-col-reverse">
        {data.pages.map((page) => (
          <Fragment key={page.nextCursor}>
            {page.data.map((message) => (
              <ChatItem
                key={message.id}
                message={message}
                userId={userId}
                currentRole={currentRole || MemberRole.GUEST}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default ChatMessages
