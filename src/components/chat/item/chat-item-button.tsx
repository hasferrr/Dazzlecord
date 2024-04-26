import { type Dispatch, type SetStateAction } from 'react'

import { Pen, Trash } from 'lucide-react'

import ActionTooltip from '@/components/action-tooltip'

interface ChatItemButtonProps {
  messageId: string
  setIsEditing: Dispatch<SetStateAction<string | false>>
  canDeleteMessage: boolean
  canEditMessage: boolean
}

const ChatItemButton = ({
  messageId,
  setIsEditing,
  canDeleteMessage,
  canEditMessage,
}: ChatItemButtonProps) => canDeleteMessage
  && (
    <div className="absolute hidden group-hover:flex gap-x-1 -top-2 right-5
    bg-server dark:bg-server-dark border-navigation dark:border-navigation-dark
      border rounded-sm hover:shadow-md"
    >
      {canEditMessage && (
        <ActionTooltip label="Edit" className="mb-1">
          <Pen
            onClick={() => setIsEditing(messageId)}
            className="hover:bg-page dark:hover:bg-page-dark text-page-dark dark:text-page
            rounded-sm p-2 w-8 h-8 ml-auto transition cursor-pointer"
          />
        </ActionTooltip>
      )}
      <ActionTooltip label="Delete" className="mb-1">
        <Trash
          onClick={() => { }}
          className="hover:bg-page dark:hover:bg-page-dark text-page-dark dark:text-page
          rounded-sm p-2 w-8 h-8 ml-auto transition cursor-pointer"
        />
      </ActionTooltip>
    </div>
  )

export default ChatItemButton
