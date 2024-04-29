'use client'

import { useState, useTransition } from 'react'

import { addFriend } from '@/actions/friend/add-friends'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const MeAddFriend = () => {
  const [username, setUsername] = useState('')
  const [isPending, setTransition] = useTransition()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!username.trim()) {
      return
    }
    setTransition(async () => {
      const pending = await addFriend(username)
      if (!pending) {
        return
      }
      setUsername('')
    })
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <p className="uppercase font-bold mb-2">
          Add Friend
        </p>
        <p className="text-xs">
          You can add friends with their Deezcord username.
        </p>
      </div>
      <div className="flex gap-x-4 items-center">
        <Input
          disabled={isPending}
          placeholder="You can add friends with their Deezcord username."
          name="username"
          value={username}
          className="w-full h-12 bg-server dark:bg-server-dark focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button type="submit" variant="primary">
          Send Friend Request
        </Button>
      </div>
    </form>
  )
}

export default MeAddFriend
