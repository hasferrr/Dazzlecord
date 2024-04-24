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

interface AbstractDeleteModalProps {
  title: string
  deleteDescription: JSX.Element
  isDeleteModalOpen: boolean
  onDeleteModalClose: () => void
  onSubmitAction: () => Promise<{ success?: string, error?: string }>
  redirectPath: string
  titleSubmitButton? :string
}

const AbstractDeleteModal = ({
  title,
  deleteDescription,
  isDeleteModalOpen,
  onDeleteModalClose,
  onSubmitAction,
  redirectPath,
  titleSubmitButton,
}: AbstractDeleteModalProps) => {
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  const handleOpenDialog = () => {
    onDeleteModalClose()
  }

  const handleDelete = async () => {
    startTransition(async () => {
      const res = await onSubmitAction()
      if (res.error) {
        console.log(res)
        return
      }
      console.log(res.success)
      onDeleteModalClose()
      router.push(redirectPath)
      router.refresh()
    })
  }

  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={handleOpenDialog}>
      <DialogContent className="p-0 m-0 dark:bg-[var(--dark-page)] text-black dark:text-white w-[29rem]">

        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-lg font-bold">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm mt-8 text-primary">
            {deleteDescription}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="p-4 bg-gray-100 dark:bg-[var(--dark-server)] rounded-b-lg">
          <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
            {titleSubmitButton || title}
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog >
  )
}

export default AbstractDeleteModal
