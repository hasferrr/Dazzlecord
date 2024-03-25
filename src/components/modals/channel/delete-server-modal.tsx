'use client'

import { useTransition } from 'react'

import type { Channel } from '@prisma/client'
import { useRouter } from 'next/navigation'

import { deleteChannel } from '@/actions/channel/deleteChannel'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  useDeleteChannelClose,
  useDeleteChannelValue,
} from '@/context/deleteChannelContext'

const DeleteChannelModal = ({ channel }: {
  channel: Channel,
}) => {
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  const onDeleteModalClose = useDeleteChannelClose(channel.id)
  const isDeleteModalOpen = useDeleteChannelValue()

  const handleOpenDialog = () => {
    onDeleteModalClose()
  }

  const handleDelete = async () => {
    startTransition(async () => {
      const res = await deleteChannel(channel)
      if (res.error) {
        console.log(res)
        return
      }
      console.log(res.success)
      onDeleteModalClose()
      router.push(`/servers/${channel.serverId}`)
      router.refresh()
    })
  }

  return (
    <Dialog open={isDeleteModalOpen[channel.id]} onOpenChange={handleOpenDialog}>
      <DialogContent className="p-0 m-0 dark:bg-[var(--dark-page)] text-black dark:text-white w-[29rem]">

        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-lg font-bold">Delete Channel</DialogTitle>
          <DialogDescription className="text-sm mt-8 text-primary">
            Are you sure you want to delete <strong>#{channel.name}</strong>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="p-4 bg-gray-100 dark:bg-[var(--dark-server)] rounded-b-lg">
          <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
            Delete Channel
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog >
  )
}

export default DeleteChannelModal
