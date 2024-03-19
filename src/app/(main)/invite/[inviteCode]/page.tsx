import { redirect } from 'next/navigation'

import { joinServer } from '@/actions/invite/joinServer'
import { auth } from '@/auth'

const InviteCodePage = async ({ params }: {
  params: { inviteCode: string }
}) => {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  await joinServer(session.user.id, params.inviteCode)
}

export default InviteCodePage
