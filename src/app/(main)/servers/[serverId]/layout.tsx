import ServerSidebar from '@/components/server/server-sidebar'

const ServerIdLayout = ({ children, params }: {
  children: React.ReactNode
  params: { serverId: string }
}) => {
  return (
    <>
      <div className="hidden md:flex flex-col h-full inset-y-0">
        <ServerSidebar serverId={params.serverId} />
      </div>
      {children}
    </>
  )
}

export default ServerIdLayout
