import { ChannelType } from '@prisma/client'
import { redirect } from 'next/navigation'

import { getServerWithAnyChannel } from '@/actions/prisma/server'
import { auth } from '@/auth'
import Me from '@/components/me/me'

interface ServerIdPageProps {
  params: {
    serverId: string
  }
}

const ServerIdPage = async ({
  params,
}: ServerIdPageProps) => {
  if (params.serverId === '%40me' || params.serverId === '@me') {
    return <Me />
  }

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
