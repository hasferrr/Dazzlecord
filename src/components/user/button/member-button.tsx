'use client'

import { useRef } from 'react'

import { Mail, UserPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { addFriendById } from '@/actions/friend/add-friends-by-id'
import { Separator } from '@/components/ui/separator'

interface MemberButtonProps {
  userId: string
}

const MemberButton = ({
  userId,
}: MemberButtonProps) => {
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)

  return (
    <>
      <Separator />
      <button
        className="flex items-center gap-2 hover:bg-server-hover dark:hover:bg-server-hover-dark w-full p-[6px] rounded-sm transition-all"
        onClick={() => router.push(`/channels/me/${userId}`)}
      >
        <Mail size={18} />
        <div>Message</div>
      </button>
      <Separator />
      <button
        className="flex items-center gap-2 hover:bg-green-600 hover:text-white w-full p-[6px] rounded-sm transition-all"
        onClick={async () => {
          const res = await addFriendById(userId)
          if (!res.success) {
            if (ref.current) {
              ref.current.textContent = res.error.charAt(0).toUpperCase() + res.error.slice(1)
            }
            return
          }
          if (ref.current) {
            ref.current.textContent = 'Success'
          }
        }}
      >
        <UserPlus size={18} />
        <div ref={ref}>Send Friend Request</div>
      </button>
    </>
  )
}

export default MemberButton
