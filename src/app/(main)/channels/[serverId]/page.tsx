import { ChannelType } from '@prisma/client'
import { redirect } from 'next/navigation'

import { getServerWithAnyChannel } from '@/actions/prisma/server'
import { auth } from '@/auth'

interface ServerIdPageProps {
  params: Promise<{
    serverId: string
  }>
}

const ServerIdPage = async ({
  params,
}: ServerIdPageProps) => {
  const { serverId } = await params

  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const userId = session.user.id

  let server
  try {
    server = await getServerWithAnyChannel(serverId, userId)
  } catch (error) {
    console.log(error)
  }

  if (server?.channels.length) {
    const initialChannel = server.channels.find((ch) => ch.type === ChannelType.TEXT)
      ?? server.channels[0]
    return redirect(`/channels/${serverId}/${initialChannel.id}`)
  }

  return null
}

export default ServerIdPage
