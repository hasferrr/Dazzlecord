import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { db } from '@/lib/db'

const ServerIdPage = async ({ params }: {
  params: { serverId: string }
}) => {
  'use server'

  const session = await auth()
  if (!session) {
    throw Error('Unauthorized')
  }
  const userId = session.user.id

  let server
  try {
    server = await db.server.findUnique({
      where: {
        id: params.serverId,
        members: {
          some: {
            userId,
          },
        },
      },
      include: {
        channels: {
          where: {
            name: {
              contains: '',
            },
          },
        },
      },
    })
    console.log(server)
  } catch (error) {
    console.log(error)
  }

  if (server?.channels.length) {
    const initialChannel = server.channels[0]
    return redirect(`/servers/${params.serverId}/${initialChannel.id}`)
  }

  return null
}

export default ServerIdPage
