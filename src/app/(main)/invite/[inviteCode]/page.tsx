import { joinServer } from '@/actions/server/joinServer'

const InviteCodePage = async ({ params }: {
  params: { inviteCode: string }
}) => {
  await joinServer(params.inviteCode)
}

export default InviteCodePage
