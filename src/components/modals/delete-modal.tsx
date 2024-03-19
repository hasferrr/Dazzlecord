'use client'

import type { Server } from '@prisma/client'
import { useRouter } from 'next/navigation'

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

const DeleteModal = ({ server }: { server: Server }) => {
  const router = useRouter()

  const onDeleteModalClose = useDeleteServerClose()
  const isDeleteModalOpen = useDeleteServerValue()

  const handleOpenDialog = () => {
    onDeleteModalClose()
  }

  const handleDelete = () => {
    console.log('deleted')
    onDeleteModalClose()
    router.refresh()
  }

  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={handleOpenDialog}>
      <DialogContent className="p-0 m-0 dark:bg-[#313338] text-black dark:text-white w-[29rem]">

        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-lg font-bold">Delete {`'${server.name}'`}</DialogTitle>
          <DialogDescription className="text-sm mt-8 text-primary">
            Are you sure you want to delete <strong>{server.name}</strong>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="p-4 bg-gray-100 dark:bg-[#2b2d31] rounded-b-lg">
          <Button variant="destructive" onClick={handleDelete}>
            Delete Server
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog >
  )
}

export default DeleteModal
