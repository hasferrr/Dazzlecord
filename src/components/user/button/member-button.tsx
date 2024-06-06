'use client'

import { Mail, UserPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Separator } from '@/components/ui/separator'

interface MemberButtonProps {
  userId: string
}

const MemberButton = ({
  userId,
}: MemberButtonProps) => {
  const router = useRouter()

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
        onClick={() => console.log('unimplemented')} // TODO: implements add/request friend button
      >
        <UserPlus size={18} />
        <div>Send Friend Request</div>
      </button>
    </>
  )
}

export default MemberButton
