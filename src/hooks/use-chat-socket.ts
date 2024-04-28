'use client'

import { useEffect } from 'react'

import { type InfiniteData, useQueryClient } from '@tanstack/react-query'

import { useSocket } from '@/context/socket-context'
import type { MessageWithUser } from '@/types'

type InfiniteMessageData = InfiniteData<{
  data: MessageWithUser[]
  nextCursor: string | null
}, unknown> | undefined

interface ChatSocketProps {
  id: string
  type: 'channel' | 'direct'
}

export const useChatSocket = ({
  id, type,
}: ChatSocketProps) => {
  const queryClient = useQueryClient()
  const socket = useSocket()

  useEffect(() => {
    if (!socket) {
      return undefined
    }

    const handleIncomingMessage = (message: MessageWithUser) => {
      queryClient.setQueryData([`message:${type}:${id}`], (data: InfiniteMessageData): InfiniteMessageData => (
        !data
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
          })
      ))
    }

    const handleEditedMessage = (updatedMessage: MessageWithUser) => {
      queryClient.setQueryData([`message:${type}:${id}`], (data: InfiniteMessageData): InfiniteMessageData => {
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

    const handleDeletedMessage = (deletedMessage: MessageWithUser) => {
      queryClient.setQueryData([`message:${type}:${id}`], (data: InfiniteMessageData): InfiniteMessageData => (
        !data
          ? undefined
          : ({
            pages: data.pages.map((page) => ({
              data: page.data.filter((msg) => msg.id !== deletedMessage.id),
              nextCursor: page.nextCursor,
            })),
            pageParams: data.pageParams,
          })
      ))
    }

    socket.on(`SEND:message:${type}`, handleIncomingMessage)
    socket.on(`EDIT:message:${type}`, handleEditedMessage)
    socket.on(`DELETE:message:${type}`, handleDeletedMessage)

    return () => {
      socket.off(`SEND:message:${type}`, handleIncomingMessage)
      socket.off(`EDIT:message:${type}`, handleEditedMessage)
      socket.off(`DELETE:message:${type}`, handleDeletedMessage)
    }
  }, [id, queryClient, socket, type])
}
