import { redirect } from 'next/navigation'

import { getUserById } from '@/actions/prisma/user'
import { auth } from '@/auth'
import MeSidebar from '@/components/me/sidebar/me-sidebar'
import BigScreen from '@/components/media-query/big-screen'
import CreateServerModal from '@/components/modals/server/create-server-modal'
import UserSettings from '@/components/settings/user/user-settings'

interface MeLayoutProps {
  children: React.ReactNode
}

const MeLayout = async ({
  children,
}: MeLayoutProps) => {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const userId = session.user.id

  const user = await getUserById(userId)
  if (!user) {
    return redirect('/')
  }

  return (
    <>
      <div className="flex-col h-full inset-y-0">
        <BigScreen>
          <MeSidebar />
        </BigScreen>
      </div>
      {children}
      <UserSettings user={user} />
      <CreateServerModal />
    </>
  )
}

export default MeLayout
