'use client'

import { Fragment, useEffect } from 'react'

import type { Member } from '@prisma/client'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'

import { queryMessages } from '@/actions/message/query-message'
import { generateToken } from '@/actions/socket-io/generate-token'
import ChatWelcome from '@/components/chat/chat-welcome'
import { useSocket } from '@/context/socket-context'
import type { MessageWithUser } from '@/types'

import ChatItem from './chat-item'
import SkeletonMessage from './skeleton-message'

interface ChatMessagesProps {
  channelId: string
  channelName: string
  currentMember: Member
}

const ChatMessages = ({
  channelId,
  channelName,
  currentMember,
}: ChatMessagesProps) => {
  const queryClient = useQueryClient()
  const socket = useSocket()
  const { ref, inView } = useInView()

  useEffect(() => {
    if (!socket) {
      return
    }
    const join = async () => {
      const { token } = await generateToken(channelId, currentMember.userId)
      socket.emit('joinChannelRoom', { channelId, userId: currentMember.userId }, token)
    }
    join()
  }, [channelId, currentMember.userId, socket])

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

  type InfiniteData = typeof data

  useEffect(() => {
    if (!socket) {
      return undefined
    }
    const handleIncomingMessage = (message: MessageWithUser) => {
      queryClient.setQueryData([`message:channel:${channelId}`], (data: InfiniteData) => (!data
        ? undefined
        : ({
          pages: [
            {
              data: [message, ...data.pages[0].data],
              nextCursor: data.pages[0].nextCursor,
            },
            ...data.pages.slice(1),
          ],
          pageParams: data.pageParams,
        })))
    }

    const handleEditedMessage = (updatedMessage: MessageWithUser) => {
      queryClient.setQueryData([`message:channel:${channelId}`], (data: InfiniteData) => {
        if (!data) return undefined
        // Flag to track if updatedMessage has been found and updated
        const updated = false
        const transformedPages = data.pages.map((page) => (!updated
          ? ({
            data: page.data.map((msg) => (msg.id === updatedMessage.id ? updatedMessage : msg)),
            nextCursor: page.nextCursor,
          })
          : page
        ))
        return {
          pages: transformedPages,
          pageParams: data.pageParams,
        }
      })
    }

    socket.on('SEND:message:channel', handleIncomingMessage)
    socket.on('EDIT:message:channel', handleEditedMessage)

    return () => {
      socket.off('SEND:message:channel', handleIncomingMessage)
      socket.off('EDIT:message:channel', handleEditedMessage)
    }
  }, [channelId, queryClient, socket])

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
      {!hasNextPage && <ChatWelcome name={channelName} />}
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
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default ChatMessages
