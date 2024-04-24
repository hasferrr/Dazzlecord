import { ChannelType } from '@prisma/client'
import { redirect } from 'next/navigation'

import { getServerWithAnyChannel } from '@/actions/prisma/server'
import { auth } from '@/auth'

const ServerIdPage = async ({ params }: {
  params: { serverId: string }
}) => {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const userId = session.user.id

  let server
  try {
    server = await getServerWithAnyChannel(params.serverId, userId)
  } catch (error) {
    console.log(error)
  }

  if (server?.channels.length) {
    const initialChannel = server.channels.find((ch) => ch.type === ChannelType.TEXT)
      ?? server.channels[0]
    return redirect(`/channels/${params.serverId}/${initialChannel.id}`)
  }

  return null
}

export default ServerIdPage
