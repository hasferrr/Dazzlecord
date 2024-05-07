'use client'

import { useTransition } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { DirectMessageWithUser, MessageWithUser } from '@/types'

import ChatItemContent from './chat-item-content'
import ChatItemFile from './chat-item-file'
import ChatItemNameTimestamp from './chat-item-name-timestamp'
import ChatItemProfilePhoto from './chat-item-profile-photo'

interface ChatItemDeleteDialogProps {
  open: boolean
  close: () => void
  deleteAction: () => void
  message: MessageWithUser | DirectMessageWithUser
}

const ChatItemDeleteDialog = ({
  open,
  close,
  deleteAction,
  message,
}: ChatItemDeleteDialogProps) => {
  const [isPending, startTransition] = useTransition()

  const closeDialog = () => {
    close()
  }

  const handleDelete = async () => {
    startTransition(async () => {
      deleteAction()
    })
  }

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent className="p-0 m-0 dark:bg-[var(--dark-page)] text-black dark:text-white w-[29rem]">

        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-lg font-bold">
            Delete Message
          </DialogTitle>
          <DialogDescription className="text-sm mt-8 text-primary">
            <p>Are you sure you want to delete this message?</p>
            <div className="my-4 relative group bg-chat-hover dark:bg-chat-hover-dark p-3 transition w-full
            grid grid-cols-[40px_1fr] grid-flow-row gap-x-4 rounded-md border-[2px] dark:border-server-dark border-server shadow-sm"
            >
              <ChatItemProfilePhoto message={message} />
              <ChatItemNameTimestamp message={message} />
              <p
                className="text-[15px] leading-[1.375rem] whitespace-break-spaces
                overflow-y-auto max-h-[200px]"
                style={{ wordBreak: 'break-word' }}
              >
                <ChatItemContent message={message} />
                <ChatItemFile message={message} />
              </p>
            </div>
            <p className="font-bold text-green-500">PROTIP:</p>
            <p>
              You can hold down shift when clicking
              {' '}
              <strong>delete message</strong>
              {' '}
              to bypass this confirmation entirely.
            </p>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="p-4 bg-gray-100 dark:bg-[var(--dark-server)] rounded-b-lg">
          <Button
            variant="underline"
            onClick={closeDialog}
            type="button"
            className="focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            Delete
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}

export default ChatItemDeleteDialog
