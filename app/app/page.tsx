import { auth, signOut } from '@/auth'
import ServerModal from '@/components/modals/server-modal'
import { ModeToggle } from '@/components/mode-toggle'

const App = async () => {
  const session = await auth()

  return (
    <div>
      {JSON.stringify(session)}
      <form action={async () => {
        'use server'
        await signOut()
      }}>
        <button type="submit">Sign out</button>
      </form>
      <ServerModal />
      <ModeToggle />
    </div>
  )
}

export default App
