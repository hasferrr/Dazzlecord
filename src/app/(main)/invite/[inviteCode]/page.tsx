import { joinServer } from '@/actions/server/join-server'

interface InviteCodePageProps {
  params: Promise<{
    inviteCode: string
  }>
}

const InviteCodePage = async ({
  params,
}: InviteCodePageProps) => {
  const { inviteCode } = await params
  await joinServer(inviteCode)
}

export default InviteCodePage
