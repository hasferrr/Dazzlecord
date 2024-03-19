import NavigationSidebar from '@/components/navigation/navigation-sidebar'

const MainLayout = async ({ children }: {
  children: React.ReactNode
}) => {
  return (
    <main className="h-full flex">
      <div className="hidden md:flex flex-col h-full inset-y-0">
        <NavigationSidebar />
      </div>
      {children}
    </main>
  )
}

export default MainLayout
