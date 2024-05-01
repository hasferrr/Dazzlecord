import { joinServer } from '@/actions/server/join-server'

interface InviteCodePageProps {
  params: {
    inviteCode: string
  }
}

const InviteCodePage = async ({
  params,
}: InviteCodePageProps) => {
  await joinServer(params.inviteCode)
}

export default InviteCodePage
