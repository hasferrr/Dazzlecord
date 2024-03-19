import { redirect } from 'next/navigation'

import { invite } from '@/actions/invite'
import { auth } from '@/auth'

const InviteCodePage = async ({ params }: {
  params: { inviteCode: string }
}) => {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  await invite(session.user.id, params.inviteCode)
}

export default InviteCodePage
