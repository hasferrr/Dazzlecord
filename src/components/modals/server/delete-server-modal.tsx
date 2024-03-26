'use client'

import { useTransition } from 'react'

import type { Server } from '@prisma/client'
import { useRouter } from 'next/navigation'

import { deleteServer } from '@/actions/server/delete-server'
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
  useDeleteServerClose,
  useDeleteServerValue,
} from '@/context/modalContext'

const DeleteServerModal = ({ server }: {
  server: Server,
}) => {
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  const onDeleteModalClose = useDeleteServerClose()
  const isDeleteModalOpen = useDeleteServerValue()

  const handleOpenDialog = () => {
    onDeleteModalClose()
  }

  const handleDelete = async () => {
    startTransition(async () => {
      const res = await deleteServer(server)
      if (res.error) {
        console.log(res)
        return
      }
      console.log(res.success)
      onDeleteModalClose()
      router.push('/app')
      router.refresh()
    })
  }

  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={handleOpenDialog}>
      <DialogContent className="p-0 m-0 dark:bg-[var(--dark-page)] text-black dark:text-white w-[29rem]">

        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-lg font-bold">Delete {`'${server.name}'`}</DialogTitle>
          <DialogDescription className="text-sm mt-8 text-primary">
            Are you sure you want to delete <strong>{server.name}</strong>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="p-4 bg-gray-100 dark:bg-[var(--dark-server)] rounded-b-lg">
          <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
            Delete Server
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog >
  )
}

export default DeleteServerModal
