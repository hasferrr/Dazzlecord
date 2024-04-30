import {
  type Dispatch, type SetStateAction, useEffect, useState,
} from 'react'

import { Pen, Trash } from 'lucide-react'

import ActionTooltip from '@/components/action-tooltip'
import { cn } from '@/lib/utils'

interface ChatItemButtonProps {
  messageId: string
  setIsEditing: Dispatch<SetStateAction<string | false>>
  setIsDeleting: Dispatch<SetStateAction<boolean>>
  canDeleteMessage: boolean
  canEditMessage: boolean
  deleteAction: () => void
}

const ChatItemButton = ({
  messageId,
  setIsEditing,
  setIsDeleting,
  canDeleteMessage,
  canEditMessage,
  deleteAction,
}: ChatItemButtonProps) => {
  const [isDirectDelete, setIsDirectDelete] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Shift') {
        setIsDirectDelete(true)
      }
    }
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Shift') {
        setIsDirectDelete(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return canDeleteMessage && (
    <div className="absolute hidden group-hover:flex gap-x-1 -top-2 right-5
    bg-server dark:bg-server-dark border-navigation dark:border-navigation-dark
      border rounded-sm hover:shadow-md"
    >
      {canEditMessage && (
        <ActionTooltip label="Edit" className="mb-1">
          <Pen
            onClick={() => setIsEditing(messageId)}
            className="hover:bg-page dark:hover:bg-page-dark text-page-dark dark:text-page
            rounded-sm p-2 w-8 h-8 ml-auto transition cursor-pointer select-none"
          />
        </ActionTooltip>
      )}
      <ActionTooltip label="Delete" className="mb-1">
        <Trash
          onClick={() => (isDirectDelete ? deleteAction() : setIsDeleting(true))}
          className={cn(
            isDirectDelete
              ? 'bg-red-500 text-white dark:bg-red-600'
              : 'hover:bg-page dark:hover:bg-page-dark text-page-dark dark:text-page',
            'rounded-sm p-2 w-8 h-8 ml-auto transition cursor-pointer select-none',
          )}
        />
      </ActionTooltip>
    </div>
  )
}

export default ChatItemButton
