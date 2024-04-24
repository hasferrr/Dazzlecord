import BigScreen from '@/components/media-query/big-screen'
import NavigationSidebar from '@/components/navigation/navigation-sidebar'

const MainLayout = async ({ children }: {
  children: React.ReactNode
}) => (
  <main className="h-full flex">
    <div className="flex-col h-full inset-y-0">
      <BigScreen>
        <NavigationSidebar />
      </BigScreen>
    </div>
    {children}
  </main>
)

export default MainLayout
