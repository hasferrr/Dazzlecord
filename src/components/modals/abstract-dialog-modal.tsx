'use client'

import { useTransition } from 'react'

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

interface AbstractDialogModalProps {
  title: string
  deleteDescription: JSX.Element
  isDeleteModalOpen: boolean
  onDeleteModalClose: () => void
  onSubmitAction: () => any
  redirectPath?: string
  titleSubmitButton?: string
  variant?: 'default' | 'destructive' | 'primary',
  alwaysCloseModal?: boolean
}

const AbstractDialogModal = ({
  title,
  deleteDescription,
  isDeleteModalOpen,
  onDeleteModalClose,
  onSubmitAction,
  redirectPath,
  titleSubmitButton,
  alwaysCloseModal,
  variant = 'default',
}: AbstractDialogModalProps) => {
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  const handleOpenDialog = () => {
    onDeleteModalClose()
  }

  const handleDelete = async () => {
    startTransition(async () => {
      const res = await onSubmitAction()
      if (!res) {
        console.log(res)
        if (alwaysCloseModal) {
          onDeleteModalClose()
        }
        return
      }
      onDeleteModalClose()
      if (redirectPath) {
        router.push(redirectPath)
      }
      router.refresh()
    })
  }

  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={handleOpenDialog}>
      <DialogContent className="p-0 m-0 dark:bg-page-dark bg-page text-black dark:text-white w-[29rem]">

        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-lg font-bold">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm mt-8 text-primary">
            {deleteDescription}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="p-4 dark:bg-server-dark bg-server rounded-b-lg">
          <Button
            variant="underline"
            type="button"
            onClick={handleOpenDialog}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button variant={variant} onClick={handleDelete} disabled={isPending}>
            {titleSubmitButton || title}
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}

export default AbstractDialogModal
