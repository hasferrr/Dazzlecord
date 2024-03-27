import BigScreen from '@/components/media-query/big-screen'
import ServerSidebar from '@/components/server/server-sidebar'

const ServerIdLayout = ({ children, params }: {
  children: React.ReactNode
  params: { serverId: string }
}) => {
  return (
    <>
      <div className="flex-col h-full inset-y-0">
        <BigScreen>
          <ServerSidebar serverId={params.serverId} />
        </BigScreen>
      </div>
      {children}
    </>
  )
}

export default ServerIdLayout
