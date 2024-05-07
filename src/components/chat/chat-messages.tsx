'use client'

import { Fragment, useEffect } from 'react'

import { MemberRole } from '@prisma/client'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'

import { queryDirectMessages } from '@/actions/direct-message/query-direct-message'
import { queryMessages } from '@/actions/message/query-message'
import { generateToken } from '@/actions/socket-io/generate-token'
import ChatWelcome from '@/components/chat/chat-welcome'
import { useSocket } from '@/context/socket-context'
import { useChatSocket } from '@/hooks/use-chat-socket'
import type { DirectMessageWithUser, MessageWithUser, MessageWithUserAndMember } from '@/types'

import ChatItem from './chat-item'
import SkeletonMessage from './skeleton-message'

interface ChatMessagesProps {
  type: 'channel' | 'direct-message'
  userId: string
  channelId: string
  currentRole?: MemberRole
  chatWelcomeName?: string
}

const ChatMessages = ({
  type,
  userId,
  channelId,
  currentRole,
  chatWelcomeName,
}: ChatMessagesProps) => {
  const socket = useSocket()
  const { ref, inView } = useInView()

  const queryKey = type === 'channel'
    ? channelId
    : `${userId}:${channelId}`

  useEffect(() => {
    if (!socket) {
      return
    }
    const join = async () => {
      const { token } = await generateToken(channelId, userId)
      socket.emit(`join:${type}:room`, { channelId, userId }, token)
    }
    join()
  }, [channelId, userId, socket, type])

  const {
    status,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: async ({ pageParam }) => {
      const res = type === 'channel'
        ? await queryMessages(pageParam, channelId)
        : await queryDirectMessages(pageParam, channelId)
      return res
    },
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  })

  useChatSocket({
    queryKey,
    type,
  })

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
                // prevent type error, conditional type doesn't work
                // typescript doesn't handle conditional type properly
                type={type as 'channel'}
                message={message as MessageWithUser}
                userId={userId}
                currentRole={currentRole || MemberRole.GUEST}
                messageUserRole={(() => {
                  const hasMember = (
                    obj: MessageWithUserAndMember | DirectMessageWithUser,
                  ): obj is MessageWithUserAndMember => 'member' in obj
                  return hasMember(message)
                    ? message.member.role
                    : MemberRole.GUEST
                })()}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default ChatMessages
