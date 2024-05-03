'use client'

import type { User } from '@prisma/client'
import { useRouter } from 'next/navigation'

import MemberItem from '@/components/member-item'

interface UserDirectMessageProps {
  user: User
}

const UserDirectMessage = ({
  user,
}: UserDirectMessageProps) => {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push(`/channels/me/${user.id}`)}
      className="w-full"
    >
      <MemberItem
        name={user.name}
        image={user.image}
        about={user.about}
        className="w-full p-2"
      />
    </button>
  )
}

export default UserDirectMessage
