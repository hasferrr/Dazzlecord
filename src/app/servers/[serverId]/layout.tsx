import NavigationSidebar from '@/components/navigation/navigation-sidebar'

const MainLayout = async ({ children }: {
  children: React.ReactNode
}) => {
  return (
    <div className="h-full">
      <div className="hidden md:flex flex-col fixed h-full w-60 z-20 inset-y-0">
        <NavigationSidebar />
      </div>
      <main className="h-full md:pl-60">
        {children}
      </main>
    </div>
  )
}

export default MainLayout
