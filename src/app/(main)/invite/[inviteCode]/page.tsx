import { joinServer } from '@/actions/server/join-server'

const InviteCodePage = async ({ params }: {
  params: { inviteCode: string }
}) => {
  await joinServer(params.inviteCode)
}

export default InviteCodePage
